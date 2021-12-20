<template>
  <div>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="">
          <div class="sub-heading-box py-5 relative">
            <h2 class="sub-heading py-2 px-1">Dashboard</h2>
          </div>
          <div class="">
            <div
              class="overflow-x-scroll buildings-carousel w-full"
              ref="setCarousel"
              @mousedown="setCarousel()"
            >
              <div class="">
                <div class="flex gap-3 flex-nowrap w-full">
                  <div class="flex-auto w-1/4">
                    <div class="card bg-white">
                      <div class="card-body p-4">
                        <h3 class="card-title font-bold text-sm">Visits</h3>
                        <div class="my-1.5 flex justify-between items-center">
                          <p class="statistic-value font-medium text-2xl">
                            3500
                          </p>
                          <div
                            class="rounded-full bg-blue-50 w-16 h-16 p-1.5 flex items-center justify-center"
                          >
                            <i class="fas fa-users text-4xl"></i>
                            <!-- <i class="fas fa-clipboard-list text-4xl"></i>
                          <i class="fab fa-hubspot text-4xl"></i>
                          <i class="fas fa-hand-holding-heart text-4xl"></i> -->
                          </div>
                        </div>
                        <p class="stats-perc text-green-500 text-xs">
                          <i class="fas fa-arrow-up text-xs"></i>
                          <!-- <i class="fas fa-arrow-down text-xs"></i>                             -->
                          <!-- <i class="fas fa-long-arrow-alt-up text-sm"></i>                            
                          <i class="fas fa-long-arrow-alt-down text-sm"></i>   -->
                          35% since last month
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="flex-auto w-1/4">
                    <div class="card bg-white">
                      <div class="card-body p-4">
                        <h3 class="card-title font-bold text-sm">
                          Subscribers
                        </h3>
                        <div class="my-1.5 flex justify-between items-center">
                          <p class="statistic-value font-medium text-2xl">
                            3500
                          </p>
                          <div
                            class="rounded-full bg-blue-50 w-16 h-16 p-1.5 flex items-center justify-center"
                          >
                            <i class="fab fa-hubspot text-4xl"></i>
                            <!-- <i class="fas fa-clipboard-list text-4xl"></i>
                          <i class="fas fa-users text-4xl"></i>
                          <i class="fas fa-hand-holding-heart text-4xl"></i> -->
                          </div>
                        </div>
                        <p class="stats-perc text-red-500 text-xs">
                          <!-- <i class="fas fa-arrow-up text-xs"></i>                             -->
                          <i class="fas fa-arrow-down text-xs"></i>
                          <!-- <i class="fas fa-long-arrow-alt-up text-sm"></i>                            
                          <i class="fas fa-long-arrow-alt-down text-sm"></i>   -->
                          -35% since last month
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="flex-auto w-1/4">
                    <div class="card bg-white">
                      <div class="card-body p-4">
                        <h3 class="card-title font-bold text-sm">order</h3>
                        <div class="my-1.5 flex justify-between items-center">
                          <p class="statistic-value font-medium text-2xl">
                            3500
                          </p>
                          <div
                            class="rounded-full bg-blue-50 w-16 h-16 p-1.5 flex items-center justify-center"
                          >
                            <i class="fas fa-clipboard-list text-4xl"></i>
                            <!-- <i class="fas fa-users text-4xl"></i>
                          <i class="fab fa-hubspot text-4xl"></i>
                          <i class="fas fa-hand-holding-heart text-4xl"></i> -->
                          </div>
                        </div>
                        <p class="stats-perc text-green-500 text-xs">
                          <i class="fas fa-arrow-up text-xs"></i>
                          <!-- <i class="fas fa-arrow-down text-xs"></i>                             -->
                          <!-- <i class="fas fa-long-arrow-alt-up text-sm"></i>                            
                          <i class="fas fa-long-arrow-alt-down text-sm"></i>   -->
                          +35% since last month
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="flex-auto w-1/4">
                    <div class="card bg-white">
                      <div class="card-body p-4">
                        <h3 class="card-title font-bold text-sm">Revenue</h3>
                        <div class="my-1.5 flex justify-between items-center">
                          <p class="statistic-value font-medium text-2xl">
                            3500
                          </p>
                          <div
                            class="rounded-full bg-blue-50 w-16 h-16 p-1.5 flex items-center justify-center"
                          >
                            <!-- <i class="fas fa-users text-4xl"></i>
                          <i class="fas fa-clipboard-list text-4xl"></i>
                          <i class="fab fa-hubspot text-4xl"></i> -->
                            <i class="fas fa-hand-holding-heart text-4xl"></i>
                          </div>
                        </div>
                        <p class="stats-perc text-green-500 text-xs">
                          <i class="fas fa-arrow-up text-xs"></i>
                          <!-- <i class="fas fa-arrow-down text-xs"></i>                             -->
                          <!-- <i class="fas fa-long-arrow-alt-up text-sm"></i>                            
                          <i class="fas fa-long-arrow-alt-down text-sm"></i>   -->
                          +35% since last month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <nuxt-link :to="'/Admin/ProductForm'">
              <p class="product-name">Add</p>
            </nuxt-link> -->
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container lg:max-w-5xl py-10 px-4 mx-auto">
        <div class="">
        <div class="flex flex-wrap md:flex-nowrap items-stretch gap-5">
          <div class="bg-white w-full md:w-2/3 flex-none md:flex-auto">
            <BusinessCard></BusinessCard>
          </div>
          <div class="bg-white w-full md:w-1/3 flex-none md:flex-auto">
            <DeliveryChart></DeliveryChart>
          </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DeliveryChart from '../../components/DeliveryChart'
import BusinessCard from '../../components/BusinessCard'
import AdminProductCard from "../../components/AdminProductCard";
export default {
  layout: "admin",
  components: {
    DeliveryChart,
    BusinessCard, AdminProductCard },
  data() {
    return {
      products: [],
      buildingsCarousel: "",
    };
  },
  methods: {
    setCarousel() {
      //   console.log(this.$refs);
      let el = this.$refs.setCarousel;
      //   let el = e.target;
      if (el) {
        // // console.log("hahsh");
        // this.buildingsCarousel = el;
        // console.log(this.buildingsCarousel);
        // const transactionCarousel = document.querySelector('#transaction-carousel');
        el.scrollLeft = 150;

        let pos = { left: 0, x: 0 };

        const mouseMoveHandler = (e) => {
          const dx = e.clientX - pos.x;
          el.scrollLeft = pos.left - dx;
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
          pos = {
            left: el.scrollLeft,
            x: e.clientX,
          };

          document.addEventListener("mousemove", mouseMoveHandler);
          document.addEventListener("mouseup", mouseUpHandler);
        };

        el.addEventListener("mousedown", mouseDownHandler);
      }
    },
  },
  created() {
    console.log(this.$refs);
    console.log(this.$refs.setCarousel);
  },
};
</script>

<style>
.buildings-carousel::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
.buildings-carousel > div {
  min-width: 950px;
}
/* @media (min-width: 992px) {
  .buildings-carousel > div {
    width: 100%;
  }
} */
</style>
