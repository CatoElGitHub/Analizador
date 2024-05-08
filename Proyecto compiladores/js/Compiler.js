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
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
};

function lex(input) {
    const tokens = [];
    let current = 0;

    while (current < input.length) {
        let char = input[current];

        // Identificar números
        if (/[0-9]/.test(char)) {
            let value = '';
            while (/[0-9]/.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }
            tokens.push(new Token(TokenType.NUMBER, value));
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
                tokens.push(new Token(TokenType.KEYWORD, value));
            } else {
                tokens.push(new Token(TokenType.IDENTIFIER, value));
            }
            continue;
        }

        // Identificar operadores y puntuación
        if (/[+\-*\/=(),;]/.test(char)) {
            tokens.push(new Token(TokenType.OPERATOR, char));
            current++;
            continue;
        }

        // Ignorar espacios en blanco y saltos de línea
        if (/\s/.test(char)) {
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
    tokens.forEach(token => {
        const tokenDiv = document.createElement('div');
        tokenDiv.classList.add('token');
        tokenDiv.textContent = `Tipo: ${token.type}, Valor: ${token.value}`;
        tokensOutput.appendChild(tokenDiv);
    });
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
