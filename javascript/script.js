"use strict";

const btnAdd = document.getElementById("btn-add");
const btnDouble = document.getElementById("btn-double");
const btnShow = document.getElementById("btn-show-only");
const btnSort = document.getElementById("btn-sort");
const btnCalculate = document.getElementById("btn-calculate");
const mainEl = document.getElementById("main");
const totalEl = document.getElementById("total");

//global variable

const url = `https://random-data-api.com/api/v2/users?size=1&is_xml=true`;
let users = [];

//function

const init = function () {
  totalEl.style.display = "none";
  // getRandomUser();
};
const format = (number) => {
  return number.toLocaleString("en-IN") + ".00";
};
const addToDom = function (userArr) {
  mainEl.innerHTML = ``;
  userArr.forEach((user) => {
    const ele = document.createElement("div");
    ele.classList.add("person");
    ele.innerHTML = `<strong>${user.Name}</strong> <p class='money'>₹${format(
      user.money
    )}</p>`;
    mainEl.appendChild(ele);
  });
};

const getRandomUser = async function () {
  const response = await fetch(url);
  const data = await response.json();
  const newUser = {
    Name: `${data.first_name} ${data.last_name}`,
    money: Math.floor(Math.random() * 1000000) + 5000,
  };
  users.push(newUser);
  addToDom(users);
};
const showOnlyMillionaires = () => {
  users = users.filter((user) => user.money >= 500000);
  addToDom(users);
};
const sortMoney = () => {
  users = users.sort((userOne, userTwo) => userOne.money - userTwo.money);
  addToDom(users);
};
const calculateEntireWealth = () => {
  const total = users.reduce((prev, curr) => prev + curr.money, 0);
  totalEl.style.display = "flex";
  totalEl.innerHTML = `<h3>Total : </h3> 
  <p class='money'>₹${format(total)}</p> `;
};

//event listener
btnAdd.addEventListener("click", () => {
  getRandomUser();
  totalEl.style.display = "none";
});
btnDouble.addEventListener("click", () => {
  users = users.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  addToDom(users);
  totalEl.style.display = "none";
});
btnShow.addEventListener("click", showOnlyMillionaires);
btnSort.addEventListener("click", sortMoney);
btnCalculate.addEventListener("click", calculateEntireWealth);

//init

init();
