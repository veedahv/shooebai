<template>
  <div class="">
    <form
      @submit.prevent="createUser"
      class="color-dark bg-white w-full px-10 py-8"
    >
      <div class="sub-heading-box text-center py-2">
        <h2 class="sub-heading color-primary font-bold text-xl py-2">
          Sho_oebai
        </h2>
        <h3
          class="sub-heading color-primary font-bold capitalize text-4xl py-2"
        >
          create account
        </h3>
      </div>
      <div class="form-group my-4">
        <label for="fullname" class="capitalize font-medium">Fullname</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          class="border border-current px-4 py-2 block w-full"
          placeholder="Fullname"
          v-model="displayName"
        />
      </div>
      <div class="form-group my-4">
        <label for="email" class="capitalize font-medium">email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="border border-current px-4 py-2 block w-full"
          placeholder="email"
          v-model="email"
        />
      </div>
      <div class="form-group my-4">
        <label for="password" class="capitalize font-medium">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="border border-current px-4 py-2 block w-full"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="form-group my-4">
        <!-- rounded-md -->
        <button
          type="submit"
          class="color-dark bg-primary w-full capitalize font-medium px-4 py-2"
        >
          Sign up
        </button>
      </div>
      <div class="form-group my-4">
        <p class="my-0">
          Already have an account?
          <a
            href=""
            class="color-dark capitalize font-medium"
            @click.prevent="goToSignIn"
          >
            login account
          </a>
        </p>
      </div>
      <div class="form-group my-4">
        <p class="my-0">
          By creating an account, you agree to Sho_oebai's Conditions of Use and
          Privacy Notice.
        </p>
      </div>
    </form>
  </div>
</template>

<script>
// import * as admin from "firebase-admin";
export default {
  data() {
    return {
      country: "",
      displayName: "",
      email: "",
      password: "",
      fav: [],
      cart: [],
      // viewSignInUp: false
    };
  },
  methods: {
    updateSignInOut() {
      this.$emit("signInUp");
    },
    updateSignIn() {
      this.$emit("signIn");
    },
    goToSignIn() {
      this.updateSignIn();
    },
    storeUser(userId) {
      const ref = this.$fire.firestore.collection("users").doc(userId);
      console.log(ref);
      const newUser = {
        userId: userId,
        displayName: this.displayName,
        role: "guest",
        email: this.email,
        country: this.country,
        cart: this.cart,
        fav: this.fav
      };
      const document = {
        user: newUser,
      };
      ref.set(document);
    },
    createUser() {
      // displayName
      // admin.auth
      //   .createUser(this.email, this.password)
      //   .then((userCredential) => {
      //     // Signed in
      //     var user = userCredential.user;
      //     user.updateProfile({
      //       displayName: this.displayName,
      //     });

      //     // ...
      //     console.log(user);
      //     this.storeUser(user.uid);
      //     this.updateSignInOut();
      //   })
      //   .catch((error) => {
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     // ..
      //   });
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
          this.updateSignInOut();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    },
  },
};
</script>