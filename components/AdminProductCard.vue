<template>
<div class="h-full">
    <div class="product bg-white relative h-full">
      <!-- <div class="flex justify-between py-2 absolute left-0 w-full top items-center"> -->
      <div class="py-2 absolute left-0 top-0">
        <span
          class="flash-sale bg-red-400 text-white px-1"
          v-if="product.discount != 0"
        >
          -{{ product.discount }}%
        </span>
      </div>
      <div class="py-2 absolute right-0 top-0">
        <span
          class="new-sale bg-blue-600 text-white px-1"
          v-if="product.newProduct"
        >
          New
        </span>
      </div>
      <div class="product-img">
        <!-- :to="{ name: 'ProductDetailsCard', params: { id: product.productId } }" -->
        <!-- AdminProductCard.vue -->
        <nuxt-link :to="'/ProductDetail/' + product.productId">
          <img :src="product.productImage" alt="" />
        </nuxt-link>
      </div>
      <!-- <div class="product-info flex justify-between py-5 px-4 w-full items-center"> -->
        <div class="product-info py-4 px-3 w-full">
          <div class="product-details">
            <p class="product-name font-semibold text-base">{{ product.productName }}</p>
          </div>
          <div class="my-2 " v-if="product.discount == 0">
            <p class="product-price text-sm font-medium"><span>{{ getCurrencySymbol }}</span>{{ productPrice }}</p>
          </div>
          <div class="my-2 flex items-center gap-2" v-else>
            <p class="product-price text-sm font-medium"><span>{{ getCurrencySymbol }}</span>{{ discount }}</p>
            <del class="text-gray-600">
              <p class="product-price text-xs font-medium">
                <span>{{ getCurrencySymbol }}</span>
                {{ productPrice }}
              </p>
            </del>
          </div>
          <div class="product-btn-box flex gap-3">
            <nuxt-link class="product-btn capitalize bg-light py-1 flex-auto w-1/2 inline-block" :to="'/Admin/ProductForm/' + product.productId">
              <!-- <button> -->
                <span class="flex items-center justify-center gap-2">
                  <span class="text-base"> edit </span>
                  <span>
                    <i class="fas fa-edit text-sm"></i>
                    <!-- <i class="fas text-3xl fa-bookmark"></i> -->
                  </span>
                </span>
              <!-- </button> -->
            </nuxt-link>
            <button class="product-btn capitalize text-white bg-red-600 py-1 flex-auto w-1/2">
              <span class="flex items-center justify-center gap-2">
                <span class="text-base"> del </span>
                  <i class="fas fa-trash-alt text-sm"></i>
              </span>
            </button>
          </div>
        </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      inFav: false,
      favList: [],
    };
  },
  props: ["product"],
  // props: ["product", "country", "currencyValue"],
  computed: {
    ...mapGetters(['getCurrencyRate', 'getCurrencySymbol']),
    ...mapState(['currencyRate', 'currencySymbol', "wishItems", "wishItemsArray", "user"]),
    // ...mapState(['country', 'countryName', 'countryFlag', 'currency', 'currencyRate', 'currencySymbol']),
    productPrice() {
      return (Math.ceil((this.product.productPrice / this.currencyRate) * 100) / 100);
    },
    discount() {
      let discountVal =
        this.productPrice -
        (this.product.discount * this.productPrice) / 100;
      return (Math.ceil(discountVal * 100) / 100);
      // return discountVal;
    },
  },
};
</script>

<style scoped>
.color:checked ~ label {
  /* border: 2px solid var(--dark); */
  border: 2px solid currentColor;
}
</style>
