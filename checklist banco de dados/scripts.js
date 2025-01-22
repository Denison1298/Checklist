function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Obter os valores do formulário
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const objective = document.getElementById('objective').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const education = document.getElementById('education').value.trim();
    const skills = document.getElementById('skills').value.trim();

    // Validar se os campos obrigatórios estão preenchidos
    if (!name || !email || !phone || !address) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // Gerar conteúdo para o PDF
    let cursorY = 20;
    const lineHeight = 10;
    doc.setFont('Arial', 'bold');
    doc.setFontSize(18);
    doc.text('Currículo', 105, cursorY, null, null, 'center');
    
    cursorY += 15;
    doc.setFontSize(12);
    doc.setFont('Arial', 'normal');
    doc.text(`Nome: ${name}`, 10, cursorY);
    cursorY += lineHeight;
    doc.text(`Email: ${email}`, 10, cursorY);
    cursorY += lineHeight;
    doc.text(`Telefone: ${phone}`, 10, cursorY);
    cursorY += lineHeight;
    doc.text(`Endereço: ${address}`, 10, cursorY);
    cursorY += lineHeight * 2;

    if (objective) {
        doc.setFont('Arial', 'bold');
        doc.text('Objetivo:', 10, cursorY);
        doc.setFont('Arial', 'normal');
        cursorY += lineHeight;
        doc.text(objective, 10, cursorY);
        cursorY += lineHeight * 2;
    }

    if (experience) {
        doc.setFont('Arial', 'bold');
        doc.text('Experiência Profissional:', 10, cursorY);
        doc.setFont('Arial', 'normal');
        cursorY += lineHeight;
        doc.text(experience, 10, cursorY, { maxWidth: 190 });
        cursorY += lineHeight * 2;
    }

    if (education) {
        doc.setFont('Arial', 'bold');
        doc.text('Formação Acadêmica:', 10, cursorY);
        doc.setFont('Arial', 'normal');
        cursorY += lineHeight;
        doc.text(education, 10, cursorY, { maxWidth: 190 });
        cursorY += lineHeight * 2;
    }

    if (skills) {
        doc.setFont('Arial', 'bold');
        doc.text('Habilidades:', 10, cursorY);
        doc.setFont('Arial', 'normal');
        cursorY += lineHeight;
        doc.text(skills, 10, cursorY, { maxWidth: 190 });
    }

    doc.save('curriculo.pdf');
}

function generateWord() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const objective = document.getElementById('objective').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const education = document.getElementById('education').value.trim();
    const skills = document.getElementById('skills').value.trim();

    if (!name || !email || !phone || !address) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    const content = `
        <html>
            <head><meta charset="UTF-8"></head>
            <body style="font-family: Arial, sans-serif;">
                <h1 style="text-align: center;">Currículo</h1>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${phone}</p>
                <p><strong>Endereço:</strong> ${address}</p>
                ${objective ? `<p><strong>Objetivo:</strong><br>${objective}</p>` : ''}
                ${experience ? `<p><strong>Experiência Profissional:</strong><br>${experience}</p>` : ''}
                ${education ? `<p><strong>Formação Acadêmica:</strong><br>${education}</p>` : ''}
                ${skills ? `<p><strong>Habilidades:</strong><br>${skills}</p>` : ''}
            </body>
        </html>
    `;

    const blob = new Blob(['\ufeff' + content], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'curriculo.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
