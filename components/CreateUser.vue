<template>
  <div class="">
    <form
      @submit.prevent="createUser"
      class="color-dark bg-white w-full px-4 py-5"
    >
      <div class="flex flex-wrap -m-2">
        <!-- <div class="sub-heading-box w-full p-2 text-center">
            <div class="w-full flex items-center justify-between">
          <h2 class="sub-heading font-bold text-xl">
            Create User
          </h2>
                <button>x</button>
            </div>
        </div> -->
        <div class="form-group w-1/2 p-2">
          <div class="">
            <label for="role" class="capitalize font-medium">user role</label>
            <input
              type="text"
              id="role"
              class="border border-current px-4 py-2 block w-full"
              placeholder="User role"
              v-model="role"
            />
          </div>
        </div>
        <div class="form-group w-1/2 p-2">
          <div class="">
            <label for="fullname" class="capitalize font-medium"
              >Fullname</label
            >
            <input
              type="text"
              id="fullname"
              class="border border-current px-4 py-2 block w-full"
              placeholder="Fullname"
              v-model="displayName"
            />
          </div>
        </div>
        <div class="form-group w-1/2 p-2">
          <div class="">
            <label for="email" class="capitalize font-medium">email</label>
            <input
              type="email"
              id="email"
              class="border border-current px-4 py-2 block w-full"
              placeholder="email"
              v-model="email"
            />
          </div>
        </div>
        <div class="form-group w-1/2 p-2">
          <div class="">
            <label for="password" class="capitalize font-medium"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              class="border border-current px-4 py-2 block w-full"
              placeholder="Password"
              v-model="password"
            />
          </div>
        </div>
        <div class="form-group w-1/2 p-2">
          <div class="">
            <!-- rounded-md color-primary -->
            <button
              type="submit"
              class="w-full bg-primary text-white capitalize font-medium px-4 py-1.5"
            >
              Create user
            </button>
          </div>
        </div>
        <div class="form-group w-1/2 p-2">
          <div class="">
            <!-- rounded-md -->
            <button
              type="submit"
              class="w-full bg-red-500 text-white capitalize font-medium px-4 py-1.5"
            >
                <button>Cancel</button>
            </button>
          </div>
        </div>
        <!-- <div class="form-group my-4">
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
      </div> -->
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
      date: "",
      role: "",
      password: "",
      //   fav: [],
      //   cart: [],
      // viewSignInUp: false
    };
  },
  methods: {
    // updateSignInOut() {
    //   this.$emit("signInUp");
    // },
    // updateSignIn() {
    //   this.$emit("signIn");
    // },
    // goToSignIn() {
        //   this.updateSignIn();
    // },
    storeUser(userId) {
      this.$emit("showForm");
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getVarDate();
      console.log(day);
      console.log(month);
      console.log(year);
      // console.log(date);
    //   const ref = this.$fire.firestore.collection("users").doc(userId);
      //   console.log(ref);
      const newUser = {
        userId: userId,
        date: date,
        displayName: this.displayName,
        role: this.role,
        email: this.email,
        country: this.country,
        cart: [],
        fav: [],
      };
      console.log(newUser);
      const document = {
        user: newUser,
      };
        // ref.set(document);
    },
    createUser() {
      this.$fire.auth
        // .createUserWithEmailAndPassword(this.email, this.password)
        .createUser({
    email: 'user@example.com',
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: '',
    disabled: false,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });
        // .createUserWithEmailAndPassword(this.email, this.password)
        // .then((userCredential) => {
        //   // Signed in
        //   var user = userCredential.user;
        //   user.updateProfile({
        //     displayName: this.displayName,
        //   });

        //   // ...
        //   console.log(user);
        //   this.storeUser(user.uid);
        //   //   this.updateSignInOut();
        // })
        // .catch((error) => {
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   // ..
        // });
    },
  },
};
</script>