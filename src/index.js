// JS Goes here - ES6 supported

// Import Bootstrap 4
// Thanks to
// https://stevenwestmoreland.com/2018/01/how-to-include-bootstrap-in-your-project-with-webpack.html
// and thanks to
// https://github.com/webpack/webpack/issues/4258#issuecomment-279133995
import $ from "jquery";

// == Import all Bootstrap JS ==
// import "bootstrap";

// == Or, selectively import specific components ==
// Thanks to
// https://getbootstrap.com/docs/4.1/getting-started/webpack/
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";

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

// Stacked time-series chart, with currency units
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
  var optionsKey = $(ctx).data("chartOptions") || "timeStackedEntries";
  console.log($(ctx).data("chartValues"));

  if (ctx !== null) {
    app.charts[id] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: $(ctx).data("chartRange"),
        datasets: $(ctx).data("chartValues")
      },
      options: app.options[optionsKey]
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

app.updateExistingChartArray = function(chartArray) {
  $.each(chartArray, function(index, item) {
    var ctx = $("#" + item.id);
    // console.log(item);
    // console.log(ctx);

    // Check if the canvas element exists
    if (typeof ctx !== undefined) {
      // Check if it's already initialized
      if ($(ctx).data("chartInitialized") == 1) {
        // Just updated data
        // console.log("Already initalized!");
        // console.log(app.charts[item.id]);
        // console.log(item.values);

        app.charts[item.id].data = {
          labels: item.range,
          datasets: item.values
        };
        app.charts[item.id].update();
      } else {
        $(ctx).data("chartValues", item.values);
        $(ctx).data("chartRange", item.range);
        $(ctx).data("chartType", item.type);
        $(ctx).data("chartOptions", item.options);
        $(ctx).data("chartInitialized", 1);

        app.buildYearStackedChart(item.id);
      }
    }
  });
};

// Sample jQuery function:
$(function() {
  // $("a").each(function(index) {
  //   console.log(index + ": " + $(this).text());
  // });

  // Handle the department select options:
  $("select#owner-select").change(function() {
    var ownerAcronym = $(this).val();
    var ownerLabel = $("option:selected", this).text();
    var chartArray = $("option:selected", this).data("chartArray");

    $(".update-owner").text(ownerLabel);

    app.updateExistingChartArray(chartArray);
  });

  // Handle the vendor select options:
  $("select#vendor-select").change(function() {
    var ownerAcronym = $(this).val();
    var ownerLabel = $("option:selected", this).text();
    var chartArray = $("option:selected", this).data("chartArray");

    $(".update-vendor").text(ownerLabel);

    app.updateExistingChartArray(chartArray);
  });

  $("canvas[data-chart-type=year-stacked").each(function(index) {
    console.log("Building " + $(this).attr("id"));
    app.buildYearStackedChart($(this).attr("id"));
  });

  app.buildYearSingleChart(
    "general-effective-overall-total-by-year-2008-to-2017"
  );

  // Set initial values for the dropdown menus
  $("select#vendor-select")
    .val("IBM CANADA")
    .trigger("change");
  // For the departmental dropdowns, start with PSPC since it's the largest:
  $("select#owner-select")
    .val("pspc")
    .trigger("change");

  var colors = [
    "#ff0000",
    "#ff4d00",
    "#ff9900",
    "#ffe600",
    "#ccff00",
    "#80ff00",
    "#33ff00",
    "#00ff19",
    "#00ff66",
    "#00ffb2",
    "#00ffff",
    "#00b3ff",
    "#0066ff",
    "#0019ff",
    "#3300ff",
    "#8000ff",
    "#cc00ff",
    "#ff00e5",
    "#ff0099",
    "#ff004c"
  ];

  var colorMap = [];
  $.each(colors, function(index, value) {
    var item = {};
    // console.log(value);

    item.color = Chart.helpers
      .color(value)
      // .alpha(0.7)
      .rgbString();
    item.borderColor = Chart.helpers
      .color(value)
      .darken(0.2)
      .rgbString();
    // console.log(item);
    colorMap.push(item);
  });
  console.log(JSON.stringify(colorMap));
});
