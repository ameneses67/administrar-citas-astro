// variables
const formularioInputs = document.querySelectorAll(
  "#nueva-cita input"
) as NodeListOf<HTMLInputElement>;

const formularioTextarea = document.querySelector(
  "#nueva-cita textarea"
) as HTMLTextAreaElement;

const formularioButton = document.querySelector(
  '[type="submit"]'
) as HTMLButtonElement;

const formulario = document.querySelector("#nueva-cita") as HTMLFormElement;

const listadoCitas = document.querySelector("#listado-citas") as HTMLDivElement;

interface IcitaObj {
  mascota: string;
  propietario: string;
  telefono: string;
  fecha: string;
  hora: string;
  sintomas: string;
  id: string;
  [key: string]: any;
}

const citaObj: IcitaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
  id: "",
};

// eventos
eventListeners();
function eventListeners() {
  formularioInputs.forEach((input) => {
    input.addEventListener("change", (e: Event) => {
      citaObj[(e.target as HTMLInputElement).name] = (
        e.target as HTMLInputElement
      ).value;
    });
  });
  formularioTextarea.addEventListener("change", (e: Event) => {
    citaObj[(e.target as HTMLTextAreaElement).name] = (
      e.target as HTMLTextAreaElement
    ).value;
  });
}

export {
  formulario,
  formularioInputs,
  formularioTextarea,
  formularioButton,
  citaObj,
  listadoCitas,
};
export type { IcitaObj };
