<template>
  <div>
    <!-- <Navigation></Navigation> -->
    <Carousel></Carousel>
    <section>
      <div class="container py-5 mx-auto">
        <div class="">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div class="" v-for="product in products" :key="product.id">
              <ProductCard :product="product"></ProductCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard";
// import Navigation from '../components/Navigation'
import Carousel from "../components/Carousel";
export default {
  components: {
    ProductCard,
    // Navigation,
    Carousel,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
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
    },
  },
  mounted() {
    this.readFromFirestore();
  },
};
</script>

<style>
</style>
