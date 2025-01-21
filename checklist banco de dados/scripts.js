document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btn-pdf").addEventListener("click", downloadPDF);
    document.getElementById("btn-word").addEventListener("click", downloadWord);
});

// Função para converter e baixar como PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let text = document.getElementById("text-input").value.trim();
    
    if (text === "") {
        alert("Por favor, insira algum texto antes de baixar.");
        return;
    }

    // Ajuste de tamanho e quebra de linha automática
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(text, 10, 20, { maxWidth: 180 });

    doc.save("documento.pdf");
}

// Função para converter e baixar como arquivo Word (DOCX)
function downloadWord() {
    let text = document.getElementById("text-input").value.trim();
    
    if (text === "") {
        alert("Por favor, insira algum texto antes de baixar.");
        return;
    }

    let blob = new Blob(['\ufeff' + text], { type: "application/msword" });

    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "documento.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}