const subjectInput = document.getElementById("subject");
const timeInput = document.getElementById("time");
const addButton = document.getElementById("add-btn");
const list = document.getElementById("list");
const form = document.getElementById("form");

// 追加ボタン
let studyData = [];
form.addEventListener("submit", function (e) {
  e.preventDefault(); //ページリロード防止
  
  const subject = subjectInput.value;
  const time = Number(timeInput.value);

  if (subject.trim() === "" || time <= 0) {
    alert("正しい科目名と時間を入力してください");
    return;
  }

  studyData.push({
    subject: subject,
    time: time,
    date: getToday()
  });
  
  saveData();
  renderList();
  updateTotalTime();

  subjectInput.value = "";
  timeInput.value = "";
});

function getToday(){
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function renderList() {
  list.innerHTML = "";

  studyData.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML =`
      <span>${item.subject}</span>
      <span class="time">${item.time}</span>
      <span>時間</span>
      <button data-index="${index}">削除</button>
  `;

    li.querySelector("button").addEventListener("click", () => {
      studyData.splice(index, 1);
      saveData();
      renderList();
      updateTotalTime();
    });

    list.appendChild(li);
  });
}

function getTodayTotal(){
  const today = getToday();
  return studyData
    .filter(item => item.date === today)
    .reduce((sum, item) => sum + item.time, 0);
}

function getWeekTotal(){
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());

  return studyData.filter(item => {
    const d = new Date(item.date);
    return d >= weekStart && d <= now;
  }).reduce((sum, item) => sum + item.time, 0);
}

// 合計時間
function updateTotalTime() {
  const todayTotal = getTodayTotal();
  const weekTotal = getWeekTotal();

  document.getElementById("total").textContent =`今日:${todayTotal}時間 / 今週:${weekTotal}時間`;
}

// 保存
function saveData() {
  localStorage.setItem("studyData", JSON.stringify(studyData));
}

// 読み込み
function loadData() {
  const data = localStorage.getItem("studyData");
  if (data) {
    studyData = JSON.parse(data);
  }
  renderList();
  updateTotalTime();
}

loadData();
