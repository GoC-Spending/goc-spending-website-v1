// JS Goes here - ES6 supported

// Import Bootstrap 4
// Thanks to
// https://stevenwestmoreland.com/2018/01/how-to-include-bootstrap-in-your-project-with-webpack.html
// and thanks to
// https://github.com/webpack/webpack/issues/4258#issuecomment-279133995
import $ from "jquery";
import "bootstrap";

// Styles
import "./css/main.scss";

// Say hello
console.log("🦊 Hello! Edit me in src/index.js");

// Sample jQuery function:
$(function() {
  $("a").each(function(index) {
    console.log(index + ": " + $(this).text());
  });
});
