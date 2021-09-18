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
            <p class="product-name text-lg font-bold">{{ product.productName }}</p>
          </nuxt-link>
          <div class="" v-if="product.discount == 0">
            <p class="product-price font-medium"><span>{{ currencySymbol }}</span>{{ productPrice }}</p>
          </div>
          <div class="" v-else>
            <del>
              <p class="product-price font-medium">
                <span>{{ currencySymbol }}</span>
                {{ productPrice }}
              </p>
            </del>
            <p class="product-price font-medium"><span>{{ currencySymbol }}</span>{{ discount }}</p>
          </div>
          <!-- <nuxt-link
            :to="{ name: 'ProductDetailsCard', params: { id: product.id } }"
          >
            Details
          </nuxt-link> -->
        </div>
        <div class="product-btn-box">
          <!-- <button class="product-btn active:shadow-md hover:shadow-lg"> -->
          <button
            class="product-btn transform active:scale-90 hover:scale-110"
            @click="toggleWishlist"
          >
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
      // country: null,
      currencySymbol: '',
      favList: [],
      user: {
        // userId: userId,
        // displayName: this.displayName,
        // email: this.email,
        // country: this.country,
        // cart: [],
        fav: [],
      },
    };
  },
  props: ["product", "country", "currencyValue"],
  computed: {
    productPrice() {
      
      // return this.country.currencies[0].symbol;
      return (Math.ceil((this.product.productPrice / this.currencyValue) * 100) / 100);
    },
    discount() {
      let discountVal =
        this.productPrice -
        (this.product.discount * this.productPrice) / 100;
      return (Math.ceil(discountVal * 100) / 100);
      // return discountVal;
    },
    currency() {
      // return this.country.currencies[0].symbol;
      return 'N';
    },
  },
  // async created() {
  created() {
    // this.getLocation();
    // this.country = await this.$country();
    this.currencySymbol = this.country.currencies[0].symbol;
    // console.log(this.$country());
    // console.log(this.currencySymbol);
    // console.log(this.country);
    // console.log(this.country.currencies[0].symbol);
    const user = this.$fire.auth.currentUser;
    // console.log(this.favList);
    // console.log(this.product.productId);

    if (localStorage.getItem("favList")) {
      let list = JSON.parse(localStorage.getItem("favList"));
      list.forEach((element) => {
        this.favList.push(element);
      });
      localStorage.setItem("favList", JSON.stringify(this.favList));
    if (this.favList.includes(this.product.productId)) {
      this.inFav = true;
      console.log(this.inFav);
    } else {
      this.inFav = false;
      // console.log(this.inFav);
    }
      // } else {
    }
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const userId = user.uid;
      this.isUser = true;
      // console.log(userId);
      this.getUserFirestore(userId);
      // console.log(this.favList);
    }
    //   // console.log(this.favList);
    // if (this.favList.includes(this.product.productId)) {
    //   this.inFav = true;
    //   console.log(this.inFav);
    // } else {
    //   this.inFav = false;
    //   // console.log(this.inFav);
    // }
  },
  methods: {
    async getLocation() {
      const response = await this.$axios.$get(
        "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6"
      );
      const result = await response.country.name;
      // console.log(response);
      // console.log(result);
      this.getLocationInfo(result);
    },
    async getLocationInfo(name) {
      const response = await this.$axios.$get(
        `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;currencies;flag;callingCodes`
      );
      const result = await response[0].currencies[0].symbol;
      // const result = await response[0];
      this.country = await response[0];
      // console.log(response);
      console.log(result);
    },
    toggleWishlist() {
      if (this.favList.includes(this.product.productId)) {
        let found = this.favList.indexOf(this.product.productId);
        this.favList.splice(found, 1);
        this.inFav = false;
        // console.log(this.inFav);
        // console.log(this.user.fav);
        console.log(this.favList);
      } else {
        this.inFav = true;
        this.favList.push(this.product.productId);
        console.log(this.favList);
        // console.log(this.inFav);
        // console.log(this.user.fav);
      }
        console.log(this.isUser);
      if (this.isUser) {
        this.saveUser();
      } else {
        localStorage.setItem("favList", JSON.stringify(this.favList));
      }
    },
    saveUser() {
      const ref = this.$fire.firestore
        .collection("users")
        .doc(this.user.userId);
      // console.log(ref);
      const editUser = {
        userId: this.user.userId,
        displayName: this.user.displayName,
        email: this.user.email,
        country: this.user.country,
        cart: this.user.cart,
        fav: this.favList,
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
        // console.log(list);
      list.forEach((element) => {
        // console.log(element);
        this.favList.push(element);
      });
      // console.log(this.favList);
      this.saveUser();
    if (this.favList.includes(this.product.productId)) {
      this.inFav = true;
      console.log(this.inFav);
    } else {
      this.inFav = false;
      // console.log(this.inFav);
    }
    },
    async readFromFirestore(userId) {
      const ref = this.$fire.firestore.collection("users").doc(userId);
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
    },
  },
};
</script>