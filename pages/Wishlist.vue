<template>
  <div>
    <section>
      <div class="container wish-container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="">
          <!-- <div class="">
            <div class="sub-heading-box text-center py-5 relative">
              <hr
                class="border-0 bg-white w-full h-px inset-y-1/2 left-0 absolute"
              />
              <h2 class="sub-heading bg-white mx-auto py-2 px-1 w-min relative">
                Trending
              </h2>
            </div>
          </div> -->
          <div class="" v-if="wishItemsArray.length >= 1">
            <div class="text-center">
            <h2 class="font-bold text-xl md:text-2xl mb-3">
              Your Wishlist
            </h2>
            <p class="text-base mb-5">Here are your saved items</p>
          </div>
            <div class="">
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <!-- lllll -->
                <div
                  class="h-full"
                  v-for="product in wishItemsArray"
                  :key="product.id"
                >
                  <!-- gggg -->
                  {{ product.id }}
                  <ProductCard
                    class="h-full"
                    :product="product"
                    :country="country"
                    :currencyValue="currencyValue"
                  ></ProductCard>
                </div>
              </div>
            </div>
          </div>
          <div class="no-trans text-center h-96" v-else>
            <div
              class="py-2 flex items-center justify-center flex-col gap-4 h-full w-full"
            >
              <i class="fas fa-heart text-7xl"></i>
              <p class="text-3xl capitalize font-semibold">
                Your wishlist is empty
              </p>

              <div class="py-2">
                <nuxt-link
                  to="/shop"
                  class="border-2 font-medium text-2xl border-current px-4 py-2"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  components: {
    // Pagination,
    ProductCard,
  },
  data() {
    return {
      country: null,
      products: [],
      visibleProductArr: [],
      currentPage: 0,
      perPage: 15,
      currencyValue: null,
      isUser: false,
      favList: [],
    };
  },
  computed: {
    ...mapState(["wishItems", "wishItemsArray", "user"]),
  },
  methods: {
    ...mapActions(["getWishProducts"]),
  },
  // async created() {
  created() {
    this.getWishProducts();
  },
};
</script>

<style>
.empty-container {
  min-height: 80vh;
}
@media (min-width: 999px) {  
  .wish-container {
    min-height: 500px;
  }
}

</style>
