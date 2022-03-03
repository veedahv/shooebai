<template>
  <tr>
    <td class="font- align-middle py-3.5 pr-5 border-b border-gray-600">
      <!-- Description -->
      <div class="">
        <div class="product-img shadow">
          <img :src="product.productImage" class="" alt="" />
        </div>
      </div>
    </td>
    <td class="font- align-middle py-3.5 pr-5 border-b border-gray-600">
      <!-- Description -->
      <div class="">
        <div class="product-info">
          <div class="product-details">
            <!-- <p class="product-name text-sm sm:text-base font-medium">
                  {{ product.productName }}
                </p> -->
            <p class="product-name text-sm sm:text-base font-medium">
              {{ qty }} {{ colorSet }} {{ product.productName }} (size{{
                sizeSet
              }})
            </p>
          </div>
          <!-- <div class="flex justify-start items-center gap-3 md:gap-5 my-2">
                <div class="">
                  <div class="flex justify-start items-center gap-1">
                    <span class="text-sm sm:text-base font-medium">Color</span>
                    <select
                      name=""
                      id=""
                      v-model="colorSet"
                      class="text-sm sm:text-base font-medium capitalize"
                    >
                      <option
                        class="colors h-7 w-7 m-1 inline-block text-sm sm:text-base capitalize"
                        v-for="color in product.colors"
                        :key="color"
                        :value="color"
                      >
                        {{ color }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="">
                  <div class="flex justify-start items-center gap-1">
                    <span class="text-sm sm:text-base font-medium">Size</span>
                    <select
                      name=""
                      id=""
                      v-model="sizeSet"
                      class="text-sm sm:text-base font-medium"
                    >
                      <option
                        class="sizes h-7 w-7 m-1 inline-block text-sm sm:text-base"
                        v-for="size in product.sizes"
                        :key="size"
                        :value="size"
                      >
                        {{ size }}
                      </option>
                    </select>
                  </div>
                </div>
            </div> -->
        </div>
      </div>
    </td>
    <!-- <td class="font- align-middle py-3.5 pr-5 border-b border-gray-600">
          <div class="">
            <div class="flex items-stretch">
              <button class="btn px-2.5 py-1 border-2 bg-white border-gray-600" :disabled="qty <= 1" @click="qty -= 1">
                <i class="fas fa-minus text-xs"></i>
              </button>
              <input type="text" class="w-8 text-center outline-none border-t-2 border-b-2 border-gray-600" v-model="qty" readonly>
              <button class="btn px-2.5 py-1 border-2 bg-white border-gray-600" :disabled="qty >= 10" @click="qty += 1">
                <i class="fas fa-plus text-xs"></i>
              </button>
            </div>
          </div>
        </td> -->
    <td class="font- align-middle py-3.5 border-b border-gray-600">
      <div class="" v-if="product.discount == 0">
        <p class="product-price font-medium">
          <!-- <span>{{ currencySymbol }}</span> -->
          <span v-html="currencySymbol"></span>
          {{ productPrice }}
        </p>
        <!-- <p class="product-price font-medium">
              <span>{{ currencySymbol }}</span
              >{{ discount }}
            </p> -->
      </div>
      <div class="" v-else>
        <del>
          <p class="product-price font-medium">
          <span v-html="currencySymbol"></span>
            <!-- <span>{{ currencySymbol }}</span> -->
            {{ productPrice }}
          </p>
        </del>
        <p class="product-price font-medium">
          <span v-html="currencySymbol"></span>
          <!-- <span>{{ currencySymbol }}</span> -->
          {{ discount }}
        </p>
      </div>
    </td>
  </tr>
</template>


<script>
// import { mapState } from "vuex";
// import { mapGetters } from "vuex";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      products: [],
      // product: "",
      cartList: [],
      // favList: [],
      // inShop: false,
      // inFav: false,
      // isUser: false,
      colorSet: "",
      sizeSet: "",
      qty: 1,
      // user: {
      //   // userId: userId,
      //   // displayName: this.displayName,
      //   // email: this.email,
      //   // country: this.country,
      //   cart: [],
      //   fav: [],
      // },
    };
  },
  // props: ["id"],
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
      // return discountVal;
    },
    // colorSet() {
    //   return this.product.colors[0];
    // },
  },
  methods: {
    ...mapActions([
      "getWishProducts",
      "updateUser",
      "updateCartProducts",
      "updateWishProducts",
    ]),
    updateCart() {
      const newItem = {
        id: this.cartItem.id,
        colorSet: this.colorSet,
        sizeSet: this.sizeSet,
        qty: 1,
      };
      console.log(newItem);
      this.updateCartProducts(newItem);
    },
    toggleWishlist() {
      if (this.favList.includes(this.cartItem.id)) {
        let found = this.favList.indexOf(this.cartItem.id);
        this.favList.splice(found, 1);
        this.inFav = false;
      } else {
        this.inFav = true;
        this.favList.push(this.cartItem.id);
      }
      // console.log(this.favList);
      // console.log(this.isUser);
      if (this.isUser) {
        this.saveUser();
      } else {
        localStorage.setItem("favList", JSON.stringify(this.favList));
      }
    },
    removeFromCart() {
      this.cartList.forEach((cartItem) => {
        if (cartItem.id == this.id) {
          let found = this.user.cart.indexOf(cartItem);
          this.user.cart.splice(found, 1);
          this.inShop = false;
          console.log(this.inShop);
          console.log(this.cartList);
          // console.log(this.user.fav);
        } else {
          this.inShop = true;
        }
      });
      // this.saveUser();
      if (this.isUser) {
        this.saveUser();
      } else {
        localStorage.setItem("cartList", JSON.stringify(this.cartList));
      }
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
        // console.log(prod.productId);

        // if (prod.productId.toLowerCase() === this.id.toLowerCase()) {
        if (prod.productId === this.id) {
          console.log();
          this.product = prod;
          this.sizeSet = this.product.sizes[0];
          this.colorSet = this.product.colors[0];
          // console.log(prod.productId);
          // console.log(this.id);
          // console.log(this.product);
          // console.log(this.product.sizes[0]);
          // console.log(this.product.sizes);
          // console.log(this.product.colors);
        }
      });
    },
    async getUserFirestore(userId) {
      const ref = this.$fire.firestore.collection("users").doc(userId);
      // const ref = this.$fire.firestore.collection("users").doc(userId).user;
      // const ref = this.$fire.firestore.collection("products").doc("product");
      let snap;
      try {
        snap = await ref.get();
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      this.user = snap.data().user;
      // console.log(this.user);
      // console.log(this.user.fav);
      // console.log(this.user.cart);
      this.user.cart.forEach((cartItem) => {
        this.cartList.push(cartItem);
        // if (cartItem.id == this.id) {
        //   console.log(cartItem.id);
        //   this.inShop = true;
        //   // console.log(this.user.fav);
        // } else {
        //   // console.log(cartItem.id);
        //   this.inShop = false;
        // }
        // console.log(this.inShop);
      });
      // console.log(this.cartList);
      this.cartList.forEach((cartItem) => {
        // this.cartList.push(cartItem);
        // if (this.cartList.includes(this.id)) {
        // console.log(this.id);
        // console.log(cartItem.id);
        if (cartItem.id == this.id) {
          // console.log("in shop");
          this.inShop = true;
          // } else {
          //   // console.log(cartItem.id);
          //   console.log("not in shop");
          //   this.inShop = false;
        }
      });
      // console.log(this.inShop);
      // console.log(this.cartList);
      let list = this.user.fav;
      list.forEach((element) => {
        this.favList.push(element);
      });
      if (this.favList.includes(this.id)) {
        this.inFav = true;
        // console.log(this.inFav);
      } else {
        this.inFav = false;
        // console.log(this.inFav);
      }
    },
  },
  created() {
    this.sizeSet = this.cartItem.sizeSet;
    this.colorSet = this.cartItem.colorSet;
    this.qty = this.cartItem.qty;
    // this.readFromFirestore();
    //  if (localStorage.getItem("favList")) {
    //     let list = JSON.parse(localStorage.getItem("favList"));
    //     list.forEach((element) => {
    //       this.favList.push(element);
    //     });
    //     // } else {
    //     // this.$router.push({ path: "/" });
    //     // No user is signed in.
    //   }
    //   if (this.favList.includes(this.id)) {
    //     this.inFav = true;
    //     // console.log(this.inFav);
    //   } else {
    //     this.inFav = false;
    //     // console.log(this.inFav);
    //   }
    //   // console.log(this.cartList);
    //   this.cartList.forEach((cartItem) => {
    //     // this.cartList.push(cartItem);
    //     // if (this.cartList.includes(this.id)) {
    //     if (cartItem.id == this.id) {
    //       console.log(cartItem.id);
    //       this.inShop = true;
    //       // } else {
    //       //   // console.log(cartItem.id);
    //       //   this.inShop = false;
    //     }
    //   });
    //   // console.log(this.inShop);
  },
};
</script>

<style scoped>
.color:checked ~ label {
  /* border: 2px solid var(--dark); */
  border: 2px solid currentColor;
}
</style>