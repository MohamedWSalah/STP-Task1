const image1 = '<img src="./Assets/AvengersEndgame.jpg" />';
const image2 = '<img src="./Assets/DrStrange.jpg" />';
const image3 = '<img src="./Assets/MoonKnight.jpg" />';

let movies = [
  { name: "Avengers Endgame", image: image1, votes: 7528 },
  { name: "Dr Strange", image: image2, votes: 9867 },
  { name: "Moon Knight", image: image3, votes: 5489 },
];

//getting the exact html path just to load needed scripts only instead of creating multiple files.
let path = window.location.pathname;
let page = path.split("/").pop();

//login function==================
function login() {
  sessionStorage.clear();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username.length === 0 || password.length === 0) {
    document.getElementById("errLine").innerHTML =
      "Fill in the required fields.";
  } else {
    sessionStorage.setItem("username", username);
    window.location.href = "listScreen.html";
  }
}

//Sorting Voting function.================================
function SortTable(sortType) {
  console.log(sortType);
  sortType == "desc"
    ? (movies = movies.sort((a, b) => b.votes - a.votes))
    : (movies = movies.sort((a, b) => a.votes - b.votes));
  renderTableContent();
}

//Sorting Name function.================================
function SortTableByName(sortType) {
  console.log(sortType);
  sortType == "desc"
    ? (movies = movies.sort((a, b) => b.name.localeCompare(a.name)))
    : (movies = movies.sort((a, b) => a.name.localeCompare(b.name)));
  renderTableContent();
}

//Rendering Table function ==============================
function renderTableContent() {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";
  movies.forEach((movie) => {
    let row = table.insertRow();
    let name = row.insertCell(0);
    let image = row.insertCell(1);
    let votes = row.insertCell(2);
    name.innerHTML = movie.name;
    image.innerHTML = movie.image;
    votes.innerHTML = movie.votes;
  });
}

//====checking page to load scripts needed only============
if (page == "index.html") {
  document.getElementById("loginBtn").onclick = function () {
    login();
  };
}

if (page == "listScreen.html") {
  console.log(movies);
  document.getElementById("usernameHeader").innerHTML =
    sessionStorage.getItem("username");

  document.getElementById("asc").onclick = function () {
    SortTable("asc");
  };
  document.getElementById("desc").onclick = function () {
    SortTable("desc");
  };

  document.getElementById("ascName").onclick = function () {
    SortTableByName("asc");
  };
  document.getElementById("descName").onclick = function () {
    SortTableByName("desc");
  };

  renderTableContent();
}
