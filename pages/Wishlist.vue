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
          </div>
          <!-- <div class="" v-if="products"> -->
          <div class="" v-if="visibleProductArr">
            <Pagination
              :products="products"
              :currentPage="currentPage"
              :perPage="perPage"
              v-on:page:update="updatePage"
            ></Pagination>
            <!-- zzzzzzz -->
            <div class="">
              <!-- yyyyy -->
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <!-- lllll -->
                <div
                  class="h-full"
                  v-for="product in visibleProductArr"
                  :key="product.id"
                >
                  <!-- gggg -->
                  {{ product.id }}
                  <ProductCard
                    class="h-full"
                    :product="product"
                    :country="country"
                    :currencyValue="currencyValue"
                  ></ProductCard>
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
          <div class="empty-container flex justify-center items-center" v-else>
            <div class="empty-box py-25">
              <h3>Your wishlist is empty</h3>
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
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
export default {
  components: {
    Pagination,
    ProductCard,
  },
  data() {
    return {
      country: null,
      products: [],
      allProducts: [],
      visibleProductArr: [],
      currentPage: 0,
      perPage: 15,
      currencyValue: null,
      user: null,
      isUser: false,
      favList: [],
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
      this.visibleProductArr = this.products.slice(
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
      this.allProducts = snap.data().products;
      console.log(this.allProducts);
      // this.visibleProduct();
    },
    // saveUser() {
    //   const ref = this.$fire.firestore
    //     .collection("users")
    //     .doc(this.user.userId);
    //   // console.log(ref);
    //   const editUser = {
    //     userId: this.user.userId,
    //     displayName: this.user.displayName,
    //     email: this.user.email,
    //     country: this.user.country,
    //     cart: this.user.cart,
    //     fav: this.favList,
    //   };
    //   const document = {
    //     user: editUser,
    //   };
    //   ref.set(document);
    // },
    async getUserFirestore(userId) {
      const ref = this.$fire.firestore.collection("users").doc(userId);
      let snap;
      try {
        snap = await ref.get();
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      this.user = snap.data().user;
      console.log(this.user);
      console.log(this.user.fav);
      let list = this.user.fav;
      // console.log(list);
      list.forEach((element) => {
        // console.log(element);
        this.favList.push(element);
      });
      // console.log(this.favList);
      console.log(this.allProducts);
      //   this.saveUser();
      this.allProducts.forEach((product) => {
        //   console.log(product);
        if (this.favList.includes(product.productId)) {
          this.products.push(product);
          //   console.log(product);
          console.log(this.products);
          // console.log(this.inFav);
          //   } else {
          // this.inFav = false;
          // console.log(this.inFav);
        }
      });
      this.visibleProduct();
    },
  },
  async created() {
    // this.getLocation();
    // this.country = await this.$country();
    // console.log(this.country);
    // console.log(this.country.currencies);
    // console.log(this.country.currencies[0].code);
    // this.currencyValue = await this.$currencyRate(
    //   this.country.currencies[0].code
    // );
    // this.currencyValue = await this.$currencyRate('USD');
    this.readFromFirestore();
    //   },
    //   created() {
    if (localStorage.getItem("favList")) {
      let list = JSON.parse(localStorage.getItem("favList"));
      list.forEach((element) => {
        this.favList.push(element);
      });
      localStorage.setItem("favList", JSON.stringify(this.favList));
      this.allProducts.forEach((product) => {
        if (this.favList.includes(product.productId)) {
          this.products.push(product);
          console.log(this.products);
          // console.log(this.inFav);
          //   } else {
          // this.inFav = false;
          // console.log(this.inFav);
        }
      });
      // } else {
      this.visibleProduct();
    }
    // const user = this.$fire.auth.currentUser;
    // console.log(user);
    // if (user) {
    //   // User is signed in, see docs for a list of available properties
    //   // https://firebase.google.com/docs/reference/js/firebase.User
    //   const userId = user.uid;
    //   this.isUser = true;
    //   // console.log(userId);
    //   this.getUserFirestore(userId);
    //   this.visibleProduct();
    //   // console.log(this.favList);
    //   console.log("this.products");
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
        // this.user = user;
        // // this.isUser = true;
        // // console.log(this.isUser);
        // let userId = user.uid;
        // // console.log(this.user);
        // // ...
        // this.getUserFirestore(userId);
        // this.readFromFirestore();
      const userId = user.uid;
      this.isUser = true;
      // console.log(userId);
      this.getUserFirestore(userId);
      this.visibleProduct();
      // console.log(this.favList);
      console.log("this.products");
      } else {
        // User is signed out
        // ...
        console.log("signed out");
    // this.readFromFirestore();
      }
    });
    // console.log(this.products);
    // this.visibleProduct();
  },
};
</script>

<style>
.empty-container {
  min-height: 80vh;
}
</style>
