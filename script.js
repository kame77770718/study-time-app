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

// 1件追加
function addItem(subject, time) {
  const li = document.createElement("li");

  const textSpan = document.createElement("span");
  textSpan.textContent = subject +":";

  const timeSpan = document.createElement("span");
  timeSpan.textContent = time;
  timeSpan.classList.add("time");

  const unitSpan = document.createElement("span");
  unitSpan.textContent = "時間";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";

  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveData();
    updateTotalTime();
  });

  timeSpan.addEventListener("click", function () {
    editTime(timeSpan);
  });

  li.appendChild(textSpan);
  li.appendChild(timeSpan);
  li.appendChild(unitSpan);
  li.appendChild(deleteBtn);
  
  list.appendChild(li);
  updateTotalTime();
}

function editTime(timeSpan){
  const currentTime = timeSpan.textContent;

  const input = document.createElement("input");
  input.type = "number";
  input.value = currentTime;
  input.style.width = "60px";

  timeSpan.replaceWith(input);
  input.focus();

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter"){
      const newTime = Number(input.value);

      if(newTime <= 0) {
        alert("正しい時間を入力してください");
        return;
      }

      timeSpan.textContent = newTime;
      input.replaceWith(timeSpan);

      saveData();
      updateTotalTime();
    }
  });
}

// 合計時間
function updateTotalTime() {
  let total = 0;

  const timeSpans = list.querySelectorAll(".time");
  timeSpans.forEach(function (span) {
    total += Number(span.textContent);
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
