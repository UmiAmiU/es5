"use strict";

var baseSelect = document.querySelector("#base");
var symbolSelect = document.querySelector("#symbol");
var display = document.querySelector(".display-block");

function start() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.ratesapi.io/api/latest");
  xhr.send();
  xhr.onload = function () {
    if (xhr.status !== 200) {
      throw new Error("Ошибка " + xhr.status + ": " + xhr.statusText);
    } else {
      var data = JSON.parse(xhr.response);
      baseSelect.append(new Option("EUR", "EUR"));
      symbolSelect.append(new Option("All", ""));

      for (var currency in data.rates) {
        baseSelect.append(new Option(currency, currency));
        symbolSelect.append(new Option(currency, currency));
      }
    }
  };
}

function getCurrency() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.ratesapi.io/api/latest?base=" +
      baseSelect.value +
      "&symbols=" +
      symbolSelect.value
  );
  xhr.send();
  xhr.onload = function () {
    if (xhr.status !== 200) {
      throw new Error("Ошибка " + xhr.status + ": " + xhr.statusText);
    } else {
      var data = JSON.parse(xhr.response);

      while (display.lastChild) {
        display.lastChild.remove();
      }
      for (var currency in data.rates) {
        var lineDiv = document.createElement("div");
        lineDiv.classList.add("line-block");
        var currSpan = document.createElement("span");
        currSpan.innerHTML = currency;
        var spotSpan = document.createElement("span");
        spotSpan.innerHTML = data.rates[currency].toFixed(3);
        lineDiv.append(currSpan, spotSpan);
        display.append(lineDiv);
      }
    }
  };
}

baseSelect.addEventListener("change", function (event) {
  getCurrency();
});
symbolSelect.addEventListener("change", function (event) {
  getCurrency();
});
start();
