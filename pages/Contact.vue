<template>
  <div class="">
    <form
      @submit.prevent="signIn"
      class="color-dark bg-white w-full px-16 py-10"
    >
      <!-- rounded-md  -->
      <div class="sub-heading-box text-center py-2">
        <h2 class="sub-heading color-primary font-bold text-xl py-2">
          Sho_oebai
        </h2>
        <h3 class="sub-heading color-primary font-bold text-4xl py-2">
          Welcome Back
        </h3>
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
        <button
          type="submit"
          class="color-dark bg-primary w-full capitalize font-medium px-4 py-2"
        >
          Sign in
        </button>
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
      <div class="form-group my-4">
        <p class="my-0">
          don't have an account?
          <a
            href=""
            class="color-dark capitalize font-medium"
            @click.prevent="goToSignUp"
          >
            create account
          </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      //   viewSignInUp: false
    };
  },
  methods: {
    updateSignInOut() {
      this.$emit("signInUp");
    },
    updateSignUp() {
      this.$emit("signUp");
    },
    goToSignUp() {
      this.updateSignUp();
    },
    getUser(userId) {
      const ref = this.$fire.firestore.collection("users").doc(userId).user;
      console.log(ref);
      // const newUser = {
      //   userId: userId,
      //   displayName: this.displayName,
      //   email: this.email,
      //   password: this.password,
      //   country: this.country
      // };
      // const document = {
      //   user: newUser,
      // };
      // ref.set(document);
    },
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