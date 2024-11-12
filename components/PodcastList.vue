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
const urlQueryTimeout = ref(null)

// Pagination-related variables
//const itemsPerPage = ref(15)
const currentPage = ref(1) // Always reset page on page load
const sortOrder = ref(urlQuery.sort ?? 'desc')

// Search-related variables
const searchQuery = ref(urlQuery.search ?? '')
const searchInput = ref(urlQuery.search ?? '')
const searchTimeout = ref(null)

const urlWatcherTimeout = ref(null)
const loading = ref(false)

const url = computed(() => {
  const _url = new URL(import.meta.env.VITE_API_ENDPOINT + '/podcasts')
  _url.search = new URLSearchParams(route.query)
  return _url.toString()
})

const { data } = useFetch(url, { refetch: true })

/**
 * Updates the URL query based on the search query and sorting order
 */
const updateUrlQuery = async () => {
  await nextTick()
  if (loading.value) return
  loading.value = true

  const query = {
    ...(searchQuery.value.length > 0 && { search: searchQuery.value }),
    ...(sortOrder.value !== 'desc' && { sort: sortOrder.value }),
    ...(currentPage.value > 1 && { page: currentPage.value }),
  }

  router.push({ query })
  if (urlQueryTimeout.value) clearTimeout(urlQueryTimeout.value)
  urlQueryTimeout.value = setTimeout(() => {
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
  updateUrlQuery()
}

/**
 * Toggles the sorting order between ascending and descending
 */
const toggleSortOrder = async () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  updateUrlQuery()
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
    clearTimeout(searchTimeout.value)
    searchQuery.value = searchInput.value
    currentPage.value = 1
    updateUrlQuery()
    return
  }

  // Otherwise debounce the search query update
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    searchQuery.value = searchInput.value
    currentPage.value = 1
    updateUrlQuery()
  }, 1000)
}

/**
 * Fetches the next page of results
 */
const nextPage = () => {
  currentPage.value++
  updateUrlQuery()
}

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
      <Card v-for="(item, index) in data.podcasts" :key="index" :podcast="item">
        <h2 class="text-xl font-bold">{{ item.title }}</h2>
        <ul class="border-l-2 border-yellow-400 pl-4">
          <li v-if="item.episode_number">
            Episode: <b>{{ item.episode_number }}</b>
          </li>
          <li v-if="item.formatted_release_date">
            Date: <b>{{ item.formatted_release_date }}</b>
          </li>
          <li v-if="item.formatted_duration">
            Duration: <b>{{ item.formatted_duration }}</b>
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

    <div v-if="data.more_results" class="mt-12">
      <button
        @click="nextPage"
        class="mx-auto block rounded border-2 border-gray-200/20 bg-gray-950 p-2 text-white"
      >
        Load more
      </button>
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
