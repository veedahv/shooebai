<template>
  <div class="pagination w-max">
    <div class="pagination-row shadow rounded-full w-max bg-white flex flex-nowrap items-stretch text-center">
      <!-- <button class="pagination-btn px-3 cursor-pointer" aria-label="go to previous page" :disabled="!showPrevPage" @click="updatePage(currentPage - 1)"> -->
      <button class="pagination-btn px-3 cursor-pointer" aria-label="go to previous page" :disabled="currentPage <= 0" @click="updatePage(currentPage - 1)">
        <i class="fa fa-angle-left text-lg" :class="currentPage <= 0 ? 'text-gray-200' : ''" aria-hidden="true"></i>
      <!-- <button class="pagination-btn cursor-pointer" :disabled="currentPage <= 0" v-if="showPrevPage" @click="updatePage(currentPage - 1)"> -->
      </button>
      <span class="px-3 py-2 bg-gray-50 text-sm font-medium">
        {{ currentPage + 1 }} of {{ totalPages === 0 ? 1 : totalPages }}
        <!-- {{ currentPage + 1 }} of {{ totalPages() === 0 ? 1 : totalPages() }} -->
      </span>
      <!-- <button class="pagination-btn px-3 cursor-pointer" aria-label="go to next page" :disabled="!showNextPage" @click="updatePage(currentPage + 1)"> -->
      <button class="pagination-btn px-3 cursor-pointer" aria-label="go to next page" :disabled="currentPage >= (totalPages - 1)" @click="updatePage(currentPage + 1)">
        <i class="fa fa-angle-right text-lg" :class="currentPage >= (totalPages - 1) ? 'text-gray-200' : ''" aria-hidden="true"></i>
      <!-- <button class="pagination-btn cursor-pointer" :disabled="currentPage >= (totalPages() - 1)" v-if="showNextPage" @click="updatePage(currentPage + 1)"> -->
        <!-- <i class="fa fa-angle-right text-lg" :class="!showNextPage ? 'text-gray-100' : ''" aria-hidden="true"></i> -->
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: ['products', 'currentPage', 'perPage'],
  computed: {
    totalPages() {      
      return Math.ceil(this.products.length / this.perPage)
    },
  },
  methods: {
    updatePage(pageNumber) {
      this.$emit('page:update', pageNumber);
    },
    // totalPages() {      
    //   return Math.ceil(this.products.length / this.perPage)
    // },
    showPrevPage() {
      return this.currentPage <= 0 ? false : true;
    },
    showNextPage() {
      return this.currentPage >= (this.totalPages - 1) ? false : true;
    },
  },
};
</script>

<style scoped>
.pagination-btn {
  outline: none;
}
</style>