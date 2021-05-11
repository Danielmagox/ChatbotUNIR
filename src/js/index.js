import _ from "lodash";
import "babel-polyfill";

const chatEl = document.getElementById("chat");
const generateEl = document.getElementById("generate");
const formEl = document.getElementById("chat-form");
const labelrespuesta = document.getElementById("label-respuesta");
let respuestaEl = document.getElementById("user-answer");
const masOpciones = document.createElement("input");
const opciones = document.createElement("select");
const opcionesTransferencia = document.createElement("select");
const opcionesDevolucion = document.createElement("select");
const optionA = document.createElement("option");
const optionB = document.createElement("option");
const optionC = document.createElement("option");
const optionD = document.createElement("option");

let counter = 0;
let rama = "";
let opcionElegida = "";
formEl.style.display = "none";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fin() {
  opcionesDevolucion.remove();
  opcionesTransferencia.remove();
  opciones.remove();
  labelrespuesta.remove();
  respuestaEl.remove();
  generateEl.remove();
  console.log("esta ebntrando aqui FIN");
  chatEl.innerHTML =
    "Ya hemos terminado, gracias por facilitarme toda esta informacion que nos ha permitido elaborar tu contrato. Mira en tu correo electrónico. Has debido recibir tu contrato personalizado";
}

const siguienteRespuesta = async () => {
  let respuesta = document.getElementById("user-answer").value;
  let opcionElegida = opciones.value;
  let opcionElegidaDinero = opcionesTransferencia.value;
  let opcionElegidaDevoluciones = opcionesDevolucion.value;
  console.log(opcionElegida);
  console.log(opcionElegidaDinero);
  console.log(opcionElegidaDevoluciones);

  await sleep(1000);
  if (counter == 0)
    chatEl.innerHTML = "¿Quieres que te ayude a formalizar un préstamo?";
  if (counter == 1 && respuesta == "no")
    chatEl.innerHTML =
      "Uno de nuestros expertos se pondrá en contacto contigo para ver cómo podemos ayudarte";
  if (counter == 1 && respuesta == "si")
    chatEl.innerHTML = "¿Eres prestamista o prestatario?";
  if (counter == 2 && respuesta == "prestamista") {
    chatEl.innerHTML = "¿Cuál es tu nombre?";
    rama = "prestamista";
  } else if (counter == 2 && respuesta == "prestatario") {
    chatEl.innerHTML = "¿Cómo te llamas?";
    rama = "prestatario";
  }
  if (counter == 3 && rama == "prestamista") {
    chatEl.innerHTML = "¿Cuáles son tus apellidos?";
  } else if (counter == 3 && rama == "prestatario") {
    chatEl.innerHTML = "¿Cómo te apellidas?";
  }
  if (counter == 4 && rama == "prestamista") {
    chatEl.innerHTML = "¿Cuál es tu número de DNI o NIE?";
  } else if (counter == 4 && rama == "prestatario") {
    chatEl.innerHTML = "¿Puedes decirme tu número de DNI o NIE?";
  }

  if (counter == 5 && rama == "prestamista") {
    chatEl.innerHTML = "¿En qué municipio vives?";
  } else if (counter == 5 && rama == "prestatario") {
    chatEl.innerHTML = "¿En qué municipio vives?";
  }

  if (counter == 6 && rama == "prestamista") {
    chatEl.innerHTML = "Y ¿en qué calle y número?";
  } else if (counter == 6 && rama == "prestatario") {
    chatEl.innerHTML = "Y ¿en qué calle y número?";
  }

  if (counter == 7 && rama == "prestamista") {
    chatEl.innerHTML =
      "Vamos a necesitar remitirte un documento e información, ¿a qué correo electrónico quieres que los enviemos?";
  } else if (counter == 7 && rama == "prestatario") {
    chatEl.innerHTML =
      "Vamos a necesitar remitirte un documento e información, ¿a qué correo electrónico quieres que los enviemos?";
  }

  if (counter == 8 && rama == "prestamista") {
    chatEl.innerHTML =
      "Y si necesitamos hablar contigo, ¿en qué teléfono podemos localizarte?";
  } else if (counter == 8 && rama == "prestatario") {
    chatEl.innerHTML =
      "Y si necesitamos hablar contigo, ¿en qué teléfono podemos localizarte?";
  }

  if (counter == 9 && rama == "prestamista") {
    labelrespuesta.style.display = "none";
    respuestaEl.style.display = "none";
    chatEl.innerHTML = "Tipo de objeto prestado";
    masOpciones.type = "text";
    masOpciones.id = "masOpciones";
    opciones.id = "opciones";
    optionA.text = "objeto1";
    optionA.value = "objeto1";
    optionB.text = "dinero";
    optionB.value = "dinero";
    optionC.text = "otro, especifique cual";
    optionC.value = "otro";
    opciones.add(optionA);
    opciones.add(optionB);
    opciones.add(optionC);
    formEl.appendChild(opciones);
    formEl.appendChild(masOpciones);
  }

  if (counter == 10 && rama == "prestamista") {
    if (opcionElegida != "dinero") {
      opciones.remove();
      masOpciones.remove();
      chatEl.innerHTML = "¿Puedes describir el objeto que se va a prestar?";
      labelrespuesta.style.display = "block";
      respuestaEl.style.display = "block";
      labelrespuesta.removeAttribute("style");
      respuestaEl.removeAttribute("style");
    }
  }

  if (counter == 11 && rama == "prestamista") {
    if (opcionElegida != "dinero") {
      opciones.remove();
      masOpciones.remove();
      chatEl.innerHTML = "¿Qué valor estimado tiene lo que se va a prestar?";
      labelrespuesta.style.display = "block";
      respuestaEl.style.display = "block";
      labelrespuesta.removeAttribute("style");
      respuestaEl.removeAttribute("style");
    }
  }

  if (counter == 12 && rama == "prestamista") {
    if (opcionElegida != "dinero" && opcionElegidaDinero != "transferencia") {
      opciones.remove();
      masOpciones.remove();
      chatEl.innerHTML = "¿Cuándo deberá ser devuelto el objeto prestado?";
      labelrespuesta.style.display = "block";
      respuestaEl.style.display = "block";
      labelrespuesta.removeAttribute("style");
      respuestaEl.removeAttribute("style");
      fin();
    }
  }

  if (counter == 10 && rama == "prestamista") {
    if (opcionElegida == "dinero") {
      opciones.remove();
      masOpciones.remove();
      chatEl.innerHTML = "Indique la cantidad Prestada";
      labelrespuesta.style.display = "block";
      respuestaEl.style.display = "block";
      labelrespuesta.removeAttribute("style");
      respuestaEl.removeAttribute("style");
    }
  }

  if (counter == 11 && rama == "prestamista") {
    if (opcionElegida == "dinero") {
      labelrespuesta.style.display = "none";
      respuestaEl.style.display = "none";
      chatEl.innerHTML =
        "Escoge la modalidad de entrega del importe de dinero objeto del préstamo";
      opcionesTransferencia.id = "opcionesTransferencia";
      optionA.text = "Ingreso o transferencia bancaria en la cuenta";
      optionA.value = "transferencia";
      optionB.text = "Entrega de cheque bancario";
      optionB.value = "cheque";
      optionC.text = "Entrega de dinero en mano";
      optionC.value = "dinero_mano";
      opcionesTransferencia.add(optionA);
      opcionesTransferencia.add(optionB);
      opcionesTransferencia.add(optionC);
      formEl.appendChild(opcionesTransferencia);
    }
  }

  if (counter == 12 && rama == "prestamista") {
    if (opcionElegidaDinero == "transferencia") {
      console.log(counter);
      console.log(opcionElegida);
      opcionesTransferencia.remove();
      chatEl.innerHTML =
        "Si eres tú quien prestas el dinero, ¿desde qué número de cuenta lo enviarás?";
      labelrespuesta.style.display = "block";
      respuestaEl.style.display = "block";
      labelrespuesta.removeAttribute("style");
      respuestaEl.removeAttribute("style");
    }
  }

  if (counter == 13 && rama == "prestamista") {
    labelrespuesta.style.display = "none";
    respuestaEl.style.display = "none";
    chatEl.innerHTML =
      "Hablemos ahora de las condiciones de devolución acordadas para el préstamo";
  }

  if (counter == 14 && rama == "prestamista") {
    chatEl.innerHTML = "¿Cómo se devolverá el préstamo?";
    opcionesDevolucion.id = "opcionesDevolucion";
    optionA.text = "En un único pago";
    optionA.value = "pago";
    optionB.text = "En pagos periódicos";
    optionB.value = "periodicos";
    optionC.text = "De otra forma";
    optionC.value = "otra_forma";
    opcionesDevolucion.add(optionA);
    opcionesDevolucion.add(optionB);
    opcionesDevolucion.add(optionC);
    formEl.appendChild(opcionesDevolucion);
  }

  if (counter == 15 && rama == "prestamista") {
    if (opcionElegidaDevoluciones != "otra_forma") {
      fin();
    }
  }

  if (counter == 15 && rama == "prestamista") {
    if (opcionElegidaDevoluciones == "otra_forma") {
      opcionesDevolucion.remove();
      chatEl.innerHTML =
        "¿Puedes describir las condiciones de devolución acordadas?";
      labelrespuesta.style.display = "block";
      respuestaEl.style.display = "block";
      labelrespuesta.removeAttribute("style");
      respuestaEl.removeAttribute("style");
    }
  }

  if (counter == 16 && rama == "prestamista") {
    if (opcionElegidaDevoluciones == "otra_forma") {
      chatEl.innerHTML =
        "¿Se tendrá que devolver el importe total antes de una fecha determinada?";
    }
  }

  if (counter == 17 && rama == "prestamista") {
    if (opcionElegidaDevoluciones == "otra_forma") {
      chatEl.innerHTML =
        "Indica por favor la fecha límite en la que debe ser devuelto el importe prestado";
    }
  }

  if (counter == 18 && rama == "prestamista") {
    if (opcionElegidaDevoluciones == "otra_forma") {
      chatEl.innerHTML =
        "Si llegada esa fecha, no se hubiera devuelto todo o parte del importe prestado, ¿Qué porcentaje de interés deberá abonar el deudor?";
    }
    fin();
  }

  formEl.style.display = "block";
  counter = counter + 1;
};

generateEl.addEventListener("click", siguienteRespuesta);
