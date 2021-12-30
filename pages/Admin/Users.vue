<template>
  <div class="py-8">
    <section>
      <div class="container lg:max-w-5xl py-4 px-4 mx-auto">
        <div class="">
          <button @click="showUserForm = true" class="capitalize inline-block">
            Create new user
          </button>
        </div>
        <div class="bg-white">
          <div class="">
            <CreateUser :showForm="(showUserForm = false)"></CreateUser>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container lg:max-w-5xl py-4 px-4 mx-auto">
        <div class="bg-white px-4">
          <div
            class="overflow-x-scroll table-scroll"
            ref="setCarousel"
            @mousedown="setCarousel()"
          >
            <div class="w-full">
              <table class="w-full text-center">
                <thead>
                  <tr>
                    <th class="text-base font-medium">S/N</th>
                    <th class="text-base font-medium">Date</th>
                    <!-- <th class="text-base font-medium">User Id</th> -->
                    <th class="text-base font-medium">Name</th>
                    <th class="text-base font-medium">Email</th>
                    <th class="text-base font-medium">Role</th>
                    <th class="text-base font-medium">Country</th>
                    <th class="text-base font-medium">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, i) in users" :key="user.userId">
                    <td class="text-sm">{{ i + 1 }}</td>
                    <td class="text-sm">{{ user.lastLogin }}</td>
                    <!-- <td class="text-sm">
                        <input type="text" class="text-sm" v-model="date" :style="{width: `${date.length + 1}ch`}">
                    </td> -->
                    <!-- <td class="text-sm">{{ user.userId }}</td> -->
                    <td class="text-sm">{{ user.displayName }}</td>
                    <!-- <td class="text-sm">
                        <input type="text" class="text-sm" v-model="user.displayName" :style="{width: `${user.displayName.length}ch`}">
                    </td> -->
                    <td class="text-sm">{{ user.email }}</td>
                    <td class="text-sm">{{ user.role }}</td>
                    <!-- <td class="text-sm">
                      <input
                        type="text"
                        class="text-sm"
                        v-model="user.role"
                        :style="{ width: `${user.role.length}ch` }"
                      />
                    </td> -->
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
                        <button class="product-btn text-red-600 py-1" @click="delUser(user.userId)">
                        <!-- <button class="product-btn text-red-600 py-1" @click="delUser(user.uid)"> -->
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
import CreateUser from "../../components/CreateUser";
export default {
  components: { CreateUser },
  layout: "admin",
  data() {
    return {
      date: "",
      showUserForm: true,
      users: [],
      pos: { left: 0, x: 0 },
    };
  },
  methods: {
    setCarousel() {
      let el = this.$refs.setCarousel;
      if (el) {
        const mouseMoveHandler = (e) => {
          const dx = e.clientX - this.pos.x;
          el.scrollLeft = this.pos.left - dx;
        };
        const mouseUpHandler = () => {
          document.removeEventListener("mousemove", mouseMoveHandler);
          document.removeEventListener("mouseup", mouseUpHandler);
          el.style.cursor = "grab";
          el.style.removeProperty("user-select");
        };
        const mouseDownHandler = (e) => {
          el.style.cursor = "grabbing";
          el.style.userSelect = "none";
          this.pos = {
            left: el.scrollLeft,
            x: e.clientX,
          };
          document.addEventListener("mousemove", mouseMoveHandler);
          document.addEventListener("mouseup", mouseUpHandler);
        };
        el.addEventListener("mousedown", mouseDownHandler);
      }
    },
    async delUser(id) {
      // delete('/user/:id'
      console.log(id);
        let response = await this.$http.$delete(
            `http://localhost:3001/user/${id}`
        );
        console.log(response);
        // this.users = response;
    },
    async readFromFirestore() {
      const ref = this.$fire.firestore.collection("users");
      let snap;
      try {
        snap = await ref.get();
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      snap.docs.forEach((doc) => {
        console.log(doc.id);
        this.getUsers(doc.id);
      });
    },
    async getUsers(userDetails) {
      const userRef = this.$fire.firestore.collection("users").doc(userDetails.uid);
      let userSnap;
      try {
        userSnap = await userRef.get();
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      let user = userSnap.data().user;
      let lastLogin = userDetails.metadata.lastSignInTime;
      let date = new Date(lastLogin);
      user.lastLogin = date.toLocaleDateString();
      this.users.push(user);
    },
  },
  // created() {
  async created() {
    // this.readFromFirestore();
        let response = await this.$http.$get(
            'http://localhost:3001/users'
        );
        console.log(response);
        let allUsers = response;
        console.log(allUsers);
        allUsers.forEach(res => {
        // console.log(res);
          // res.uid
          this.getUsers(res)
        });
        // this.users = response;
  },
};
</script>

<style scoped>
.table-scroll::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
.table-scroll > div {
  min-width: 850px;
}
</style>
