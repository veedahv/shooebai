<template>
  <div>
    <div class="product">
      <div class="flex flex-wrap justify-between py-2 w-full items-start">
        <div class="product-img w-full md:w-6/12">
          <img :src="product.productImage" alt="" />
          <div class="">
            <div class="flex justify-start items-center">
              <span class="">Available colors</span>
              <span
                class="colors h-7 w-7 m-1 inline-block"
                v-for="color in product.colors"
                :key="color"
              >
                <input
                  type="radio"
                  name="color"
                  :id="color"
                  :value="color"
                  class="color hidden"
                  checked
                />
                <!-- <label :for="color" class="cursor inline-block h-3.5 w-3.5 rounded-full p-1"> -->
                <label
                  :for="color"
                  class="cursor border-2 border-transparent block h-full w-full rounded-full p-1"
                  :class="`text-${color}-500`"
                >
                  <!-- <label :for="color" class="cursor inline-block rounded-full p-1"> -->
                  <span
                    class="block w-full h-full rounded-full bg-gradient-to-r text-black from-gray-900 to-black"
                    v-if="color === 'black'"
                  ></span>
                  <span
                    class="block w-full h-full text-white rounded-full bg-gradient-to-r from-white to-gray-50"
                    v-else-if="color === 'white'"
                  ></span>
                  <span
                    class="block w-full h-full bg-gradient-to-r rounded-full"
                    :class="`text-${color}-500 from-${color}-200 to-${color}-700`"
                    v-else
                  ></span>
                </label>
              </span>
            </div>
          </div>
          <div class="">
            <div class="flex justify-start items-center">
              <span class="">Available sizes</span>
              <select name="" id="">
                <option
                  class="sizes h-7 w-7 m-1 inline-block"
                  v-for="size in product.sizes"
                  :key="size"
                  value="size"
                >
                  {{ size }}
                </option>
              </select>
              <!-- <span
                class="sizes h-7 w-7 m-1 inline-block"
                v-for="size in product.sizes"
                :key="size"
              >
                <input
                  type="radio"
                  name="sizes"
                  :id="size"
                  :value="size"
                  class="size hidden"
                  checked
                />
                <label
                  :for="size"
                  class="cursor border-2 border-transparent block h-full w-full rounded-full p-1"
                >
                  {{ size }}
                </label>
              </span> -->
            </div>
          </div>
        </div>
        <div class="product-info w-full md:w-5/12">
          <div class="product-details">
            <div class="rating">
              <span
                class="colors h-7 w-7 m-1 inline-block"
                v-for="n in product.rating"
                :key="n"
              >
                <i class="fas fa-star text-sm text-yellow-500"></i>
              </span>
            </div>
            <p class="product-name">{{ product.productName }}</p>
            <!-- <p class="product-price">{{ product.productPrice }}</p> -->
            <div class="" v-if="product.discount == 0">
              <p class="product-price font-medium">
                {{ product.productPrice }}
              </p>
            </div>
            <div class="" v-else>
              <del>
                <p class="product-price font-medium">
                  {{ product.productPrice }}
                </p>
              </del>
              <p class="product-price font-medium">{{ discount }}</p>
            </div>
            <p class="product-descripion text-sm">{{ product.descripion }}</p>
          </div>
          <p class="qty">Only {{ product.availableQuantity }} left in stock</p>
          <div class="product-btn-box">
            <div class="product-btn-box">
              <button class="product-btn uppercase" v-if="product.fav">
                <span>
                  <span> remove from wishlist </span>
                  <span>
                    <i class="fas fa-bookmark"></i>
                    <!-- <i class="fas text-3xl fa-bookmark"></i> -->
                  </span>
                </span>
              </button>
              <button class="product-btn uppercase" v-else>
                <span>
                  <span> add to wishlist </span>
                  <span>
                    <i class="fas fa-bookmark"></i>
                  </span>
                </span>
              </button>
            </div>
            <div class="product-btn-box">
              <button class="product-btn uppercase px-2.5 py-2 bg-tertiary color-primary">
                <span class="in">
                  <span> remove from cart </span>
                  <i class="fas fa-shopping-bag"></i>
                </span>
              </button>
              <button class="product-btn uppercase px-2.5 py-2 bg-primary color-tertiary">
                <span class="minus">
                  <span> add to cart </span>
                  <i class="fas fa-shopping-bag"></i>
                  <!-- <i class="fa fa-shopping-cart" aria-hidden="true"></i> -->
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- productId: "",
      productName: "",
      productPrice: "",
      availableQuantity: "",
      discount: "",
      productImage: "",
      descripion: "",
      newProduct: false, ProductDetailsCard.vue
      rating: 0,
      tags: [],
      colors: [],
      sizes: [], -->
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      products: [],
      product: "",
      user: "",
    };
  },
  props: ["id"],
  computed: {
    discount() {
      let discountVal =
        this.product.productPrice -
        (this.product.discount * this.product.productPrice) / 100;
      return discountVal;
    },
  },
  methods: {
    // colorBg(color) {
    //   return ''
    //     },
    addToWishlist() {},
    removeToWishlist() {},
    async readFromFirestore() {
      const ref = this.$fire.firestore.collection("products").doc("product");
      let snap;
      try {
        snap = await ref.get();
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      this.products = snap.data().products;
      this.products.forEach((prod) => {
        console.log(prod.productId);

        // if (prod.productId.toLowerCase() === this.id.toLowerCase()) {
        if (prod.productId === this.id) {
          this.product = prod;
          console.log(prod.productId);
          console.log(this.id);
        }
      });
    },
  },
  created() {
    this.readFromFirestore();
    const user = this.$fire.auth.currentUser;

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // this.user = user.uid;
      this.user = user;
      console.log(this.user);
      // ...
    } else {
      // this.$router.push({ path: "/" });
      // No user is signed in.
    }
  },
  // mounted() {
  //   this.readFromFirestore();
  // },
};
</script>

<style scoped>
.color:checked ~ label {
  /* border: 2px solid var(--dark); */
  border: 2px solid currentColor;
}
</style>