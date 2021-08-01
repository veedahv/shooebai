<template>
  <div>
    <section>
      <div class="container py-10 px-4 mx-auto">
        <div class="">
          <div class="sub-heading-box text-center py-5 relative">
              <!-- class="border-0 bg-black w-full h-px inset-y-1/2 left-0 absolute" -->
            <!-- <hr
              class="border-0 bg-white w-full h-px inset-y-1/2 left-0 absolute"
            /> -->
            <h2 class="sub-heading bg-white mx-auto py-2 px-1 w-min relative">
              Trending
            </h2>
          </div>
          <div class="">
            <nuxt-link :to="'/Admin/ProductForm'">
              <p class="product-name">Add</p>
            </nuxt-link>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div class="" v-for="product in products" :key="product.id">
                <AdminProductCard :product="product"></AdminProductCard>
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
import AdminProductCard from '../../components/AdminProductCard'
export default {
  components: { AdminProductCard },
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
    //   console.log(this.$route);
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
