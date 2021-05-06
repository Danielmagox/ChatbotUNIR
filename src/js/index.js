import _ from "lodash";
import "babel-polyfill";

const chatEl = document.getElementById("chat");
const generateEl = document.getElementById("generate");
const formEl = document.getElementById("chat-form");
let counter = 0;
formEl.style.display = "none";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const siguienteRespuesta = async () => {
  await sleep(2000);
  chatEl.innerHTML = "¿Quieres que te ayude a formalizar un préstamo?";
  formEl.style.display = "block";
};

generateEl.addEventListener("click", siguienteRespuesta);
