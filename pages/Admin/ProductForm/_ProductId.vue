<template>
  <div>
    <div class="container py-10 px-4 mx-auto">
      <div class="product">
        <form>
          <div class="form-group">
            <label for="product-name">Product Name:</label>
            <input
              class="border-2 border-red-500"
              type="text"
              name="product-name"
              id="product-name"
              v-model="productName"
            />
          </div>
          <div class="form-group">
            <label for="product-price">Product Price:</label>
            <input
              class="border-2 border-red-500"
              type="text"
              name="product-price"
              id="product-price"
              v-model="productPrice"
            />
          </div>
          <div class="form-group">
            <label for="product-qty">Available Quantity:</label>
            <input
              class="border-2 border-red-500"
              type="number"
              name="product-qty"
              id="product-qty"
              v-model="availableQuantity"
            />
          </div>
          <div class="form-group">
            <label for="product-discount">discount</label>
            <input
              type="number"
              class="border-2 border-red-500"
              name="product-discount"
              id="product-discount"
              v-model="discount"
            />
          </div>
          <div class="form-group">
            <label for="product-desc">Product descripion:</label>
            <textarea
              name="product-desc"
              class="border-2 border-red-500"
              id="product-desc"
              cols="39"
              rows="6"
              v-model="descripion"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="imageUrl">Image</label>
            <div v-if="productImage" class="productImgBox">
              <!-- A preview of the image. -->
              <img
                :src="productImage"
                class="w-24 md:w-32 h-auto object-cover inline-block"
                alt=""
              />
              <!-- Delete button for deleting the image. -->
              <!-- class="border-2 border-red-500" -->
              <button
                v-if="productImage"
                @click="deleteImage"
                :disabled="isDeletingImage"
                type="button"
                class="bg-red-500 border-red-300 text-white"
              >
                {{ isDeletingImage ? "Deleting..." : "Delete" }}
              </button>
            </div>
            <!-- Clicking this button triggers the "click" event of the file input. -->
            <button
              v-if="!productImage"
              @click="launchImageFile"
              :disabled="isUploadingImage"
              class="border-2 border-red-500"
              type="button"
            >
              {{ isUploadingImage ? "Uploading..." : "Upload" }}
            </button>
            <!-- This is the real file input element. -->
            <input
              ref="imageFile"
              @change.prevent="uploadImageFile($event.target.files)"
              type="file"
              accept="image/png, image/jpeg"
              class="hidden border-2 border-red-500"
            />
          </div>
          <div class="form-group">
            <h4 class="capitalize">colors</h4>
            <div class="form-group">
              <input
                type="checkbox"
                name="black"
                id="black"
                value="black"
                class="colors"
                v-model="colors"
              />
              <label for="black" class="capitalize">black</label>
            </div>
            <div class="form-group">
              <input
                type="checkbox"
                name="white"
                id="white"
                value="white"
                class="colors"
                v-model="colors"
              />
              <label for="white" class="capitalize">white</label>
            </div>
            <div class="form-group">
              <input
                type="checkbox"
                name="gray"
                id="gray"
                value="gray"
                class="colors"
                v-model="colors"
              />
              <label for="gray" class="capitalize">gray</label>
            </div>
            <div class="form-group">
              <input
                type="checkbox"
                name="pink"
                id="pink"
                value="pink"
                class="colors"
                v-model="colors"
              />
              <label for="pink" class="capitalize">pink</label>
            </div>
            <div class="form-group">
              <input
                type="checkbox"
                name="red"
                id="red"
                value="red"
                class="colors"
                v-model="colors"
              />
              <label for="red" class="capitalize">red</label>
            </div>
            <div class="form-group">
              <input
                type="checkbox"
                name="yellow"
                id="yellow"
                value="yellow"
                class="colors"
                v-model="colors"
              />
              <label for="yellow" class="capitalize">yellow</label>
            </div>
            <div class="form-group">
              <input
                type="checkbox"
                name="blue"
                id="blue"
                value="blue"
                class="colors"
                v-model="colors"
              />

              <label for="blue" class="capitalize">blue</label>
            </div>
            <div class="form-group">
              <input
                type="checkbox"
                name="purple"
                id="purple"
                value="purple"
                class="colors"
                v-model="colors"
              />
              <label for="purple" class="capitalize">purple</label>
            </div>
            <div class="form-group">
              <input
                type="checkbox"
                name="indigo"
                id="indigo"
                value="indigo"
                class="colors"
                v-model="colors"
              />
              <label for="indigo" class="capitalize">indigo</label>
            </div>
            <div class="form-group">
              <input
                type="checkbox"
                name="green"
                id="green"
                value="green"
                class="colors"
                v-model="colors"
              />
              <label for="green" class="capitalize">green</label>
            </div>
          </div>
          <div class="form-group">
            <label for="product-new">new:</label>
            <input
              type="checkbox"
              name="product-new"
              id="product-new"
              class="border-2 border-red-500"
              v-model="newProduct"
            />
          </div>
          <div class="form-group">
            <label for="product-rating">rating:</label>
            <select
              name="product-rating"
              class="border-2 border-red-500"
              id="product-rating"
              v-model="rating"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div class="form-group">
            <label for="product-tags">sizes:</label>
            <div class="tag-box">
              <span class="tags" v-for="(size, index) in sizes" :key="size">
                <span class="tag-name">{{ size }} | </span>
                <button
                  class="remove border-2 border-red-500"
                  @click="removeSize(size, index)"
                >
                  X
                </button>
              </span>
            </div>
            <input
              type="number"
              name="product-size"
              i="product-size"
              v-model="newSize"
            />
            <button
              type="button"
              class="border-2 border-red-500"
              @click="addSize"
            >
              Add tag
            </button>
          </div>
          <div class="form-group">
            <label for="product-tags">tags:</label>
            <div class="tag-box">
              <span class="tags" v-for="(tag, index) in tags" :key="tag">
                <span class="tag-name">{{ tag }} | </span>
                <button
                  class="remove border-2 border-red-500"
                  @click="removeTag(tag, index)"
                >
                  X
                </button>
              </span>
            </div>
            <input
              type="text"
              name="product-tags"
              i="product-tags"
              v-model="newTag"
            />
            <button
              type="button"
              class="border-2 border-red-500"
              @click="addTag"
            >
              Add tag
            </button>
          </div>
        </form>
      </div>
      <section class="container">
        <div>
          <div>
            <button @click="writeToFirestore">
              <span v-if="edit">save</span>
              <span v-else>add</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
// import { fireDb } from "../plugins/firebase.js";
// import "~/plugins/firebase.js";

export default {
  props: ["product"],
  data() {
    return {
      products: [],
      productImgObj: null,
      productId: "",
      productName: "",
      productPrice: "",
      availableQuantity: "",
      discount: "",
      productImage: "",
      // productImage: "https://firebasestorage.googleapis.com/v0/b/shooebai.appspot.com/o/images%2Fp1.jpg?alt=media&token=359a83a9-6f40-4259-b1f9-c8ecdf33b952",
      // productImage: "https://firebasestorage.googleapis.com/v0/b/shooebai.appspot.com/o/images%2Fp2.jpg?alt=media&token=31dbfecb-9a24-44a2-92a4-c4d5fe454597",
      descripion:
        "Lorem ipsum dolor, sit amet consectetur elit. Deserunt repellendus officiis id distinctio? At, eligendi! Id quas quo fuga omnis esse natus. Distinctio, rem eveniet similique. Iste eius enim suscipit quo nesciunt.",
      flashSale: false,
      newProduct: false,
      rating: 0,
      tags: ["puma", "jaguar"],
      newTag: "",
      colors: [],
      sizes: [],
      newSize: "",
      edit: false,
      isUploadingImage: false,
      isDeletingImage: false,
      // writeSuccessful: false,
      uid: null,
    };
  },
  methods: {
    removeSize(size, index) {
      if (this.sizes[index] === size) {
        this.sizes.splice(index, 1);
      } else {
        let found = this.tags.indexOf(size);
        this.sizes.splice(found, 1);
      }
      // this.tags.push(this.newTag);
    },
    addSize() {
      this.sizes.push(this.newSize);
      this.newSize = "";
    },
    removeTag(tag, index) {
      if (this.tags[index] === tag) {
        this.tags.splice(index, 1);
      } else {
        let found = this.tags.indexOf(tag);
        this.tags.splice(found, 1);
      }
      // this.tags.push(this.newTag);
    },
    addTag() {
      this.tags.push(this.newTag);
      this.newTag = "";
    },
    createId() {
      let result = [];
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (var i = 0; i < 10; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      return result.join("");
    },
    generateId() {
      // console.log(this.groups);
      console.log(this.createId());
      console.log(this.products);
      // this.groups.forEach((group) => {
      // console.log(group.groupId);
      if (this.$route.params.ProductId) {
        console.log(this.$route.params.ProductId);
        this.productId = this.$route.params.ProductId;
        //   }
        // } else (this.createId === group.groupId) {
        //   this.generateId();
      } else {
        this.productId = this.createId();
      }
      // });
    },
    resetProduct() {
      this.productName = "";
      this.productPrice = "";
      this.availableQuantity = "";
      this.discount = "";
      this.productImage = "";
      this.descripion =
        "Lorem ipsum dolor, sit amet consectetur elit. Deserunt repellendus officiis id distinctio? At, eligendi! Id quas quo fuga omnis esse natus. Distinctio, rem eveniet similique. Iste eius enim suscipit quo nesciunt.";
      this.flashSale = false;
      this.newProduct = false;
      this.rating = 0;
      this.tags = ["puma", "jaguar"];
      this.colors = [];
      this.sizes = [];
    },
    addProduct() {
      const newProduct = {
        productId: this.productId,
        productName: this.productName,
        productPrice: +this.productPrice,
        availableQuantity: +this.availableQuantity,
        discount: +this.discount,
        productImage: this.productImage,
        descripion: this.descripion,
        newProduct: this.newProduct,
        rating: +this.rating,
        tags: this.tags,
        colors: this.colors,
        sizes: this.sizes,
      };
    },
    saveProduct() {
      this.products.forEach((prod) => {
        // console.log(prod.productId);
        if (this.productId === prod.productId) {
          console.log(prod);
          console.log(prod.productId);
          prod.productId = this.productId;
          prod.productName = this.productName;
          prod.productPrice = +this.productPrice;
          prod.availableQuantity = +this.availableQuantity;
          prod.discount = +this.discount;
          prod.productImage = this.productImage;
          prod.descripion = this.descripion;
          prod.newProduct = this.newProduct;
          prod.rating = +this.rating;
          prod.tags = this.tags;
          prod.colors = this.colors;
          prod.sizes = this.sizes;
        }
      });
    },
    async writeToFirestore() {
      this.generateId();
      const ref = this.$fire.firestore.collection("products").doc("product");
      console.log(ref);
      if (this.$route.params.ProductId) {
        // console.log(this.products);
        // this.productId = this.$route.params.ProductId;
        this.saveProduct();
      } else {
        // this.products = [newProduct];
        this.addProduct();
        // this.resetProduct();
      }
      const document = {
        products: this.products,
      };
      try {
        await ref.set(document);
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      //   this.writeSuccessful = true;
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
      console.log(this.products);
      if (this.$route.params.ProductId) {
        console.log(this.$route.params.ProductId);
        console.log(this.products);
        this.products.forEach((prod) => {
          console.log(prod.productId);
          if (this.$route.params.ProductId === prod.productId) {
            console.log(prod.productId);
            this.productId = prod.productId;
            this.productName = prod.productName;
            this.productPrice = prod.productPrice;
            this.availableQuantity = prod.availableQuantity;
            this.discount = prod.discount;
            this.productImage = prod.productImage;
            this.descripion = prod.descripion;
            this.flashSale = prod.flashSale;
            this.newProduct = prod.newProduct;
            this.rating = prod.rating;
            this.tags = prod.tags;
            this.colors = prod.colors;
            this.sizes = prod.sizes;
          }
        });
      }
    },
    launchImageFile() {
      // Trigger the file input click event.
      this.$refs.imageFile.click();
    },
    uploadImageFile(files) {
      console.log("affgf");
      const storage = this.$fire.storage;
      if (!files.length) {
        return;
      }
      const file = files[0];
      if (!file.type.match("image.*")) {
        alert("Please upload an image.");
        return;
      }
      const metadata = {
        contentType: file.type,
      };
      this.isUploadingImage = true;
      // Create a reference to the destination where we're uploading
      // the file.
      // const storage = this.$firebase.storage();
      const imageRef = storage.ref(`images/${file.name}`);
      const uploadTask = imageRef
        .put(file, metadata)
        .then((snapshot) => {
          // Once the image is uploaded, obtain the download URL, which
          // is the publicly accessible URL of the image.
          return snapshot.ref.getDownloadURL().then((url) => {
            return url;
          });
        })
        .catch((error) => {
          console.error("Error uploading image", error);
        });
      // When the upload ends, set the value of the blog image URL
      // and signal that uploading is done.
      uploadTask.then((url) => {
        this.productImage = url;
        this.isUploadingImage = false;
      });
    },
    deleteImage() {
      this.$fire.storage
        .refFromURL(this.productImage)
        .delete()
        .then(() => {
          this.productImage = "";
        })
        .catch((error) => {
          console.error("Error deleting image", error);
        });
    },
  },
  // mounted() {
  //   this.readFromFirestore();
  //   // console.log(this.$route.params.ProductId);
  //   // console.log(this.$route.params.id);
  //   // console.log(this.$route);
  // },
  created() {
    this.readFromFirestore();
      if (this.$route.params.ProductId) {
        // console.log(this.products);
        // this.productId = this.$route.params.ProductId;
        this.edit = true;
      // } else {
      //   // this.products = [newProduct];
      //   this.addProduct();
        // this.resetProduct();
      }
    // console.log(this.$route.params.ProductId);
    // console.log(this.$route.params.id);
    // console.log(this.$route);
  },
  //   beforeMount() {
  //     const user = this.$fire.auth.currentUser;

  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       this.uid = user.uid;
  //       console.log(this.uid);
  //       // ...
  //       if (this.uid !== "jl0JqEJTJrbWgY0zxO9voeHxJBS2") {
  //         console.log(this.uid);
  //         this.$router.push({ path: "/" });
  //       }
  //     } else {
  //       this.$router.push({ path: "/" });
  //       // No user is signed in.
  //     }
  //   },
};
</script>

<style scoped>
.productImgBox {
  max-width: 400px;
}
.productImgBox img {
  width: 100%;
}
</style>