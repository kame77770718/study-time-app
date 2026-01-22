const subjectInput = document.getElementById("subject");
const timeInput = document.getElementById("time");
const addButton = document.getElementById("add-btn");
const list = document.getElementById("list");

addButton.addEventListener("click", function () {
  console.log("ボタンが押されました");
});

addButton.addEventListener("click", function () {
  const subject = subjectInput.value;
  const time = timeInput.value;

  console.log(subject, time);
});

addButton.addEventListener("click", function () {
  const subject = subjectInput.value;
  const time = timeInput.value;

  const li = document.createElement("li");
  li.textContent = subject + "：" + time + "時間";

  list.appendChild(li);
});
