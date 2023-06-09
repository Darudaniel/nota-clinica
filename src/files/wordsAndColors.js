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

  export default wordsAndColors