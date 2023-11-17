var passosExecutados = "";

function setNumber(number) {
  var body = document.body;
  document.querySelectorAll(".moon").forEach((e) => e.remove());
  for (i = 1; i <= number; i++) {
    let moon = document.createElement("span");
    moon.className = "moonSelector";
    body.appendChild(moon);
  }
  makeMoons(number);
  makeColors(number);
  setInfo(number);
}

function execute(i, number) {
  i = parseInt(i);
  passosExecutados += " " + (i+1);

  var el = document.getElementById(i);
  let elAf = document.getElementById(i <= number ? i + 1 : 0);
  let elBef = document.getElementById(i > 0 ? i - 1 : number - 1);

  if (el.style.backgroundColor == "white") {
    el.style.visibility = "hidden";

    if (elAf != null) {
      if (elAf.style.backgroundColor == "white") {
        elAf.style.backgroundColor = "gray";
      } else {
        elAf.style.backgroundColor = "white";
      }
    }

    elBef.style.backgroundColor == "white"
      ? (elBef.style.backgroundColor = "gray")
      : (elBef.style.backgroundColor = "white");
  }

  console.log(passosExecutados);
}

function setInfo(number) {
  document.querySelectorAll(".info").forEach((e) => e.remove());

  let content = document.getElementById("content");
  let pecas = document.createElement("div");
  pecas.innerHTML = "Numero de peças = " + number;
  pecas.className = "info";

  let possivel = document.createElement("div");
  number == 28 ? possivel.innerHTML = "" : possivel.innerHTML = "Possivel";
  possivel.className = "info";

  let ordemPecas = document.createElement("div");
  let textoOrdem = "";
  for (i = 0; i < number; i++) {
    let peca = document.getElementById(i);
    if (peca.style.backgroundColor == "white") {
      textoOrdem += " B";
    } else {
      textoOrdem += " C";
    }
  }
  ordemPecas.innerHTML = textoOrdem;
  ordemPecas.className = "info";

  let resposta = document.createElement("div");
  switch (number) {
    case 8:
      resposta.innerHTML = "Movimentos = 1 2 3 4 8 7 6 5";
      break;
    case 12:
      resposta.innerHTML = "Movimentos = 1 2 3 4 5 6 12 11 10 9 8 7";
      break;
    case 16:
      resposta.innerHTML = "Movimentos = 1 2 3 4 16 15 14 9 8 7 6 5 10 11 12 13";
      break;
    case 20:
      resposta.innerHTML = "Movimentos = 1 2 3 4 5 6 20 13 12 11 10 9 8 7 14 15 16 17 18 19";
      break;
    case 24:
      resposta.innerHTML = "Movimentos = 1 2 3 4 9 8 7 6 5 10 11 12 24 23 22 17 18 19 20 21 16 15 14 13";
      break;
    case 28:
      resposta.innerHTML = "Não foi possivel resolver";
      break;
    case 32:
      resposta.innerHTML = "Movimentos = 1 2 3 4 5 32 31 30 29 17 16 15 14 13 18 19 20 21 9 8 7 6 5 10 11 12 13 25 26 27 28 29 24 23 22 21";
      break;
    case 48:
      resposta.innerHTML = "Movimentos = 1 2 3 4 5 48 47 46 45 25 24 23 22 21 21 26 27 28 29 17 18 19 20 21 33 32 31 30 29 16 15 14 13 34 35 36 37 9 8 7 6 5 10 11 12 13 41 42 43 44 45 40 39 38 37";
      break;
    case 64:
      resposta.innerHTML = "Movimentos =  1 2 3 4 64 63 62 33 32 31 30 34 35 36 25 26 27 28 29 41 40 39 38 37 24 23 22 42 43 44 17 18 19 20 21 49 48 47 46 45 16 15 14 50 51 52 9 10 11 12 13 8 7 6 5 57 58 59 60 61 56 55 54 53";
      break;

    default:
      break;
  }

  resposta.className = "info";

  content.appendChild(pecas);
  content.appendChild(possivel);
  content.appendChild(ordemPecas);
  content.appendChild(resposta);
}

function makeColors(number) {
  let oneFourth = number / 4;
  let threeFourths = (number / 4) * 3;
  let count = 0;
  let times = threeFourths / 3;

  if (number % 8 == 0) {
    for (i = 0; i <= oneFourth; i++) {
      el = document.getElementById(count);
      if (el != null) {
        el.style.backgroundColor = "white";
        el.addEventListener("mousedown", (event) => {
          execute(event.target.id, number);
        });
      }
      if (times > 0) {
        for (j = 0; j <= 3; j++) {
          el2 = document.getElementById(count + 1);
          if (el2 != null) {
            el2.style.backgroundColor = "gray";
            el2.addEventListener("mouseover", (event) => {
              execute(event.target.id, number);
            });
          }
          count++;
        }
      }
      times--;
    }
  } else {
    for (i = 0; i <= oneFourth; i++) {
      el = document.getElementById(count);
      if (el != null) {
        el.style.backgroundColor = "white";
        el.addEventListener("mousedown", (event) => {
          execute(event.target.id, number);
        });
      }
      if (times > 0) {
        for (j = 0; j <= 5; j++) {
          el2 = document.getElementById(count + 1);
          if (el2 != null) {
            el2.style.backgroundColor = "gray";
            el2.addEventListener("mouseover", (event) => {
              execute(event.target.id, number);
            });
          }
          count++;
        }
      }
      times--;
    }
  }
}

function makeMoons(number) {
  let moonsCenter = document.getElementById("center");
  if (number < 28) {
    moonsCenter.style.setProperty("width", number * 10 + "px");
    moonsCenter.style.setProperty("height", number * 10 + "px");
  } else {
    moonsCenter.style.setProperty("width", "270px");
    moonsCenter.style.setProperty("height", "270px");
  }

  var map = new MoonMap("#center", {
    moonSelector: ".moonSelector",
  });
}

MoonMap = function (querySelector, options) {
  // keep track of the moons we've added
  this.moons = [];

  this.lastRotation = 0;
  this.selector = querySelector;

  // keep track of the currently active moon
  this.currentlyActive = -1;

  if (typeof options !== "object") options = {};

  var defaults = {
    active: function () {}, // active event
    activeClass: "active",
    content: "",
    degrees: 360,
    margin: 0,
    moonClass: "moon",
    n: 12,
    radius: false,
    removeOriginal: true,
    startAngle: 90,
  };

  // Define the method for merging options
  this.extend = function (a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  };

  // Make sure a querySelector was defined
  if (typeof querySelector == "undefined") {
    console.error("No query selector was provided to the MoonMap constructor");
    return;
  }

  var element = document.querySelector(querySelector);
  this.options = this.extend(defaults, options);
  this.map = element;

  this.makeAbsolute = function (str) {
    return (
      '<div style="position:relative"><div class="_moon_content" style="position:absolute;width:100%;height:100%">' +
      str +
      "</div></div>"
    );
  };

  if (!this.options.radius)
    this.options.radius = element.offsetWidth + this.options.margin;

  // Calculate the offsets
  var offsetToParentCenter = parseInt(element.offsetWidth / 2); //assumes parent is square

  // Append the moons
  if (typeof this.options["moonSelector"] !== "undefined") {
    // moons are defined in the DOM
    var moons = document.querySelectorAll(this.options["moonSelector"]),
      n = moons.length,
      div = 360 / n,
      angle = 360 - this.options.startAngle;

    for (var i = 0; i < n; ++i) {
      var moon = document.createElement("div"),
        node = moons[i].cloneNode(true),
        y = Math.sin(angle * (Math.PI / 180)) * this.options.radius,
        x = Math.cos(angle * (Math.PI / 180)) * this.options.radius;

      moon.className = this.options.moonClass;
      moon.id = i;
      moon.style.position = "absolute";
      moon.style.visibility = "hidden";
      moon.innerHTML = this.makeAbsolute(node.outerHTML);

      element.appendChild(moon);

      var offsetToChildCenter = moon.offsetWidth / 2,
        totalOffset = offsetToParentCenter - offsetToChildCenter;

      moon.style.top = (y + totalOffset).toString() + "px";
      moon.style.left = (x + totalOffset).toString() + "px";
      moon.style.visibility = "visible";

      if (this.options.removeOriginal)
        moons[i].parentNode.removeChild(moons[i]);

      this.moons.push(moon);

      angle += div;
    }
  } else {
    // moons are NOT defined in the DOM, and are added programmatically
    var n = this.options.n,
      div = 360 / n,
      angle = 360 - this.options.startAngle;

    for (var i = 1; i <= this.options.n; ++i) {
      var moon = document.createElement("div"),
        y = Math.sin(angle * (Math.PI / 180)) * this.options.radius,
        x = Math.cos(angle * (Math.PI / 180)) * this.options.radius;

      moon.className = this.options.moonClass;
      moon.style.position = "absolute";
      moon.style.visibility = "hidden";

      // check to see if a content setter function was passed in the options
      if (typeof this.options.content == "function") {
        moon.innerHTML = this.makeAbsolute(this.options.content(i, moon));
      } else if (this.options.content) {
        moon.innerHTML = this.makeAbsolute(this.options.content);
      }

      element.appendChild(moon);

      var offsetToChildCenter = moon.offsetWidth / 2,
        totalOffset = offsetToParentCenter - offsetToChildCenter;

      moon.style.top = (y + totalOffset).toString() + "px";
      moon.style.left = (x + totalOffset).toString() + "px";
      moon.style.visibility = "visible";

      this.moons.push(moon);

      angle += div;
    }
  }

  this.moonEvent = function (event, fn) {
    var map = this;

    for (var i = 0; i < this.moons.length; i++) {
      this.moons[i].addEventListener(event, function () {
        fn(this, map);
      });
    }
  };
};
