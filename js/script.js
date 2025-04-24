document.addEventListener("DOMContentLoaded", function () {
  // Example Data
  let options = {
      series: [{
          name: "Workout Progress",
          data: [10, 20, 15, 25, 30, 40, 35]
      }],
      chart: {
          type: "bar",  
          height: 300,
          toolbar: {
              show: false
          },
      },
      xaxis: {
          categories: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
      },
      colors: ["RED"]
  };

  let chart = new ApexCharts(document.querySelector("#exampleChart"), options);
  chart.render();
});

