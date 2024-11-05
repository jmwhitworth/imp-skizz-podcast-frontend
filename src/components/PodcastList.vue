<template>
  <section>
    <div class="align-center flex items-center justify-between gap-4 pb-8">
      <input
        type="text"
        aria-label="Search by episode title"
        v-model="searchInput"
        @keyup="handleKeyup"
        placeholder="Search by title..."
        class="w-full max-w-72 rounded border-2 border-gray-200/20 bg-gray-950 p-2"
      />
      <button
        @click="toggleSortOrder"
        class="size-10 flex-shrink-0 rounded border-2 border-gray-200/20 bg-gray-950 text-white"
      >
        <font-awesome-icon
          v-if="sortOrder === 'asc'"
          :icon="['fas', 'arrow-up']"
        />
        <font-awesome-icon
          v-if="sortOrder === 'desc'"
          :icon="['fas', 'arrow-down']"
        />
        <span class="sr-only">Toggle sorting order</span>
      </button>
    </div>
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="(item, index) in visibleData"
        :key="index"
        :image_url="`https://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`"
        :image_alt="`YouTube thumbnail for ${item.title}`"
      >
        <h2 class="min-h-12 text-xl font-bold">{{ item.title }}</h2>
        <ul class="border-l-2 border-yellow-400 pl-2 text-sm">
          <li v-if="item.episode_number">
            Episode: <b>{{ item.episode_number }}</b>
          </li>
          <li v-if="item.release_date">
            Date: <b>{{ new Date(item.release_date).toLocaleDateString() }}</b>
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

    <TransitionGroup>
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

<script>
import Card from './Card.vue'
import Button from './Button.vue'
import Loader from './Loader.vue'
import YouTube from './YouTube.vue'
import Spotify from './Spotify.vue'
import Apple from './Apple.vue'

export default {
  components: {
    Card,
    Button,
    Loader,
    YouTube,
    Spotify,
    Apple,
  },
  data() {
    return {
      data: [],
      visibleData: [],
      itemsPerPage: 21,
      currentPage: 1,
      loading: false,
      searchQuery: '', // Actual search query used for filtering
      searchInput: '', // Input field value
      debounceTimeout: null, // Timeout for debounce
      sortOrder: 'asc', // Sorting order: 'asc' or 'desc'
    }
  },
  computed: {
    filteredData() {
      let filtered = this.data
      if (this.searchQuery) {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
        )
      }
      return filtered.sort((a, b) => {
        const comparison = a.episode_number - b.episode_number
        return this.sortOrder === 'asc' ? comparison : -comparison
      })
    },
    hasMoreResults() {
      return this.visibleData.length < this.filteredData.length
    },
  },
  methods: {
    loadMore() {
      if (this.loading) return

      this.loading = true

      // Artificial delay
      setTimeout(() => {
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        this.visibleData = this.visibleData.concat(
          this.filteredData.slice(start, end),
        )
        this.currentPage++
        this.loading = false
      }, 1000) // 1 second delay
    },
    handleScroll() {
      setTimeout(() => {
        const bottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight
        if (bottom && this.hasMoreResults) {
          this.loadMore()
        }
      }, 100) // 100ms delay
    },
    handleKeyup(event) {
      // If the return key is pressed, update the search query immediately
      if (event.key === 'Enter') {
        this.updateSearchQuery()
      } else if (event.key === 'Tab' || event.key === 'Shift') {
        // If the tab key is pressed, do nothing
      } else {
        // Otherwise, debounce the search query update
        clearTimeout(this.debounceTimeout)
        this.debounceTimeout = setTimeout(() => {
          this.updateSearchQuery()
        }, 1000) // 1 second delay
      }
    },
    updateSearchQuery() {
      this.searchQuery = this.searchInput
      this.currentPage = 1 // Reset to the first page
      this.visibleData = [] // Clear the current visible data
      this.updateUrlQuery()
      this.loadMore() // Load the first page of results for the new search query
    },
    updateUrlQuery() {
      this.$router.push({
        query: {
          ...this.$route.query,
          search: this.searchQuery || undefined,
          sort: this.sortOrder || undefined,
        },
      })
    },
    applySearchQueryFromUrl() {
      const searchQuery = this.$route.query.search || ''
      const sortOrder = this.$route.query.sort || 'desc'
      this.searchInput = searchQuery
      this.searchQuery = searchQuery
      this.sortOrder = sortOrder
      this.currentPage = 1 // Reset to the first page
      this.visibleData = [] // Clear the current visible data
      this.loadMore() // Load the first page of results for the new search query and sort order
    },
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      this.currentPage = 1 // Reset to the first page
      this.visibleData = [] // Clear the current visible data
      this.updateUrlQuery()
      this.loadMore() // Load the first page of results for the new sort order
    },
    msToTime(duration) {
      const seconds = Math.floor((duration / 1000) % 60)
      const minutes = Math.floor((duration / (1000 * 60)) % 60)
      const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
      return `${hours ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
  },
  watch: {
    '$route.query.search': 'applySearchQueryFromUrl',
    '$route.query.sort': 'applySearchQueryFromUrl',
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/podcasts`)
      .then((response) => response.json())
      .then((data) => {
        this.data = data
        this.applySearchQueryFromUrl() // Apply search query and sort order from URL on page load
        this.loadMore() // Load initial items
      })
      .catch((error) => console.error('Error fetching data:', error))
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
