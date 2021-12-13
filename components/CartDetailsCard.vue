<template>
      <tr>
        <td class="font- align-middle py-5 border-b border-gray-600">
          <!-- Description -->
          <div class="flex justify-between items-center">
            <div class="product-img w-4/12">
              <img :src="product.productImage" alt="" />
            </div>
            <div class="product-info w-7/12">
              <div class="product-details">
                <p class="product-name text-sm sm:text-lg">
                  {{ product.productName }}
                </p>
              </div>
              <div class="flex justify-start items-center gap-3 md:gap-5 my-2">
                <div class="">
                  <div class="flex justify-start items-center gap-1">
                    <span class="text-sm sm:text-lg">Color</span>
                    <select
                      name=""
                      id=""
                      v-model="colorSet"
                      class="text-sm sm:text-lg"
                    >
                      <option
                        class="colors h-7 w-7 m-1 inline-block text-sm sm:text-lg"
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
                    <span class="text-sm sm:text-lg">Size</span>
                    <select
                      name=""
                      id=""
                      v-model="sizeSet"
                      class="text-sm sm:text-lg"
                    >
                      <option
                        class="sizes h-7 w-7 m-1 inline-block text-sm sm:text-lg"
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
            </div>
          </div>
        </td>
        <td class="font- align-middle py-5 border-b border-gray-600">Quantity</td>
        <td class="font- align-middle py-5 border-b border-gray-600">
          Price
          <div class="" v-if="product.discount == 0">
            <p class="product-price font-medium">
              <span>{{ currencySymbol }}</span
              >{{ productPrice }}
            </p>
            <!-- <p class="product-price font-medium">
              <span>{{ currencySymbol }}</span
              >{{ discount }}
            </p> -->
          </div>
          <div class="" v-else>
            <del>
              <p class="product-price font-medium">
                <span>{{ currencySymbol }}</span>
                {{ productPrice }}
              </p>
            </del>
            <p class="product-price font-medium">
              <span>{{ currencySymbol }}</span
              >{{ discount }}
            </p>
          </div>
        </td>
        <td class="font- align-middle py-5 border-b border-gray-600">
          <button
            class="product-btn uppercase text-xs sm:text-sm px-2 py-1.5 bg-tertiary color-primary"
            @click="removeFromCart()"
          >
            <!-- v-if="inShop" -->
            <span class="in">
              <span> X </span>
              <!-- <i class="fas fa-shopping-bag"></i> -->
            </span>
          </button>
        </td>
      </tr>
</template>


<script>
// import { mapState } from "vuex";
// import { mapGetters } from "vuex";
import { mapGetters, mapState } from "vuex";
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
      user: {
        // userId: userId,
        // displayName: this.displayName,
        // email: this.email,
        // country: this.country,
        cart: [],
        fav: [],
      },
    };
  },
  props: ["id"],
  computed: {
    ...mapGetters(["getCurrencyRate", "getCurrencySymbol"]),
    ...mapState(["currencyRate", "currencySymbol"]),
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
    toggleWishlist() {
      if (this.favList.includes(this.id)) {
        let found = this.favList.indexOf(this.id);
        this.favList.splice(found, 1);
        this.inFav = false;
      } else {
        this.inFav = true;
        this.favList.push(this.id);
      }
      // console.log(this.favList);
      // console.log(this.isUser);
      if (this.isUser) {
        this.saveUser();
      } else {
        localStorage.setItem("favList", JSON.stringify(this.favList));
      }
    },
    // toggleCart() {
    //   this.user.cart.forEach((cartItem) => {
    //     if (cartItem.id == this.id) {
    //       let found = this.user.cart.indexOf(cartItem.id);
    //       this.user.cart.splice(found, 1);
    //       this.inShop = false;
    //       console.log(this.inShop);
    //       console.log(this.user.fav);
    //     } else {
    //       const newItem = {
    //         id: this.id,
    //         colorSet: this.colorSet,
    //         sizeSet: this.sizeSet,
    //       };
    //       this.user.cart.push(newItem);
    //       this.inShop = true;
    //       console.log(this.inShop);
    //       console.log(this.user.cart);
    //     }
    //   });
    // },
    saveUser() {
      const ref = this.$fire.firestore
        .collection("users")
        .doc(this.user.userId);
      // console.log(ref);
      // console.log(this.user);
      const editUser = {
        userId: this.user.userId,
        displayName: this.user.displayName,
        email: this.user.email,
        country: this.user.country,
        cart: this.cartList,
        fav: this.favList,
      };
      // console.log(editUser);
      const document = {
        user: editUser,
      };
      // console.log(document);
      ref.set(document);
      // console.log(this.favList);
    },
    addToCart() {
      const newItem = {
        id: this.id,
        colorSet: this.colorSet,
        sizeSet: this.sizeSet,
      };
      this.cartList.push(newItem);
      this.inShop = true;
      console.log(this.inShop);
      console.log(this.cartList);
      // console.log(this.user.cart);
      // this.saveUser();
      if (this.isUser) {
        this.saveUser();
      } else {
        localStorage.setItem("cartList", JSON.stringify(this.cartList));
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
    // addToWishlist() {
    //   if (this.user.fav.includes(this.id)) {
    //     this.inFav = true;
    //     console.log(this.inFav);
    //   } else {
    //     this.inFav = false;
    //     console.log(this.inFav);
    //   }
    // },
    // removeToWishlist() {},
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
    this.readFromFirestore();
    // const user = this.$fire.auth.currentUser;
    // this.isUser = this.$fire.auth.currentUser;
    // console.log(this.sizeSet);
    // console.log(this.isUser);
    // console.log(user);

    // if (this.isUser) {
    // if (user) {
    //   // User is signed in, see docs for a list of available properties
    //   // https://firebase.google.com/docs/reference/js/firebase.User
    //   // this.user = user.uid;
    //   this.user = user;
    //   this.isUser = true;
    //   console.log(this.isUser);
    //   let userId = user.uid;
    //   console.log(this.user);
    //   // ...
    //   this.getUserFirestore(userId);
    // }
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // let uid = user.uid;
        // // ...
        // console.log(uid);
        // this.isLoggedIn = true;
        // if (uid === "jl0JqEJTJrbWgY0zxO9voeHxJBS2") {
        //   this.isAdmin = true;
        // }
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // this.user = user.uid;
        this.user = user;
        this.isUser = true;
        console.log(this.isUser);
        let userId = user.uid;
        // console.log(this.user);
        // ...
        this.getUserFirestore(userId);
      } else {
        // User is signed out
        // ...
        console.log("signed out");
      }
    });
    if (localStorage.getItem("favList")) {
      let list = JSON.parse(localStorage.getItem("favList"));
      list.forEach((element) => {
        this.favList.push(element);
      });
      // } else {
      // this.$router.push({ path: "/" });
      // No user is signed in.
    }
    if (this.favList.includes(this.id)) {
      this.inFav = true;
      // console.log(this.inFav);
    } else {
      this.inFav = false;
      // console.log(this.inFav);
    }
    // console.log(this.cartList);
    this.cartList.forEach((cartItem) => {
      // this.cartList.push(cartItem);
      // if (this.cartList.includes(this.id)) {
      if (cartItem.id == this.id) {
        console.log(cartItem.id);
        this.inShop = true;
        // } else {
        //   // console.log(cartItem.id);
        //   this.inShop = false;
      }
    });
    // console.log(this.inShop);
  },
};
</script>

<style scoped>
.color:checked ~ label {
  /* border: 2px solid var(--dark); */
  border: 2px solid currentColor;
}
</style>