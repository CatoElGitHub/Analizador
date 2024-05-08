class FileHandler {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('uploadBtn').addEventListener('click', this.handleFile.bind(this));
        document.getElementById('saveBtn').addEventListener('click', this.saveFile.bind(this));
    }

    saveFile() {
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

    handleFile() {
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
}

// Instanciar la clase FileHandler cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const fileHandler = new FileHandler();
});




