<template>
  <div class="">
    <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
      <div class="">
        <form
          @submit.prevent="signIn"
          class="color-dark bg-white w-full px-16 py-10"
        >
          <!-- rounded-md  -->
          <!-- <div class="sub-heading-box text-center py-2">
        <h2 class="sub-heading color-primary font-bold text-xl py-2">
          Sho_oebai
        </h2>
        <h3 class="sub-heading color-primary font-bold text-4xl py-2">
          Welcome Back
        </h3>
      </div> -->
          <!-- <div class="form-group my-4">
        <label for="email" class="capitalize font-medium">email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="border border-current px-4 py-2 block w-full"
          placeholder="email"
          v-model="email"
        />
      </div> -->
          <!-- <div class="form-group my-4">
        <button
          type="submit"
          class="color-dark bg-primary w-full capitalize font-medium px-4 py-2"
        >
          Sign in
        </button>
      </div> -->
            {{ getUser }}
            <!-- {{ setUser }} -->
          <!-- <p>
            {{ setUser.displayName }}
          </p>
          <p>
            {{ setUser.email }}
          </p> -->
          <p>
            {{ getUser.displayName }}
          </p>
          <p>
            {{ getUser.email }}
          </p>
          <!-- <p>
            {{ user.displayName }}
          </p>
          <p>
            {{ user.email }}
          </p> -->
          <div class="form-group my-4">
            <a
              href=""
              class="color-dark capitalize font-medium"
              @click.prevent="forgotPassword"
            >
              Forgot password?
            </a>
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
            <p class="">You can check out items in cart</p>

            <div class="py-2">
              <!-- <nuxt-link to="/Cart"></nuxt-link> -->
              <nuxt-link
                to="/Cart"
                class="border-2 font-medium text-2xl border-current px-4 py-2"
              >
                Checkout cart
                <!-- Shop Now -->
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="no-trans text-center" v-else>
          <div class="py-2">
            <p class="">You have not made any transactions yet</p>
            <p class="">And your cart is empty</p>

            <div class="py-2">
              <nuxt-link
                to="/shop"
                class="border-2 font-medium text-2xl border-current px-4 py-2"
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
      //   email: "",
      //   password: "",
      user: {},
      //   viewSignInUp: false
    };
  },
  computed: {    
    ...mapState(['setUser']),
    ...mapGetters(['getUser']),
  },
  created() {
    // console.log(this.getUser);
    // const user = this.$fire.auth.currentUser;
    // console.log(user);
    // if (user) {
    // }
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        // if (uid === "jl0JqEJTJrbWgY0zxO9voeHxJBS2") {
        //   this.isAdmin = true;
        // }
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const userId = user.uid;
        // this.user = user;
        //   this.isUser = true;
        // console.log(userId);
        // this.getUser(userId)
        console.log("signed in");
      } else {
        // User is signed out
        // ...
        console.log("signed out");
      }
    });
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
    signIn() {
      console.log(this.password);
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          console.log(user);
          this.updateSignInOut();
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