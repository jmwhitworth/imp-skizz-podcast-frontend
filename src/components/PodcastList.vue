<template>
  <section @scroll="handleScroll" class="overflow-auto h-screen">
    <div class="grid grid-cols-3 gap-8">
      <Card
        v-for="(item, index) in visibleData"
        :key="index"
        :title="item.title"
        :image_url="`http://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`"
        :image_alt="`YouTube thumbnail for ${item.title}`"
      >
        <ul v-if="item.tags">
          <li v-for="(tag, index) in item.tags" :key="index">
            <button>{{ tag.name }}</button>
          </li>
        </ul>
      </Card>
    </div>
  </section>
</template>

<script>
import Card from './Card.vue'

export default {
  components: {
    Card,
  },
  data() {
    return {
      data: [],
      visibleData: [],
      itemsPerPage: 21,
      currentPage: 1,
    }
  },
  methods: {
    loadMore() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      this.visibleData = this.visibleData.concat(this.data.slice(start, end))
      this.currentPage++
    },
    handleScroll(event) {
      const bottom =
        event.target.scrollHeight - event.target.scrollTop ===
        event.target.clientHeight
      if (bottom) {
        this.loadMore()
      }
    },
  },
  created() {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/podcasts`)
      .then((response) => response.json())
      .then((data) => {
        this.data = data
        this.loadMore() // Load initial items
      })
      .catch((error) => console.error('Error fetching data:', error))
  },
}
</script>
