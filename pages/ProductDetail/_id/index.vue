<template>
  <div>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="">
          <div class="sub-heading-box py-3">
            <!-- <nuxt-link
            class="font-bold text-lg nav-link color-dark"
            to="/"
            >Sho_oebai</nuxt-link
          >
          >> -->
            <nuxt-link
            class="font-bold text-xl nav-link color-tertiary"
            to="/shop"
            >Shop</nuxt-link
          >
          >>
          <nuxt-link class="font-semibold text-base nav-link color-tertiary" :to="'/ProductDetail/' + id">
            {{ product.productName }}
          </nuxt-link>
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
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="">
          <div class="">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div
                class="h-full"
                v-for="product in similarProductArr"
                :key="product.id"
              >
                <ProductCard class="h-full" :product="product"></ProductCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import ProductDetailsCard from "../../../components/ProductDetailsCard";
export default {
  components: { ProductDetailsCard },
  data() {
    return {
      //   products: [],
      product: {},
      products: [],
      id: "",
      similarArr: [],
      similarProductArr: [],
    };
  },
  methods: {
    similarProduct() {
      // console.log(this.products);
      // console.log(this.similarArr);
      this.similarArr
        .sort(function (a, b) {
          return a.match - b.match;
        })
        .reverse();
      // console.log(this.similarArr);
      this.similarArr.forEach((simProd) => {
        this.products.forEach((prod) => {
          // console.log(prod.productId);

          // if (prod.productId.toLowerCase() === this.id.toLowerCase()) {
          if (prod.productId === simProd.id) {
            this.similarProductArr.push(prod);
            // this.product = prod;
            // console.log(prod.productId);
            // console.log(this.id);
          }
        });
      });
      // this.similarProductArr = this.products.slice(0, 3);
      this.similarProductArr = this.similarProductArr.slice(0, 3);
      // console.log(this.similarProductArr);
    },
    editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue =
                  Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    },
    similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (
        (longerLength - this.editDistance(longer, shorter)) /
        parseFloat(longerLength)
      );
    },
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
        // if (prod.productId.toLowerCase() === this.id.toLowerCase()) {
        if (prod.productId === this.id) {
          this.product = prod;
          // console.log(prod.productId);
          // console.log(this.id);
          console.log(this.product);
        }
      });
      // console.log(this.products);
      this.products.forEach((element) => {
        if (element.productId !== this.id) {
          // console.log(element.productName);
          // console.log(element.tags);
          // console.log(this.product.tags);
          // console.log(
          //   this.similarity(element.productName, this.product.productName)
          // );
          let tagMatch = 0;
          this.product.tags.forEach((tag) => {
            if (element.tags.includes(tag)) {
              tagMatch++;
            }
          });
          // console.log(tagMatch);
          let prodMatchPerc =
            this.similarity(element.productName, this.product.productName) +
            tagMatch;
          let prodMatch = {
            id: element.productId,
            match: prodMatchPerc,
          };
          // console.log(prodMatch);
          this.similarArr.push(prodMatch);
        }
      });
      this.similarProduct();
    },
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
  created() {
    this.id = this.$route.params.id;
    this.readFromFirestore();
  },
};
</script>