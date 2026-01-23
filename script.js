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

  addItem(subject, time) {
    const li = document.createElement("li");
    li.textContent = subject + ":" + time + "時間";

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

  function loadData() {
    const data = localStorage.getItem("studyData");
    if (data) {
      list.innerHTML = data;

      const buttons = list.querySelecorAll("button");
      buttons.forEach(function (btn) {
        btn.addEventListenner("click", function () {
          btn.parentElement.remove();
          saveData();
          updateTotalTime();
        });
      });
    }
    updateTotalTime();
  }
  

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

function updateTotalTime(){
  let total = 0;

  const items = list.querySelectorAll("li");
  items.forEach(function (li){
    const text = li.firstChild.textContent;
    const time = Number(text.split(":")[1].replace("時間", ""));
    total += time;
  });

  document.getElementById("total").textContent ="合計勉強時間：" + total + "時間";
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

