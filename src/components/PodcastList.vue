<template>
  <section @scroll="handleScroll" class="h-screen overflow-auto">
    <div
      class="align-center flex flex-col justify-between gap-4 pb-8 sm:flex-row"
    >
      <input
        type="text"
        v-model="searchInput"
        @keyup="handleKeyup"
        placeholder="Search by title"
        class="rounded border border-gray-500 bg-gray-800 p-2"
      />
      <button
        @click="toggleSortOrder"
        class="rounded bg-gray-700 p-2 text-white"
      >
        Sort by Episode {{ sortOrder === 'asc' ? 'Descending' : 'Ascending' }}
      </button>
    </div>
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="(item, index) in visibleData"
        :key="index"
        :title="item.title"
        :meta="`Episode: ${item.episode_number}`"
        :image_url="`https://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`"
        :image_alt="`YouTube thumbnail for ${item.title}`"
      >
        <ul v-if="item.tags" class="flex gap-2">
          <li v-for="(tag, index) in item.tags" :key="index">
            <Button :label="tag.name" href="#" />
          </li>
        </ul>
        <ul class="flex gap-2">
          <li>
            <Button
              label="YouTube"
              :href="`https://www.youtube.com/watch?v=${item.youtube_id}`"
              target="_blank"
            />
          </li>
          <li v-if="item.spotify_url">
            <Button label="Spotify" :href="item.spotify_url" target="_blank" />
          </li>
          <li v-if="item.apple_podcasts_url">
            <Button
              label="Apple Podcasts"
              :href="item.apple_podcasts_url"
              target="_blank"
            />
          </li>
        </ul>
      </Card>
    </div>

    <Loader
      :condition="loading"
      classes="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
    />
  </section>
</template>

<script>
import Card from './Card.vue'
import Button from './Button.vue'
import Loader from './Loader.vue'

export default {
  components: {
    Card,
    Button,
    Loader,
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
    handleScroll(event) {
      const bottom =
        event.target.scrollHeight - event.target.scrollTop ===
        event.target.clientHeight
      if (bottom && this.hasMoreResults) {
        this.loadMore()
      }
    },
    handleKeyup(event) {
      // If the return key is pressed, update the search query immediately
      if (event.key === 'Enter') {
        this.updateSearchQuery()
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
  },
  watch: {
    '$route.query.search': 'applySearchQueryFromUrl',
    '$route.query.sort': 'applySearchQueryFromUrl',
  },
  created() {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/podcasts`)
      .then((response) => response.json())
      .then((data) => {
        this.data = data
        this.applySearchQueryFromUrl() // Apply search query and sort order from URL on page load
        this.loadMore() // Load initial items
      })
      .catch((error) => console.error('Error fetching data:', error))
  },
}
</script>
