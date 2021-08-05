<template>
  <div class="h-full">
    <div class="product bg-white relative h-full">
      <!-- <div class="flex justify-between py-2 absolute left-0 w-full top items-center"> -->
      <div class="py-2 absolute left-0 top-0">
        <span
          class="flash-sale bg-red-400 text-white px-1"
          v-if="product.discount != 0"
        >
          -{{ product.discount }}%
        </span>
      </div>
      <div class="py-2 absolute right-0 top-0">
        <span
          class="new-sale bg-blue-600 text-white px-1"
          v-if="product.newProduct"
        >
          New
        </span>
      </div>
      <div class="product-img">
        <!-- :to="{ name: 'ProductDetailsCard', params: { id: product.productId } }" -->
        <!-- AdminProductCard.vue -->
        <nuxt-link :to="'/ProductDetail/' + product.productId">
          <img :src="product.productImage" alt="" />
        </nuxt-link>
      </div>
      <!-- <div class="product-info flex justify-between py-5 px-4 w-full items-center"> -->
      <div
        class="product-info flex justify-between py-5 px-4 w-full items-start"
      >
        <div class="product-details">
          <nuxt-link :to="'/ProductDetail/' + product.productId">
            <p class="product-name font-bold">{{ product.productName }}</p>
          </nuxt-link>
          <div class="" v-if="product.discount == 0">
            <p class="product-price font-medium">{{ product.productPrice }}</p>
          </div>
          <div class="" v-else>
            <del>
              <p class="product-price font-medium">
                {{ product.productPrice }}
              </p>
            </del>
            <p class="product-price font-medium">{{ discount }}</p>
          </div>
          <!-- <nuxt-link
            :to="{ name: 'ProductDetailsCard', params: { id: product.id } }"
          >
            Details
          </nuxt-link> -->
        </div>
        <div class="product-btn-box">
          <!-- <button class="product-btn active:shadow-md hover:shadow-lg"> -->
          <button class="product-btn transform active:scale-90 hover:scale-110" @click="toggleWishlist">
            <!-- <button class="product-btn"> -->
            <!-- <i class="fas fa-shopping-bag"></i> -->
            <!-- <i class="fas fa-5x text-5xl fa-bookmark"></i> -->
            <!-- <i class="fas fa-3x fa-bookmark"></i> -->
            <i class="fas text-3xl fa-bookmark" v-if="inFav"></i>
            <i class="far text-3xl fa-bookmark" v-else></i>
            <!-- <span v-if="product.fav">
              <i class="fa fa-heart" aria-hidden="true"></i>
            </span>
            <span v-else>
              <i class="fa fa-heart-o" aria-hidden="true"></i>
            </span> -->
          </button>
          <!-- <button class="product-btn">
            <span class="in" v-if="product.inShop">
              <i class="fa fa-cart-plus" aria-hidden="true"></i>
            </span>
            <span class="minus" v-else>
              <span class="minus">-</span>
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </span>
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      inFav: false,
      isUser: false,
      favList: [],
      user: {
        // userId: userId,
        // displayName: this.displayName,
        // email: this.email,
        // country: this.country,
        // cart: [],
        fav: [],
      },
    }
  },
  props: ["product"],
  computed: {
    discount() {
      let discountVal =
        this.product.productPrice -
        (this.product.discount * this.product.productPrice) / 100;
      return discountVal;
    },
  },  
  created() {
    const user = this.$fire.auth.currentUser;
    // console.log(this.product.productId);

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      const userId = user.uid;
      this.isUser = true;
    // console.log(userId);
      this.getUserFirestore(userId);
    // storeUser(userId) {
      // const ref = this.$fire.firestore.collection("users").doc(userId).user;
      // const ref = this.$fire.firestore.collection("users").doc(userId);
      // console.log(ref);
      // const newUser = {
  // this.readFromFirestore(userId);
      //   userId: userId,
      //   displayName: this.displayName,
      //   email: this.email,
      //   country: this.country,
      //   cart: this.cart,
      //   fav: this.fav
      // };
      // const document = {
      //   user: newUser,
      // };
      // ref.set(document);
    // },
    // // ...
    // if (this.uid !== "jl0JqEJTJrbWgY0zxO9voeHxJBS2") {
  //     console.log(this.uid);
  //     this.$router.push({ path: "/" });
  //   }
  // } else {
  //   this.$router.push({ path: "/" });
  //   // No user is signed in.
  } else if (localStorage.getItem('favList')) {
    let list = JSON.parse(localStorage.getItem('favList'));
    list.forEach(element => {      
      this.favList.push(element)
    });
  // } else {    
  }
  },
  methods: {
    toggleWishlist() {
      if (this.favList.includes(this.product.productId)) {
        let found = this.favList.indexOf(this.product.productId);
        this.favList.splice(found, 1);
        this.inFav = false;
        // console.log(this.inFav);
        // console.log(this.user.fav);
      } else {
        this.inFav = true;
        this.favList.push(this.id);
        // console.log(this.inFav);
        // console.log(this.user.fav);
      }
      if (isUser) {        
        this.saveUser();
      } else {
        localStorage.setItem('favList', this.favList)
      }
    },
    saveUser() {      
      const ref = this.$fire.firestore.collection("users").doc(this.user.userId);
      console.log(ref);
      const editUser = {
        userId: this.user.userId,
        displayName: this.user.displayName,
        email: this.user.email,
        country: this.user.country,
        cart: this.user.cart,
        fav: this.favList
      };
      const document = {
        user: editUser,
      };
      ref.set(document);
    },
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
      // console.log(this.user);
      // console.log(this.user.fav);
      let list = this.user.fav;
    list.forEach(element => {      
      this.favList.push(element)
    });
      if (this.favList.includes(this.product.productId)) {
        this.inFav = true;
        // console.log(this.inFav);
      } else {
        this.inFav = false;
        // console.log(this.inFav);
      }
    },
    async readFromFirestore(userId) {
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
      let user = snap.data().user;
      // console.log(user);
      // console.log(user.fav);
    }    
  },
};
</script>