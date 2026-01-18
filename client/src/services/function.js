export function handleLayout(lay, setActiveLayout) {
  localStorage.setItem("layout", lay);
  setActiveLayout(lay);
}
export function scrollToBottom() {
  const el = document.querySelector(".display");
  if (!el) return;
  el.scrollTop = el.scrollHeight;
}
