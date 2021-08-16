<template>
  <div>
    <div>
      <section class="">
        <div class="container py-10 px-4 mx-auto">
          <div class=" text-center">
            <div class="sub-heading-box py-5 relative">
              <h2 class="sub-heading mx-auto py-2 px-1 w-min relative">
                Trending
              </h2>
            </div>
            <div class="">
              <p class="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Quo nobis quasi nam aspernatur minima. 
                Velit illum quos veniam earum. Alias voluptatum, 
                rerum debitis placeat eaque suscipit mollitia ipsa, tempora eius, amet necessitatibus. 
                Sit earum odio laudantium voluptatem magnam eius velit similique itaque.
                Officia dolore ut a vel necessitatibus explicabo veritatis! 
                Blanditiis, qui incidunt voluptatibus dolorem sed laudantium sequi earum voluptas voluptatem.
                Quis distinctio fugit minima reprehenderit hic architecto dolorem non fugiat veniam tempora numquam quos eius id quae dolorum, 
                voluptate esse ex quibusdam corporis veritatis quo. 
                Deleniti nostrum, veritatis mollitia quam itaque debitis ducimus facere vero! 
                Sunt quo vel itaque exercitationem, aut qui omnis corporis suscipit, quaerat earum! 
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="">
        <div class="container py-10 px-4 mx-auto">
          <div class="">
            <div class="sub-heading-box text-center py-5 relative">
              <h2 class="sub-heading mx-auto py-2 px-1 w-min relative">
                Trending
              </h2>
            </div>
            <div class="">
              <p class="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Quo nobis quasi nam aspernatur minima. 
                Velit illum quos veniam earum. Alias voluptatum, 
                rerum debitis placeat eaque suscipit mollitia ipsa, tempora eius, amet necessitatibus. 
                Sit earum odio laudantium voluptatem magnam eius velit similique itaque. 
                Neque quaerat atque dolorem assumenda ipsum fugiat corporis autem laudantium commodi, 
                recusandae, suscipit impedit alias aliquam quia animi maxime cupiditate? 
                Officia dolore ut a vel necessitatibus explicabo veritatis! 
                Blanditiis, qui incidunt voluptatibus dolorem sed laudantium sequi earum voluptas voluptatem, 
                sint libero eligendi quo, ratione quod? 
                Quis distinctio fugit minima reprehenderit hic architecto dolorem non fugiat veniam tempora numquam quos eius id quae dolorum, 
                voluptate esse ex quibusdam corporis veritatis quo. 
                Deleniti nostrum, veritatis mollitia quam itaque debitis ducimus facere vero! 
                Quidem explicabo doloribus accusamus quia aliquam eius rem? 
                Sunt quo vel itaque exercitationem, aut qui omnis corporis suscipit, quaerat earum! 
                Voluptas illum aliquam deserunt exercitationem fugit, rerum veniam id?
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
export default {
  // data() {
  //   return {
  //     products: [],
  //     productImgObj: null,
  //     productId: "",
  //     productName: "",
  //     productPrice: "",
  //     availableQuantity: "",
  //     discount: "",
  //     productImage: "",
  //     descripion: "",
  //     flashSale: false,
  //     newProduct: false,
  //     rating: 0,
  //     tags: [],
  //     colors: [],
  //     sizes: [],
  //     isUploadingImage: false,
  //     isDeletingImage: false,
  //     writeSuccessful: false,
  //     uid: null,
  //   };
  // },
  methods: {},
  beforeMount() {
    const user = this.$fire.auth.currentUser;

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      this.uid = user.uid;
      console.log(this.uid);
      // ...
      if (this.uid !== "jl0JqEJTJrbWgY0zxO9voeHxJBS2") {
        console.log(this.uid);
        // this.$router.push({ path: "/" });
      }
    } else {
      // this.$router.push({ path: "/" });
      // No user is signed in.
    }
  },
  // beforeMount() {
  // middleware: 'auth'
  // middleware({ store, redirect }) {
  //   // if (this.uid !== this.uid) {
  //   if (false) {
  //     return redirect("/ProductDetailsCard");
  //   }
  // },
  // },
};
</script>

<style scoped>
.productImgBox {
  max-width: 400px;
}
.productImgBox img {
  width: 100%;
}
</style>