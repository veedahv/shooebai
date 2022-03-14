<template>
  <div>
    <Carousel></Carousel>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="">
          <div class="sub-heading-box text-center py-5 relative">
            <hr
              class="border-0 bg-white w-full h-px inset-y-1/2 left-0 absolute"
            />
            <h2
              class="
                sub-heading
                bg-white
                font-medium
                text-lg
                mx-auto
                py-2
                px-1.5
                w-max
                relative
              "
            >
              Trending Sale
            </h2>
          </div>
          <div class="">
            <div
              class="
                grid grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-4
              "
            >
              <div
                class="h-full"
                v-for="product in newProducts"
                :key="product.id"
              >
                <ProductCard :product="product"></ProductCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="">
          <div class="sub-heading-box text-center py-5 relative">
            <hr
              class="border-0 bg-white w-full h-px inset-y-1/2 left-0 absolute"
            />
            <h2
              class="
                sub-heading
                bg-white
                font-medium
                text-lg
                mx-auto
                py-2
                px-1.5
                mx-auto
                py-2
                px-1
                w-max
                relative
              "
            >
              Flash Sale
            </h2>
          </div>
          <div class="">
            <div
              class="
                grid grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-4
              "
            >
              <div
                class="h-full"
                v-for="product in saleProducts"
                :key="product.id"
              >
                <ProductCard :product="product"></ProductCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import { mapState } from "vuex";
export default {
  components: {
    ProductCard,
    Carousel,
  },
  computed: {
    ...mapState(["products", "visibleProductArr"]),
    newProducts() {
      let allNewProducts = [];
      this.products.forEach((product) => {
        if (product.newProduct) {
          allNewProducts.push(product);
        }
      });
      return allNewProducts;
    },
    saleProducts() {
      let allSaleProducts = [];
      this.products.forEach((product) => {
        if (product.discount !== 0) {
          allSaleProducts.push(product);
        }
      });
      return allSaleProducts;
    },
  },
};
</script>

<style>
</style>
