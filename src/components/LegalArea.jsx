import { useState } from 'react'
import Terms from './Terms'
import '../styles/LegalArea.css'

const LegalArea = () => {

  const [isReading, setIsReading] = useState(false)

  const swapReading = () => {
    setIsReading(!isReading)
  }

  return(
    <div>
      <p className='legal-text'>Importante: Al hacer uso de notaclinica.com estas aceptando los siguientes terminos y condiciones</p>
      {isReading?
          <div>
            <button
              type='button'
              className='legal-button'
              onClick={swapReading}
            >
              Ocultar terminos y condiciones
            </button>
            <Terms />
          </div>
        :
          <button
            type='button'
            className='legal-button'
            onClick={swapReading}
          >
            Ver terminos y condiciones
          </button>
      }
    </div>
  )
}
  
  export default LegalArea