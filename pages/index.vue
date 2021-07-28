<template>
  <div>
    <Navigation></Navigation>
    <Carousel></Carousel>
    <section>
      <div class="container py-25 mx-auto">
        <div class="">
          <div class="sub-heading-box text-center py-5 relative">
            <hr
              class="border-0 bg-black w-full h-px inset-y-1/2 left-0 absolute"
            />
            <h2 class="sub-heading bg-white mx-auto py-2 w-min relative">
              Trending
            </h2>
          </div>
          <div class="">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div class="" v-for="product in products" :key="product.id">
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
import Navigation from '../components/Navigation';
import Carousel from "../components/Carousel";
export default {
  components: {
    // Signin,
    // Signup,
    ProductCard,
    Navigation,
    Carousel,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
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
  mounted() {
    this.readFromFirestore();
  },
};
</script>

<style>
</style>
