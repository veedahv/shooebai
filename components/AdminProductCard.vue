<template>
  <div>
    <div class="product">
      <div class="flex flex-wrap justify-between py-2 w-full items-start">
        <div class="product-img w-4/12">
          <!-- <nuxt-link :to="'/Admin/ProductForm/' + product.productId"> -->
          <img :src="product.productImage" alt="" />
          <!-- </nuxt-link> -->
        </div>
        <!-- <div class="product-info w-full md:w-7/12"> -->
        <div class="product-info w-7/12">
          <div class="product-details">
            <p class="product-name">{{ product.productName }}</p>
          </div>
          <div class="product-btn-box">
            <nuxt-link :to="'/Admin/ProductForm/' + product.productId">
              <button class="product-btn uppercase">
                <span>
                  <span> edit </span>
                  <span>
                    <i class="fas text-sm fa-bookmark"></i>
                    <!-- <i class="fas text-3xl fa-bookmark"></i> -->
                  </span>
                </span>
              </button>
            </nuxt-link>
            <button class="product-btn uppercase">
              <span class="in">
                <span> delete </span>
                <i class="fas text-sm fa-shopping-bag"></i>
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
  //   data() {
  //     return {
  //       products: [],
  //       product: "",
  //     };
  //   },
  //   props: ["id"],
  props: ["product"],
  //   computed: {
  //     discount() {
  //       let discountVal =
  //         this.product.productPrice -
  //         (this.product.discount * this.product.productPrice) / 100;
  //       return discountVal;
  //     },
  //   },
  //   methods: {
  //     // async readFromFirestore() {
  //     //   const ref = this.$fire.firestore.collection("products").doc("product");
  //     //   let snap;
  //     //   try {
  //     //     snap = await ref.get();
  //     //   } catch (e) {
  //     //     // TODO: error handling
  //     //     console.error(e);
  //     //   }
  //     //   this.products = snap.data().products;
  //     //   this.products.forEach((prod) => {
  //     //     console.log(prod.productId);

  //     //     // if (prod.productId.toLowerCase() === this.id.toLowerCase()) {
  //     //     if (prod.productId === this.id) {
  //     //       this.product = prod;
  //     //       console.log(prod.productId);
  //     //       console.log(this.id);
  //     //     }
  //     //   });
  //     // },
  //   },
  //   mounted() {
  //     this.readFromFirestore();
  //   },
};
</script>

<style scoped>
.color:checked ~ label {
  /* border: 2px solid var(--dark); */
  border: 2px solid currentColor;
}
</style>
