function saveFile() {
    var codeContent = document.getElementById('codeInput').value;
    var blob = new Blob([codeContent], { type: 'text/plain' });
    var a = document.createElement('a');
    a.download = 'archivo.ttp';
    a.href = window.URL.createObjectURL(blob);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function handleFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    // Verificar si el archivo tiene la extensión ".ttp"
    if (!file || !file.name.endsWith('.ttp')) {
        alert('Solo se pueden cargar archivos con extensión .ttp');
        return;
    }

    reader.onload = function(event) {
        const text = event.target.result;
        document.getElementById('codeInput').value = text;
    };

    reader.readAsText(file);
}

// Inicialización de los eventos
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('uploadBtn').addEventListener('click', handleFile);
    document.getElementById('saveBtn').addEventListener('click', saveFile);
});
