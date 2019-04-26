// JS Goes here - ES6 supported

// Import Bootstrap 4
// Thanks to
// https://stevenwestmoreland.com/2018/01/how-to-include-bootstrap-in-your-project-with-webpack.html
// and thanks to
// https://github.com/webpack/webpack/issues/4258#issuecomment-279133995
import $ from "jquery";
import "bootstrap";
import Chart from "chart.js";

// Styles
import "./css/main.scss";

// Say hello
console.log("🦊 Hello! Edit me in src/index.js");

var app = app || {};

// Sample jQuery function:
$(function() {
  $("a").each(function(index) {
    console.log(index + ": " + $(this).text());
  });

  var ctx = $("#myChart");

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["2008", "2009", "2010", "2011", "2012", "2013"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          // backgroundColor: [
          //   "rgba(255, 99, 132, 0.2)",
          //   "rgba(54, 162, 235, 0.2)",
          //   "rgba(255, 206, 86, 0.2)",
          //   "rgba(75, 192, 192, 0.2)",
          //   "rgba(153, 102, 255, 0.2)",
          //   "rgba(255, 159, 64, 0.2)"
          // ],
          // borderColor: [
          //   "rgba(255, 99, 132, 1)",
          //   "rgba(54, 162, 235, 1)",
          //   "rgba(255, 206, 86, 1)",
          //   "rgba(75, 192, 192, 1)",
          //   "rgba(153, 102, 255, 1)",
          //   "rgba(255, 159, 64, 1)"
          // ],
          backgroundColor: Chart.helpers
            .color("#11A579")
            .alpha(0.7)
            .rgbString(),
          borderColor: Chart.helpers.color("#11A579").rgbString(),
          borderWidth: 1
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            // type: "time",
            // time: {
            //   unit: "year"
            // }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
});
