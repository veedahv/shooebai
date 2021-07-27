<template>
  <div>
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
            cols="30"
            rows="10"
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
          <label for="product-sale">Flash Sale:</label>
          <select
            name="product-sale"
            class="border-2 border-red-500"
            id="product-sale"
            v-model="flashSale"
          >
            <option value="1">False</option>
            <option value="2">True</option>
          </select>
        </div>
        <div class="form-group">
          <label for="product-new">new:</label>
          <select
            name="product-new"
            id="product-new"
            class="border-2 border-red-500"
            v-model="newProduct"
          >
            <option value="1">False</option>
            <option value="2">True</option>
          </select>
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
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div class="form-group">
          <label for="product-tags">tags:</label>
          <div class="tag-box">
            <span class="tags">
              <span class="tag-name">bag | </span>
              <button class="remove border-2 border-red-500">X</button>
            </span>
          </div>
          <input type="text" name="product-tags" i="product-tags" />
          <button type="button" class="border-2 border-red-500">Add tag</button>
        </div>
      </form>
    </div>
    <section class="container">
      <div>
        <h2>Write to Firestore.</h2>
        <div>
          <button @click="writeToFirestore" :disabled="writeSuccessful">
            <span v-if="!writeSuccessful">Write now</span>
            <span v-else>Successful!</span>
          </button>
        </div>
      </div>
    </section>
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
      descripion: "",
      flashSale: "",
      newProduct: "",
      rating: 0,
      tags: [],
      // newProduct: {
      // },
      blog: {},
      isUploadingImage: false,
      isDeletingImage: false,
      writeSuccessful: false,
    };
  },
  methods: {
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
      // this.groups.forEach((group) => {
      // console.log(group.groupId);
      // if (this.createId === group.groupId) {
      //   this.generateId();
      // } else {
      this.productId = this.createId();
      // }
      // });
    },
    async writeToFirestore() {
      // console.log("hfgh");
      // const ref = fireDb.collection("test").doc("test");
      this.generateId();
      const ref = this.$fire.firestore.collection("products").doc("product");
      console.log(ref);
      const newProduct =  {
          productId: this.productId,
          productName: this.productName,
          productPrice: this.productPrice,
          availableQuantity: this.availableQuantity,
          discount: this.discount,
          productImage: this.productImage,
          descripion: this.descripion,
          flashSale: this.flashSale,
          newProduct: this.newProduct,
          rating: this.rating,
          tags: this.tags,
        };
        this.products.push(newProduct);
      // const document = {
      //   text: "This is a test message.",
      // };
      const document = {
        products: this.products,
      };
      try {
        await ref.set(document);
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      this.writeSuccessful = true;
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
    },
    launchImageFile() {
      // Trigger the file input click event.
      this.$refs.imageFile.click();
    },
    uploadImageFile(files) {
      console.log('affgf');
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
      // this.$firebase
      //   .storage()
      //   .refFromURL(this.blog.imageUrl)
      //   .delete()
      //   .then(() => {
      //     this.blog.imageUrl = "";
      //   })
      //   .catch((error) => {
      //     console.error("Error deleting image", error);
      //   });
    },
  },
  mounted() {
    this.readFromFirestore();
    //   const ref = this.$fire.firestore.collection("products").doc("product");
    // // const messagesRef = db.database().ref("messages");
    // console.log(this.groups);
    // messagesRef.on("value", (snapshot) => {
    //   const data = snapshot.val();
    //   let groupsArr = [];
    //   Object.keys(data).forEach((key) => {
    //     groupsArr.push({
    //       id: key,
    //       groupId: data[key].groupId,
    //       hostname: data[key].hostname,
    //       groupName: data[key].groupName,
    //       groupMessages: data[key].groupMessages,
    //     });
    //   });
    // });
  },
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