// Definición de tokens
const TokenType = {
    IDENTIFIER: 'IDENTIFIER',
    NUMBER: 'NUMBER',
    OPERATOR: 'OPERATOR',
    PUNCTUATION: 'PUNCTUATION',
    KEYWORD: 'KEYWORD'
};

// Clase Token
const Token = class {
    constructor(type, value, linea) {
        this.type = type;
        this.value = value;
        this.linea = linea; // Agregar número de línea
    }
};

function lex(input) {
    const tokens = [];
    let current = 0;
    let currentLine = 1; // Variable para rastrear el número de línea actual

    while (current < input.length) {
        let char = input[current];

        // Identificar números
        if (/[0-9]/.test(char)) {
            let value = '';
            while (/[0-9]/.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }
            tokens.push(new Token(TokenType.NUMBER, value, currentLine));
            continue;
        }

        // Identificar letras (identificadores o palabras clave)
        if (/[a-zA-Z]/.test(char)) {
            let value = '';
            while (/[a-zA-Z0-9]/.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }
            if (isKeyword(value)) {
                tokens.push(new Token(TokenType.KEYWORD, value, currentLine));
            } else {
                tokens.push(new Token(TokenType.IDENTIFIER, value, currentLine));
            }
            continue;
        }

        // Identificar operadores y puntuación
        if (/[+\-*\/=(),;]/.test(char)) {
            tokens.push(new Token(TokenType.OPERATOR, char, currentLine));
            current++;
            continue;
        }

        // Ignorar espacios en blanco y saltos de línea
        if (/\s/.test(char)) {
            if (char === '\n') { // Incrementar el número de línea al encontrar un salto de línea
                currentLine++;
            }
            current++;
            continue;
        }

        // Carácter desconocido, lanzar error
        throw new TypeError('Token no reconocido: ' + char);
    }

    return tokens;
}

function isKeyword(word) {
    const keywords = ['if', 'else', 'while', 'for', 'function', 'return', 'var', 'const', 'let'];
    return keywords.includes(word);
}

function mostrarResultado(tokens) {
    const tokensOutput = document.getElementById('tokensOutput');
    tokensOutput.innerHTML = '';

    // Crear tabla
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    ['Línea', 'Token'].forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    // Llenar la tabla con los tokens
    tokens.forEach(token => {
        const row = table.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        cell1.textContent = token.linea; // Agregar el número de línea
        cell2.textContent = `${token.type}: ${token.value}`;
    });

    tokensOutput.appendChild(table);
}

function mostrarError(error) {
    const tokensOutput = document.getElementById('tokensOutput');
    tokensOutput.innerHTML = '';
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('token');
    errorDiv.textContent = `Error: ${error.message}`;
    errorDiv.style.color = 'red';
    tokensOutput.appendChild(errorDiv);
}

function compile() {
    console.log("Botón de compilación presionado");
    const codeInput = document.getElementById('codeInput').value;
    try {
        const tokens = lex(codeInput);
        mostrarResultado(tokens);
    } catch (error) {
        mostrarError(error);
    }
}
