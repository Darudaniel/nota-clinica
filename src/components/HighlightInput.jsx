import { useRef } from "react";
import '../styles/HighlightInput.css'

function HighlightInput() {
  const inputRef = useRef(null);

  const colors = [
    "#44e2f798",
    "#f1ff73",
    "#f8567fcc",
    "#73ff9d",
    "#6c757d7a"
  ]

  const wordsAndColors = [
    //INSTRUCCIONES PARA AGREGAR PALABRAS
    //Las palabras se deben agregar entre virgulillas ``
    //Las palabras se deben agregar en singular a menos que tenga dos opciones de palabra porque mas adelante hay otra expresion regular que no distingue de singular y plural
    //Las palabras se deben agregar en minusculas porque mas adelante hay otra expresion regular que no distingue de mayusuculas y minusculas
    //Agregar todas las variantes que se ocurran con | antes de agregar otra palabra

    //Cyan
    { word: `an[aá]lisis`, color: colors[0]},
    { word: `antecedente`, color: colors[0]},
    { word: `diagn[oó]stico(s)?|dx`, color: colors[0]},
    { word: `imagen|im[aá]genes`, color: colors[0]},
    { word: `objetivo`, color: colors[0] },
    { word: `paracl[ií]nico`, color: colors[0]},
    { word: `plan`, color: colors[0]},
    { word: `subjetivo|s:`, color: colors[0]},
    { word: `tratamiento(s)?|tto`, color: colors[0]},
    
    
    //Amarillo
    { word: `hba1c|hemoglobina glicada|hemoglobina glicosilada`, color: colors[1]},
    
    //Pink
    { word: `hb|hemoglobina`, color: colors[2]},

    //Verde
    { word: `aceptables condiciones`, color: colors[3]},

    //Gris
    { word: `\\b((0?[1-9]|[12]\\d|3[01])[\\/\\.-](0?[1-9]|1[0-2])[\\/\\.-](\\d{4}|\\d{2}))(?=\\W|$)`, color: colors[4]}
    //fechas
  ];

  const handleHighlight = () => {
    const inputElement = inputRef.current;
    let inputValue = inputElement.innerHTML;

    wordsAndColors.forEach(({ word, color }) => {
      const regex = new RegExp(`\\b${word}(s)?\\b`, "gi");

      inputValue = inputValue.replace(
        regex,
        (match) =>
          `<span style="background-color:${color}">${match}</span>`
      );
    });

    inputElement.innerHTML = inputValue;
    inputElement.focus();
  };

  return (
    <div className="HighlightInput">
      <div
        ref={inputRef}
        style={{ whiteSpace: "pre-wrap", display: "inline-block" }}
        contentEditable
      />
      <button onClick={handleHighlight}>Revisar</button>
    </div>
  );
}

export default HighlightInput;
