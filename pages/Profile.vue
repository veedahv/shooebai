<template>
  <div class="">
    <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
      <div class="">
        <form
          @submit.prevent="saveProfile"
          class="color-dark bg-white w-full px-16 py-10"
        >
          <div class="form-group my-4">
            <label for="name" class=""></label>
            <input type="text" class="border-b border-gray-600" id="name" v-model="displayName" v-if="isEdit" />
            <p v-else>
              {{ user.displayName }}
            </p>
          </div>
          <div class="form-group my-4">
            <label for="email" class=""></label>
            <input type="text" class="border-b border-gray-600" id="email" v-model="email" v-if="isEdit" />
            <p v-else>
              {{ user.email }}
            </p>
          </div>
          <div class="form-group my-4">
            <a
              href=""
              class="color-dark capitalize font-medium"
              @click.prevent="forgotPassword"
            >
              Forgot password?
            </a>
          </div>
          <!-- <div class="form-group my-4">
            <a
              href=""
              class="color-dark capitalize font-medium"
              @click.prevent="editProfile"
            >
              Edit Profile
            </a>
          </div> -->
          <div class="form-group my-4 flex gap-5 items-stretch" v-if="isEdit">
            <div class="form-group">
              <a
                href=""
                class="px-4 py-2 bg-green-500 text-white text-sm capitalize font-medium"
                @click.prevent="saveProfile"
              >
                Save Profile
              </a>
            </div>
            <div class="form-group">
              <a
                href=""
                class="px-4 py-2 bg-red-100 text-red-600 text-sm capitalize font-medium"
                @click.prevent="isEdit = false"
              >
                Cancel
              </a>
            </div>
          </div>
          <div class="form-group my-4 flex gap-5 items-stretch" v-else>
            <div class="form-group">
              <a
                href=""
                class="px-4 py-2 bg-green-500 text-white text-sm capitalize font-medium"
                @click.prevent="editProfile"
            >
              Edit Profile
              </a>
            </div>
            <div class="form-group">
              <a
                href=""
                class="px-4 py-2 bg-red-100 text-red-600 text-sm capitalize font-medium"
                @click.prevent="isEdit = false"
              >
                delete profile
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
      <div class="color-dark bg-white w-full px-16 py-10">
        <!-- Phone number  -->
        <!-- Country' -->
        <div class="trans" v-if="user.trans">
          <table class="border w-full">
            <thead>
              <tr>
                <th class="border">Items</th>
                <th class="border">Prices</th>
                <th class="border">Total</th>
                <th class="border">Transaction history</th>
                <th class="border"> Transaction date </th>
                <th class="border"></th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="no-trans-cart text-center" v-else-if="user.cart">
          <div class="py-2">
            <!-- <p class=""></p> -->
            <p class="my-3">You can check out items in cart</p>

            <div class="my-3">
              <!-- <nuxt-link to="/Cart"></nuxt-link> -->
              <nuxt-link
                to="/Cart"
                class="border-2 font-medium text-md border-current px-3 py-1.5"
              >
                Checkout cart
                <!-- Shop Now -->
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="no-trans text-center" v-else>
          <div class="py-2">
            <p class="mt-3">You have not made any transactions yet</p>
            <p class="my-1">And your cart is empty</p>
            <div class="my-3">
              <nuxt-link
                to="/shop"
                class="border-2 font-medium text-md border-current px-3 py-1.5"
                >Shop Now</nuxt-link
              >
            </div>
          </div>
        </div>
         
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      displayName: "",
      country: "",
      phoneNumber: "",
      deliveryAddress: "",
      isEdit: false,
      //   password: "",
      // user: {},
      //   viewSignInUp: false
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["getUser"]),
  },
  created() {
        // const returnValue = await this.$http.$get(`/api/getAllCountries`);
        
    // console.log(this.getUser);
    // const user = this.$fire.auth.currentUser;
    // console.log(user);
    // if (user) {
    // }
    // this.$fire.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     // if (uid === "jl0JqEJTJrbWgY0zxO9voeHxJBS2") {
    //     //   this.isAdmin = true;
    //     // }
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     const userId = user.uid;
    //     // this.user = user;
    //     //   this.isUser = true;
    //     // console.log(userId);
    //     // this.getUser(userId)
    //     console.log("signed in");
    //   } else {
    //     // User is signed out
    //     // ...
    //     console.log("signed out");
    //   }
    // });
    //   this.getUser()
  },
  methods: {
    // async getUser(userId) {
    //   // console.log(userId);
    //   const ref = this.$fire.firestore.collection("users").doc(userId);
    //   // console.log(ref);
    //   let snap;
    //   try {
    //     snap = await ref.get();
    //   } catch (e) {
    //     // TODO: error handling
    //     console.error(e);
    //   }
    //   this.user = snap.data().user;
    //   console.log(this.user);
    //   // const newUser = {
    //   //   userId: userId,
    //   //   displayName: this.displayName,
    //   //   email: this.email,
    //   //   password: this.password,
    //   //   country: this.country
    //   // };
    //   // const document = {
    //   //   user: newUser,
    //   // };
    //   // ref.set(document);
    // },
    // signIn() {
    //   console.log(this.password);
    //   this.$fire.auth
    //     .signInWithEmailAndPassword(this.email, this.password)
    //     .then((userCredential) => {
    //       // Signed in
    //       var user = userCredential.user;
    //       // ...
    //       console.log(user);
    //       this.updateSignInOut();
    //     })
    //     .catch((error) => {
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       // ..
    //     });
    // },
    editProfile() {
      // const ref = this.$fire.firestore.collection("users").doc(userId);
      // console.log(ref);
      // const newUser = {
      // userId: userId,
      this.displayName = this.user.displayName;
      // this.email = this.user.email;
      this.isEdit = true;
      //   country: this.country,
      //   cart: this.cart,
      //   fav: this.fav
      // };
      // const document = {
      //   user: newUser,
      // };
      // ref.set(document);
      console.log(this.user);
    },
    saveProfile() {
      // const ref = this.$fire.firestore.collection("users").doc(userId);
      // console.log(ref);
      const saveUser = {
        userId: this.user.userId,
        displayName: this.displayName,
        email: this.email,
        country: this.user.country,
        cart: this.user.cart,
        fav: this.user.fav,
      };
      console.log(saveUser);
      // const document = {
      //   user: newUser,
      // };
      // ref.set(document);
      this.isEdit = false;
      console.log(this.displayName);
      console.log(this.email);
      console.log(this.user);
    },
    storeUser(userId) {
      const ref = this.$fire.firestore.collection("users").doc(userId);
      console.log(ref);
      const newUser = {
        userId: userId,
        displayName: this.displayName,
        email: this.email,
        country: this.country,
        cart: this.cart,
        fav: this.fav,
      };
      const document = {
        user: newUser,
      };
      ref.set(document);
    },
    signIn() {
      this.$fire.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          user.updateProfile({
            displayName: this.displayName,
          });

          // ...
          console.log(user);
          this.storeUser(user.uid);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    },
    forgotPassword() {
      const user = this.$fire.auth.currentUser;
      const newPassword = getASecureRandomPassword();

      user
        .updatePassword(newPassword)
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
    },
  },
};
</script>