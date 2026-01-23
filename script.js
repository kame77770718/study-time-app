const subjectInput = document.getElementById("subject");
const timeInput = document.getElementById("time");
const addButton = document.getElementById("add-btn");
const list = document.getElementById("list");
const form = document.getElementById("form");

// 追加ボタン
form.addEventListener("submit", function (e) {
  e.preventDefault(); //ページリロード防止
  
  const subject = subjectInput.value;
  const time = Number(timeInput.value);

  if (subject.trim() === "" || time <= 0) {
    alert("正しい科目名と時間を入力してください");
    return;
  }

  addItem(subject, time);
  saveData();

  subjectInput.value = "";
  timeInput.value = "";
});

// Enterキー対応（時間入力欄でEnter）
timeInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addButton.click();
  }
});

// 1件追加
function addItem(subject, time) {
  const li = document.createElement("li");
  li.textContent = subject + "：" + time + "時間 ";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";

  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveData();
    updateTotalTime();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);

  updateTotalTime();
}

// 合計時間
function updateTotalTime() {
  let total = 0;

  const items = list.querySelectorAll("li");
  items.forEach(function (li) {
    const text = li.firstChild.textContent;
    const time = Number(text.split("：")[1].replace("時間", ""));
    total += time;
  });

  document.getElementById("total").textContent =
    "合計勉強時間：" + total + "時間";
}

// 保存
function saveData() {
  localStorage.setItem("studyData", list.innerHTML);
}

// 読み込み
function loadData() {
  const data = localStorage.getItem("studyData");
  if (data) {
    list.innerHTML = data;

    const buttons = list.querySelectorAll("button");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.parentElement.remove();
        saveData();
        updateTotalTime();
      });
    });
  }
  updateTotalTime();
}

loadData();
