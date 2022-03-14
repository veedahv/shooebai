<template>
  <div>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="flex flex-wrap md:flex-nowrap gap-5">
          <div class="w-full md:w-3/5 flex-none md:flex-auto">
            <div class="">
              <h2 class="font-bold text-xl md:text-2xl mb-4">Order Summary</h2>
            </div>
            <div class="w-full">
              <div class="table-scroll">
                <div class="w-full">
                  <div class="w-full">
                    <table class="w-full">
                      <colgroup>
                        <col span="1" class="w-36" />
                        <col span="1" class="w-auto" />
                        <!-- <col span="1" class="w-1/6" /> -->
                        <col span="1" class="w-1/6" />
                        <!-- <col span="1" class="w-12" /> -->
                      </colgroup>
                      <thead>
                        <tr class="text-left">
                          <th
                            class="
                              font-semibold
                              text-base
                              lg:text-lg
                              align-middle
                              border-b border-gray-600
                              py-3.5
                            "
                          >
                            Product
                          </th>
                          <th
                            class="
                              font-semibold
                              text-base
                              lg:text-lg
                              align-middle
                              border-b border-gray-600
                              py-3.5
                            "
                          >
                            Description
                          </th>
                          <!-- <th
                            class="font-semibold text-lbaselg:text-xlgalign-middle border-b border-gray-600 py-3.5"
                          >
                            Quantity
                          </th> -->
                          <th
                            class="
                              font-semibold
                              text-base
                              lg:text-lg
                              align-middle
                              border-b border-gray-600
                              py-3.5
                            "
                          >
                            Price
                          </th>
                          <!-- <th
                            class="font-semibold text-lg lg:text-xl align-middle border-b border-gray-600 py-3.5"
                          >
                            &nbsp;
                          </th> -->
                        </tr>
                      </thead>
                      <tbody class="">
                        <div
                          class="contents"
                          v-for="(cartItem, i) in cartItems"
                          :key="cartItem.id"
                        >
                          <OrderDetailsTRow
                            :cartItem="cartItem"
                            :product="cartProducts[i]"
                          ></OrderDetailsTRow>
                          <!-- <CartDetailsCard></CartDetailsCard> -->
                        </div>
                      </tbody>
                    </table>
                  </div>
                  <div class="payment-container w-full">
                    <div class="flex gap-5 w-full my-3.5">
                      <div
                        class="
                          flex flex-1
                          items-center
                          justify-between
                          bg-white
                          px-3
                          py-2.5
                        "
                      >
                        <small class="text-sm font-medium">Discount</small>
                        <div class="value text-md font-semibold">
                          <span>{{ currencySymbol }}</span>
                          0
                          <!-- {{ currencySymbol }} {{ totalPrice }} -->
                        </div>
                      </div>
                      <div
                        class="
                          flex flex-1
                          items-center
                          justify-between
                          bg-white
                          px-3
                          py-2.5
                        "
                      >
                        <small class="text-sm font-medium">Subtotal</small>
                        <div class="value text-md font-semibold">
                          <span>{{ currencySymbol }}</span>
                          {{ totalPrice }}
                        </div>
                      </div>
                      <div
                        class="
                          flex flex-1
                          items-center
                          justify-between
                          bg-white
                          px-3
                          py-2.5
                        "
                      >
                        <small class="text-sm font-medium">Total</small>
                        <div class="value text-md font-semibold">
                          <span>{{ currencySymbol }}</span>
                          {{ totalPrice }}
                        </div>
                      </div>
                      <!-- <div
                        class="flex flex-1 items-center justify-between bg-white"
                      >
                        <button
                          class="w-full px-3 py-2.5 bg-tertiary color-light"
                        >
                          Checkout
                        </button>
                      </div> -->
                    </div>
                    <!-- <p class="">
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
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-2/5 flex-none md:flex-auto">
            <div class="">
              <h2 class="font-bold text-xl md:text-2xl mb-4">
                Payment Information
              </h2>
            </div>
            <div class="w-full">
              <p class="font-medium">Your Saved Cards</p>
              <div class="py-2">
                <p class="text-gray-400">You do not have any saved cards</p>
              </div>
              <form
                @submit.prevent="checkout"
                class="color-dark bg-white w-full px-4 py-3"
              >
                <div class="form-group my-4">
                  <div class="form-group my-4">
                    <label for="fullname" class="capitalize text-sm font-medium"
                      >Name on Card</label
                    >
                    <input
                      type="text"
                      id="fullname"
                      class="
                        border border-current
                        text-sm
                        px-3.5
                        py-2
                        block
                        w-full
                      "
                      placeholder="John Doe"
                      v-model="cardName"
                    />
                  </div>
                  <div class="flex gap-5 my-4">
                    <div class="form-group w-full flex-auto">
                      <label
                        for="card-no"
                        class="capitalize text-sm font-medium"
                        >Card No</label
                      >
                      <!-- type="number" -->
                      <!-- {{ cardNo }} -->
                      <input
                        id="card-no"
                        class="
                          border border-current
                          text-sm
                          px-3.5
                          py-2
                          block
                          w-full
                        "
                        placeholder="0000 0000 0000 0000"
                        v-model.number="cardNo"
                        v-cleave="{
                          creditCard: true,
                          onCreditCardTypeChanged: cardChanged,
                        }"
                      />
                          <!-- type: 'Visa' -->
                          <!-- blocks: [4, 4, 4, 4],
                          delimiters: [' '], -->
                          <!-- numeral: true, -->
                          <!-- numeralPositiveOnly: true, -->
                          <!-- numeralIntegerScale: 3, -->
                          <!-- creditCardStrictMode: true -->
                    </div>
                    <div class="form-group flex-auto">
                      <label for="cvv" class="uppercase text-sm font-medium"
                        >cvv</label
                      >
                      <!-- type="number" -->
                      <input
                        id="cvv"
                        class="
                          border border-current
                          text-sm
                          px-3.5
                          py-2
                          block
                          w-16
                        "
                        placeholder="000"
                        v-model.number="cvv"
                        v-cleave="{
                          numeral: true,
                          numeralPositiveOnly: true,
                          numeralIntegerScale: 3,
                        }"
                      />
                    </div>
                  </div>
                  <!-- {{ cardType }} -->
                  <div class="flex gap-5 my-4">
                    <div class="form-group w-full flex-auto">
                      <label
                        for="card-type"
                        class="capitalize text-sm font-medium"
                        >Card type</label
                      >
                      <!-- {{ cardType }} -->
                      <select
                        id="card-type"
                        class="
                          border border-current
                          text-sm
                          px-3.5
                          py-2
                          block
                          w-full
                        "
                        v-model="cardType"
                      >
                        <option value="visa">Visa</option>
                        <option value="mastercard">MasterCard</option>
                      </select>
                    </div>
                    <div class="form-group flex-auto">
                      <label
                        for="expiry-date"
                        class="capitalize text-sm font-medium"
                        >expiry date</label
                      >
                      <input
                        type="text"
                        id="expiry-date"
                        class="
                          border border-current
                          text-sm
                          px-3.5
                          py-2
                          block
                          w-20
                        "
                        placeholder="mm/yy"
                        v-model="expiryDate"
                        v-cleave="{ date: true, datePattern: ['m', 'y'] }"
                      />
                    </div>
                  </div>
                  <!-- <input v-model="ccNumber" class="input-element" v-cleave="{creditCard: true}">                       -->
                  <!-- <input name="text"  v-model="ccMonth" class="border border-current text-sm px-3.5 py-2 block w-20" v-cleave="{date: true,datePattern: ['m', 'y']}">              -->
                  <!-- <input type="number" v-model="ccv" class="border border-current text-sm px-3.5 py-2 block w-20" v-cleave="{numeral: true,numeralPositiveOnly: true,numeralIntegerScale: 3}">            -->
                  <div class="flex gap-5 my-4">
                    <div class="form-group flex-auto w-full">
                      <!-- rounded-md -->
                      <button
                        type="button"
                        class="
                          color-dark
                          bg-primary
                          w-full
                          capitalize
                          font-medium
                          px-4
                          py-2
                        "
                        @click="cancelCheckout()"
                      >
                        Cancel
                      </button>
                    </div>
                    <div class="form-group flex-auto w-full">
                      <!-- rounded-md -->
                      <button
                        type="submit"
                        class="
                          color-dark
                          bg-primary
                          w-full
                          capitalize
                          font-medium
                          px-4
                          py-2
                        "
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import OrderDetailsTRow from "./OrderDetailsTRow";
import { mapGetters, mapState, mapActions } from "vuex";
import Cleave from "cleave.js";
export default {
  components: { OrderDetailsTRow },
  //   components: {
  //     Pagination,
  //   },
  data() {
    return {
      products: [],
      totalPrice: 0,
      cartList: [],
      currentPage: 0,
      perPage: 15,
      pos: { left: 0, x: 0 },
      cardName: "",
      cardNo: "",
      cardType: "",
      expiryDate: "",
      cvv: "",
      ccNumber: "",
      ccMonth: "",
      ccv: "",
    };
  },
  directives: {
    cleave: {
      inserted: (el, binding) => {
        el.cleave = new Cleave(el, binding.value || {});
      },
      update: (el) => {
        const event = new Event("input", { bubbles: true });
        setTimeout(function () {
          el.value = el.cleave.properties.result;
          el.dispatchEvent(event);
        }, 100);
      },
    },
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
  },
  watch: {
    cartProducts: {
      handler: function (newValue) {
        this.totalPrice = 0;
        newValue.forEach((product) => {
          let initialPrice =
            Math.ceil((product.productPrice / this.currencyRate) * 100) / 100;
          let discountVal =
            initialPrice - (product.discount * initialPrice) / 100;
          let productPrice = Math.ceil(discountVal * product.qty * 100) / 100;
          console.log(productPrice);
          this.totalPrice += productPrice;
          this.totalPrice = Math.ceil(this.totalPrice * 100) / 100;
        });
      },
    },
  },
  methods: {
    cardChanged(type) {
      this.cardType = type;
    },
    ...mapActions(["getCartProducts"]),
    checkout() {
      console.log("checkout");
    },
    cancelCheckout() {
      this.$emit("cancelCheckout");
    },
  },
  created() {
    this.getCartProducts();
  },
};
</script>

<style>
</style>
