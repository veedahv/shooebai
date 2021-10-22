<template>
  <div>
    <div class="product">
      <div class="flex flex-wrap justify-between py-2 w-full items-start">
        <div class="product-img w-full md:w-4/12">
          <img :src="product.productImage" alt="" />
        </div>
        <div class="product-info w-full md:w-7/12">
          <div class="product-details">
            <!-- <div class="rating">
              <span
                class="colors h-7 w-7 mx-1 inline-block"
                v-for="n in product.rating"
                :key="n"
              >
                <i class="fas fa-star text-sm text-yellow-500"></i>
              </span>
            </div> -->
            <p class="product-name">{{ product.productName }}</p>
            <div class="" v-if="product.discount == 0">
              <p class="product-price font-medium">
                <span>{{ currencySymbol }}</span
                >{{ productPrice }}
              </p>
            </div>
            <div class="" v-else>
              <del>
                <p class="product-price font-medium">
                  <!-- <span>{{ getCurrencySymbol }}</span> -->
                  <span>{{ currencySymbol }}</span>
                  {{ productPrice }}
                </p>
              </del>
              <!-- <p class="product-price font-medium"><span>{{ getCurrencySymbol }}</span>{{ discount }}</p> -->
              <p class="product-price font-medium">
                <span>{{ currencySymbol }}</span
                >{{ discount }}
              </p>
            </div>
            <!-- <p class="product-descripion text-sm">{{ product.descripion }}</p> -->
          </div>
          <div class="flex justify-between items-center">
            <div class="">
              <div class="flex justify-start items-center">
                <span class="">Color</span>
                <select name="" id="" v-model="colorSet">
                  <option
                    class="colors h-7 w-7 m-1 inline-block"
                    v-for="color in product.colors"
                    :key="color"
                    :value="color"
                  >
                    {{ color }}
                  </option>
                </select>
                <!-- <span
                class="colors h-7 w-7 m-1 inline-block"
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
                  class="cursor border-2 border-transparent block h-full w-full rounded-full p-1"
                  :class="`text-${color}-500`"
                >
                  <span
                    class="block w-full h-full rounded-full bg-gradient-to-r text-black from-gray-900 to-black"
                    v-if="color === 'black'"
                  ></span>
                  <span
                    class="block w-full h-full text-white rounded-full bg-gradient-to-r from-white to-gray-50"
                    v-else-if="color === 'white'"
                  ></span>
                  <span
                    class="block w-full h-full bg-gradient-to-r rounded-full"
                    :class="`text-${color}-500 from-${color}-200 to-${color}-700`"
                    v-else
                  ></span>
                </label>
              </span> -->
              </div>
            </div>
            <div class="">
              <div class="flex justify-start items-center">
                <span class="">Size</span>
                <!-- <select name="" id=""> -->
                <select name="" id="" v-model="sizeSet">
                  <option
                    class="sizes h-7 w-7 m-1 inline-block"
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
          <!-- <p class="qty">Only {{ product.availableQuantity }} left in stock</p> -->
          <div class="product-btn-box flex">
            <div class="product-btn-box">
              <!-- <button
                class="product-btn"
                @click="toggleCart"
              > -->
              <button
                class="product-btn uppercase px-2.5 py-2 bg-tertiary color-primary"
                @click="removeFromCart()"
              >
                <!-- v-if="inShop" -->
                <span class="in">
                  <span> remove from cart </span>
                  <i class="fas fa-shopping-bag"></i>
                </span>
              </button>
              <!-- <button
                class="product-btn uppercase px-2.5 py-2 bg-primary color-tertiary"
                @click="addToCart()"
                v-else
              >
                <span class="minus">
                  <span> add to cart </span>
                  <i class="fas fa-shopping-bag"></i>
                </span>
              </button> -->
            </div>
            <!-- <div class="product-btn-box">
              <button
                class="product-btn px-2.5 py-2"
                :class="
                  inFav ? 'bg-dark color-secondary' : 'bg-secondary color-dark'
                "
                @click="toggleWishlist"
              >
                <span v-if="inFav">
                  <span>
                    <i class="fas fa-bookmark"></i>
                  </span>
                </span>
                <span v-else>
                  <span>
                    <i class="far fa-bookmark"></i>
                  </span>
                </span>
              </button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
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