const subjectInput = document.getElementById("subject");
const timeInput = document.getElementById("time");
const addButton = document.getElementById("add-btn");
const list = document.getElementById("list");

// 追加処理
addButton.addEventListener("click", function () {
  const subject = subjectInput.value;
  const time = timeInput.value;

  if (subject.trim() === "" || time <= 0) {
    alert("正しい科目名と時間を入力してください");
    return;
  }

  addItem(subject, time);
  saveData();

  subjectInput.value = "";
  timeInput.value = "";
});

// 1件追加する関数
function addItem(subject, time) {
  const li = document.createElement("li");
  li.textContent = subject + "：" + time + "時間 ";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";

  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveData();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
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
      });
    });
  }
}

loadData();

