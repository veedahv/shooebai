<template>
  <div class="inset-0 fixed bg-black bg-opacity-30 z-20">
    <div class="container p-5 mx-auto">
      <div class="max-w-screen-sm mx-auto h-full">
        <div class="flex justify-center w-full">
          <form
            @submit.prevent="createUser"
            class=" color-dark bg-white w-full px-16 py-10"
          >
            <div class="sub-heading-box text-center py-2">
              <h2 class="sub-heading color-primary font-bold text-xl py-2">Sho_oebai</h2>
              <h3 class="sub-heading color-primary font-bold capitalize text-4xl py-2">create account</h3>
            </div>
            <div class="form-group my-4">
              <label for="email" class="capitalize font-medium">email</label>
              <input
                type="email"
                name="email"
                id="email"
                class="border px-4 py-2 block w-full"
                placeholder="email"
                v-model="email"
              />
            </div>
            <div class="form-group my-4">
              <label for="password" class="capitalize font-medium"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                class="border px-4 py-2 block w-full"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div class="form-group my-4">
              <!-- rounded-md -->
              <button
                type="submit"
                class=" color-dark bg-primary w-full capitalize font-medium px-4 py-2"
              >
                Sign up
              </button>
            </div>
            <div class="form-group my-4">
              <button
                type="button"
                class="color-dark capitalize font-medium"
              >
                Forgot password?
              </button>
            </div>
            <div class="form-group my-4">
              <button
                type="button"
                class="color-dark capitalize font-medium"
                @click="goToSignIn"
              >
                login account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: "",
      // viewSignInUp: false
    };
  },
  methods: {
    updateSignInOut() {
    //   this.$emit('update', this.viewSignInUp);
      this.$emit('signInUp'); 
    },
    updateSignIn() {
      // console.log('hmm');
    //   this.$emit('update', this.viewSignInUp);
      this.$emit('signIn'); 
    },
    goToSignIn() {
      console.log('hmm');
    //   this.$emit('update', this.viewSignInUp);
      this.updateSignIn();
    },
    createUser() {
      this.$fire.auth
        .createUserWithEmailAndPassword(this.email, this.password)
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
    // async createUser() {
    //   try {
    //     await this.$fire.auth.createUserWithEmailAndPassword(
    //       'foo@foo.foo',
    //       'test'
    //     )
    //   } catch (e) {
    //     handleError(e)
    //   }
    // }
  },
};
</script>