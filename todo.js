const todos = getTodosData();
const filters = {
  searchText: "",
  hideCompleted: false
};

checkTodo(todos, filters);

document.querySelector("#search-input").addEventListener("input", function(e) {
  filters.searchText = e.target.value;
  checkTodo(todos, filters);
});
const addTodo = function(todos, value) {
  todos.push({
    id: uuidv4(),
    text: value,
    completed: false
  });
};

document.querySelector("#form-todo").addEventListener("submit", function(e) {
  e.preventDefault();
  let inputValue = e.target.elements.inputFill.value;
  addTodo(todos, inputValue);
  const todosJSON = JSON.stringify(todos);
  localStorage.setItem("todos", todosJSON);
  checkTodo(todos, filters);
  e.target.elements.inputFill.value = "";
});

document.querySelector("#checkboxTodo").addEventListener("change", function(e) {
  filters.hideCompleted = e.target.checked;

  checkTodo(todos, filters);
});
