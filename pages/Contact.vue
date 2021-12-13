<template>
  <div class="">
      <section class="heading-section">
        <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
          <div class="text-center">
            <div class="heading-box py-8 relative">
              <h2
                class="heading mx-auto text-white py-5 px-1 w-max font-bold text-3xl md:text-4xl"
              >
                <!-- class="heading mx-auto color-light py-5 px-1 w-max font-bold text-5xl" -->
                <!-- ABOUT US -->
                WE ARE HERE TO LISTEN
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section>
    <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
      <div class="">
      </div>
      <div class="flex flex-wrap justify-between items-start">
        <!-- <div class="py-2 w-full md:w-2/4 lg:w-1/4"> -->
        <div class="py-2 w-full md:w-5/12">
          <div class="sub-heading-box text-center">
            <h3
              class="sub-heading color-primary uppercase font-bold text-xl py-2"
            >
              You can reach out to us through
            </h3>
          </div>
          <div class="my-2">
            <div
              class="box bg-white py-8 px-5 my-4 w-full flex justify-center items-center"
            >
              <!-- Contact: -->
              <div class="text-center">
                <!-- <div class="text-center capitalize uppercase"> -->
                <i class="fas fa-2x fa-map-marked-alt color-secondary"></i>
                <!-- <h2 class="font-medium text-4xl my-2.5">Made 4000 </h2> -->
                <h3 class="font-bold text-xl my-2.5 color-tertiary">Our Address</h3>
                <p class="text-md color-dark">Sorry we have no physical address as we operate remotely. Thank you!</p>
              </div>
            </div>
            <div
              class="box bg-white py-6 px-5 my-4 w-full flex justify-center items-center"
            >
              <div class="text-center">
                <!-- <div class="text-center capitalize uppercase"> -->
                <i class="fas fa-2x fa-phone color-secondary"></i>
                <!-- <h2 class="font-medium text-4xl my-2.5">Made 4000 </h2> -->
                <h3 class="font-bold text-xl my-2.5 color-tertiary">Our Phone number</h3>
                <a href="tel:+234100566890" class="text-md color-dark">+234100566890</a>
              </div>
            </div>
            <div
              class="box bg-white py-6 px-5 my-4 w-full flex justify-center items-center"
            >
              <div class="text-center">
                <!-- <div class="text-center capitalize uppercase"> -->
                <i class="fas fa-2x fa-envelope color-secondary"></i>
                <!-- <h2 class="font-medium text-4xl my-2.5">Made 4000 </h2> -->
                <h3 class="font-bold text-xl my-2.5 color-tertiary">Our Email</h3>
                <a href="mailto: support@shooebai.com" class="text-md color-dark">support@shooebai.com</a>
              </div>
            </div>
            <div
              class="box bg-white py-6 px-5 my-4 w-full flex justify-center items-center"
            >
              <div class="text-center">
                <!-- <div class="text-center capitalize uppercase"> -->
                <i class="fas fa-2x fa-business-time color-secondary"></i>
                <!-- <h2 class="font-medium 3 text-4xl my-2.5">Made 4000 </h2> -->
                <h3 class="font-bold text-xl my-2.5 color-tertiary">Our Availability</h3>
                <ul class="list-disc ml-2.5 list-outside text-left">
                  <!-- <li class="text-xl color-dark">6am to 10pm from Monday to Friday and</li> -->
                  <li class="text-md color-dark">6am to 10pm from Mondays to Fridays</li>
                  <li class="text-md color-dark">10am to 4pm on Saturdays & Sundays</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="py-2 w-full md:w-2/5 lg:w-1/5"> -->
        <!-- <div class="py-2 w-full md:w-2/4 lg:w-1/4">3</div> -->
        <div class="py-2 w-full md:w-1/2">
          <form
            @submit.prevent="onSubmit"
            class="color-dark bg-white my-2 w-full px-8 py-10"
          >
            <!-- rounded-md  -->
            <div class="sub-heading-box text-center py-2">
              <h3
                class="sub-heading color-primary uppercase font-bold text-xl py-2"
              >
                Or send us a message
              </h3>
            </div>
            <div class="form-group my-4">
              <label for="name" class="capitalize font-medium">name</label>
              <input
                type="text"
                name="name"
                id="name"
                class="border border-current px-4 py-2 block w-full"
                placeholder="name"
                v-model="name"
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
              <label for="subject" class="capitalize font-medium"
                >subject</label
              >
              <input
                type="text"
                name="subject"
                id="subject"
                class="border border-current px-4 py-2 block w-full"
                placeholder="subject"
                v-model="subject"
              />
            </div>
            <div class="form-group my-4">
              <label for="message" class="capitalize font-medium"
                >message</label
              >
              <textarea
                name="message"
                id="message"
                cols="30"
                v-model="message"
                class="border border-current px-4 py-2 block w-full"
                placeholder="message"
                rows="10"
              ></textarea>
            </div>
            <div class="form-group my-4">
              <button
                type="submit"
                class="color-dark bg-primary w-full capitalize font-medium px-4 py-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
      //   password: "",
      user: {},
      //   viewSignInUp: false
    };
  },
  created() {
    // const user = this.$fire.auth.currentUser;
    // console.log(user);
    // if (user) {
    //   // User is signed in, see docs for a list of available properties
    //   // https://firebase.google.com/docs/reference/js/firebase.User
    //   const userId = user.uid;
    //   //   this.isUser = true;
    //   console.log(userId);
    //   this.getUser(userId);
    // }
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
    onSubmit() {
      console.log("lalalal");
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


<style scoped>
.heading-section {
  background: rgba(0, 0, 0, .3) url('~/assets/images/contact.jpg') no-repeat bottom 40% center / cover;
  background-blend-mode: overlay;
}
</style>