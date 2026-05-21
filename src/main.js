// style linking
import "./style.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//themes import
import { themes } from "./components/themes.js";

let currentTheme = "classic";
const savedTheme = localStorage.getItem("activeTheme");

if (savedTheme) {
  currentTheme = savedTheme;
}

// creat btn declare
var createBtn = document.getElementsByClassName("c1_button")[0];
// containers declare
var container2 = document.getElementsByClassName("container2")[0];
var container3 = document.getElementsByClassName("container3")[0];
// icons declare
var checkicon = document.getElementById("c3_check-icon");
var xIcon = document.getElementsByClassName("c3_x-icon")[0];
var i = 0;

// note data save check and rendering
var notes = [];
var savedNotes = localStorage.getItem("stickyNotes");
if (savedNotes) {
  notes = JSON.parse(savedNotes);
}

applyTheme(currentTheme);
notes.forEach(renderNote);

// sound effect
const openSound = new Audio("/paper-create.mp3");
const closeSound = new Audio("/paper-close.mp3");

//modal declare
var noteModal = document.querySelector(".note-modal");
var modalNote = document.querySelector(".modal-note");
var closeModal = document.querySelector(".close-modal");

//theme declaraion
const themeButtons = document.querySelectorAll(".dropdown-item");

themeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const selectedTheme = button.dataset.theme;
    applyTheme(selectedTheme);
  });
});

// creat note  icon functions
checkicon.addEventListener("click", function () {
  createNote();
});

xIcon.addEventListener("click", function () {
  typeNote();
});

// modal close icon function
closeModal.addEventListener("click", function () {
  noteModal.style.display = "none";
  closeSound.currentTime = 0;
  closeSound.play();
});

// typenote function
function typeNote() {
  if (getComputedStyle(container3).display === "none") {
    container3.style.display = "block";
  } else {
    container3.style.display = "none";
  }
}

createBtn.addEventListener("click", function () {
  container3.style.display = "block";
});

//create note function
function createNote() {
  if (notes.length >= 18) {
    alert("You can only create 18 notes. Delete some to add more.");
    return;
  }

  const noteText = document.getElementById("text-note").value.trim();
  if (!noteText) return;

  openSound.currentTime = 0;
  openSound.play();

  var noteRotate = rotate();
  var noteMargin = margin();

  const noteStyle = getNoteStyle();

  var noteObject = {
    id: Date.now(),
    text: noteText,
    style: noteStyle,
    rotate: noteRotate,
    margin: noteMargin,
  };

  notes.push(noteObject);
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
  renderNote(noteObject);

  document.getElementById("text-note").value = "";
  container3.style.display = "none";
}

//reload render function
function renderNote(noteObject) {
  var templateIcon = document.getElementsByClassName("c3_x-icon")[0];
  var deleteIcon = templateIcon.cloneNode(true);

  var node0 = document.createElement("div");
  var node1 = document.createElement("h1");

  node0.style.cursor = "pointer";

  node1.innerHTML = noteObject.text;
  node1.classList.add("note");

  const theme = themes[currentTheme] || themes.classic;
  if (window.innerWidth <= 768) {
    node1.style.padding = theme.mobileNotePadding || "30px";
  } else {
    node1.style.padding = theme.notePadding || "90px";
  }

  node1.style.transform = noteObject.rotate;
  node1.style.margin = noteObject.margin;

  const style = noteObject.style || { type: "color", value: "#fff" };

  if (style.type === "color") {
    node1.style.backgroundColor = style.value;
  } else {
    node1.style.backgroundImage = `url(${style.value})`;
    node1.style.backgroundSize = "cover";
    node1.style.backgroundRepeat = "no-repeat";
    node1.style.backgroundPosition = "center";
  }

  node0.dataset.id = noteObject.id;
  node0.appendChild(deleteIcon);
  deleteIcon.classList.add("note-delete");
  node0.appendChild(node1);

  container2.insertAdjacentElement("beforeend", node0);

  // ✅ FIXED MODAL OPEN (THIS WAS THE BUG)
  node0.addEventListener("click", function (e) {
    if (e.target.classList.contains("note-delete")) return;
    const theme = themes[currentTheme] || themes.classic;
    modalNote.innerHTML = noteObject.text;
    // modalNote.style.padding = theme.modalPadding || "24px";
    if (window.innerWidth <= 768) {
      modalNote.style.padding = theme.modalMoPadding || "30px";
    } else {
      modalNote.style.padding = theme.modalPadding || "90px";
    }

    const style = noteObject.style || { type: "color", value: "#fff" };

    if (style.type === "color") {
      modalNote.style.backgroundColor = style.value;
      modalNote.style.backgroundImage = "none";
    } else {
      modalNote.style.backgroundImage = `url(${style.value})`;
      modalNote.style.backgroundSize = "cover";
      modalNote.style.backgroundPosition = "center";
      modalNote.style.backgroundColor = "transparent";
    }

    // 🔥 CRITICAL FIX
    noteModal.style.display = "flex";

    openSound.currentTime = 0;
    openSound.play();
  });

  node0.addEventListener("mouseenter", function () {
    node0.style.transform = "scale(1.1)";
  });

  node0.addEventListener("mouseleave", function () {
    node0.style.transform = "scale(1)";
  });

  deleteIcon.addEventListener("click", function (e) {
    e.stopPropagation();

    var id = Number(node0.dataset.id);
    node0.remove();

    notes = notes.filter((note) => note.id !== id);

    localStorage.setItem("stickyNotes", JSON.stringify(notes));

    closeSound.currentTime = 0;
    closeSound.play();
  });

  document.getElementById("text-note").value = "";
}

// margin function
function margin() {
  var random_margin = ["1px", "5px", "10px", "15px", "20px"];
  return random_margin[Math.floor(Math.random() * random_margin.length)];
}

//rotate function
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

// color function
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

// themes apply
function applyTheme(themeName) {
  currentTheme = themeName;

  const theme = themes[themeName];

  document.body.style.backgroundImage = theme.bg ? `url(${theme.bg})` : "none";

  document.body.dataset.theme = themeName;

  localStorage.setItem("activeTheme", themeName);
}

// style decider
function getNoteStyle() {
  const theme = themes[currentTheme] || themes.classic;

  if (!theme.noteSkins) {
    return {
      type: "color",
      value: color(),
    };
  }

  const skins = theme.noteSkins;
  const randomSkin = skins[Math.floor(Math.random() * skins.length)];

  return {
    type: "image",
    value: randomSkin,
  };
}
