<template>
  <div class="bg-white">
    <div class="container py-2 px-4 mx-auto">
      <div class="flex justify-between items-center">
        <div>
          <nuxt-link to="/">Sho_oebai</nuxt-link>
        </div>
        <div class="py-2">
          <nuxt-link to="/">ball</nuxt-link> |
          <nuxt-link to="/Admin/Products">Admin</nuxt-link> |
          <nuxt-link to="/shop">Shop</nuxt-link> |
          <button @click="signOut" v-if="isLoggedIn">logout</button>
          <button @click="signIn" v-else>login</button>
        </div>
        <!-- <div class="flex justify-between items-center"> -->
        <div class="flex justify- items-center">
          <!-- 3 -->
          <button>
            <i class="fas fa-search"></i>
          </button>
          <!-- <div class="flex justify-between py-2 absolute left-0 w-full top items-center"> -->
          <!-- <div class="py-2 absolute left-0 top-0">
      </div> -->
          <div class="relative">
            <div>
              <button @click="viewUserBox = !viewUserBox">
                <span v-if="isAdmin">
                <i class="fas fa-user-cog"></i>
                </span>
                <span v-else-if="isLoggedIn">                  
                <i class="fas fa-user-circle"></i>
                </span>
                <span v-else>                  
                <i class="fas fa-user-slash"></i>
                </span>
              </button>
              <div class="absolute bg-white w-36 right-0 top-full" :hidden="viewUserBox">
                <ul class="w-full">
                  <li>
                    <nuxt-link to="/Admin/Products">Admin</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/Admin/Products">Admin</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/Admin/Products">Admin</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <Signin v-on:signInUp="signInUp" v-if="viewSignInUp"></Signin> -->
    <!-- <Signin v-on:signInUp="viewSignInUp = !viewSignInUp" v-if="viewSignInUp"></Signin> -->
    <SignInOut
      v-on:signInUp="viewSignInUp = !viewSignInUp"
      v-if="viewSignInUp"
    ></SignInOut>
    <!-- <Signup v-on:update="viewSignInUp" v-if="viewSignInUp"></Signup> -->
  </div>
</template>

<script>
import SignInOut from "./SignInOut";
// import Signup from './signup'
// import Signin from './signin'
export default {
  components: {
    SignInOut,
    // Signup,
    // Signin
  },
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      viewSignInUp: false,
      viewUserBox: true,
    };
  },
  methods: {
    signInUp() {
      this.viewSignInUp = false;
    },
    signOut() {
      this.$fire.auth
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.isLoggedIn = false;
        })
        .catch((error) => {
          // An error happened.
        });
      // this.$fire
      //   .auth
      //   .signOut()
      //   .then(() => {
      //     // Signed in
      //     // var user = userCredential.user;
      //     // ...
      //     // console.log(user);
      //       // Sign-out successful.
      //   })
      //   .catch((error) => {
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     // ..
      //   });
      // const user = this.$fire.auth.currentUser;

      // if (user) {
      //   // User is signed in, see docs for a list of available properties
      //   // https://firebase.google.com/docs/reference/js/firebase.User
      //   // ...
      // } else {
      //   // No user is signed in.
      // }
    },
    signIn() {
      console.log("unknown");
      this.viewSignInUp = true;
    },
  },
  mounted() {
    // const user = this.$fire.auth.currentUser;

    // if (user) {
    //   // User is signed in, see docs for a list of available properties
    //   // https://firebase.google.com/docs/reference/js/firebase.User
    //   // ...
    // } else {
    //   // No user is signed in.
    // }
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        let uid = user.uid;
        // ...
        console.log(uid);
        this.isLoggedIn = true;
        if (uid === "jl0JqEJTJrbWgY0zxO9voeHxJBS2") {
          this.isAdmin = true;
        }
      } else {
        // User is signed out
        // ...
        console.log("signed out");
      }
    });
    // this.readFromFirestore();
  },
  // created() {
  // this.readFromFirestore();
  // const user = this.$fire.auth.currentUser;

  // if (user) {
  //   // User is signed in, see docs for a list of available properties
  //   // https://firebase.google.com/docs/reference/js/firebase.User
  //   this.uid = user.uid;
  //   console.log(this.uid);
  //   // ...
  //   if (this.uid !== "jl0JqEJTJrbWgY0zxO9voeHxJBS2") {
  //     console.log(this.uid);
  //     this.$router.push({ path: "/" });
  //   }
  // } else {
  //   this.$router.push({ path: "/" });
  //   // No user is signed in.
  // }
  // },
};
</script>
