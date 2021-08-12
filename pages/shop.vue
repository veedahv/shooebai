<template>
  <div>
    <section>
      <div class="container py-10 px-4 mx-auto">
        <div class="">
          <div class="">
            <div class="sub-heading-box text-center py-5 relative">
              <!-- class="border-0 bg-black w-full h-px inset-y-1/2 left-0 absolute" -->
              <hr
                class="border-0 bg-white w-full h-px inset-y-1/2 left-0 absolute"
              />
              <h2 class="sub-heading bg-white mx-auto py-2 px-1 w-min relative">
                Trending
              </h2>
            </div>
            <!-- <pagination :postsArr="postsArr" :currentPage="currentPage" :perPage="perPage" v-on:page:update="updatePage"></pagination> -->
            <!-- <pagination></pagination> -->
            <Pagination
              :products="products"
              :currentPage="currentPage"
              :perPage="perPage"
              v-on:page:update="updatePage"
            ></Pagination>
          </div>
          <div class="">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div class="h-full" v-for="product in visibleProductArr" :key="product.id">
                <ProductCard class="h-full" :product="product" :country="country"></ProductCard>
              </div>
              <!-- <div class="h-full" v-for="product in products" :key="product.id">
                <ProductCard class="h-full" :product="product"></ProductCard>
              </div> -->
            </div>
          </div>
            <Pagination
              :products="products"
              :currentPage="currentPage"
              :perPage="perPage"
              v-on:page:update="updatePage"
            ></Pagination>
        </div>
      </div>
    </section>
    <!-- <section>
      <div class="container py-25 mx-auto">
      </div>
    </section> -->
    <!-- <section>
      <div class="container py-25 mx-auto">
      </div>
    </section> -->
  </div>
</template>

<script>
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
export default {
  components: {
    Pagination,
    ProductCard,
  },
  data() {
    return {
      country: null,
      products: [],
      visibleProductArr: [],
      currentPage: 0,
      perPage: 15,
    };
  },
  // beforeMount() {
  //   this.visibleProduct(); NewProductCard.vue country.js
  // },
  methods: {
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
      this.visibleProduct();
    },
    visibleProduct() {
      this.visibleProductArr = this.products.slice(
        this.currentPage * this.perPage,
        this.currentPage * this.perPage + this.perPage
      );
      console.log(this.visibleProductArr);
    },
    async readFromFirestore() {
      const ref = this.$fire.firestore.collection("products").doc("product");
      let snap;
      try {
        snap = await ref.get();
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      this.products = snap.data().products;
      console.log(this.products);
    this.visibleProduct();
    },
  },
  // mounted() {
  //   // console.log(this.$country());
  //   // console.log(this.$location());
  //   // this.$location();
  //   // this.$country();
  // },
  // created() {
  async created() {
    // this.getLocation();
    this.country = await this.$country();
    this.readFromFirestore();
  },
};
</script>

<style>
</style>
