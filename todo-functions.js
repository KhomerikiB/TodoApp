"use strict";
// get data from "todos" LocalStorage
const getTodosData = function() {
  const checkStorage = localStorage.getItem("todos");
  if (checkStorage !== null) {
    return JSON.parse(checkStorage);
  } else {
    return [];
  }
};
//remove item from TODO
const removeItem = function(id) {
  const findIndex = todos.findIndex(function(todo) {
    return todo.id === id;
  });
  if (findIndex > -1) {
    todos.splice(findIndex, 1);
  }
};
// Cunt Uncompleted TODOS
const countUncompletedDOM = function(uncompleteTodos) {
  let createEl = document.querySelector("#uncompleted-todos");
  createEl.textContent = `You Have ${uncompleteTodos.length} uncompleted todos`;
  return createEl;
};
const toggleTodo = function(id) {
  const todo = todos.find(function(todo) {
    return todo.id === id;
  });
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};
// Generate todo DOM
const generateDOM = function(todo) {
  // create HTML elements
  let createEl = document.createElement("div");
  let createText = document.createElement("span");
  let createCheckbox = document.createElement("input");
  createCheckbox.setAttribute("type", "checkbox");
  createCheckbox.checked = todo.completed;
  let createButton = document.createElement("button");
  createButton.textContent = "remove";
  createButton.addEventListener("click", function() {
    removeItem(todo.id);
    const todosJSON = JSON.stringify(todos);
    localStorage.setItem("todos", todosJSON);
    checkTodo(todos, filters);
  });
  // append checkbox to div
  createEl.appendChild(createCheckbox);
  createCheckbox.addEventListener("change", function() {
    toggleTodo(todo.id);
    const todosJSON = JSON.stringify(todos);
    localStorage.setItem("todos", todosJSON);
    checkTodo(todos, filters);
  });
  // append text to div
  if (todo.text.length === 0) {
    createText.textContent = "unnamed";
  } else {
    createText.textContent = todo.text;
  }
  createEl.appendChild(createText);
  // append button to div
  createEl.appendChild(createButton);
  return createEl;
};

// render todo app
const checkTodo = function(todos, filters) {
  let filtered = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  filtered = filtered.filter(function(todo) {
    if (filters.hideCompleted === true) {
      return !todo.completed;
    } else {
      return true;
    }
  });
  const uncompleteTodos = filtered.filter(function(todo) {
    return !todo.completed;
  });

  document.querySelector(".container").innerHTML = "";
  let createEl = countUncompletedDOM(uncompleteTodos);

  filtered.forEach(function(todo) {
    let createText = generateDOM(todo);
    document.querySelector(".container").appendChild(createText);
  });
};
