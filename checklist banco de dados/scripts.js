// Função para baixar como PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    
    let text = document.getElementById("text-input").value;
    
    // Adiciona o texto ao PDF, lidando com emojis e caracteres especiais
    doc.setFont("helvetica", "normal");
    doc.text(text, 10, 20, { maxWidth: 180 });

    doc.save("documento.pdf");
}

// Função para baixar como Word (DOCX)
function downloadWord() {
    let text = document.getElementById("text-input").value;
    let blob = new Blob(["\ufeff" + text], { type: "application/msword" });
    
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "documento.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}