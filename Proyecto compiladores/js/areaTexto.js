function updateLineNumbers() {
    var code = document.getElementById("codeInput").value;
    var lines = code.split("\n").length;
    var lineNumbers = "";

    for (var i = 1; i <= lines; i++) {
      lineNumbers += i + "<br>";
    }

    document.getElementById("lineNumbers").innerHTML = lineNumbers;
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      updateLineNumbers();
    }
  }

  window.onload = updateLineNumbers;

  const codeInput = document.getElementById('codeInput');
  const lineNumbers = document.getElementById('lineNumbers');
  const highlightedCode = document.getElementById('highlightedCode');

  // Función para sincronizar el desplazamiento vertical del textarea con los números de línea
  function syncScroll() {
    lineNumbers.scrollTop = codeInput.scrollTop;
    highlightedCode.scrollTop = codeInput.scrollTop;
  }

// Agregar evento de desplazamiento al textarea
codeInput.addEventListener('scroll', syncScroll);



// Palabras clave

const palabrasC = ['ditto', 'eclosion', 'contraataque', 'antidoto', 'veneno', 'margcargo', 'silvally', 'bici', 'throh', 
                    'arceus', 'xatu', 'roca', 'agua', 'acero', 'fuego', 'bicho', 'onix', 'combee', 'alakazam', 'doublade', 
                    'kakuna', 'hada', 'minun', 'eter'];
const controles = ['slow', 'king', 'bro', 'pikachu', 'pika', 'chispa', 'chu'];
const infos = ['grunido', 'mordisco'];
const cics = ['klink', 'klang', 'entei'];
const metos = ['starly'];
const access = ['masters', 'poke', 'super', 'ultra', 'movimiento'];


// Función para resaltar palabras clave
function highlightKeywords() {
  const codeInput = document.getElementById('codeInput');
  const highlightedCode = document.getElementById('highlightedCode');
  let text = codeInput.value;

  // Escapar caracteres especiales para usar en una expresión regular
  const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Resaltar palabras clave
  palabrasC.forEach(palabraC => {
    const regex = new RegExp('\\b' + escapeRegExp(palabraC) + '\\b', 'g');
    text = text.replace(regex, '<span class="palabra-clave">' + palabraC + '</span>');
  });

  // Resaltar números
  text = text.replace(/\b\d+\b/g, '<span class="numero">$&</span>');

    controles.forEach(control => {
        const regex = new RegExp('\\b' + escapeRegExp(control) + '\\b', 'g');
        text = text.replace(regex, '<span class="eControle">' + control + '</span>');
    });

    infos.forEach(info => {
        const regex = new RegExp('\\b' + escapeRegExp(info) + '\\b', 'g');
        text = text.replace(regex, '<span class="informacion">' + info + '</span>');
    });

    cics.forEach(cic => {
        const regex = new RegExp('\\b' + escapeRegExp(cic) + '\\b', 'g');
        text = text.replace(regex, '<span class="ciclo">' + cic + '</span>');
    });

    metos.forEach(meto => {
        const regex = new RegExp('\\b' + escapeRegExp(meto) + '\\b', 'g');
        text = text.replace(regex, '<span class="metodo">' + meto + '</span>');
    });

    access.forEach(acces => {
        const regex = new RegExp('\\b' + escapeRegExp(acces) + '\\b', 'g');
        text = text.replace(regex, '<span class="acceso">' + acces + '</span>');
    });

  // Actualizar el código resaltado
  highlightedCode.innerHTML = text;
}

// Resaltar palabras clave cuando el contenido cambie
document.getElementById('codeInput').addEventListener('input', highlightKeywords);
