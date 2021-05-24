import _ from "lodash";
import "babel-polyfill";
const fs = require("fs");

const chatEl = document.getElementById("chat");
const generateEl = document.getElementById("generate");
const formEl = document.getElementById("chat-form");
let respuestaEl = document.getElementById("user-answer");
const masOpciones = document.createElement("input");
const opciones = document.createElement("select");
const opcionesPrestamo = document.createElement("select");
const opcionesPrestamista = document.createElement("select");
const opcionesTransferencia = document.createElement("select");
const opcionesDevolucion = document.createElement("select");
const enlaceDescarga = document.createElement("a");
const botonDescarga = document.createElement("button");
const optionA = document.createElement("option");
const optionB = document.createElement("option");
const optionC = document.createElement("option");
let personaJson = "";

let counter = 0;
let rama = "";
let opcionElegida = "";
formEl.style.display = "none";
let finRealizado = new Boolean(false);

var persona = {
  tipoPersona: "",
  nombre: "",
  apellidos: "",
  documento: "",
  municipio: "",
  calleNum: "",
  correo: "",
  telefono: "",
  tipoObjetoPrestado: "",
  descripcionObjetoPrestado: "",
  valorEstimadoObjetoPrestado: "",
  cantidadPrestada: "",
  modalidadEntrega: "",
  numeroCuenta: "",
  opcionDevolucion: "",
  condicionesDevolucion: "",
  importeFechaDeterminada: "",
  fechaLimitePrestamo: "",
  porcentajeInteres: "",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fin() {
  opcionesDevolucion.remove();
  opcionesTransferencia.remove();
  opciones.remove();
  respuestaEl.remove();
  generateEl.remove();
  opcionesPrestamo.remove();
  opcionesPrestamista.remove();
  chatEl.innerHTML =
    "Ya hemos terminado, gracias por facilitarme toda esta informacion que nos ha permitido elaborar tu contrato. Mira en tu correo electrónico. Has debido recibir tu contrato personalizado";
  finRealizado = Boolean(true);
  imprimir();
}

function limpiar(persona) {
  for (let propName in persona) {
    if (persona[propName] === "" || persona[propName] === null) {
      delete persona[propName];
    }
  }
  return persona;
}

const siguienteRespuesta = async () => {
  let respuesta = document.getElementById("user-answer").value;
  let opcionElegida = opciones.value;
  let opcionElegidaDinero = opcionesTransferencia.value;
  let opcionElegidaDevoluciones = opcionesDevolucion.value;

  if (counter == 1)
    respuesta = document.getElementById("opcionesPrestamo").value;
  if (counter == 2)
    respuesta = document.getElementById("opcionesPrestamista").value;

  if (counter == 0) {
    chatEl.innerHTML = "¿Quieres que te ayude a formalizar un préstamo?";
    respuestaEl.style.display = "none";
    opcionesPrestamo.id = "opcionesPrestamo";
    optionB.text = "Si";
    optionB.value = "si";
    optionC.text = "No";
    optionC.value = "no";
    opcionesPrestamo.add(optionB);
    opcionesPrestamo.add(optionC);
    formEl.appendChild(opcionesPrestamo);
  }

  if (counter == 1 && respuesta == "no") {
    chatEl.innerHTML =
      "Uno de nuestros expertos se pondrá en contacto contigo para ver cómo podemos ayudarte";
    opcionesPrestamo.remove();
    generateEl.remove();
  }
  if (counter == 1 && respuesta == "si") {
    chatEl.innerHTML = "¿Eres prestamista o prestatario?";
    opcionesPrestamo.remove();
    respuestaEl.style.display = "none";
    opcionesPrestamista.id = "opcionesPrestamista";
    optionB.text = "Prestamista";
    optionB.value = "prestamista";
    optionC.text = "Prestatario";
    optionC.value = "prestatario";
    opcionesPrestamista.add(optionC);
    opcionesPrestamista.add(optionB);
    formEl.appendChild(opcionesPrestamista);
  }
  if (counter == 2 && respuesta == "prestamista") {
    opcionesPrestamista.remove();
    respuestaEl.style.display = "block";
    respuestaEl.removeAttribute("style");
    chatEl.innerHTML = "¿Cuál es tu nombre?";
    rama = "prestamista";
    persona.tipoPersona = respuesta;
  } else if (counter == 2 && respuesta == "prestatario") {
    chatEl.innerHTML = "¿Cómo te llamas?";
    rama = "prestatario";
    persona.tipoPersona = respuesta;
  }

  if (counter == 3 && rama == "prestamista") {
    chatEl.innerHTML = "¿Cuáles son tus apellidos?";
    persona.nombre = respuesta;
  } else if (counter == 3 && rama == "prestatario") {
    chatEl.innerHTML = "¿Cómo te apellidas?";
    persona.nombre = respuesta;
  }

  if (counter == 4 && rama == "prestamista") {
    chatEl.innerHTML = "¿Cuál es tu número de DNI o NIE?";
    persona.apellidos = respuesta;
  } else if (counter == 4 && rama == "prestatario") {
    chatEl.innerHTML = "¿Puedes decirme tu número de DNI o NIE?";
    persona.apellidos = respuesta;
  }

  if (counter == 5 && rama == "prestamista") {
    chatEl.innerHTML = "¿En qué municipio vives?";
    persona.documento = respuesta;
  } else if (counter == 5 && rama == "prestatario") {
    chatEl.innerHTML = "¿En qué municipio vives?";
    persona.documento = respuesta;
  }

  if (counter == 6 && rama == "prestamista") {
    chatEl.innerHTML = "Y ¿en qué calle y número?";
    persona.municipio = respuesta;
  } else if (counter == 6 && rama == "prestatario") {
    chatEl.innerHTML = "Y ¿en qué calle y número?";
    persona.municipio = respuesta;
  }

  if (counter == 7 && rama == "prestamista") {
    chatEl.innerHTML =
      "Vamos a necesitar remitirte un documento e información, ¿a qué correo electrónico quieres que los enviemos?";
    persona.calleNum = respuesta;
  } else if (counter == 7 && rama == "prestatario") {
    chatEl.innerHTML =
      "Vamos a necesitar remitirte un documento e información, ¿a qué correo electrónico quieres que los enviemos?";
    persona.calleNum = respuesta;
  }

  if (counter == 8 && rama == "prestamista") {
    chatEl.innerHTML =
      "Y si necesitamos hablar contigo, ¿en qué teléfono podemos localizarte?";
    persona.correo = respuesta;
  } else if (counter == 8 && rama == "prestatario") {
    chatEl.innerHTML =
      "Y si necesitamos hablar contigo, ¿en qué teléfono podemos localizarte?";
    persona.correo = respuesta;
  }

  if (counter == 9 && rama == "prestamista") {
    persona.telefono = respuesta;
    respuestaEl.style.display = "none";
    chatEl.innerHTML = "Tipo de objeto prestado";
    masOpciones.type = "text";
    masOpciones.id = "masOpciones";
    masOpciones.placeholder = "especifique otro";
    opciones.id = "opciones";
    optionB.text = "dinero";
    optionB.value = "dinero";
    optionC.text = "otro, especifique cual";
    optionC.value = "otro";
    opciones.add(optionB);
    opciones.add(optionC);
    formEl.appendChild(opciones);
    formEl.appendChild(masOpciones);
  }

  if (counter == 10 && rama == "prestamista") {
    if (opcionElegida != "dinero") {
      let respuestaOpciones = document.getElementById("masOpciones").value;
      persona.tipoObjetoPrestado = opcionElegida;
      if (opcionElegida == "otro")
        persona.tipoObjetoPrestado = respuestaOpciones;
      opciones.remove();
      masOpciones.remove();
      chatEl.innerHTML = "¿Puedes describir el objeto que se va a prestar?";
      respuestaEl.style.display = "block";
      respuestaEl.removeAttribute("style");
    }
  }

  if (counter == 11 && rama == "prestamista") {
    if (opcionElegida != "dinero") {
      persona.descripcionObjetoPrestado = respuesta;
      opciones.remove();
      masOpciones.remove();
      chatEl.innerHTML = "¿Qué valor estimado tiene lo que se va a prestar?";
      respuestaEl.style.display = "block";
      respuestaEl.removeAttribute("style");
    }
  }

  if (counter == 12 && rama == "prestamista") {
    if (opcionElegida != "dinero" && opcionElegidaDinero != "transferencia") {
      persona.valorEstimadoObjetoPrestado = respuesta;
      opciones.remove();
      masOpciones.remove();
      chatEl.innerHTML = "¿Cuándo deberá ser devuelto el objeto prestado?";
      respuestaEl.style.display = "block";
      respuestaEl.removeAttribute("style");
      fin();
    }
  }

  if (counter == 10 && rama == "prestamista") {
    if (opcionElegida == "dinero") {
      persona.tipoObjetoPrestado = opcionElegida;
      opciones.remove();
      masOpciones.remove();
      chatEl.innerHTML = "Indique la cantidad Prestada";
      respuestaEl.style.display = "block";
      respuestaEl.removeAttribute("style");
    }
  }

  if (counter == 11 && rama == "prestamista") {
    if (opcionElegida == "dinero") {
      persona.cantidadPrestada = respuesta;
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
      persona.modalidadEntrega = respuesta;
      opcionesTransferencia.remove();
      chatEl.innerHTML =
        "Si eres tú quien prestas el dinero, ¿desde qué número de cuenta lo enviarás?";
      respuestaEl.style.display = "block";
      respuestaEl.removeAttribute("style");
    }
  }

  if (counter == 13 && rama == "prestamista") {
    persona.numeroCuenta = respuesta;
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
      persona.opcionDevolucion = respuesta;
      fin();
    }
  }

  if (counter == 15 && rama == "prestamista") {
    if (opcionElegidaDevoluciones == "otra_forma") {
      persona.opcionDevolucion = respuesta;
      opcionesDevolucion.remove();
      chatEl.innerHTML =
        "¿Puedes describir las condiciones de devolución acordadas?";
      respuestaEl.style.display = "block";
      respuestaEl.removeAttribute("style");
    }
  }

  if (counter == 16 && rama == "prestamista") {
    if (opcionElegidaDevoluciones == "otra_forma") {
      persona.condicionesDevolucion = respuesta;
      chatEl.innerHTML =
        "¿Se tendrá que devolver el importe total antes de una fecha determinada?";
    }
  }

  if (counter == 17 && rama == "prestamista") {
    if (opcionElegidaDevoluciones == "otra_forma") {
      persona.opcionDevolucion = respuesta;
      chatEl.innerHTML =
        "Indica por favor la fecha límite en la que debe ser devuelto el importe prestado";
    }
  }

  if (counter == 18 && rama == "prestamista") {
    if (opcionElegidaDevoluciones == "otra_forma") {
      persona.fechaLimitePrestamo = respuesta;
      chatEl.innerHTML =
        "Si llegada esa fecha, no se hubiera devuelto todo o parte del importe prestado, ¿Qué porcentaje de interés deberá abonar el deudor?";
    }
  }

  if (counter == 19 && rama == "prestamista") {
    persona.porcentajeInteres = respuesta;
    fin();
  }

  if (counter == 0) formEl.style.display = "flex";
  counter = counter + 1;
  respuestaEl.value = "";
};

generateEl.addEventListener("click", siguienteRespuesta);

botonDescarga.addEventListener("click", function () {
  let text = imprimir();
  let filename = persona.documento;

  download(filename, text);
});

function download(filename, text) {
  enlaceDescarga.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  enlaceDescarga.setAttribute("download", filename);
  enlaceDescarga.style.display = "none";

  document.body.appendChild(enlaceDescarga);
  enlaceDescarga.click();
  document.body.removeChild(enlaceDescarga);
}

function imprimir() {
  if (finRealizado === true) {
    console.log("limpio");
    persona = limpiar(persona);
    console.log(persona);

    personaJson = JSON.stringify(persona, null, 4);
    botonDescarga.id = "descarga";
    botonDescarga.innerText = "Descargar";
    formEl.appendChild(botonDescarga);
    console.log(personaJson);
    return personaJson;
  }
}
