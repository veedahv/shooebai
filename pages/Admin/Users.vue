<template>
  <div>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="">
          <div class="sub-heading-box text-center py-5 relative">
            <h2 class="sub-heading bg-white mx-auto py-2 px-1 w-min relative">
              Trending
            </h2>
          </div>
          <div class="">
            <nuxt-link :to="'/Admin/ProductForm'">
              <p class="product-name">Add</p>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="">
          <div class="bg-white">
            <div class="">
              <table class="w-full text-left">
                <thead>
                  <tr>
                    <th class="text-base font-medium">S/N</th>
                    <th class="text-base font-medium">User Id</th>
                    <th class="text-base font-medium">User Name</th>
                    <th class="text-base font-medium">User Email</th>
                    <th class="text-base font-medium">Role</th>
                    <th class="text-base font-medium">Country</th>
                    <th class="text-base font-medium">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, i) in users" :key="user.userId">
                    <td class="text-sm">{{ i + 1 }}</td>
                    <td class="text-sm">{{ user.userId }}</td>
                    <td class="text-sm">{{ user.displayName }}</td>
                    <td class="text-sm">{{ user.email }}</td>
                    <td class="text-sm">{{ user.role }}</td>
                    <td class="text-sm">{{ user.country }}</td>
                    <td class="text-sm">
                      <div class="product-btn-box flex justify-center gap-2">
                        <nuxt-link
                          class="product-btn py-1 inline-block"
                          :to="'/Admin/ProductForm/'"
                        >
                          <!-- :to="'/Admin/ProductForm/' + product.productId" -->
                          <!-- <button> -->
                          <span>
                            <i class="fas fa-edit text-sm"></i>
                          </span>
                          <!-- </button> -->
                        </nuxt-link>
                        <button class="product-btn text-red-600 py-1">
                          <span class="">
                            <i class="fas fa-trash-alt text-sm"></i>
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async readFromFirestore() {
      const ref = this.$fire.firestore.collection("users");
      // const ref = this.$fire.firestore.collection("users").doc(state.userId);
      // console.log(this.$fire.firestore.collection("users"));
      // console.log(ref);
      let snap;
      try {
        snap = await ref.get();
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      //   console.log(snap);
      //   console.log(snap.docs);
      snap.docs.forEach((doc) => {
        console.log(doc.id);
        this.getUsers(doc.id);
        //       const userRef = this.$fire.firestore.collection("users").doc(doc.id);
        //   let userSnap;
        //   try {
        //     userSnap = await ref.get();
        //   } catch (e) {
        //     // TODO: error handling
        //     console.error(e);
        //   }
        //   let user = userSnap.data().user;
        //   console.log(user);
      });
      // let users = snap.data().user;
      // let users = snap.data();
      // console.log(users);
      //   let snap;
      //   try {
      //     snap = await ref.get();
      //   } catch (e) {
      //     // TODO: error handling
      //     console.error(e);
      //   }
      //   this.products = snap.data().products;
      //   console.log(this.products);
      //   console.log(this.$route);
    },
    async getUsers(id) {
      //   console.log(doc.id);
      const userRef = this.$fire.firestore.collection("users").doc(id);
      let userSnap;
      try {
        userSnap = await userRef.get();
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      let user = userSnap.data().user;
      console.log(user);
      this.users.push(user);
      // let users = snap.data().user;
      // let users = snap.data();
      // console.log(users);
      //   let snap;
      //   try {
      //     snap = await ref.get();
      //   } catch (e) {
      //     // TODO: error handling
      //     console.error(e);
      //   }
      //   this.products = snap.data().products;
      //   console.log(this.products);
      //   console.log(this.$route);
    },
  },
  created() {
    this.readFromFirestore();
  },
};
</script>

<style>
</style>
