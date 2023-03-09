import {
  formularioButton,
  formularioInputs,
  formularioTextarea,
  listadoCitas,
  citaObj,
} from "./eventListeners";
import type { IcitaObj } from "./eventListeners";
import { administrarCitas, Citas } from "./Citas";

class UI {
  imprimirAlerta(mensaje: string, tipo: string) {
    // crear el div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "p-4", "font-semibold");

    // agregar clases en base al tipo de error
    if (tipo === "error") {
      divMensaje.classList.add(
        "border",
        "border-red-500",
        "bg-red-100",
        "text-red-500"
      );
    } else {
      divMensaje.classList.add(
        "border",
        "border-green-500",
        "bg-green-100",
        "text-green-500"
      );
    }

    // agregar mensaje al div
    divMensaje.textContent = mensaje;

    // agregar al dom
    document.querySelector("#divAlerta")?.appendChild(divMensaje);

    // quitar alerta después de 3 seg
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  imprimirCitas({ citas }: Citas) {
    this.limpiarHTML();

    citas.forEach((cita: IcitaObj) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;

      // crear div para cada cita
      const divCitas = document.createElement("div");
      divCitas.classList.add("p-4", "border-b", "border-gray-300");
      divCitas.dataset.id = id;

      // crear párrafo para cada dato de la cita
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("text-2xl", "font-bold");
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `
        <span class="font-bold">Propietario: </span> ${propietario}
      `;

      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `
        <span class="font-bold">Teléfono: </span> ${telefono}
      `;

      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `
        <span class="font-bold">Fecha: </span> ${fecha}
      `;

      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `
        <span class="font-bold">Hora: </span> ${hora}
      `;

      const sintomasParrafo = document.createElement("p");
      sintomasParrafo.innerHTML = `
        <span class="font-bold">Síntomas: </span> ${sintomas}
      `;

      // botón para eliminar citas
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add(
        "px-4",
        "py-1",
        "text-white",
        "font-bold",
        "bg-red-400",
        "rounded-md",
        "mt-2",
        "mr-4"
      );
      btnEliminar.innerHTML = "Eliminar";

      btnEliminar.onclick = () => eliminarCita(id);

      // botón para editar la cita
      const btnEditar = document.createElement("button");
      btnEditar.classList.add(
        "px-4",
        "py-1",
        "text-white",
        "font-bold",
        "bg-sky-400",
        "rounded-md",
        "mt-2"
      );
      btnEditar.textContent = "Editar";

      btnEditar.onclick = () => cargarEdicion(cita);

      // añadir datos cita al div
      divCitas.appendChild(mascotaParrafo);
      divCitas.appendChild(propietarioParrafo);
      divCitas.appendChild(telefonoParrafo);
      divCitas.appendChild(fechaParrafo);
      divCitas.appendChild(horaParrafo);
      divCitas.appendChild(sintomasParrafo);
      divCitas.appendChild(btnEliminar);
      divCitas.appendChild(btnEditar);

      // imprimir el div en el html
      listadoCitas.appendChild(divCitas);
    });
  }

  limpiarHTML() {
    while (listadoCitas.firstChild) {
      listadoCitas.removeChild(listadoCitas.firstChild);
    }
  }
}

const ui = new UI();

export { ui };

function eliminarCita(id: string) {
  // eliminar la cita
  administrarCitas.eliminarCita(id);

  // mostrar mensaje
  ui.imprimirAlerta("Cita eliminada correctamente", "notificacion");

  // refrescar las citas
  ui.imprimirCitas(administrarCitas);
}

export let editando: boolean;

// cargar los datos y el modo edición
function cargarEdicion(cita: IcitaObj) {
  // llenar inputs con los datos de la cita
  formularioInputs.forEach((input: HTMLInputElement) => {
    input.value = cita[input.name];
  });
  formularioTextarea.value = cita.sintomas;

  // llenar el objeto
  formularioInputs.forEach((input) => {
    citaObj[input.name] = cita[input.name];
  });
  citaObj[formularioTextarea.name] = cita.sintomas;
  citaObj.id = cita.id;

  // cambiar text botón
  formularioButton.textContent = "Guardar Cambios";

  editando = true;
}
