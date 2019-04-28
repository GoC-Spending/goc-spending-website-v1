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
app.charts = app.charts || {};
app.options = app.options || {};

// Number format
// Thanks to https://stackoverflow.com/a/48996286/756641
app.number_format = function(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + "").replace(",", "").replace(" ", "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
};

// Layout options for all charts
// TODO - see if this should be moved to css
app.options._layout = {
  padding: {
    left: 0,
    right: 0,
    top: 20,
    bottom: 20
  }
};

// Stacked time-series chart, without currency units
app.options.timeStackedEntries = {
  layout: app.options._layout,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        stacked: true
      }
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            return app.number_format(value);
          }
        }
      }
    ]
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, chart) {
        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || "";
        return datasetLabel + ": " + app.number_format(tooltipItem.yLabel, 0);
      }
    }
  }
};

app.options.timeStackedCurrency = {
  layout: app.options._layout,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        stacked: true
      }
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            return "$ " + app.number_format(value);
          }
        }
      }
    ]
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, chart) {
        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || "";
        return datasetLabel + ": $ " + app.number_format(tooltipItem.yLabel, 2);
      }
    }
  }
};

app.options.timeSingleCurrency = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 20,
      bottom: 20
    }
  },
  legend: {
    display: false
  },
  scales: {
    xAxes: [{}],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            return "$ " + app.number_format(value);
          }
        }
      }
    ]
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, chart) {
        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || "";
        return datasetLabel + ": $ " + app.number_format(tooltipItem.yLabel, 2);
      }
    }
  }
};

app.buildYearStackedChart = function(id) {
  var ctx = $("#" + id);
  console.log($(ctx).data("chartValues"));

  if (ctx !== null) {
    app.charts[id] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: $(ctx).data("chartRange"),
        datasets: $(ctx).data("chartValues")
      },
      options: app.options.timeStackedEntries
    });
  }
};

app.buildYearSingleChart = function(id) {
  var ctx = $("#" + id);
  console.log($(ctx).data("chartValues"));

  if (ctx !== null) {
    app.charts[id] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: $(ctx).data("chartRange"),
        // TODO - update this for consistency with the stacked chart (send full dataset), once we figure out colour functions on the PHP export side
        datasets: [
          {
            // label: "# of Votes",
            data: $(ctx).data("chartValues"),
            backgroundColor: Chart.helpers
              .color("#11A579")
              .alpha(0.7)
              .rgbString(),
            borderColor: Chart.helpers.color("#11A579").rgbString(),
            borderWidth: 1
          }
        ]
      },
      options: app.options.timeStackedCurrency
    });
  }
};

// Sample jQuery function:
$(function() {
  $("a").each(function(index) {
    console.log(index + ": " + $(this).text());
  });

  app.buildYearStackedChart("general-entries-by-year");
  app.buildYearSingleChart(
    "general-effective-overall-total-by-year-2008-to-2017"
  );

  /*
  var a1 = "#general-effective-overall-total-by-year-2008-to-2017";
  var ctx = $(a1);

  console.log("test");
  console.log($(ctx).data("chartValues"));

  app.charts[a1] = new Chart(ctx, {
    type: "bar",
    data: {
      labels: $(ctx).data("chartRange"),
      datasets: [
        {
          // label: "# of Votes",
          data: $(ctx).data("chartValues"),
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
    options: app.options.timeStackedCurrency
  });

  */

  console.log(app.charts);
});
