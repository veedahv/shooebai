<template>
  <div>
    <section>
      <div class="container py-10 px-4 mx-auto">
        <div class="">
          <div class="sub-heading-box text-center py-5 relative">
              <!-- class="border-0 bg-black w-full h-px inset-y-1/2 left-0 absolute" -->
            <hr
              class="border-0 bg-white w-full h-px inset-y-1/2 left-0 absolute"
            />
            <h2 class="sub-heading bg-white mx-auto py-2 px-1 w-min relative">
              Trending
            </h2>
          </div>
          <div class="">
              <ProductDetailsCard :id="id"></ProductDetailsCard>
            <!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div class="" v-for="product in products" :key="product.id"> -->
                <!-- <ProductCard :product="product"></ProductCard>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </section>
    <!-- <section>
      <div class="container py-10 px-4 mx-auto">
        <div class="">
          <div class="sub-heading-box text-center py-5 relative">
            <hr
              class="border-0 bg-white w-full h-px inset-y-1/2 left-0 absolute"
            />
            <h2 class="sub-heading bg-white mx-auto py-2 px-1 w-min relative">
              Trending
            </h2>
          </div>
          <div class="">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div class="" v-for="product in products" :key="product.id">
                <ProductCard :product="product"></ProductCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>


<script>
import ProductDetailsCard from '../../../components/ProductDetailsCard'
export default {
  components: { ProductDetailsCard },
  data() {
    return {
    //   products: [],
    //   product: "",
      id: "",
    };
  },
  //   props: [""],
//   methods: {
//     async readFromFirestore() {
//       const ref = this.$fire.firestore.collection("products").doc("product");
//       let snap;
//       try {
//         snap = await ref.get();
//       } catch (e) {
//         // TODO: error handling
//         console.error(e);
//       }
//       this.products = snap.data().products;
//       this.products.forEach((prod) => {
//         if (prod.id === this.id) {
//           this.product = prod;
//         }
//       });
//       console.log(this.products);
//     },
//   },
  // created() {
  //     console.log(this.id);
  //   // this.readFromFirestore();
  // },
  // mounted() {
  //     console.log(this.id);
  //   // this.readFromFirestore();
  // },
  // beforeMount() {
  //   this.id = this.$route.params.id;
  // },
  created() {
    this.id = this.$route.params.id;
  },
};
</script>