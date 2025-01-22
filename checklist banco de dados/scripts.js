// Selecionar elementos principais
const form = document.getElementById('resume-form');
const previewContainer = document.getElementById('resume-preview');
const photoInput = document.getElementById('photo');
const photoPreview = document.getElementById('photo-preview');

// Exibir a foto no campo de preview
photoInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photoPreview.src = e.target.result;
            photoPreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    } else {
        photoPreview.src = '';
        photoPreview.classList.add('hidden');
    }
});

// Função para pré-visualizar o currículo
function previewResume() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const objective = document.getElementById('objective').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const education = document.getElementById('education').value.trim();
    const skills = document.getElementById('skills').value.trim();
    const projects = document.getElementById('projects').value.trim();
    const cnh = document.getElementById('cnh').value;

    // Validar campos obrigatórios
    if (!name || !email || !phone || !address) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    const template = document.getElementById('template').value;

    // Template de visualização
    previewContainer.innerHTML = `
        <div class="template-${template}">
            <div class="photo-preview">
                ${photoPreview.src ? `<img src="${photoPreview.src}" alt="Foto do Candidato" />` : ''}
            </div>
            <h2>${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Endereço:</strong> ${address}</p>
            <p><strong>CNH:</strong> ${cnh || 'Não informada'}</p>
            <h3>Objetivo</h3>
            <p>${objective}</p>
            <h3>Experiência Profissional</h3>
            <p>${experience}</p>
            <h3>Formação Acadêmica</h3>
            <p>${education}</p>
            <h3>Habilidades</h3>
            <p>${skills}</p>
            <h3>Projetos Pessoais</h3>
            <p>${projects}</p>
        </div>
    `;

    previewContainer.style.display = 'block';
}

// Função para gerar o PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const objective = document.getElementById('objective').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const education = document.getElementById('education').value.trim();
    const skills = document.getElementById('skills').value.trim();
    const projects = document.getElementById('projects').value.trim();
    const cnh = document.getElementById('cnh').value;
    const photoInput = document.getElementById('photo').files[0];

    // Validar campos obrigatórios
    if (!name || !email || !phone || !address) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    let cursorY = 20; // Coordenada Y para iniciar o conteúdo
    const lineHeight = 10; // Espaçamento entre linhas

    // Adicionar texto ao PDF
    doc.setFont('Arial', 'bold');
    doc.setFontSize(16);
    doc.text(name, 10, cursorY);
    cursorY += lineHeight;
    doc.setFont('Arial', 'normal');
    doc.setFontSize(12);
    doc.text(`Email: ${email}`, 10, cursorY);
    cursorY += lineHeight;
    doc.text(`Telefone: ${phone}`, 10, cursorY);
    cursorY += lineHeight;
    doc.text(`Endereço: ${address}`, 10, cursorY);
    cursorY += lineHeight;
    doc.text(`CNH: ${cnh || 'Não informada'}`, 10, cursorY);
    cursorY += lineHeight * 2;

    if (objective) {
        doc.text('Objetivo:', 10, cursorY);
        cursorY += lineHeight;
        doc.text(objective, 10, cursorY, { maxWidth: 190 });
        cursorY += lineHeight * 2;
    }

    if (experience) {
        doc.text('Experiência Profissional:', 10, cursorY);
        cursorY += lineHeight;
        doc.text(experience, 10, cursorY, { maxWidth: 190 });
        cursorY += lineHeight * 2;
    }

    if (education) {
        doc.text('Formação Acadêmica:', 10, cursorY);
        cursorY += lineHeight;
        doc.text(education, 10, cursorY, { maxWidth: 190 });
        cursorY += lineHeight * 2;
    }

    if (skills) {
        doc.text('Habilidades:', 10, cursorY);
        cursorY += lineHeight;
        doc.text(skills, 10, cursorY, { maxWidth: 190 });
        cursorY += lineHeight * 2;
    }

    if (projects) {
        doc.text('Projetos Pessoais:', 10, cursorY);
        cursorY += lineHeight;
        doc.text(projects, 10, cursorY, { maxWidth: 190 });
    }

    // Adicionar foto, se disponível
    if (photoInput) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const image = event.target.result;
            doc.addImage(image, 'JPEG', 150, 10, 40, 40);
            doc.save('curriculo.pdf');
        };
        reader.readAsDataURL(photoInput);
    } else {
        doc.save('curriculo.pdf');
    }
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
    const projects = document.getElementById('projects').value.trim();
    const cnh = document.getElementById('cnh').value;

    // Validar campos obrigatórios
    if (!name || !email || !phone || !address) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // Construção do conteúdo em HTML para o Word
    const content = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="utf-8">
            <title>Currículo</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { text-align: center; color: #2c3e50; }
                p { margin: 5px 0; }
                strong { color: #34495e; }
            </style>
        </head>
        <body>
            <h1>Currículo</h1>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Endereço:</strong> ${address}</p>
            <p><strong>CNH:</strong> ${cnh || 'Não informada'}</p>
            ${objective ? `<p><strong>Objetivo:</strong><br>${objective}</p>` : ''}
            ${experience ? `<p><strong>Experiência Profissional:</strong><br>${experience}</p>` : ''}
            ${education ? `<p><strong>Formação Acadêmica:</strong><br>${education}</p>` : ''}
            ${skills ? `<p><strong>Habilidades:</strong><br>${skills}</p>` : ''}
            ${projects ? `<p><strong>Projetos Pessoais:</strong><br>${projects}</p>` : ''}
        </body>
        </html>
    `;

    // Criar o Blob com o tipo correto para Word
    const blob = new Blob(['\ufeff' + content], { type: 'application/msword' });

    // Criar um link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'curriculo.doc';

    // Simular o clique para realizar o download
    document.body.appendChild(link);
    link.click();

    // Remover o link após o download
    document.body.removeChild(link);
}
