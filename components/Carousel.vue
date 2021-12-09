<template>
  <div class="carousel relative shadow">
    <div class="carousel-inner relative overflow-hidden w-full">
      <!--Slide-->
      <!-- <div class="slides" v-for="slide in slides" :key="slide.id"> -->
      <div class="w-full" v-for="slide in slides" :key="slide.id">
        <input
          :id="slide.id"
          class="carousel-open"
          type="radio"
          name="carousel"
          aria-hidden="true"
          hidden=""
          :checked="slide.check"
        />
        <div class="carousel-item w-0 overflow-hidden absolute opacity-0" style="height: 90vh">
          <!-- class="block h-full w-full text-white bg-blend-overlay text-5xl text-center" -->
          <div
            class="block h-full w-full text-white bg-blend-overlay"
            :class="slide.id"
          >
            <div class="container lg:max-w-5xl py-20 px-4 mx-auto">
              <!-- <div class="max-w-md lg:max-w-xl"> -->
              <div class="max-w-md md:max-w-screen-sm">
                <!-- <small class="font-medium capitalize"> -->
                <small class="font-medium uppercase">
                  {{ slide.small }}
                </small>
                <!-- 3 -->
                <h1
                  class="text-5xl mb-4 md:text-7xl capitalize font-extrabold color-primary"
                >
                  {{ slide.title }}
                </h1>
                <p class="text-2xl mb-10 color-light">
                  <em>{{ slide.text }}</em>
                </p>
                <div class="py-2">
                  <nuxt-link
                    to="/shop"
                    class="border-2 font-medium text-2xl border-current px-4 py-2"
                    >Shop Now</nuxt-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <label
          :for="slide.prev"
          class="prev w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
          :class="slide.control"
        >
          ‹
        </label>
        <label
          :for="slide.next"
          class="next w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
          :class="slide.control"
        >
          ›
        </label> -->
        <!-- Add additional indicators for each slide-->
        <!-- <ol class="carousel-indicators">
          <li class="inline-block mr-3">
            <label
              for="carousel1"
              class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700"
            >
              •
            </label>
          </li>
          <li class="inline-block mr-3">
            <label
              for="carousel2"
              class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700"
            >
              •
            </label>
          </li>
        </ol> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // carousel2: false,
      // carousel1: true,
      slides: [
        {
          id: "carousel1",
          title: "smart styling, extra comfort",
          text: "The comfort of your feet is all we care about",
          small: "it's all about the drip",
          check: true,
          prev: "carousel2",
          next: "carousel2",
          control: "control-1",
        },
        {
          id: "carousel2",
          title: "make your move memorable",
          text: "Your feet will never feel the same",
          small: "craft your own footprints",
          check: false,
          prev: "carousel1",
          next: "carousel1",
          control: "control-2",
        },
      ],
    };
  },
  created() {
    window.setInterval(() => {
      if (this.slides[0].check) {
        this.slides[1].check = true;
        this.slides[0].check = false;
        // this.carousel1 = false
      } else {
        this.slides[1].check = false;
        // this.carousel2 = false
        // this.carousel1 = true
        this.slides[0].check = true;
      }
      // console.log(this.slides[0].check)
    }, 4000);
  },
};
</script>

<style>
.carousel-item {
  opacity: 0;
  -webkit-transition: opacity .1s ease-out, width .1s ease-out;
  transition: opacity .1s ease-out, width .1s ease-out;
  margin-left: 0;
}
.carousel-open:checked + .carousel-item {
  position: static;
  opacity: 100;
  width: 100%;
  margin-left: auto;
}
.carousel1 {
  background-image: url("~assets/images/carousel1.jpg");
  background-size: cover;
  background-position: center center;
  position: relative;
  background-color: rgba(0, 0, 0, 0.6);
}
.carousel2 {
  background-image: url("~assets/images/carousel2.jpg");
  background-size: cover;
  background-position: center center;
  position: relative;
  background-color: rgba(0, 0, 0, 0.6);
}
#carousel1:checked ~ .control-1,
#carousel2:checked ~ .control-2 {
  display: block;
}
.carousel-indicators {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 2%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
}
#carousel1:checked
  ~ .control-1
  ~ .carousel-indicators
  li:nth-child(1)
  .carousel-bullet,
#carousel2:checked
  ~ .control-2
  ~ .carousel-indicators
  li:nth-child(2)
  .carousel-bullet {
  color: #2b6cb0; /*Set to match the Tailwind colour you want the active one to be */
}
</style>
