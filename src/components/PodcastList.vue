<template>
  <section @scroll="handleScroll" class="overflow-auto h-screen">
    <div class="p-4">
      <input
        type="text"
        v-model="searchInput"
        @keyup="handleKeyup"
        placeholder="Search by title"
        class="p-2 border border-gray-300 rounded"
      />
    </div>
    <div class="grid grid-cols-3 gap-8">
      <Card
        v-for="(item, index) in paginatedData"
        :key="index"
        :title="item.title"
        :image_url="`http://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`"
        :image_alt="`YouTube thumbnail for ${item.title}`"
      >
        <ul v-if="item.tags" class="flex gap-4">
          <li v-for="(tag, index) in item.tags" :key="index">
            <Button :label="tag.name" href="#" />
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
      itemsPerPage: 21,
      currentPage: 1,
      loading: false,
      searchQuery: '', // Actual search query used for filtering
      searchInput: '', // Input field value
      debounceTimeout: null, // Timeout for debounce
    }
  },
  computed: {
    filteredData() {
      if (this.searchQuery) {
        return this.data.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
        )
      }
      return this.data
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredData.slice(start, end)
    },
  },
  methods: {
    loadMore() {
      if (this.loading) return

      this.loading = true

      // Artificial delay
      setTimeout(() => {
        this.currentPage++
        this.loading = false
      }, 1000) // 1 second delay
    },
    handleScroll(event) {
      const bottom =
        event.target.scrollHeight - event.target.scrollTop ===
        event.target.clientHeight
      if (bottom) {
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
      this.updateUrlQuery()
    },
    updateUrlQuery() {
      this.$router.push({
        query: { ...this.$route.query, search: this.searchQuery },
      })
    },
    applySearchQueryFromUrl() {
      const searchQuery = this.$route.query.search
      if (searchQuery) {
        this.searchInput = searchQuery
        this.searchQuery = searchQuery
      }
    },
  },
  created() {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/podcasts`)
      .then((response) => response.json())
      .then((data) => {
        this.data = data
        this.applySearchQueryFromUrl() // Apply search query from URL on page load
      })
      .catch((error) => console.error('Error fetching data:', error))
  },
}
</script>
