// variables
import { citaObj, formulario, formularioButton } from "./eventListeners";
import type { IcitaObj } from "./eventListeners";
import { editando, ui } from "./UI";

// eventos
formulario.addEventListener("submit", nuevaCita);

// clases
export class Citas {
  citas: IcitaObj[];

  constructor() {
    this.citas = [];
  }

  agregarCita(cita: IcitaObj) {
    this.citas = [...this.citas, cita];
  }

  eliminarCita(id: string) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }

  editarCita(citaActualizada: IcitaObj) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaActualizada.id ? citaActualizada : cita
    ); // usamos map en lugar de forEach porque map retorna un arreglo
  }
}

// instanciar clase Citas
export const administrarCitas = new Citas();

// validar y agregar una nueva cita a la clase de citas
function nuevaCita(e: Event) {
  e.preventDefault();

  // extraer la información de objCita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  // validar que se hayan capturado todos los campos viendo si están todas las propiedades de citaObj
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");

    return;
  }

  if (editando.edicion) {
    ui.imprimirAlerta("Cita Editada Correctamente", "notificacion");

    // pasar objeto de la cita a edición
    administrarCitas.editarCita({ ...citaObj });

    // regresar texto botón a original
    formularioButton.textContent = "Crear Cita";

    // deshabilitar modo edición
    editando.edicion = false;
  } else {
    // generar un id único para cada cita
    citaObj.id = Date.now().toString();

    // crear nueva cita
    administrarCitas.agregarCita({ ...citaObj }); // para evitar que sobreescriba y se repita

    // mensaje agregado correctamente
    ui.imprimirAlerta("Cita agregada correctamente", "notificacion");
  }

  // resetear citaObj
  reiniciarCitaObj();

  // resetear el formulario
  formulario.reset();

  // imprimir citas en el html
  ui.imprimirCitas(administrarCitas);
}

// reiniciar citaObj porque aunque se resetee el formulario si se da clic al botón vuelve a generar la misma cita porque el objeto todavía tiene los valores
function reiniciarCitaObj() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}
