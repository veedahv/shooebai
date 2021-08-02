<template>
  <div>
    <!-- <Navigation></Navigation> -->
    <Carousel></Carousel>
    <section>
      <div class="container py-10 px-4 mx-auto">
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
          <div class="">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div class="h-full" v-for="product in products" :key="product.id">
                <ProductCard :product="product"></ProductCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section>
      <div class="container py-25 mx-auto">
        <Signin></Signin>
      </div>
    </section> -->
    <!-- <section>
      <div class="container py-25 mx-auto">
        <Signup></Signup>
      </div>
    </section> -->
  </div>
</template>

<script>
// import Signin from "../components/signin";
// import Signup from "../components/signup";
import ProductCard from "../components/ProductCard";
// import Navigation from '../components/Navigation';
import Carousel from "../components/Carousel";
// import axios from '@nuxtjs/axios'
export default {
  components: {
    // Signin,
    // Signup,
    ProductCard,
    // Navigation,
    Carousel,
  },
  data() {
    return {
      products: [],
      ip: "",
    };
  },
  methods: {
    async fetchSomething() {
      const ip = await this.$axios.$get("http://icanhazip.com");
      this.ip = ip;
    },
    async getLocation() {
      const response = await this.$axios.$get("https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6");
      const result = await response.country;
      // const result = await response.json();
      // const ip = await result;
      // this.ip = ip;
      // console.log(this.ip);
      console.log(response);
      console.log(result);
      // axios
      //   .get(
      //     "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6"
      //   )
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((result) => {
      //     console.log(result);
      //     console.log(result.country);
      //   })
      //   .catch((error) => console.log("error", error));
      // fetch(
      //   "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6",
      //   requestOptions
      // )
      //   .then((response) => response.json())
      //   .then((result) => console.log(result))
      //   .catch((error) => console.log("error", error));
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
      console.log(this.products);
    },
    // signIn() {
    //   this.$fire
    //     .auth
    //     .signOut()
    //     .then(() => {
    //       // Signed in
    //       // var user = userCredential.user;
    //       // ...
    //       // console.log(user);
    //         // Sign-out successful.
    //     })
    //     .catch((error) => {
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       // ..
    //     });
    // },
    //     firebase.auth().signOut().then(() => {
    //   // Sign-out successful.
    // }).catch((error) => {
    //   // An error happened.
    // });
  },
  // mounted() {
  //   this.readFromFirestore();
  // },
  created() {
    this.readFromFirestore();
    this.getLocation();
  },
};
</script>

<style>
</style>
