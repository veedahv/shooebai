<template>
  <div class="inset-0 fixed bg-black bg-opacity-30 z-20">
    <div class="container p-5 mx-auto">
      <div class="max-w-screen-sm mx-auto h-full">
        <div class="flex justify-center w-full">
          <Signup></Signup>
          <Signin></Signin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Signin from './signin'
import Signup from './signup'
export default {
  components: {
    Signin, Signup },
  data() {
    return {
      signIn: true
    };
  },
  methods: {
    updateSignInOut() {
    //   this.$emit('update', this.viewSignInUp);
      this.$emit('signInUp');
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
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //   });
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