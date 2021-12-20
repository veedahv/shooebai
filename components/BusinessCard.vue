<template>
  <div class="px-3.5 py-2.5">
    <div class="">
      <div class="flex items-center justify-between">
          <div class="">
              <h2 class="font-bold text-sm">Business Overview</h2>
          </div>
      <div class="flex items-center rounded-sm divide-x divide-blue-600 border border-blue-600">
        <button
          class="py-1 px-2 font-medium text-xs text-white"
          :class="showWeek ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'"
          @click="updateChart(weekData)"
        >
          Week
        </button>
        <button
          class="py-1 px-2 font-medium text-xs"
          :class="showMonth ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'"
          @click="updateChart(monthData)"
        >
          Month
        </button>
        <button
          class="py-1 px-2 font-medium text-xs"
          :class="showYear ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'"
          @click="updateChart(yearData)"
        >
          Year
        </button>
      </div>
      </div>
    </div>
    <div class="mt-3">
      <!-- <BarChart :data="barChartData" :options="barChartOptions" :height="400" /> -->
      <line-chart :chart-data="chartData" :options="options"></line-chart>
      <!-- <button @click="fillData()">Randomize</button> -->
    </div>
  </div>
</template>

<script>
// import BarChart from "./BarChart.js";
import LineChart from "./LineChart.js";

export default {
  components: {
    // BarChart,
    LineChart,
  },
  data() {
    return {
        showWeek: true,
        showMonth: false,
        showYear: false,
      weekData: {
        labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Visits",
            data: [3, 5, 6, 20, 4, 12, 2],
            backgroundColor: "rgba(220, 25, 0, 0.3)",
            // borderColor: "rgba(100, 255, 0, 1)",
            // borderWidth: 2,
          },
          {
            label: "Orders",
            data: [4, 6, 4, 5, 4, 12, 2],
            backgroundColor: "rgba(20, 255, 0, 0.3)",
            // borderColor: "rgba(100, 255, 0, 1)",
            // borderWidth: 2,
          },
        ],
      },
      monthData: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "Visits",
            data: [16, 6, 20, 12],
            backgroundColor: "rgba(220, 25, 0, 0.3)",
            // borderColor: "rgba(100, 255, 0, 1)",
            // borderWidth: 2,
          },
          {
            label: "Orders",
            data: [6, 13, 5, 14],
            backgroundColor: "rgba(20, 255, 0, 0.3)",
            // borderColor: "rgba(100, 255, 0, 1)",
            // borderWidth: 2,
          },
        ],
      },
      yearData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Visits",
            data: [2, 1, 16, 3, 4, 5, 6, 20, 4, 12, 2, 8, 21],
            backgroundColor: "rgba(220, 25, 0, 0.3)",
            // borderColor: "rgba(100, 255, 0, 1)",
            // borderWidth: 2,
          },
          {
            label: "Orders",
            data: [2, 4, 6, 13, 4, 5, 0, 0, 4, 12, 2, 19, 18],
            backgroundColor: "rgba(20, 255, 0, 0.3)",
            // borderColor: "rgba(100, 255, 0, 1)",
            // borderWidth: 2,
          },
        ],
      },
      chartData: {
        labels: [
          "2019-06",
          "2019-07",
          "2019-08",
          "2019-09",
          "2019-10",
          "2019-11",
          "2019-12",
          "2020-01",
          "2020-02",
          "2020-03",
        ],
        datasets: [
          {
            label: "Visits",
            data: [2, 1, 16, 3, 4, 5, 6, 20, 4, 12, 2],
            backgroundColor: "rgba(220, 25, 0, 0.3)",
            // borderColor: "rgba(100, 255, 0, 1)",
            // borderWidth: 2,
          },
          {
            label: "Orders",
            data: [2, 4, 6, 13, 4, 5, 0, 0, 4, 12, 2],
            backgroundColor: "rgba(20, 255, 0, 0.3)",
            // borderColor: "rgba(100, 255, 0, 1)",
            // borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // legend: {
        //   display: false,
        // },
        // title: {
        //   display: true,
        //   text: "Google analytics data",
        //   fontSize: 24,
        //   fontColor: "#6b7280",
        // },
        tooltips: {
          backgroundColor: "#17BF62",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 1)",
                display: true,
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                // max: 7,
                min: 0,
                stepSize: 3,
              },
              gridLines: {
                color: "rgba(0, 0, 0, 1)",
                display: true,
                drawOnChartArea: false,
              },
            },
          ],
        },
      },
      datacollection: null,
    };
  },
  methods: {
      updateChart(data) {
          (data === this.weekData) ? this.showWeek = true :  this.showWeek = false;
          (data === this.monthData) ? this.showMonth = true :  this.showMonth = false;
          (data === this.yearData) ? this.showYear = true :  this.showYear = false;
          this.chartData = data;
      },
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
      //   console.log(Math.floor(Math.random() * (50 - 5 + 1)) + 5);
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
  mounted() {
    this.chartData = this.weekData;
  },
};
</script>