import "./style.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

var createBtn = document.getElementsByClassName("c1_button")[0];
var container2 = document.getElementsByClassName("container2")[0];
var container3 = document.getElementsByClassName("container3")[0];
var checkicon = document.getElementById("c3_check-icon");
var xIcon = document.getElementById("c3_x-icon");
var i = 0;
var noteCount = 0;

checkicon.addEventListener("click", function () {
  createNote();
});

xIcon.addEventListener("click", function () {
  typeNote();
});

function typeNote() {
  if (getComputedStyle(container3).display === "none") {
    container3.style.display = "block";
  } else {
    container3.style.display = "none";
  }
}
createBtn.addEventListener("click", typeNote);

function createNote() {
  if (noteCount >= 20) {
    alert("You can only create 20 notes. Delete some to add more.");
    return;
  }
  var noteText = document.getElementById("text-note").value;
  var node0 = document.createElement("div");
  var node1 = document.createElement("h1");

  node1.innerHTML = noteText;
  node1.setAttribute(
    "style",
    " width: 275px; height: 275px;  padding: 20px;  box-shadow: 10px 10px 24px 0 rgba(0, 0, 0, 0.5);  font-size: 24px;",
  );

  node1.style.margin = margin();
  node1.style.backgroundColor = color();
  node1.style.transform = rotate();
  node0.appendChild(node1);

  container2.insertAdjacentElement("beforeend", node0);

  node0.addEventListener("mouseenter", function () {
    node0.style.transform = "scale(1.1)";
  });

  node0.addEventListener("mouseleave", function () {
    node0.style.transform = "scale(1)";
  });

  node0.addEventListener("dblclick", function () {
    node0.remove();
    noteCount--;
  });

  document.getElementById("text-note").value = "";

  noteCount++; // 🔥 increase count
}

function margin() {
  var random_margin = ["-5px", "1px", "5px", "10px", "15px", "20px"];

  return random_margin[Math.floor(Math.random() * random_margin.length)];
}

function rotate() {
  var random_degree = [
    "rotate(3deg)",
    "rotate(1deg)",
    "rotate(-1deg)",
    "rotate(-3deg)",
    "rotate(-5deg)",
    "rotate(-8deg)",
  ];

  return random_degree[Math.floor(Math.random() * random_degree.length)];
}

function color() {
  var random_colors = [
    "#c2ff3d",
    "#ff3de8",
    "#3dc2ff",
    "#04e022",
    "#bc83e6",
    "#ebb328",
  ];

  if (i > random_colors.length - 1) {
    i = 0;
  }

  return random_colors[i++];
}
