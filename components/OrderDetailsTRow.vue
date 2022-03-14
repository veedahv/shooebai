<template>
  <tr>
    <td class="font- align-middle py-3.5 pr-5 border-b border-gray-600">
      <div class="">
        <div class="product-img shadow">
          <img :src="product.productImage" class="" alt="" />
        </div>
      </div>
    </td>
    <td class="font- align-middle py-3.5 pr-5 border-b border-gray-600">
      <div class="">
        <div class="product-info">
          <div class="product-details">
            <p class="product-name text-sm sm:text-base font-medium">
              {{ qty }} {{ colorSet }} {{ product.productName }} (size{{
                sizeSet
              }})
            </p>
          </div>
        </div>
      </div>
    </td>
    <td class="font- align-middle py-3.5 border-b border-gray-600">
      <div class="" v-if="product.discount == 0">
        <p class="product-price font-medium flex items-center">
          <span>{{ currencySymbol }}</span>
          <span>{{ productPrice * qty }}</span>          
        </p>
      </div>
      <div class="" v-else>
        <del>
          <p class="product-price font-light flex items-center">
          <span>{{ currencySymbol }}</span>
          <span>{{ productPrice * qty }}</span>         
          </p>
        </del>
        <p class="product-price font-medium flex items-center">
          <span>{{ currencySymbol }}</span>
          <span>{{ discount }}</span>          
        </p>
      </div>
    </td>
  </tr>
</template>


<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      products: [],
      cartList: [],
      colorSet: "",
      sizeSet: "",
      qty: 1,
    };
  },
  props: ["cartItem", "product"],
  computed: {
    ...mapGetters(["getCurrencyRate", "getCurrencySymbol"]),
    ...mapState(["currencyRate", "currencySymbol", "user"]),
    productPrice() {
      return (
        Math.ceil((this.product.productPrice / this.currencyRate) * 100) / 100
      );
    },
    discount() {
      let discountVal =
        this.productPrice - (this.product.discount * this.productPrice) / 100;
      return Math.ceil(discountVal * 100) / 100;
    },
  },
  methods: {
    ...mapActions([
      "getWishProducts",
      "updateUser",
      "updateCartProducts",
      "updateWishProducts",
    ]),
  },
  created() {
    this.sizeSet = this.cartItem.sizeSet;
    this.colorSet = this.cartItem.colorSet;
    this.qty = this.cartItem.qty;
  },
};
</script>

<style scoped>
.color:checked ~ label {
  border: 2px solid currentColor;
}
</style>