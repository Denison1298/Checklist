document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("convert-pdf").addEventListener("click", convertToPDF);
    document.getElementById("convert-word").addEventListener("click", convertToWord);
});

// Função para converter e baixar como PDF
function convertToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    let text = document.getElementById("text-input").value.trim();

    if (text === "") {
        alert("Por favor, insira algum texto antes de baixar.");
        return;
    }

    // Configuração de fonte e tamanho
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Quebra de linha automática
    let marginLeft = 10;
    let marginTop = 20;
    let maxWidth = 180; 
    let lineHeight = 8;
    let splitText = doc.splitTextToSize(text, maxWidth);

    splitText.forEach((line, index) => {
        doc.text(line, marginLeft, marginTop + (index * lineHeight));
    });

    doc.save("documento.pdf");
}

// Função para converter e baixar como arquivo Word (DOCX)
function convertToWord() {
    let text = document.getElementById("text-input").value.trim();
    
    if (text === "") {
        alert("Por favor, insira algum texto antes de baixar.");
        return;
    }

    let content = `<!DOCTYPE html>
    <html>
        <head><meta charset="UTF-8"></head>
        <body><pre>${text}</pre></body>
    </html>`;

    let blob = new Blob(['\ufeff' + content], { type: "application/msword" });

    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "documento.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}