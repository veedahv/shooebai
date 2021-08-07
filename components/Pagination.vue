<template>
  <div class="pagination">
    <div class="pagination-row">
      <button class="pagination-btn" :disabled="currentPage <= 0" v-if="showPrevPage" @click="updatePage(currentPage - 1)">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </button>
      <span>
        {{ currentPage + 1 }} of {{ totalPages() }}
      </span>
      <button class="pagination-btn" :disabled="currentPage >= (totalPages() - 1)" v-if="showNextPage" @click="updatePage(currentPage + 1)">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: ['products', 'currentPage', 'perPage'],
  methods: {
    updatePage(pageNumber) {
      this.$emit('page:update', pageNumber);
    },
    totalPages() {      
      return Math.ceil(this.products.length / this.perPage)
    },
    showPrevPage() {
      return this.currentPage == 0 ? false : true;
    },
    showNextPage() {
      return this.currentPage == (this.totalPages() - 1) ? false : true;
    },
  },
};
</script>

<style scoped>
.pagination-row {
  text-align: center;
}
.pagination-btn {
  margin: 10px;
  font-size: 20px;
  background: transparent;
  border: none;
  outline: none;
}
.pagination-btn:hover {
  cursor: pointer;
}
</style>