<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from './Card.vue'
import Loader from './Loader.vue'
import YouTube from './YouTube.vue'
import Spotify from './Spotify.vue'
import Apple from './Apple.vue'

// The current route and router
const route = useRoute()
const router = useRouter()
const urlQuery = reactive(route.query)

// Pagination-related variables
const itemsPerPage = ref(21)
const currentPage = ref(1)
const sortOrder = ref(urlQuery.sort ?? 'desc')

// Search-related variables
const searchQuery = ref(urlQuery.search ?? '')
const searchInput = ref(urlQuery.search ?? '')
const debounceTimeout = ref(null)

const loading = ref(false)

// The original data fetched from the API
const { data } = await useFetch('podcasts', {
  baseURL: import.meta.env.VITE_API_ENDPOINT,
})

// Adds a formatted release date to each item
const formattedData = computed(() =>
  data.value.map((item) => {
    const date = new Date(item.release_date)
    const day = date.getDate()
    const suffix =
      day > 3 && day < 21 ? 'th' : ['st', 'nd', 'rd'][(day % 10) - 1] || 'th'
    return {
      ...item,
      formatted_release_date: `${day}${suffix} ${date.toLocaleDateString(
        'en-GB',
        {
          month: 'short',
          year: 'numeric',
        },
      )}`,
    }
  }),
)

// Data after being filtered based on search query
const filteredData = computed(() => {
  const filtered = [...formattedData.value].filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )

  return [...filtered].sort((a, b) => {
    const comparison = a.episode_number - b.episode_number
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

// Data that's currently visible based on the currentPage and itemsPerPage
const visibleData = computed(() => {
  const start = 0
  const end = start + itemsPerPage.value * currentPage.value
  return filteredData.value.slice(start, end)
})

// Determines if there's more data to be loaded
const hasMoreResults = computed(
  () => visibleData.value.length < filteredData.value.length,
)

/**
 * Converts the given duration in milliseconds to a human-readable format
 * @param duration {number} - Duration in milliseconds
 * @returns {string} - Human-readable duration
 */
const msToTime = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  return `${hours ? `${hours.toString()}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

/**
 * Increases the currentPage number
 */
const loadNextPage = async () => {
  if (loading.value) return
  loading.value = true

  await nextTick()

  // Artificial delay
  setTimeout(() => {
    currentPage.value++
    loading.value = false
  }, 500)
}

/**
 * Updates the search query based on the input value
 */
const updateSearchQuery = async () => {
  if (loading.value) return
  loading.value = true

  await nextTick()

  // Artificial delay
  setTimeout(() => {
    searchQuery.value = searchInput.value
    currentPage.value = 1
    loading.value = false
  }, 500)
}

/**
 * Resets the search query and sorting order
 */
const resetQueries = () => {
  currentPage.value = 1
  searchQuery.value = ''
  searchInput.value = ''
  sortOrder.value = 'desc'
}

/**
 * Toggles the sorting order between ascending and descending
 */
const toggleSortOrder = async () => {
  if (loading.value) return
  loading.value = true

  await nextTick()

  // Artificial delay
  setTimeout(() => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    loading.value = false
  }, 500)
}

/**
 * Updates the URL query based on the search query and sorting order
 */
const updateUrlQuery = () => {
  const query = {
    ...(searchQuery.value.length > 0 && { search: searchQuery.value }),
    ...(sortOrder.value !== 'desc' && { sort: sortOrder.value }),
  }

  router.push({ query })
}

/**
 * Handles the keyup event on the search input
 * @param event {KeyboardEvent} - The keyup event
 */
const handleSearchInputKeyup = (event) => {
  // Ignore certain keys
  const ignoredKeys = ['Tab', 'Shift', 'Control', 'Alt', 'AltGraph', 'Meta']
  if (ignoredKeys.includes(event.key)) return

  // If the search input hasn't changed, do nothing
  if (searchInput.value === searchQuery.value) return

  // Run immediately if the Enter key is pressed
  if (event.key == 'Enter') {
    clearTimeout(debounceTimeout.value)
    updateSearchQuery()
    return
  }

  // Otherwise debounce the search query update
  if (debounceTimeout.value) clearTimeout(debounceTimeout.value)
  debounceTimeout.value = setTimeout(() => {
    updateSearchQuery()
  }, 500)
}

/**
 * Loads more data when the user scrolls to the bottom of the page
 */
const handleScroll = () => {
  if (loading.value || !hasMoreResults.value) return

  const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadNextPage()
  }
}

// When the data changes, update the URL query to match
watch(
  () => visibleData.value,
  async () => {
    await nextTick()
    updateUrlQuery()
  },
)
// If the route query is empty, reset the search query and sorting order
watch(
  () => route.query,
  async (value) => {
    if (Object.keys(value).length === 0) {
      await nextTick()
      resetQueries()
    }
  },
)

/**
 * Event listeners for handling scrolling
 */
onMounted(async () => {
  await nextTick()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(async () => {
  await nextTick()
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section>
    <div class="align-center flex items-center justify-between gap-4 pb-8">
      <input
        type="text"
        aria-label="Search by episode title"
        v-model="searchInput"
        @keyup="handleSearchInputKeyup"
        placeholder="Search by title..."
        class="w-full max-w-72 rounded border-2 border-gray-200/20 bg-gray-950 p-2"
      />
      <button
        @click="toggleSortOrder"
        class="size-10 flex-shrink-0 rounded border-2 border-gray-200/20 bg-gray-950 text-white"
      >
        <span v-if="sortOrder === 'asc'">
          <span class="sr-only">Ordered ascending</span>
          <font-awesome :icon="['fas', 'arrow-up']" aria-hidden="true" />
        </span>

        <span v-if="sortOrder === 'desc'">
          <span class="sr-only">Ordered descending</span>
          <font-awesome :icon="['fas', 'arrow-down']" aria-hidden="true" />
        </span>

        <span class="sr-only">Toggle sorting order</span>
      </button>
    </div>
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
      <Card
        v-for="(item, index) in visibleData"
        :key="index"
        :image_url="`https://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`"
        :image_alt="`YouTube thumbnail for ${item.title}`"
      >
        <h2 class="text-xl font-bold">{{ item.title }}</h2>
        <ul class="border-l-2 border-yellow-400 pl-4">
          <li v-if="item.episode_number">
            Episode: <b>{{ item.episode_number }}</b>
          </li>
          <li v-if="item.release_date">
            Date: <b>{{ item.formatted_release_date }}</b>
          </li>
          <li v-if="item.duration">
            Duration: <b>{{ msToTime(item.duration) }}</b>
          </li>
        </ul>
        <div v-if="item.preview_url" class="pb-4">
          <span class="mb-1 block font-semibold">Preview:</span>
          <audio controls="controls" class="w-full rounded-full bg-blue-900">
            <source :src="item.preview_url" type="audio/mpeg" />
          </audio>
        </div>
        <ul class="flex gap-2">
          <li>
            <YouTube
              :alt="`Watch this episode on YouTube`"
              :href="`https://www.youtube.com/watch?v=${item.youtube_id}`"
              target="_blank"
            />
          </li>
          <li v-if="item.spotify_url">
            <Spotify
              alt="Listen to this episode on Spotify"
              :href="item.spotify_url"
              target="_blank"
              >Spotify</Spotify
            >
          </li>
          <li v-if="item.apple_music_url">
            <Apple
              alt="Listen to this episode on Apple Podcasts"
              :href="item.apple_music_url"
              target="_blank"
              >Apple Podcasts</Apple
            >
          </li>
        </ul>
      </Card>
    </div>

    <TransitionGroup tag="div">
      <div
        v-if="loading"
        class="fixed left-0 top-0 h-full w-full bg-gradient-to-t from-gray-950/75"
      ></div>
      <Loader
        :condition="loading"
        class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      />
    </TransitionGroup>
  </section>
</template>
