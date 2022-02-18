<template>
  <div>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <!-- {{ cartProducts }} -->
        <div class="" v-if="cartProducts.length >= 1">
          <div class="">
            <h2 class="font-bold text-xl md:text-2xl mb-4">
              Your Shopping Bag
            </h2>
          </div>
          <div class=""></div>
          <div class="w-full">
            <div
              class="overflow-x-scroll table-scroll"
              ref="setCarousel"
              @mousedown="setCarousel()"
            >
              <div class="w-table lg:w-full">
                <div class="w-full">
                  <table class="w-full">
                    <colgroup>
                      <col span="1" class="w-48" />
                      <col span="1" class="w-auto" />
                      <col span="1" class="w-1/6" />
                      <col span="1" class="w-1/6" />
                      <col span="1" class="w-1/6" />
                      <col span="1" class="w-12" />
                    </colgroup>
                    <thead>
                      <tr class="text-left">
                        <th
                          class="font-semibold text-base lg:text-lg align-middle border-b border-gray-600 py-3.5"
                        >
                          Product
                        </th>
                        <th
                          class="font-semibold text-base lg:text-lg align-middle border-b border-gray-600 py-3.5"
                        >
                          Description
                        </th>
                        <th
                          class="font-semibold text-base lg:text-lg align-middle border-b border-gray-600 py-3.5"
                        >
                          Price
                        </th>
                        <th
                          class="font-semibold text-lbaselg:text-xlgalign-middle border-b border-gray-600 py-3.5"
                        >
                          Quantity
                        </th>
                        <th
                          class="font-semibold text-base lg:text-lg align-middle border-b border-gray-600 py-3.5"
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
                    <tbody class="">
                      <div
                        class="contents"
                        v-for="(cartItem, i) in cartItems"
                        :key="cartItem.id"
                      >
                        <CartDetailsCard
                          :cartItem="cartItem"
                          :product="cartProducts[i]"
                        ></CartDetailsCard>
                      </div>
                    </tbody>
                  </table>
                </div>
                <div class="payment-container w-full">
                  <div class="flex gap-5 w-full my-3.5">
                    <div
                      class="flex flex-1 items-center justify-between bg-white px-3 py-2.5"
                    >
                      <small class="text-sm font-medium">Discount</small>
                      <div class="value text-md font-semibold">
                        {{ currencySymbol }} 0
                        <!-- {{ currencySymbol }} {{ totalPrice }} -->
                      </div>
                    </div>
                    <div
                      class="flex flex-1 items-center justify-between bg-white px-3 py-2.5"
                    >
                      <small class="text-sm font-medium">Subtotal</small>
                      <div class="value text-md font-semibold">
                        {{ currencySymbol }} {{ totalPrice }}
                      </div>
                    </div>
                    <div
                      class="flex flex-1 items-center justify-between bg-white px-3 py-2.5"
                    >
                      <small class="text-sm font-medium">Total</small>
                      <div class="value text-md font-semibold">
                        {{ currencySymbol }} {{ totalPrice }}
                      </div>
                    </div>
                    <div
                      class="flex flex-1 items-center justify-between bg-white"
                    >
                      <button
                        class="w-full px-3 py-2.5 bg-tertiary color-light"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                  <p class="">
                    If you have any promotion code, please enter here
                  </p>
                  <div class="flex items-stretch gap-5 w-full my-3.5">
                    <div class="flex no-wrap flex-auto w-2/3 items-stretch">
                      <input
                        type="text"
                        class="px-3 w-full"
                        placeholder="Enter discount code"
                      />
                      <button
                        class="w-48 py-2.5 font-medium bg-tertiary color-light"
                      >
                        Apply
                      </button>
                    </div>
                    <div class="flex-auto w-1/3">
                      <button
                        class="w-full py-2.5 font-medium bg-primary text-white"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    <div class="" v-if="cartProducts.length >= 1">
    <Checkout></Checkout>
    </div>
  </div>
</template>

<script>
import Checkout from "../components/checkout";
import CartDetailsCard from "../components/CartDetailsCard";
import { mapGetters, mapState, mapActions } from "vuex";
import Pagination from "../components/Pagination";
export default {
  components: {
    Checkout,
    CartDetailsCard,
    Pagination,
  },
  data() {
    return {
      products: [],
      totalPrice: 0,
      cartList: [],
      currentPage: 0,
      perPage: 15,
      pos: { left: 0, x: 0 },
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
      "loading",
    ]),
  },
  watch: {
    cartProducts: {
      handler: function (newValue) {
        // console.log(newValue);
        this.totalPrice = 0;
        newValue.forEach((product) => {
          let initialPrice =
            Math.ceil((product.productPrice / this.currencyRate) * 100) / 100;
          let discountVal =
            initialPrice - (product.discount * initialPrice) / 100;
          let productPrice = Math.ceil(discountVal * product.qty * 100) / 100;
          this.totalPrice += productPrice;
        });
      },
    },
    loading: {
      handler: function (newValue) {
        console.log(newValue);
        // newValue ? this.$nuxt.$loading.start() : this.$nuxt.$loading.finish();
        // this.$nextTick(() => {
      },
    },
  },
  methods: {
    ...mapActions(["getCartProducts"]),
    setCarousel() {
      let el = this.$refs.setCarousel;
      if (el) {
        const mouseMoveHandler = (e) => {
          const dx = e.clientX - this.pos.x;
          el.scrollLeft = this.pos.left - dx;
        };
        const mouseUpHandler = () => {
          document.removeEventListener("mousemove", mouseMoveHandler);
          document.removeEventListener("mouseup", mouseUpHandler);
          el.style.cursor = "grab";
          el.style.removeProperty("user-select");
        };
        const mouseDownHandler = (e) => {
          el.style.cursor = "grabbing";
          el.style.userSelect = "none";
          this.pos = {
            left: el.scrollLeft,
            x: e.clientX,
          };
          document.addEventListener("mousemove", mouseMoveHandler);
          document.addEventListener("mouseup", mouseUpHandler);
        };
        el.addEventListener("mousedown", mouseDownHandler);
      }
    },
  },
  created() {
    this.getCartProducts();
        // this.loading ? this.$nuxt.$loading.start() : this.$nuxt.$loading.finish();
        console.log(this.loading);
  },
};
</script>

<style>
/* table {
  border-spacing: 25px 15px;
} */
.table-scroll::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
.w-table {
  min-width: 767px;
}
</style>
