// Definición de tokens
const TokenType = {
    IDENTIFIER: 'IDENTIFIER',
    NUMBER: 'NUMBER',
    OPERATOR: 'OPERATOR',
    PUNCTUATION: 'PUNCTUATION',
    KEYWORD: 'KEYWORD',
    ERROR: 'ERROR' // Token para errores
};

// Clase Token
class Token {
    constructor(type, value, linea) {
        this.type = type;
        this.value = value;
        this.linea = linea;
    }
}

function lex(input) {
    const tokens = [];
    let current = 0;
    let currentLine = 1;

    const keywords = ['if', 'else', 'while', 'for', 'function', 'return', 'var', 'const', 'let'];

    function sugerirCorreccion(word) {
        const sugerencias = keywords.filter(keyword => levenshteinDistance(keyword, word) <= 2);
        if (sugerencias.length > 0) {
            return `Posible palabra mal escrita. Puede que quieras decir: ${sugerencias.join(', ')}`;
        }
        return '';
    }

    while (current < input.length) {
        let char = input[current];

        if (/[a-zA-Z]/.test(char)) {
            let value = '';
            while (/[a-zA-Z0-9]/.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }
            if (keywords.includes(value)) {
                tokens.push(new Token(TokenType.KEYWORD, value, currentLine));
            } else if (variables(value)) {
                tokens.push(new Token(TokenType.IDENTIFIER, value, currentLine));
            } else if (estructuraControl(value)) {
                tokens.push(new Token(TokenType.IDENTIFIER, value, currentLine));
            } else {
                const sugerencia = sugerirCorreccion(value);
                if (sugerencia !== '') {
                    tokens.push(new Token(TokenType.ERROR, sugerencia, currentLine));
                } else {
                    tokens.push(new Token(TokenType.ERROR, value, currentLine));
                }
            }
            continue;
        }

        if (/[0-9]/.test(char)) {
            let value = '';
            while (/[0-9]/.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }
            tokens.push(new Token(TokenType.NUMBER, value, currentLine));
            continue;
        }

        if (/[+\-*\/=(),;]/.test(char)) {
            tokens.push(new Token(TokenType.OPERATOR, char, currentLine));
            current++;
            continue;
        }

        if (/\s/.test(char)) {
            if (char === '\n') {
                currentLine++;
            }
            current++;
            continue;
        }

        tokens.push(new Token(TokenType.ERROR, `Token no reconocido: ${char}`, currentLine));
        current++; // Avanzar al siguiente carácter
    }

    return tokens;
}

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Increment along the first column of each row
    let i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // Increment each column in the first row
    let j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function variables(word) {
    const variable = ['roca', 'agua', 'acero', 'fuego', 'bicho', 'onix', 'combee', 'alakazam', 'doublade', 'kakuna', 'hada', 'minun', 'eter'];
    return variable.includes(word);
}

function estructuraControl(word) {
    const controles = ['slow', 'king', 'bro', 'pikachu', 'pika', 'chispa', 'chu'];
    return controles.includes(word);
}

function mostrarTokens(tokens) {
    const tokensTable = document.getElementById('tokensTable').getElementsByTagName('tbody')[0];
    tokensTable.innerHTML = '';
    tokens.forEach(token => {
        const row = tokensTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.textContent = token.linea; // Nueva columna para la línea
        cell2.textContent = token.type;
        cell3.textContent = token.value;
    });
}

function compile() {
    console.log("Botón de compilación presionado");
    const codeInput = document.getElementById('codeInput').value;
    const tokens = lex(codeInput);
    mostrarTokens(tokens); // Mostrar todos los tokens encontrados
}