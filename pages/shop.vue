<template>
  <div>
    <section class="heading-section">
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="text-center">
          <div class="heading-box py-5 relative">
            <h2
              class="heading mx-auto text-white py-5 px-1 w-max font-bold text-3xl md:text-5xl"
            >
              OUR CATALOQUE
            </h2>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <p class="text-xl font-medium color-tertiary">
          Only the best shoes for your feet
        </p>
        <div class="">
          <div class="flex items-center justify-between my-4">
            <div class="">Filter</div>
            <div class="w-max">
              <Pagination
                :products="products"
                :currentPage="currentPage"
                :perPage="perPage"
                v-on:page:update="updatePage"
              ></Pagination>
            </div>
          </div>
          <div class="">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div
                class="h-full"
                v-for="product in visibleProductArr"
                :key="product.id"
              >
                <ProductCard class="h-full" :product="product"></ProductCard>
              </div>
            </div>
          </div>
          <div class="my-4">
            <Pagination
              :products="products"
              :currentPage="currentPage"
              :perPage="perPage"
              v-on:page:update="updatePage"
            ></Pagination>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  components: {
    Pagination,
    ProductCard,
  },
  data() {
    return {
      currentPage: 0,
      perPage: 15,
      currencyValue: null,
      query: ''
    };
  },
  computed: {
    ...mapGetters(["getCurrencyRate", "getCurrencySymbol"]),
    ...mapState(["products", "visibleProductArr", "filterProducts"]),
  },
  methods: {
    ...mapActions(["getProducts", "getPageProducts"]),
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
      this.getPageProducts(this.currentPage);
    // this.getPageProducts({page: this.currentPage, query: this.query});
      // this.visibleProduct();
    },
  },
  created() {
    // this.getProducts();
    this.getPageProducts(this.currentPage);
    // if (this.$route.query.name) {
    // //   this.edit = true;
    // console.log(this.$route.query.name);
    // this.query = this.$route.query.name;
    // }
    // this.getPageProducts({page: this.currentPage, query: this.query});
    // console.log(this.filterProducts);
    // console.log(this.visibleProductArr);
  },
  // mounted() {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   // console.log(this.$nuxt.$loading);
    //   setTimeout(() => this.$nuxt.$loading.finish(), 5000)
    // })
  // },
};
</script>

<style scoped>
.heading-section {
  background: rgba(0, 0, 0, 0.4) url("~/assets/images/shop.jpg") no-repeat
    bottom 40% center / cover;
  background-blend-mode: overlay;
}
</style>
