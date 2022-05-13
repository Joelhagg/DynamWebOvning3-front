let userList = document.getElementById("userList");
let loggedInList = document.getElementById("loggedInList");
let userData = [];
let loggedInUser = [];

const printUsers = async () => {
  let response = await fetch("http://localhost:3000/users");
  userData = await response.json();
  console.log(userData);

  await userData.map((user) => {
    let userItem = document.createElement("li");
    let usertext = `Användare: ${user.username}. Lösenord: ${user.password}.`;
    userItem.append(usertext);
    userList.append(userItem);
  });
};

printUsers();

document.getElementById("saveBtn").addEventListener("click", (e) => {
  e.preventDefault();

  loggedInList.innerHTML = "";

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let user = {
    username: username,
    password: password,
  };

  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      loggedInUser = data;
      console.log(loggedInUser);
      console.log("data", data, typeof data);
      localStorage.setItem("username", data.username);
      localStorage.setItem("password", "********");

      loggedInList.innerHTML = `Användare: ${user.username}. Lösenord: ${user.password}.`;
    });
});
