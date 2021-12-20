<template>
  <div class="px-3.5 py-2.5">
    <div class="">
      <DoughnutChart :data="chartData" :options="options"></DoughnutChart>
    </div>
  </div>
</template>

<script>
// import BarChart from "./BarChart.js";
import DoughnutChart from "./DoughnutChart.js";

export default {
  components: {
    // BarChart,
    DoughnutChart,
  },
  data() {
    return {
      chartData: {
        labels: ["In Transit", "Delivered", "Pending"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [40, 80, 30],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      datacollection: null,
    };
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
  created() {},
};
</script>