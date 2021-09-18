<template>
  <div class="">
    <div class="container py-10 px-4 mx-auto">
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
          <p>
            {{ user.displayName }}
          </p>
          <p>
            {{ user.email }}
          </p>
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
    <div class="container py-10 px-4 mx-auto">
      <div class="color-dark bg-white w-full px-16 py-10">
        Phone number 
        Country'
        Transaction history 
        Items PricesTotal Transaction date 
        You have not made any transactions yet
        And your cart is empty Shop now
        You can check out items in cart
        Checkout cart
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   email: "",
      //   password: "",
      user: {},
      //   viewSignInUp: false
    };
  },
  created() {
    const user = this.$fire.auth.currentUser;
    console.log(user);
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const userId = user.uid;
      //   this.isUser = true;
      console.log(userId);
      this.getUser(userId);
    }
    //   this.getUser()
  },
  methods: {
    async getUser(userId) {
      console.log(userId);
      const ref = this.$fire.firestore.collection("users").doc(userId);
      console.log(ref);
      let snap;
      try {
        snap = await ref.get();
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      this.user = snap.data().user;
      console.log(this.user);
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