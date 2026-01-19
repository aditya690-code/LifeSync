export function handleLayout(lay, setActiveLayout) {
  localStorage.setItem("layout", lay);
  setActiveLayout(lay);
}
export function scrollToBottom() {
  const el = document.querySelector(".display");
  if (!el) return;
  el.scrollTop = el.scrollHeight;
}
export function handleUserInput(userInput, setUserInput, handleAiForm) {
  if (userInput.trim() == "") return;
  const userP = document.createElement("p");
  userP.classList.add("chat-user");
  userP.innerText = userInput;
  document.querySelector(".display").append(userP);
  scrollToBottom();
  setUserInput("");
  handleAiForm();
}
