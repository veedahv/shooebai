<template>
  <div class="bg-tertiary text-white">
    <div class="container lg:max-w-5xl py-5 px-4 mx-auto">
      <!-- <div>My footer</div> -->
      <div class="flex flex-wrap justify-between items-start">
        <!-- <div class="py-2 w-full md:w-2/4 lg:w-1/4"> -->
        <!-- <div class="py-2 w-full sm:w-2/4 lg:w-1/4"> -->
        <div class="py-2 w-full sm:w-2/4 lg:w-1/3">
          <nuxt-link to="/" class="mb-4">
            <!-- Sho_oebai -->
            <Logo></Logo>
          </nuxt-link>
          <p class="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus veniam nemo natus libero vero dolor incidunt doloribus
            repellat quidem. Repellat eligendi rerum itaque perspiciatis?
            Consectetur omnis nostrum sit libero. Dolor.
          </p>
          <p class="tel">
            <span>call us on </span>
            <!-- <a href="tel:+" class="bg-tertiary text-white color-dark">45765458</a> -->
                <a href="tel:+234100566890" class="text-sm">+234100566890</a>
          </p>
          <p class="mail">
            <span>send a mail to: </span>
            <!-- <a href="mailto:" class="bg-tertiary text-white color-dark">axfjhhk</a> -->
                <a href="mailto: support@shooebai.com" class="text-sm">support@shooebai.com</a>
          </p>
        </div>
        <!-- <div class="py-2 w-full md:w-2/5 lg:w-1/5"> -->
        <!-- <div class="py-2 w-1/2 sm:w-2/5 lg:w-1/5"> -->
        <!-- <div class="py-2 w-1/2 sm:w-2/5 lg:w-1/6">
          <ul>
            <li class="foot-link">
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li class="foot-link">
              <nuxt-link to="/Cart">Cart</nuxt-link>
            </li>
            <li class="foot-link">
              <nuxt-link to="/Wishlist">Wishlist</nuxt-link>
            </li>
            <li class="foot-link">
          <nuxt-link to="/shop">Shop</nuxt-link>
            </li>
            <li class="foot-link">
              <nuxt-link to="/Profile">Profile</nuxt-link>
            </li>
          </ul>
        </div> -->
        <!-- <div class="py-2 w-full md:w-2/5 lg:w-1/5"> -->
        <!-- <div class="py-2 w-1/2 sm:w-2/5 lg:w-1/5"> -->
        <div class="py-2 w-1/2 sm:w-2/5 lg:w-1/6">
          <ul>
            <li class="foot-link">
              <nuxt-link to="/faq">FAQ</nuxt-link>
            </li>
            <li class="foot-link">
              <nuxt-link to="/About">About Us</nuxt-link>
            </li>
            <li class="foot-link">
              <nuxt-link to="/Terms">Terms</nuxt-link>
            </li>
            <li class="foot-link">
              <nuxt-link to="/Privacy&Policy">Privacy & Policy</nuxt-link>
            </li>
            <li class="foot-link">
              <nuxt-link to="/Contact">Contact Us</nuxt-link>
            </li>
          </ul>
        </div>
        <!-- <div class="py-2 w-full md:w-2/4 lg:w-1/4">3</div> -->
        <!-- <div class="py-2 w-full sm:w-2/4 lg:w-1/4"> -->
        <div class="py-2 w-full sm:w-2/4 lg:w-1/3">
          <form @submit.prevent="subscribe" class="w-full">
            <!-- class="color-dark bg-white w-full px-16 py-10" -->
            <!-- rounded-md  -->
            <div class="sub-heading-box text-center py-2">
              <h2 class="sub-heading color-primary font-bold text-2xl">
                <!-- Sho_oebai -->
                <!-- <Logo></Logo> -->
                Subscribe to our newsletter
              </h2>
              <!-- <p class="sub-heading color-light font-bold text-xl"> -->
              <p class="sub-heading color-light text-xl">
                <!-- Welcome Back -->
                To get deals and fashion tips.
              </p>
            </div>
            <div class="border color-primary border-current subscribe-box flex my-4 items-stretch">
              <div class="form-group w-full">
                <input
                  type="email"
                  name="email"
                  class="border-0 outline-none px-4 py-2 h-full block w-full"
                  placeholder="Email"
                  aria-label="Email"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="color-dark bg-primary h-full capitalize font-medium px-4 py-1"
                >
                <i class="fas fa-paper-plane"></i>
                <!-- mmmmm -->
                  <!-- subscribe -->
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";
export default {
  components: { Logo },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    subscribe() {
      // const ref = this.$fire.firestore.collection("users").doc(userId).user;
      // console.log(ref);
      console.log(this.email);
    },
  },
};
</script>

<style scoped>
.foot-link {
  line-height: 45px;
  /* line-height: 30px; */
}
/* .subscribe */
.form-group {
  flex: auto;
}
</style>