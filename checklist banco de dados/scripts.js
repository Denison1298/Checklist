// Função para converter e baixar como PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let text = document.getElementById("text-input").value;
    
    // Ajuste de tamanho e quebra de linha automática
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(text, 10, 20, { maxWidth: 180 });

    doc.save("documento.pdf");
}

// Função para converter e baixar como arquivo Word (DOCX)
function downloadWord() {
    let text = document.getElementById("text-input").value;
    
    // Criação de um conteúdo formatado em Blob para Word
    let blob = new Blob(['\ufeff' + text], { type: "application/msword" });

    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "documento.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}