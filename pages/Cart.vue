<template>
  <div>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="">
          <div class="">
            <div class="sub-heading-box text-center py-5 relative">
              <!-- class="border-0 bg-black w-full h-px inset-y-1/2 left-0 absolute" -->
              <hr
                class="border-0 bg-white w-full h-px inset-y-1/2 left-0 absolute"
              />
              <h2 class="sub-heading bg-white mx-auto py-2 px-1 w-min relative">
                Trending
              </h2>
            </div>
            <!-- <pagination :postsArr="postsArr" :currentPage="currentPage" :perPage="perPage" v-on:page:update="updatePage"></pagination> -->
            <!-- <pagination></pagination> -->
            <Pagination
              :products="products"
              :currentPage="currentPage"
              :perPage="perPage"
              v-on:page:update="updatePage"
            ></Pagination>
          </div>
          <div class="">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <!-- <div
                class="h-full"
                v-for="product in visibleProductArr"
                :key="product.productId"
              >
                <ProductCard
                  class="h-full"
                  :product="product"
                  :country="country"
                  :currencyValue="currencyValue"
                ></ProductCard>
              </div> -->
              <!-- <div class="h-full" v-for="product in products" :key="product.id">
                <ProductCard class="h-full" :product="product"></ProductCard>
              </div> -->
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                class="h-full"
                v-for="product in visibleProductArr"
                :key="product.productId"
              >
                <!-- <ProductCard class="h-full" :product="product" :country="country" :currencyValue="currencyValue"></ProductCard> -->
                <!-- <ProductDetailsCard
                  :id="product.productId"
                ></ProductDetailsCard> -->
                <CartDetailsCard :id="product.productId"></CartDetailsCard>
              </div>
              <!-- <div class="h-full" v-for="product in products" :key="product.id">
                <ProductCard class="h-full" :product="product"></ProductCard>
              </div> -->
            </div>
          </div>
          <Pagination
            :products="products"
            :currentPage="currentPage"
            :perPage="perPage"
            v-on:page:update="updatePage"
          ></Pagination>
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
import CartDetailsCard from '../components/CartDetailsCard'
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
      cartProducts: [],
      cartList: [],
      visibleProductArr: [],
      currentPage: 0,
      perPage: 15,
      currencyValue: null,
      user: null,
    };
  },
  // beforeMount() {
  //   this.visibleProduct(); NewProductCard.vue country.js
  // },
  methods: {
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
      this.visibleProduct();
    },
    visibleProduct() {
      this.visibleProductArr = this.cartProducts.slice(
        this.currentPage * this.perPage,
        this.currentPage * this.perPage + this.perPage
      );
      console.log(this.visibleProductArr);
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
      // this.cartProducts = this.products;
      // console.log(this.products);
      this.cartList.forEach((cartItem) => {
        // console.log(cartItem.id);
        this.products.forEach((prod) => {
          // console.log(prod.productId);
          // if (prod.productId.toLowerCase() === this.id.toLowerCase()) {
          if (prod.productId === cartItem.id) {
            // console.log(prod.productId);
            this.cartProducts.push(prod);
            // console.log(prod);
            // console.log(this.cartProducts);
          }
          // this.cartList.push(cartItem);
          // if (cartItem.id == this.id) {
          //   // console.log(cartItem.id);
          //   console.log(this.user.fav);
          // } else {
            // }
        });
      });
      this.visibleProduct();
      console.log(this.cartProducts);
      // },
      // async readFromFirestore() {
      //   const ref = this.$fire.firestore.collection("products").doc("product");
      //   let snap;
      //   try {
      //     snap = await ref.get();
      //   } catch (e) {
      //     // TODO: error handling
      //     console.error(e);
      //   }
      //   this.products = snap.data().products;
      // this.products.forEach((prod) => {
      //   // console.log(prod.productId);

      //   // if (prod.productId.toLowerCase() === this.id.toLowerCase()) {
      //   if (prod.productId === this.id) {
      //     this.product = prod;
      //     this.sizeSet = this.product.sizes[0];
      //     this.colorSet = this.product.colors[0];
      //     // console.log(prod.productId);
      //     // console.log(this.id);
      //     // console.log(this.product);
      //     // console.log(this.product.sizes[0]);
      //     // console.log(this.product.sizes);
      //     // console.log(this.product.colors);
      //   }
      // });
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
      console.log(this.user.cart);
      this.user.cart.forEach((cartItem) => {
        this.cartList.push(cartItem);
        // if (cartItem.id == this.id) {
        //   // console.log(cartItem.id);
        //   // this.inShop = true;
        //   console.log(this.user.fav);
        // } else {
        //   // console.log(cartItem.id);
        //   // this.inShop = false;
        // }
        // console.log(this.inShop);
      });
      console.log(this.cartList);
      // let list = this.user.fav;
      // list.forEach((element) => {
      //   this.favList.push(element);
      // });
      // if (this.favList.includes(this.id)) {
      //   this.inFav = true;
      //   // console.log(this.inFav);
      // } else {
      //   this.inFav = false;
      //   // console.log(this.inFav);
      // }
    },
  },
  // mounted() {
  //   // console.log(this.$country());
  //   // console.log(this.$location());
  //   // this.$location();
  //   // this.$country();
  // },
  // created() {
  async created() {
    // this.getLocation();
    // this.country = await this.$country();
    // console.log(this.country);
    // console.log(this.country.currencies);
    // console.log(this.country.currencies[0].code);
    // this.currencyValue = await this.$currencyRate(this.country.currencies[0].code);
    // // this.currencyValue = await this.$currencyRate('USD');
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
        // this.isUser = true;
        // console.log(this.isUser);
        let userId = user.uid;
        // console.log(this.user);
        // ...
        this.getUserFirestore(userId);
        this.readFromFirestore();
      } else {
        // User is signed out
        // ...
        console.log("signed out");
    this.readFromFirestore();
      }
    });
    // this.getUserFirestore();
  },
};
</script>

<style>
</style>
