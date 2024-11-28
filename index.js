'use strict';

const input = document.querySelector(".input");
const text = document.querySelector(".text");
const form = document.querySelector(".form");
const btn =
  document.querySelector(
    ".btn-remove"
  ); 

const btns = document.querySelectorAll(".btn-remove");
const inputs = document.querySelectorAll("input");
const selects = document.querySelectorAll("select");

const searchBtn = document.querySelector(".search");
const btnRemove = document.querySelector(".btn-remove-all");
const btnAdd = document.querySelector(".btn-add");

/*скрываем/показываем подсказку при фокусе*/
input.addEventListener("focus", () => {
  text.classList.add("none");
});

input.addEventListener("blur", () => {
  if (input.value.length === 0) {
    text.classList.remove("none");
  }
});

/*вспомогательные функции*/
function addVisibility(element) {
  element.classList.remove("none");
  element.classList.add("visible");
}

function removeVisibility(element) {
  element.classList.remove("visible");
  element.classList.add("none");
}

/*убираем крестик*/
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.length > 0) {
      addVisibility(input.nextElementSibling);
    } else {
      removeVisibility(input.nextElementSibling);
    }
  });
});

selects.forEach((select) => {
  select.addEventListener("input", () => {
    if (select.value !== "title") {
      addVisibility(select.nextElementSibling);
    } else {
      removeVisibility(select.nextElementSibling);
    }
  });
});

/*очищаем поле ввода*/
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeVisibility(btn);
    btn.previousElementSibling.focus();
    if (btn.previousElementSibling.tagName === "INPUT") {
      btn.previousElementSibling.value = "";
    } else if (btn.previousElementSibling.tagName === "SELECT") {
      btn.previousElementSibling.value = "title";
    }
  });
});

/*дезактивируем + очищаем поле ввода при нажатии на расширенный поиск и показываем/скрываем поля расширенного поиска*/
searchBtn.addEventListener("click", () => {
  input.disabled ^= true; // Переключение активности кнопки
  input.value = "";
  removeVisibility(btn);
  text.classList.toggle("none");
  form.classList.toggle("none");
  searchBtn.classList.toggle("search-active");
  /*очищаем поля формы, при закрытии расширенного поиска*/
  selects.forEach(select => select.value = "title");
  inputs.forEach(input => input.value = "");
  btns.forEach(btn => removeVisibility(btn));
});

/*очищаем поля, при нажатии на кнопку 'Очистить'*/
btnRemove.addEventListener("click", () => {
  selects.forEach(select => select.value = "title");
  inputs.forEach(input => input.value = "");
  btns.forEach(btn => removeVisibility(btn));
});
