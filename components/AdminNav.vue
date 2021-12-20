<template>
  <div class="bg-white z-50 h-full relative">
    <div class="container py-2 pl-4 mx-auto">
      <!-- <div class="flex justify-between items-center"> -->
      <div>
        <!-- <div>
          <nuxt-link class="logo" to="/">
            <Logo></Logo>
          </nuxt-link>
        </div> -->
        <div class="menu">
          <ul class="py-14 flex flex-col gap-y-2 items-start">
            <li class="nav-li w-full">
              <nuxt-link
                class="font-medium block w-full text-lg nav-link color-tertiary"
                to="/Admin"
              >
                <div
                  class="link-container w-full px-4 py-2 flex justify-start items-center gap-3"
                >
                  <div class="">
                    <i class="fas fa-home text-lg"></i>
                  </div>
                  <div class="hidden lg:inline-block">Dashboard</div>
                </div>
              </nuxt-link>
            </li>
            <li class="nav-li w-full">
              <nuxt-link
                class="font-medium block w-full text-lg nav-link color-tertiary"
                to="/Admin/Users"
              >
                <div
                  class="link-container w-full px-4 py-2 flex justify-start items-center gap-3"
                >
                  <div class="">
                    <i class="fas fa-users text-lg"></i>
                  </div>
                  <div class="hidden lg:inline-block">Users</div>
                </div>
              </nuxt-link>
            </li>
            <li class="nav-li w-full">
              <nuxt-link
                class="font-medium block w-full text-lg nav-link color-tertiary"
                to="/Admin"
              >
                <div
                  class="link-container w-full px-4 py-2 flex justify-start items-center gap-3"
                >
                  <div class="">
                    <i class="fas fa-database text-lg"></i>
                  </div>
                  <div class="hidden lg:inline-block">Transactions</div>
                </div>
              </nuxt-link>
            </li>
            <li class="nav-li w-full">
              <nuxt-link
                class="font-medium block w-full text-lg nav-link color-tertiary"
                to="/Admin"
              >
                <div
                  class="link-container w-full px-4 py-2 flex justify-start items-center gap-3"
                >
                  <div class="">
                    <i class="fas fa-comments text-lg"></i>
                  </div>
                  <div class="hidden lg:inline-block">Reviews</div>
                </div>
              </nuxt-link>
            </li>
            <li class="nav-li w-full">
              <nuxt-link
                class="font-medium block w-full text-lg nav-link color-tertiary"
                to="/Admin"
              >
                <div
                  class="link-container w-full px-4 py-2 flex justify-start items-center gap-3"
                >
                  <div class="">
                    <i class="fas fa-chart-bar text-lg"></i>
                  </div>
                  <div class="hidden lg:inline-block">Statistics</div>
                </div>
              </nuxt-link>
            </li>
            <li class="nav-li w-full">
              <nuxt-link
                class="font-medium block w-full text-lg nav-link color-tertiary"
                to="/Admin"
              >
                <div
                  class="link-container w-full px-4 py-2 flex justify-start items-center gap-3"
                >
                  <div class="">
                    <i class="fab fa-hubspot text-lg"></i>
                  </div>
                  <div class="hidden lg:inline-block">subscribers</div>
                </div>
              </nuxt-link>
            </li>
            <li class="nav-li w-full">
              <nuxt-link
                class="font-medium block w-full text-lg nav-link color-tertiary"
                to="/Admin/Products"
              >
                <div
                  class="link-container w-full px-4 py-2 flex justify-start items-center gap-3"
                >
                  <div class="">
                    <i class="fas fa-warehouse text-lg"></i>
                  </div>
                  <div class="hidden lg:inline-block">Products</div>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Logo from "./Logo";
import SignInOut from "./SignInOut";

export default {
  components: {
    Logo,
    SignInOut,
  },
  data() {
    return {
      searchTag: "",
      viewSearch: true,
      viewSignInUp: false,
      viewUserBox: true,
      country: null,
      countryObj: {},
    };
  },
  computed: {
    ...mapState([
      "countryName",
      "countryFlag",
      "currencyRate",
      "isAdmin",
      "user",
      "isLoggedIn",
    ]),
  },
  methods: {
    // toggleMenu() {
    // 	show.value ? enableScroll() : disableScroll()
    // 	show.value = !show.value
    // },
    navigate(link) {
      // toggleMenu()
      // this.$route.push(link);
      this.$refs["menuShow"].checked = false;
      this.$nuxt.$options.router.push(link);
      // this.menuShow = false;
      // console.log(this.menuShow);
      // this.$router.push({path: this.localePath('search'), query: {q: this.q}});
    },
    ...mapActions(["getLocation", "logout", "authUser"]),
    signInUp() {
      this.viewSignInUp = false;
    },
    signOut() {
      this.logout();
    },
    signIn() {
      this.viewSignInUp = true;
    },
    search() {
      console.log("hmmph");
      this.viewSearch = true;
    },
  },
  async created() {
    this.getLocation();
    this.authUser();
  },
};
</script>

<style scoped>
a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}
a.nuxt-link-exact-active .link-container {
  background-color: var(--light);
  border-radius: 50px 0px 0px 50px;
}
/* .activate:checked ~ .input-btn-box {
  width: 200px;
  display: flex;
  opacity: 1;
}
.input-btn-box {
  transition: all 5s ease-in-out;
}
.search-input {
  outline: none;
} */
@media (max-width: 767px) {
  .hamburg {
    display: inline-block;
  }

  /* .menu {
    max-height: 0px;
    transition: padding 0.3s ease-out, max-height 0.3s ease-out;
  } */
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
