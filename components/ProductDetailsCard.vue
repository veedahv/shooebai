<template>
  <div>
    <div class="product">
      <div class="flex flex-wrap justify-between py-2 w-full items-start">
        <div class="product-img w-full md:w-6/12">
          <img :src="product.productImage" alt="" />
          <div class="">
            <div class="flex justify-start items-center">
              <span class="">Available colors</span>
              <span
                class="colors h-6 w-6 m-1 inline-block"
                v-for="color in product.colors"
                :key="color"
              >
                <input
                  type="radio"
                  name="color"
                  :id="color"
                  :value="color"
                  class="color hidden"
                  checked
                  v-model="colorSet"
                />
                <label
                  :for="color"
                  class="
                    cursor
                    border-transparent
                    block
                    h-full
                    w-full
                    rounded-full
                    p-1
                  "
                  :class="`text-${color}-500`"
                >
                  <!-- class="cursor border-2 border-transparent block h-full w-full rounded-full p-1" -->
                  <span
                    class="
                      block
                      w-full
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      text-black
                      from-gray-900
                      to-black
                    "
                    v-if="color === 'black'"
                  ></span>
                  <span
                    class="
                      block
                      w-full
                      h-full
                      text-white
                      rounded-full
                      bg-gradient-to-r
                      from-white
                      to-gray-50
                    "
                    v-else-if="color === 'white'"
                  ></span>
                  <span
                    class="block w-full h-full bg-gradient-to-r rounded-full"
                    :class="`text-${color}-500 from-${color}-200 to-${color}-700`"
                    v-else
                  ></span>
                </label>
              </span>
            </div>
          </div>
          <div class="">
            <div class="flex justify-start items-center gap-1">
              <span class="">Available sizes</span>
              <!-- <select name="" id=""> -->
              <select name="" id="" v-model="sizeSet">
                <option
                  class="sizes inline-block"
                  v-for="size in product.sizes"
                  :key="size"
                  :value="size"
                >
                  <!-- v-for="(size, index) in product.sizes" -->
                  <!-- :selected="index === 1" -->
                  {{ size }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="product-info w-full md:w-5/12">
          <div class="product-details">
            <p class="product-name font-medium text-3xl">
              {{ product.productName }}
            </p>
            <div class="rating flex gap-1 items-center">
              <div class="rating flex gap-1 items-center">
                <span
                  class="colors inline-block"
                  v-for="n in product.rating"
                  :key="n"
                >
                  <i class="fas fa-star text-xs text-yellow-500"></i>
                </span>
              </div>
              <div
                class="rating flex gap-1 items-center"
                v-if="product.rating < 5"
              >
                <span
                  class="colors inline-block"
                  :key="n"
                  v-for="n in 5 - product.rating"
                >
                  <!-- v-for="n in (5 - 3)" -->
                  <!-- {{ 5 - product.rating }} -->
                  <i class="fas fa-star text-xs text-gray-400"></i>
                </span>
              </div>
            </div>
            <p
              class="
                product-descripion
                font-medium
                text-base
                color-tertiary
                my-3.5
              "
            >
              {{ product.descripion }}
            </p>
            <div class="my-1.5" v-if="product.discount == 0">
              <p class="product-price text-xl font-semibold">
                <!-- <span>{{ currencySymbol }}</span> -->
                <span v-html="currencySymbol"></span>
                {{ productPrice }}
              </p>
            </div>
            <div class="my-1.5 flex gap-2 items-center" v-else>
              <!-- <p class="product-price font-semibold"><span>{{ getCurrencySymbol }}</span>{{ discount }}</p> -->
              <p class="product-price text-xl font-semibold">
                <span v-html="currencySymbol"></span>
                <!-- <span>{{ currencySymbol }}</span> -->
                {{ discount }}
              </p>
              <del class="text-gray-600">
                <p class="product-price text-xs text-gray-600 font-medium">
                  <!-- <span>{{ getCurrencySymbol }}</span> -->
                <span v-html="currencySymbol"></span>
                  <!-- <span>{{ currencySymbol }}</span> -->
                  {{ productPrice }}
                </p>
              </del>
            </div>
          </div>
          <p class="qty text-xs font-semibold my-4">
            Only {{ product.availableQuantity }} left in stock
          </p>
          <div class="product-btn-box flex items-stretch">
            <div class="product-btn-box">
              <button
                class="
                  product-btn
                  h-full
                  w-52
                  text-white
                  uppercase
                  px-2.5
                  py-2.5
                "
                :class="
                  inShop
                    ? 'bg-tertiary color-primary'
                    : 'bg-primary color-tertiary'
                "
                @click="updateCart()"
              >
                <span
                  class="in flex justify-center items-center gap-2"
                  v-if="inShop"
                >
                  <span class="text-base font-bold"> remove from cart </span>
                  <i class="fas fa-shopping-bag"></i>
                </span>
                <span
                  class="minus flex justify-center items-center gap-2"
                  v-else
                >
                  <span class="text-base font-bold"> add to cart </span>
                  <i class="fas fa-shopping-bag"></i>
                  <!-- <i class="fa fa-shopping-cart" aria-hidden="true"></i> -->
                </span>
              </button>
            </div>
            <div class="product-btn-box">
              <button
                class="
                  product-btn
                  h-full
                  px-3.5
                  active:scale-90
                  hover:scale-110
                "
                @click="updateWishProducts(id)"
              >
                <!-- :class="
                  inFav ? 'bg-dark color-secondary' : 'bg-secondary color-dark'
                " -->
                <!-- @click="toggleWishlist" -->
                <span v-if="inFav">
                  <!-- <span> remove from wishlist </span> -->
                  <span>
                    <i class="fas fa-bookmark text-3xl"></i>
                    <!-- <i class="fas text-3xl fa-bookmark"></i> -->
                  </span>
                </span>
                <!-- </button>
              <button class="product-btn uppercase"> -->
                <span v-else>
                  <!-- <span> add to wishlist </span> -->
                  <span>
                    <i class="far fa-bookmark text-3xl"></i>
                  </span>
                </span>
              </button>
            </div>
          </div>
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
      products: [],
      product: "",
      cartList: [],
      favList: [],
      inShop: false,
      inFav: false,
      isUser: false,
      colorSet: "",
      sizeSet: "",
    };
  },
  props: ["id"],
  computed: {
    ...mapGetters(["getCurrencyRate", "getCurrencySymbol"]),
    ...mapState([
      "currencyRate",
      "currencySymbol",
      "cartItems",
      "wishItems",
      "wishItemsArray",
      "user",
    ]),
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
  watch: {
    wishItems: {
      handler: function (newValue) {
        if (newValue.includes(this.product.productId)) {
          this.inFav = true;
        } else {
          this.inFav = false;
        }
      },
    },
    cartItems: {
      handler: function (newValue) {
        newValue.forEach((cartItem) => {
          if (cartItem.id == this.id) {
            this.inShop = true;
          } else {
            this.inShop = false;
          }
        });
      },
    },
  },
  // async created() {
  created() {},
  methods: {
    ...mapActions([
      "getWishProducts",
      "updateUser",
      "updateCartProducts",
      "updateWishProducts",
    ]),
    updateCart() {
      const newItem = {
        id: this.id,
        colorSet: this.colorSet,
        sizeSet: this.sizeSet,
        qty: 1,
      };
      console.log(newItem);
      this.updateCartProducts(newItem);
    },
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
      this.products.forEach((prod) => {
        if (prod.productId === this.id) {
          this.product = prod;
          this.sizeSet = this.product.sizes[0];
          this.colorSet = this.product.colors[0];
        }
      });
    },
  },
  created() {
    this.getWishProducts();
    if (this.wishItems.includes(this.product.productId)) {
      this.inFav = true;
      // console.log(this.inFav);
    } else {
      this.inFav = false;
    }
    this.readFromFirestore();
  },
};
</script>

<style scoped>
.color:checked ~ label {
  /* border: 2px solid var(--dark); */
  /* border: 2px solid currentColor; */
  /* box-shadow: 0px 0px 2px rgba(242, 227, 213, 0.8); */
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
}
</style>