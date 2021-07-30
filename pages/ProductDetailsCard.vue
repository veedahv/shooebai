<template>
  <div>
    <div class="product">
      <div class="flex justify-between py-2 absolute left-0 w-full top items-center">
      <div class="product-img">
        <img :src="product.productImage" alt="" />
      </div>
      <div class="product-info">
        <div class="product-details">
          <p class="product-name">{{ product.productName }}</p>
          <p class="product-price">{{ product.productPrice }}</p>
          <p class="product-descripion">{{ product.descripion }}</p>
        </div>
        <div class="product-btn-box">
          <button class="product-btn">
            <span v-if="product.fav">
            <i class="fa fa-heart" aria-hidden="true"></i>
            </span>
            <span v-else>
            <i class="fa fa-heart-o" aria-hidden="true"></i>
            </span>
          </button>
          <button class="product-btn">
              <span class="in" v-if="product.inShop">
              <i class="fa fa-cart-plus" aria-hidden="true"></i>
              </span>
              <span class="minus" v-else>
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </span>
          </button>
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
      flashSale: false,
      newProduct: false,
      rating: 0,
      tags: [],
      colors: [],
      sizes: [], -->
      <span class="flash-sale" v-if="product.flashSale">Flash sale</span>
      <span class="new-sale" v-if="product.newProduct">New</span>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      products: [],
      product: '',
    };
  },
  props: ["id"],
  methods: {
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
      this.products.forEach(prod => {
        if (prod.id === this.id) {
          this.product = prod;
        }
      });
      console.log(this.products);
    },
  },
  mounted() {
    this.readFromFirestore();
  },
};
</script>