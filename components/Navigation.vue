<template>
  <div class=" bg-white">
    <div class="container py-2 mx-auto">
      <div class="flex justify-between items-center">
        <div>
          <nuxt-link to="/">Sho_oebai</nuxt-link>
        </div>
        <div class="py-2">
          <nuxt-link to="/">ball</nuxt-link> |
          <nuxt-link to="/Admin">Admin</nuxt-link> | 
          <button @click="signOut" v-if="isLoggedIn">logout</button>
          <button @click="signIn" v-else>login</button>
        </div>
        <div>3</div>
      </div>
    </div>
    <!-- <Signin v-on:signInUp="signInUp" v-if="viewSignInUp"></Signin> -->
    <!-- <Signin v-on:signInUp="viewSignInUp = !viewSignInUp" v-if="viewSignInUp"></Signin> -->
    <SignInOut v-on:signInUp="viewSignInUp = !viewSignInUp" v-if="viewSignInUp"></SignInOut>
    <!-- <Signup v-on:update="viewSignInUp" v-if="viewSignInUp"></Signup> -->
  </div>
</template>

<script>
import SignInOut from './SignInOut'
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
      viewSignInUp: false,
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
      console.log('unknown');
      this.viewSignInUp = true;
      // this.$fire.auth
      //   .signOut()
      //   .then(() => {
      //     // Sign-out successful.
      //     this.isLoggedIn = false;
      //   })
      //   .catch((error) => {
      //     // An error happened.
      //   });
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
        var uid = user.uid;
        // ...
        console.log(uid);
        this.isLoggedIn = true;
      } else {
        // User is signed out
        // ...
        console.log("signed out");
      }
    });
    // this.readFromFirestore();
  },
};
</script>
