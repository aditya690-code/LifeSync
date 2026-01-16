export function handleLayout(lay,setActiveLayout) {
  localStorage.setItem("layout", lay);
  setActiveLayout(lay);
}
