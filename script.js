const container = document.querySelector(".container");
const input = document.querySelector(".inputText");
const del = document.querySelector(".del");
const add = document.querySelector(".add");
const ul = document.querySelector("ul");
const clear = document.querySelector(".clear");

container.addEventListener("click", function (event) {
  if (event.target !== event.currentTarget) {
    if (event.target.className === "clear") {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
    } else if (event.target.className === "fas fa-plus-circle") {
      addItem();
    } else if (event.target.className === "far fa-trash-alt") {
      ul.removeChild(event.target.parentElement.parentElement);
    } else if (event.target.className === "checkbox") {
      event.target.nextElementSibling.classList.toggle("completed");
    }
  }

  if (ul.firstChild === null) {
    ul.classList.remove("notes");
  }
});

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addItem();
  }
});

function addItem() {
  if (input.value.length !== 0) {
    let li = document.createElement("li");
    let hr = document.createElement("hr");
    let btn = document.createElement("button");
    let icon = document.createElement("i");
    let checkbox = document.createElement("input");
    let span = document.createElement("span");

    btn.classList.add("del");
    icon.classList.add("far");
    icon.classList.add("fa-trash-alt");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");

    li.setAttribute("draggable", "true");

    btn.appendChild(icon);
    li.appendChild(checkbox);
    let text = document.createTextNode(input.value);
    span.appendChild(text);
    span.classList.add("text");
    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(hr);

    ul.appendChild(li);

    input.value = "";
    ul.classList.add("notes");
    dragAndDrop();
  } else {
    return;
  }
}

// ================ DRAG&DROP ================

let isChecked = false;
function allowDrop(e) {
  e.preventDefault();
}

function dragStart(e) {
  //start point
  dragSrcEl = this;
  const span = this.querySelector("span");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
  if (span.classList.contains("completed")) {
    isChecked = true;
  }
}

function drop(e) {
  //end point
  e.stopPropagation();
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  if (isChecked) {
    const span = this.querySelector("span");

    span.classList.add("completed");
    this.firstChild.checked = true;
  }

  return false;
}

function drag(e) {
  this.style.border = "1px dashed steelblue";
}

function dragEnter(e) {
  this.style.border = "none";
}
function dragEnd(e) {
  // li - start point
  this.style.border = "none";

  if (isChecked) {
    const span = this.querySelector("span");

    span.classList.remove("completed");
  }
}

function dragAndDrop() {
  let items = document.querySelectorAll("li");
  items.forEach(function (item) {
    item.addEventListener("dragstart", dragStart, false);
    item.addEventListener("drop", drop, false);
    item.addEventListener("dragover", allowDrop, false);
    item.addEventListener("drag", drag, false);
    item.addEventListener("dragenter", dragEnter, false);
    item.addEventListener("dragend", dragEnd, false);
  });

  isChecked = false;
}
