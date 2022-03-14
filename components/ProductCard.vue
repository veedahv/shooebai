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
      <div
        class="product-info flex justify-between py-5 px-4 w-full items-start"
      >
        <div class="product-details">
          <nuxt-link :to="'/ProductDetail/' + product.productId">
            <p class="product-name text-lg font-bold">{{ product.productName }}</p>
          </nuxt-link>
          <div class="" v-if="product.discount == 0">
            <p class="product-price font-medium flex items-center">
            <span>{{ getCurrencySymbol }}</span>
                <span>{{ productPrice }}</span>
              </p>
            </div>
          <div class="" v-else>
            <del>
              <p class="product-price font-medium flex items-center">
                <span>{{ getCurrencySymbol }}</span>
                <span>{{ productPrice }}</span>
              </p>
            </del>
            <p class="product-price font-medium flex items-center">
                <span>{{ getCurrencySymbol }}</span>
                <span>{{ discount }}</span>
              </p>
          </div>
         </div>
        <div class="product-btn-box">
          <button
            class="product-btn transform active:scale-90 hover:scale-110"
            @click="updateWishProducts(product.productId)"
          >
            <i class="fas text-3xl fa-bookmark" v-if="inFav"></i>
            <i class="far text-3xl fa-bookmark" v-else></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import { mapState } from "vuex";
// import { mapGetters } from "vuex";
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
  watch: {
    wishItems: {
      handler: function (newValue) {
        // console.log(newValue);
        if (newValue.includes(this.product.productId)) {
      this.inFav = true;
      console.log(this.inFav);
    } else {
      this.inFav = false;
      // console.log(this.inFav);
    }
        // newValue.forEach((product) => {
        //   console.log(product.productPrice);
        //   let initialPrice =
        //     Math.ceil((product.productPrice / this.currencyRate) * 100) / 100;
        //   let discountVal =
        //     initialPrice - (product.discount * initialPrice) / 100;
        //   let productPrice = Math.ceil(discountVal * 100) / 100;
        //   this.totalPrice += productPrice;
        // });
      },
    },
  },
  // async created() {
  created() {
    this.getWishProducts();
    if (this.wishItems.includes(this.product.productId)) {
      this.inFav = true;
      // console.log(this.inFav);
    } else {
      this.inFav = false;
      // console.log(this.inFav);
    }
  },
  methods: {
    ...mapActions(["getWishProducts", "updateUser", "updateWishProducts"]),
  //   toggleWishlist() {
  //     this.updateWishProducts(this.product.productId);
  //   },
  //   saveUser() {
  //     const editUser = {
  //       userId: this.user.userId,
  //       displayName: this.user.displayName,
  //       email: this.user.email,
  //       country: this.user.country,
  //       cart: this.user.cart,
  //       fav: this.favList,
  //     };
  //     // console.log(editUser);
  //   this.updateUser(editUser);
  // },
  },
};
</script>