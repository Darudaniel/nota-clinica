import { useEffect, useRef, useState } from "react";
import '../styles/HighlightInput.css'
import { signWithGoogle, logout, registerEvent } from '../firebase';
import { useAuth } from "../context/AuthContext";
import wordsAndColors from "../files/wordsAndColors";
import Terms from './Terms'

function HighlightInput() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState('');
  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [buttonBlock, setButtonBlock] = useState(false);

  const inputRef = useRef(null);

  const { user } = useAuth();

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
    registerEvent('review_note')
    setIsActive(true)
    inputElement.innerHTML = inputValue;
    inputElement.focus();
  };


  const tryLogin = async () => {
    try {
      signWithGoogle()
    } catch(error) {
      console.error(error)
    }
  }

  const tryLogout = async () => {
    try {
      await logout()
      setIsLogged(false)
    } catch(error) {
      console.error(error)
    }
  }

  const sendRequest = async () => {
    setLoading(true); 
    registerEvent('send_petition')
    const myPrompt = `Instrucciones: En este prompt se te solicita que ennumeres solo las problemáticas específicas de la siguiente clínica en español, sin repetir partes de la historia. Por favor, no menciones los diagnósticos, antecedentes personales, nombre del paciente o medicamentos que toma, a menos que sean de extrema relevancia.
    Nota médica: ${message}
    Procedimiento a seguir:
    1. Lee cuidadosamente la nota médica proporcionada.
    2. Identifica todas las problemáticas médicas específicas que se mencionan en la nota, sin hacer referencia a los diagnósticos, antecedentes personales, nombre del paciente o medicamentos que toma.
    3. Asegúrate de no repetir partes de la historia médica.
    4. Enumera las problemáticas identificadas en orden numérico, utilizando frases breves y claras en español.
    5. Asegúrate de seguir estrictamente las instrucciones proporcionadas y de no incluir información innecesaria o no relevante.
    `
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
    registerEvent('perition_success')
    buttonCooldown();
    setLoading(false);
    } catch (error) {
    console.error(error);
    registerEvent('failed_petition')
    setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        setIsLogged(true)
      }
      else {
        setIsLogged(false)
      }
    } else {
      setIsLogged(false)
    }
  }, [user])

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
              <div id='resultados' className='chatbot-analysis' role='alert'>
                {result}
              </div>
            }
            {
              isLogged?
                <div className="button-log-container">
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
                  <p className="advice">Importante: El análisis generado por IA es solo para fines educativos y no debe reemplazar el juicio de un médico certificado. La información puede estar desactualizada ya que el modelo solo tiene información hasta 2021.</p>
                </div>
              :
                <div className="button-log-container">
                  <p className="advice">Para tener acceso al analisis con inteligencia artificial, inicia sesion con google.</p>
                    <button
                      type='button'
                      className='chatbot-btn btn btn-primary'
                      onClick={tryLogin}
                    >
                      Acceder con Google
                    </button>
                </div>

            }            
          </div>
        :
          <p className="advice">Nota: Solo se puede analizar con IA después de haber revisado la nota clínica.</p>
      } 
      {
        isLogged?
          <div className="button-log-container" >
            <button
              type='button'
              className='chatbot-btn btn btn-primary'
              onClick={tryLogout}
            >
              Cerrar Sesion
            </button>
          </div>
        :
          <div>{isLogged}</div>
      }
      <Terms />
    </div>
  );
}

export default HighlightInput;