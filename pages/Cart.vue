<template>
  <div>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="" v-if="cartProducts.length >= 1">
          <div class="">
            <!-- <div class="sub-heading-box text-center py-5 relative">
              <hr
                class="border-0 bg-white w-full h-px inset-y-1/2 left-0 absolute"
              />
              <h2 class="sub-heading bg-white mx-auto py-2 px-1 w-min relative">
                Trending
              </h2>
            </div> -->
            <!-- <pagination :postsArr="postsArr" :currentPage="currentPage" :perPage="perPage" v-on:page:update="updatePage"></pagination> -->
            <!-- <pagination></pagination> -->
            <!-- <Pagination
              :products="products"
              :currentPage="currentPage"
              :perPage="perPage"
              v-on:page:update="updatePage"
            ></Pagination> -->
          </div>
          <div class="">
            <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                class="h-full"
                v-for="product in visibleProductArr"
                :key="product.productId"
              >
                <CartDetailsCard :id="product.productId"></CartDetailsCard>
              </div>
            </div> -->
            <div class="">
              <!-- <table class="divide-y divide-gray-400 w-full"> -->
              <table class="w-full">
                <colgroup>
                  <col span="1" style="width: auto" />
                  <col span="2" style="width: 130px" />
                  <col span="1" style="width: 20px" />
                </colgroup>
                <thead>
                  <tr class="text-left">
                    <!-- <tr class="border-b-2 border-gray-600 text-left"> -->
                    <!-- <th class="font-medium w-7/12 align-middle">Description</th>
                  <th class="font-medium w-2/12 align-middle">Quantity</th>
                  <th class="font-medium w-2/12 align-middle">Price</th>
                  <th class="font-medium w-1/12 align-middle">&nbsp;</th> -->
                    <th
                      class="font-semibold text-lg lg:text-xl align-middle border-b border-gray-600 py-3.5"
                    >
                      Description
                    </th>
                    <th
                      class="font-semibold text-lg lg:text-xl align-middle border-b border-gray-600 py-3.5"
                    >
                      Quantity
                    </th>
                    <th
                      class="font-semibold text-lg lg:text-xl align-middle border-b border-gray-600 py-3.5"
                    >
                      Price
                    </th>
                    <th
                      class="font-semibold text-lg lg:text-xl align-middle border-b border-gray-600 py-3.5"
                    >
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <!-- <tbody class="divide-y divide-gray-400"> -->
                <!-- v-for="product in visibleProductArr" -->
                <tbody class="">
                  <div
                    class="contents"
                    v-for="product in cartProducts"
                    :key="product.productId"
                  >
                    <CartDetailsCard :id="product.productId"></CartDetailsCard>
                  </div>
                </tbody>
                <div class="payment-container w-full">
                  <div class="flex gap-5 w-full">
                    <div
                      class="flex flex-1 items-center justify-between border px-3 py-4"
                    >
                      <small class="text-sm font-medium">Discount</small>
                      <div class="value text-md font-semibold">
                        {{ currencySymbol }} {{ totalPrice }}
                      </div>
                    </div>
                    <div
                      class="flex flex-1 items-center justify-between border px-3 py-4"
                    >
                      <small class="text-sm font-medium">Subtotal</small>
                      <div class="value text-md font-semibold">
                        {{ currencySymbol }} {{ totalPrice }}
                      </div>
                    </div>
                    <div
                      class="flex flex-1 items-center justify-between border px-3 py-4"
                    >
                      <small class="text-sm font-medium">Total</small>
                      <div class="value text-md font-semibold">
                        {{ currencySymbol }} {{ totalPrice }}
                      </div>
                    </div>
                    <div
                      class="flex flex-1 items-center justify-between border px-3 py-4"
                    >
                      <button class="w-full">Checkout</button>
                    </div>
                  </div>
                  <p class="">
                    If you have any promotion code, please enter here
                  </p>
                  <div class="flex gap-5 w-full">
                    <div
                      class="flex no-wrap flex-auto w-2/3 items-center justify-between border"
                    >
                      <input type="text" class="w-full" name="" id="" />
                      <button class="w-48">Apply Discount</button>
                    </div>
                    <div
                      class="flex-auto w-1/3 items-center justify-between border"
                    >
                      <button class="w-full">Continue Shopping</button>
                    </div>
                  </div>
                </div>
              </table>
            </div>
          </div>
          <!-- <Pagination
            :products="products"
            :currentPage="currentPage"
            :perPage="perPage"
            v-on:page:update="updatePage"
          ></Pagination> -->
        </div>
        <div class="no-trans text-center h-96" v-else>
          <div
            class="py-2 flex items-center justify-center flex-col gap-4 h-full w-full"
          >
            <i class="fas fa-shopping-bag text-7xl"></i>
            <p class="text-3xl capitalize font-semibold">Your cart is empty</p>

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
import CartDetailsCard from "../components/CartDetailsCard";
import { mapGetters, mapState, mapActions } from "vuex";
// import ProductDetailsCard from "../components/ProductDetailsCard";
import Pagination from "../components/Pagination";
// import ProductCard from "../components/ProductCard";
export default {
  components: {
    CartDetailsCard,
    // ProductDetailsCard,
    Pagination,
    // ProductCard,
  },
  data() {
    return {
      country: null,
      products: [],
      totalPrice: 0,
      // cartProducts: [],
      cartList: [],
      visibleProductArr: [],
      currentPage: 0,
      perPage: 15,
      currencyValue: null,
      // user: null,
    };
  },
  computed: {
    ...mapGetters(["getCurrencyRate", "getCurrencySymbol"]),
    ...mapState([
      "currencyRate",
      "currencySymbol",
      "cartItems",
      "cartProducts",
      "user",
    ]),
    // productPrice() {
    //   return (
    //     Math.ceil((this.product.productPrice / this.currencyRate) * 100) / 100
    //   );
    // },
    // discount() {
    //   let discountVal =
    //     this.productPrice - (this.product.discount * this.productPrice) / 100;
    //   return Math.ceil(discountVal * 100) / 100;
    //   // return discountVal;
    // },
  },
  watch: {
    cartProducts: {
      handler: function (newValue) {
        this.totalPrice = 0;
        // console.log(newValue);
        newValue.forEach((product) => {
          console.log(product.productPrice);
          let initialPrice =
            Math.ceil((product.productPrice / this.currencyRate) * 100) / 100;
          let discountVal =
            initialPrice - (product.discount * initialPrice) / 100;
          let productPrice = Math.ceil(discountVal * 100) / 100;
          console.log(initialPrice);
          console.log(discountVal);
          console.log(productPrice);
          this.totalPrice += productPrice;
          console.log(this.totalPrice);
        });
      },
    },
  },
  methods: {
    ...mapActions(["getCartProducts"]),
    // getTotalPrice() {
    //   this.totalPrice = 0;
    //   this.cartProducts.forEach((product) => {
    //     let initialPrice =
    //       Math.ceil((product.productPrice / this.currencyRate) * 100) / 100;
    //     let discountVal =
    //       initialPrice - (product.discount * initialPrice) / 100;
    //     let productPrice = Math.ceil(discountVal * 100) / 100;
    //     this.totalPrice += productPrice;
    //   });
    // return total;
    // },
  },
  created() {
    this.getCartProducts();
  },
};
</script>

<style>
/* table {
  border-spacing: 25px 15px;
} */
</style>
