import { useRef, useState } from "react";
import '../styles/HighlightInput.css'
import { registerEvent } from '../firebase';

function HighlightInput() {
  const [message, setMessage] =useState('')

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [buttonBlock, setButtonBlock] = useState(false);

  const inputRef = useRef(null);

  const colors = [
    "#44e2f798",
    "#fcf826",
    "#ff7b008a",
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
    { word: `im[aá]genes|imagen`, color: colors[0]},
    { word: `medicamento`, color: colors[0]},  
    { word: `laboratorio`, color: colors[0]},  
    { word: `objetivo`, color: colors[0] },
    { word: `paracl[ií]nico`, color: colors[0]},
    { word: `plan`, color: colors[0]},
    { word: `tratamiento(s)?|tto`, color: colors[0]},
    
    
    //Amarillo
    { word: `hba1c|hemoglobina glicada|hemoglobina glicosilada`, color: colors[1]},
    { word: `tsh`, color: colors[1]},    
    { word: `ipa`, color: colors[1]},    
    
    //Orange
    { word: `bun`, color: colors[2]},
    { word: `cl |cl:|cloro`, color: colors[2]},
    { word: `colesterol`, color: colors[2]},
    { word: `creatinina|cr:`, color: colors[2]},
    { word: `hemoglobina|hb`, color: colors[2]},
    { word: `hematocrito|hcto`, color: colors[2]},
    { word: `leucocitos|leucos|lc`, color: colors[2]},
    { word: `mg:|magnesio`, color: colors[2]},
    { word: `neutrofilo`, color: colors[2]},
    { word: `potasio|k`, color: colors[2]},
    { word: `plaquetas|plt|plts`, color: colors[2]},
    { word: `sodio|na:`, color: colors[2]},
    { word: `tp`, color: colors[2]},
    { word: `tpt`, color: colors[2]},
    { word: `triglicerido`, color: colors[2]},
    { word: `uroanalisis`, color: colors[2]},
    { word: `vsg`, color: colors[2]},

    //Verde
    { word: `aceptables condiciones`, color: colors[3]},
    { word: `frecuencia cardíaca|fc`, color: colors[3]}, 
    { word: `frecuencia respiratoria|fr`, color: colors[3]}, 
    { word: `pa |pa:|presi[oó]n arterial`, color: colors[3]}, 
    { word: `saturaci[oón]|so2`, color: colors[3]}, 
    { word: `t:|temperatura`, color: colors[3]}, 



    //Gris
    { word: `\\b((0?[1-9]|[12]\\d|3[01])[\\/\\.-](0?[1-9]|1[0-2])[\\/\\.-](\\d{4}|\\d{2}))(?=\\W|$)`, color: colors[4]}
    //fechas
  ];

  const buttonCooldown = () => {
    setButtonBlock(true)
    setTimeout(() => {
      setButtonBlock(false)
    }, 600000);
  }

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
    const inputText = inputElement.innerText
    setMessage(inputText)
    registerEvent('review note')
    setIsActive(true)
    inputElement.innerHTML = inputValue;
    inputElement.focus();
  };

  const sendRequest = async () => {

    setLoading(true); 
    const myPrompt = `En español ennumera las problematicas especificas de la siguiente nota clinica. por favor no menciones los diagnosticos, los antecedentes personales, el nombre del paciente, ni los medicamentos que toma, a menos que sean de extrema relevancia, y no des una introducción, solo ennumera:${message}`

    const prompt = myPrompt

    try {
    const response = await fetch('https://my-chatbot-dun.vercel.app/api/v1/chat', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: prompt }) // Send the object with the 'message' property
    });
    const data = await response.json();
    setResult(data.choices[0].text);
    registerEvent('request to IA')
    setLoading(false);
    buttonCooldown();
    } catch (error) {
    console.error(error);
    setLoading(false);
    }
    
    

  }
  return (
    <div className="container">
      <div className="HighlightInput">
        <div
          ref={inputRef}
          style={{ whiteSpace: "pre-wrap", display: "inline-block" }}
          contentEditable
        />
        <button type="button" onClick={handleHighlight}>Revisar</button>
      </div>
      {
        isActive? 
          <div className='chatbot-container'>
            <h2 className='chatbot-heading'>Inteligencia Artificial:</h2>
            {
              result.length > 0 && 
              <div id='resultados' className='chatbot-analysis' role='alert'>{result}</div>
            }
            {
              buttonBlock?
              <button type='button' className='chatbot-btn btn btn-primary button-blocked'>Analizar</button>
              :
                <button
                  type='button'
                  className='chatbot-btn btn btn-primary'
                  onClick={sendRequest}
                >
                  {loading ? "Analizando..." : "Analizar"}
                </button>
            }

            <p className="advice">Importante: El análisis con inteligencia artificial solo se puede realizar una sola vez, asegúrese de analizar solo la nota clínica definitiva. Si quiere analizar una nueva nota clinica es recomendable abrir otra pesataña. Tambien podria recargar la pagina pero perderia la nota actual.</p>
          </div>
        :
          <p className="advice">Nota: Solo se puede analizar con IA después de haber revisado la nota clínica.</p>
      } 

    </div>
  );
}

export default HighlightInput;