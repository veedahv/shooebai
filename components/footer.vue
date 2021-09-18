<template>
  <div class="bg-tertiary text-white">
    <div class="container py-5 px-4 mx-auto">
      <!-- <div>My footer</div> -->
      <div class="flex flex-wrap justify-between items-start">
        <!-- <div class="py-2 w-full md:w-2/4 lg:w-1/4"> -->
        <div class="py-2 w-full sm:w-2/4 lg:w-1/4">
          <nuxt-link to="/">
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
            <a href="tel:+">45765458</a>
          </p>
          <p class="mail">
            <a href="mailto:">axfjhhk</a>
          </p>
        </div>
        <!-- <div class="py-2 w-full md:w-2/5 lg:w-1/5"> -->
        <div class="py-2 w-1/2 sm:w-2/5 lg:w-1/5">
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
              <nuxt-link to="/Admin">Admin</nuxt-link>
            </li>
            <li class="foot-link">
              <!-- <li class="foot-link" v-if="isLoggedIn"> -->
              <nuxt-link to="/Profile">Profile</nuxt-link>
            </li>
          </ul>
        </div>
        <!-- <div class="py-2 w-full md:w-2/5 lg:w-1/5"> -->
        <div class="py-2 w-1/2 sm:w-2/5 lg:w-1/5">
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
              <nuxt-link to="/Contact.vue">Contact Us</nuxt-link>
            </li>
          </ul>
        </div>
        <!-- <div class="py-2 w-full md:w-2/4 lg:w-1/4">3</div> -->
        <div class="py-2 w-full sm:w-2/4 lg:w-1/4">
          <form @submit.prevent="subscribe" class="w-full">
            <!-- class="color-dark bg-white w-full px-16 py-10" -->
            <!-- rounded-md  -->
            <div class="sub-heading-box text-center py-2">
              <h2 class="sub-heading color-primary font-bold text-2xl">
                <!-- Sho_oebai -->
                <!-- <Logo></Logo> -->
                Subscribe to our newsletter
              </h2>
              <p class="sub-heading color-primary font-bold text-xl">
                <!-- Welcome Back -->
                Get daily foot care tips
              </p>
            </div>
            <div class="flex items-center">
              <div class="form-group w-full my-4">
                <input
                  type="email"
                  name="email"
                  class="border color-primary border-current px-4 py-2 h-full block w-full"
                  placeholder="Email"
                  aria-label="Email"
                  v-model="email"
                />
              </div>
              <div class="form-group my-4">
                <button
                  type="submit"
                  class="color-dark bg-primary w-full h-full capitalize font-medium px-4 py-2"
                >
                  subscribe
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
      const ref = this.$fire.firestore.collection("users").doc(userId).user;
      console.log(ref);
    },
  },
};
</script>

<style scoped>
.foot-link {
  line-height: 40px;
  /* line-height: 30px; */
}
</style>