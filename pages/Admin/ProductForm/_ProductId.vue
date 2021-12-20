<template>
  <div>
    <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
      <div class="">
        <div class="sub-heading-box py-3">
          <nuxt-link class="font-bold text-lg nav-link color-dark" to="/"
            >Sho_oebai</nuxt-link
          >
          >>
          <nuxt-link
            class="font-bold text-base nav-link color-tertiary"
            to="/Admin"
            >Admin</nuxt-link
          >
          >>
          <nuxt-link
            class="font-bold text-base nav-link color-tertiary"
            to="/Admin/Products"
            >Products</nuxt-link
          >
          >>
          <nuxt-link
            class="font-bold text-base nav-link color-tertiary"
            to="/Admin/ProductForm/"
            >Add product</nuxt-link
          >
          <!-- <nuxt-link
            class="font-bold text-base nav-link color-tertiary"
            :to="'/Admin/ProductForm/' + product.productId"
            ></nuxt-link
          > -->
          <!-- <nuxt-link class="font-semibold text-base nav-link color-tertiary" :to="'/ProductDetail/' + id">
            {{ product.productName }}
          </nuxt-link> -->
        </div>
        <div class="">
          <form>
            <div class="flex flex-wrap md:flex-nowrap items-start gap-10">
              <div class="flex-none w-full md:flex-auto md:w-1/2">
                <div class="form-group w-full">
                  <label for="imageUrl">Image</label>
                  <div
                    class="w-full productImgBox border-2 border-red-500 bg-gray-200 flex items-center justify-center"
                  >
                    <div v-if="productImage" class="w-full productImgBox">
                      <img
                        :src="productImage"
                        class="h-auto object-cover inline-block"
                        alt=""
                      />
                      <button
                        v-if="productImage"
                        @click="deleteImage"
                        :disabled="isDeletingImage"
                        type="button"
                        class="bg-red-500 border-red-300 text-white"
                      >
                        {{ isDeletingImage ? "Deleting..." : "Delete" }}
                        <i class="fas fa-trash-alt text-sm"></i>
                      </button>
                    </div>
                    <button
                      v-if="!productImage"
                      @click="launchImageFile"
                      :disabled="isUploadingImage"
                      class="text-2xl font-medium text-white flex items-center gap-3"
                      type="button"
                    >
                      <!-- class="border-2 border-red-500" -->
                      <i class="fas fa-cloud-upload-alt text-xl"></i>
                      <span>

                      {{ isUploadingImage ? "Uploading..." : "Upload" }}
                      </span>
                    </button>
                    <input
                      ref="imageFile"
                      @change.prevent="uploadImageFile($event.target.files)"
                      type="file"
                      accept="image/png, image/jpeg"
                      class="hidden border-2 border-red-500"
                    />
                  </div>
                </div>
                <div class="form-group my-3">
                  <h4 class="capitalize text-xl font-bold ">available colors</h4>
                  <div class="tag-box flex flex-wrap gap-1 my-2">
                    <span
                      class="tags rounded-full px-2 bg-gray-50"
                      v-for="(color, index) in colors"
                      :key="color"
                    >
                      <span class="tag-name capitalize text-sm">{{ color }}</span>
                      <button
                        class=""
                        @click="removeColor(color, index)"
                      >
                      <i class="fas fa-times text-sm"></i>
                      </button>
                    </span>
                  </div>
                  <div
                    class="form-group relative"
                  >
                  <label for="" class="block w-full bg-white color-dark text-md font-medium py-1.5 px-2">
                    Select colors available
                  </label>
                  <div
                    class="dropdown-container hidden absolute left-0 right-0 top-full"
                  >
                  <div
                    class="dropdown-options bg-white border-b border-gray-100 top-full px-2"
                    v-for="color in allColors"
                    :key="color"
                  >
                    <input
                      type="checkbox"
                      :name="color"
                      :id="color"
                      :value="color"
                      class="colors hidden"
                      v-model="colors"
                    />
                    <!-- <i class="far fa-check-square"></i>
                    <i class="fas fa-check-square"></i>
                    <i class="far fa-square"></i>
                    <i class="fas fa-square"></i> -->
                    <label :for="color" class="color-checkbox inline-block">&nbsp;</label>
                    <label :for="color" class="capitalize text-base inline-block">{{ color }}</label>
                  </div>
                  </div>
                  </div>
                </div>
                <div class="flex gap-5">
                  <div class="form-group flex-auto w-1/2">
                    <label for="product-new">new:</label>
                    <input
                      type="checkbox"
                      name="product-new"
                      id="product-new"
                      class="border-2 border-red-500"
                      v-model="newProduct"
                    />
                  </div>
                  <div class="form-group flex-auto w-1/2">
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
                </div>
              </div>
              <div class="flex-none w-full md:flex-auto md:w-1/2">
                <div class="form-group">
                  <label for="product-name">Product Name:</label>
                  <input
                    class="border-2 border-red-500 px-3.5 py-2 w-full"
                    type="text"
                    name="product-name"
                    id="product-name"
                    v-model="productName"
                  />
                </div>
                <div class="form-group">
                  <label for="product-price">Product Price:</label>
                  <input
                    class="border-2 border-red-500 px-3.5 py-2 w-full"
                    type="text"
                    name="product-price"
                    id="product-price"
                    v-model.number="productPrice"
                  />
                </div>
                <div class="flex gap-5">
                  <div class="form-group w-1/2 flex-auto">
                    <label for="product-qty">Available Quantity:</label>
                    <input
                      class="border-2 border-red-500 px-3.5 py-2 w-full"
                      type="number"
                      name="product-qty"
                      id="product-qty"
                      v-model="availableQuantity"
                    />
                  </div>
                  <div class="form-group w-1/2 flex-auto">
                    <label for="product-discount">discount</label>
                    <input
                      type="number"
                      class="border-2 border-red-500 px-3.5 py-2 w-full"
                      name="product-discount"
                      id="product-discount"
                      v-model="discount"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="product-desc">Product descripion:</label>
                  <textarea
                    name="product-desc"
                    class="border-2 border-red-500 px-3.5 py-2 w-full"
                    id="product-desc"
                    cols="39"
                    rows="6"
                    v-model="descripion"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="product-tags capitalize">sizes:</label>
                  <div class="tag-box">
                    <span
                      class="tags"
                      v-for="(size, index) in sizes"
                      :key="size"
                    >
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
                    class=" px-3.5 py-2"
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
                  <label for="product-tags">Search Tags:</label>
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
                    class=" px-3.5 py-2"
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
              </div>
            </div>
          </form>
        </div>
        <div>
          <div>
            <button @click="writeToFirestore">
              <span v-if="edit">save</span>
              <span v-else>add</span>
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="">
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
                v-model.number="productPrice"
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
              <div
                v-if="productImage"
                class="w-24 md:w-32 h-20 md:h-24 productImgBox"
              >
                <img
                  :src="productImage"
                  class="h-auto object-cover inline-block"
                  alt=""
                />
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
              <button
                v-if="!productImage"
                @click="launchImageFile"
                :disabled="isUploadingImage"
                class="border-2 border-red-500"
                type="button"
              >
                {{ isUploadingImage ? "Uploading..." : "Upload" }}
              </button>
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
              <div class="form-group" v-for="color in allColors" :key="color">
                <input
                  type="checkbox"
                  :name="color"
                  :id="color"
                  :value="color"
                  class="colors"
                  v-model="colors"
                />
                <label :for="color" class="capitalize">{{ color }}</label>
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
              <label for="product-tags capitalize">sizes:</label>
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
              <label for="product-tags">Search Tags:</label>
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
        <div>
          <div>
            <button @click="writeToFirestore">
              <span v-if="edit">save</span>
              <span v-else>add</span>
            </button>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>


<script>
export default {
  layout: "admin",
  props: ["product"],
  data() {
    return {
      products: [],
      productImgObj: null,
      idArr: [],
      productId: "",
      productName: "productName",
      productPrice: 58000,
      availableQuantity: 8,
      discount: 0,
      productImage: "",
      descripion:
        "Lorem ipsum dolor, sit amet consectetur elit. Deserunt repellendus officiis id distinctio? At, eligendi! Id quas quo fuga omnis esse natus. Distinctio, rem eveniet similique. Iste eius enim suscipit quo nesciunt.",
      flashSale: false,
      newProduct: false,
      rating: 5,
      tags: ["puma", "jaguar"],
      newTag: "",
      colors: [],
      allColors: [
        "black",
        "white",
        "gray",
        "pink",
        "red",
        "yellow",
        "blue",
        "purple",
        "indigo",
        "green",
      ],
      sizes: [44, 45, 46],
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
        this.products.forEach((prod) => {
          // console.log(prod.productId);
          if (this.productId === prod.productId) {
          }
        });
        if (this.idArr.includes(this.createId)) {
          this.generateId();
        } else {
          this.productId = this.createId();
        }
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
      this.tags = [];
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
      this.products.push(newProduct);
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
        this.resetProduct();
        console.log(this.products);
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
      this.products.forEach((prod) => {
        this.idArr.push(prod.productId);
      });
      console.log(this.idArr);
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
  created() {
    this.readFromFirestore();
    if (this.$route.params.ProductId) {
      this.edit = true;
    }
  },
};
</script>

<style scoped>
.productImgBox {
  /* max-width: 400px; */
  min-height: 220px;
}
.productImgBox img {
  width: 100%;
}
.color-checkbox:after {
  content: "\f0c8";
  font-family: "Font Awesome 5 Free";
  font-weight: 400;
  /* font-weight: 900; */
  font-size: 18px;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  /* color: #777; */
  /* float: right; */
  /* margin-left: 5px; */
  display: inline-flex;
}
.colors:checked ~ .color-checkbox:after {
  font-weight: 900;
  content: "\f14a";
}
.accordion:after {
  content: "\f067"; /*  character for "plus" sign (+) */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 13px;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  /* color: #777; */
  float: right;
  margin-left: 5px;
  display: inline-flex;
}
.accordion-check:checked + .accordion:after {
  content: "\f068"; /* Unicode character for "minus" sign (-) */
}
</style>