<template>
  <div>
    <div class="product bg-white relative">
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
      <div
        class="product-info flex justify-between py-5 px-4 w-full items-start"
      >
        <div class="product-details">
          <nuxt-link :to="'/ProductDetail/' + product.productId">
            <p class="product-name font-bold">{{ product.productName }}</p>
          </nuxt-link>
          <div class="" v-if="product.discount == 0">
            <p class="product-price font-medium">{{ product.productPrice }}</p>
          </div>
          <div class="" v-else>
            <del>
              <p class="product-price font-medium">
                {{ product.productPrice }}
              </p>
            </del>
            <p class="product-price font-medium">{{ discount }}</p>
          </div>
          <!-- <nuxt-link
            :to="{ name: 'ProductDetailsCard', params: { id: product.id } }"
          >
            Details
          </nuxt-link> -->
        </div>
        <div class="product-btn-box">
          <!-- <button class="product-btn active:shadow-md hover:shadow-lg"> -->
          <button class="product-btn transform active:scale-90 hover:scale-110">
            <!-- <button class="product-btn"> -->
            <!-- <i class="fas fa-shopping-bag"></i> -->
            <!-- <i class="fas fa-5x text-5xl fa-bookmark"></i> -->
            <!-- <i class="fas fa-3x fa-bookmark"></i> -->
            <i class="fas text-3xl fa-bookmark"></i>
            <!-- <span v-if="product.fav">
              <i class="fa fa-heart" aria-hidden="true"></i>
            </span>
            <span v-else>
              <i class="fa fa-heart-o" aria-hidden="true"></i>
            </span> -->
          </button>
          <!-- <button class="product-btn">
            <span class="in" v-if="product.inShop">
              <i class="fa fa-cart-plus" aria-hidden="true"></i>
            </span>
            <span class="minus" v-else>
              <span class="minus">-</span>
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </span>
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["product"],
  computed: {
    discount() {
      let discountVal =
        this.product.productPrice -
        (this.product.discount * this.product.productPrice) / 100;
      return discountVal;
    },
  },
};
</script>