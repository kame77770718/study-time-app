const subjectInput = document.getElementById("subject");
const timeInput = document.getElementById("time");
const addButton = document.getElementById("add-btn");
const list = document.getElementById("list");

addButton.addEventListener("click", function () {
  const subject = subjectInput.value;
  const time = timeInput.value;

  if (subject === "" || time === "") {
    alert("科目名と時間を入力してください");
    return;
  }

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

  saveData();

  subjectInput.value = "";
  timeInput.value = "";
});
