<template>
  <div class="bg-white z-50 relative">
    <div class="container lg:max-w-5xl py-2 px-4 mx-auto">
      <div class="flex justify-between items-center">
        <div>
          <nuxt-link class="logo" to="/">
            <Logo></Logo>
          </nuxt-link>
        </div>
        <label
          for="hamburg-check"
          class="hamburg cursor-pointer inline-block md:hidden"
        >
          <i class="fas fa-bars text-xl"></i>
        </label>
        <input
          type="checkbox"
          class="hamburg-check hidden"
          id="hamburg-check"
          ref="menuShow"
        />
        <div
          class="menu py-0 md:py-2 bg-white overflow-hidden flex flex-col md:flex-row gap-x-5 gap-y-10 items-center absolute top-full left-0 right-0 md:relative"
        >
          <a
            class="font-medium text-lg nav-link color-tertiary cursor-pointer"
            @click="navigate('/')"
          >
            Home
          </a>
          <a
            class="font-medium text-lg nav-link color-tertiary cursor-pointer"
            @click="navigate('/shop')"
          >
            Shop
          </a>
          <a
            class="font-medium text-lg nav-link color-tertiary cursor-pointer"
            @click="navigate('/Cart')"
          >
            Cart
          </a>
          <a
            class="font-medium text-lg nav-link color-tertiary cursor-pointer"
            @click="navigate('/Wishlist')"
          >
            Wishlist
          </a>
        </div>
        <!-- <div class="flex justify-between w-8 items-center"> -->
        <div class="flex justify- items-center">
          <div class="relative">
            <label
              class="relative border border-gray-400 bg-gray-400 search-label flex justify-center items-center w-9 h-9 p-1.5 rounded-full"
              for="search"
              aria-label="search bar"
              @click="viewSearch = false"
            >
              <i class="fas fa-search"></i>
            </label>
            <input
              type="checkbox"
              class="hidden activate"
              :checked="!viewSearch"
            />
           <div
              class="input-btn-box p-1 border border-gray-400 bg-gray-100 opacity-0 rounded-full absolute z-50 items-center w-0 inset-y-0 right-0"
              :hidden="viewSearch"
            >
              <input
                type="text"
                class="w-full px-2 search-input bg-transparent"
                name="search"
                id="search"
                v-model="searchTag"
              />
              <!-- class="absolute z-50 mt-4 bg-black w-36 right-0 top-full" -->
              <!-- 3 -->
              <button class="w-auto rounded-full px-1.5 bg-white">
                <i class="fas fa-search" @click="search"></i>
              </button>
            </div>
            <datalist id="searchTags">
              <option value="abxhj"></option>
              <option value="xgyhg"></option>
              <option value="mnbsqr"></option>
              <option value="asshjt"></option>
            </datalist>
          </div>
          <div class="relative">
            <div>
              <button
                class="ml-2 border border-gray-400 bg-gray-400 flex justify-center items-center w-9 h-9 rounded-full"
                @click="viewUserBox = !viewUserBox"
              >
                <span v-if="isAdmin && isLoggedIn">
                  <!-- <span v-if="adminState"> -->
                  <i class="fas fa-user-cog"></i>
                </span>
                <span v-else-if="isLoggedIn">
                  <i class="fas fa-user"></i>
                  <!-- <i class="fas fa-user-circle"></i> -->
                </span>
                <span v-else>
                  <i class="fas fa-user-slash"></i>
                </span>
              </button>
              <div
                class="inset-0 fixed bg-black bg-opacity-0 z-20"
                @click.self="viewUserBox = true"
                :hidden="viewUserBox"
              ></div>
              <!-- class="absolute z-50 mt-4 bg-gray-500 w-36 right-0 top-full" -->
              <!-- class="absolute z-50 mt-4 bg-black w-36 right-0 top-full" -->
              <div
                class="absolute z-50 mt-4 bg-white w-36 right-0 top-full"
                :hidden="viewUserBox"
              >
                <ul class="w-full">
                  <li v-if="isAdmin && isLoggedIn">
                    <!-- <li v-if="adminState"> -->
                    <nuxt-link
                      class="px-3 inline-block py-2 w-full"
                      to="/Admin/Products"
                      >Admin</nuxt-link
                    >
                  </li>
                  <li v-if="isLoggedIn">
                    <nuxt-link
                      class="px-3 inline-block py-2 w-full"
                      to="/Profile"
                      >Profile</nuxt-link
                    >
                  </li>
                  <!-- <li>
                    <nuxt-link to="/Profile"
                      ><span class="px-3 inline-block py-2 w-full"
                        >Profile</span
                      >
                    </nuxt-link>
                  </li> -->
                  <li class="px-3 py-2 w-full">
                    <button @click="signOut" v-if="isLoggedIn">
                      <i class="fas fa-sign-in-alt"></i>
                      <span>Logout</span>
                    </button>
                    <button @click="signIn" v-else>
                      <i class="fas fa-sign-out-alt"></i>
                      <span>Login</span>
                    </button>
                  </li>
                  <!-- <li class=""> -->
                  <li class="flex justify-start px-3 py-2 w-full items-center">
                    <!-- <img
                      class="w-1/5"
                      :src="countryFlag"
                      :alt="countryName + ' flag'"
                    /> -->
                    <!-- <span class="fi fi-gr"></span> -->
                    <!-- <span class="fi" :class="'fi-' + country.flag"></span> -->
                    <span class="fi" :class="'fi-' + countryFlag"></span>
                    <!-- {{ countryFlag }} -->
                    <!-- <img
                      class="w-1/5"
                      :src="countryObj.countryFlag"
                      :alt="countryObj.countryName + ' flag'"
                    /> -->
                    <span class="mx-2.5 font-bold">
                      {{ countryName }}
                      <!-- {{ countryObj.countryName }} -->
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SignInOut
      v-on:signInUp="viewSignInUp = !viewSignInUp"
      v-if="viewSignInUp"
    ></SignInOut>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Logo from "./Logo";
import SignInOut from "./SignInOut";
// import Signup from './signup'
// import Signin from './signin'
export default {
  components: {
    Logo,
    SignInOut,
    // Signup,
    // Signin
  },
  data() {
    return {
      searchTag: "",
      viewSearch: true,
      viewSignInUp: false,
      viewUserBox: true,
      countryObj: {},
    };
  },
  computed: {
    ...mapState(["countryName", "countryFlag", "currencyRate", "isAdmin", "user", "isLoggedIn", "country"]),
  },
  methods: {
    // toggleMenu() {
    // 	show.value ? enableScroll() : disableScroll()
    // 	show.value = !show.value
    // },
    navigate(link) {
      this.$refs['menuShow'].checked = false;
      this.$nuxt.$options.router.push(link);
    },
    ...mapActions(["getLocation", "logout", "authUser"]),
    signInUp() {
      this.viewSignInUp = false;
    },
    signOut() {
      this.logout();
    },
    signIn() {
      // console.log("unknown");
      this.viewSignInUp = true;
    },
    search() {
      console.log("hmmph");
      this.viewSearch = true;
    },
  },
  created() {
    this.getLocation();
    this.authUser();
  },
};
</script>

<style scoped>
input::-webkit-calendar-picker-inicator {
  display: none;
}
.activate:checked ~ .input-btn-box {
  width: 200px;
  display: flex;
  opacity: 1;
}
.input-btn-box {
  transition: all 5s ease-in-out;
}
.search-input {
  outline: none;
}
@media (max-width: 767px) {
  .hamburg {
    display: inline-block;
  }

  .menu {
    max-height: 0px;
    /* background-color: white; */
    transition: padding 0.3s ease-out, max-height 0.3s ease-out;
  }
  .hamburg-check:checked + .menu {
    /* height: auto; */
    /* height: 600px; */
    /* height: max-content; */
    max-height: 600px;
    padding: 20px;
    /* background-color: blue; */
  }
}
</style>
