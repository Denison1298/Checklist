// Função para gerar o PDF
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
    const projects = document.getElementById('projects').value.trim();
    const template = document.getElementById('template').value;
    const photoInput = document.getElementById('photo').files[0];

    // Validar campos obrigatórios
    if (!name || !email || !phone || !address) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // Adicionar foto, se disponível
    if (photoInput) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const image = event.target.result;
            doc.addImage(image, 'JPEG', 10, 10, 30, 30); // Adiciona a foto no PDF
            addContentToPDF(doc, template); // Adiciona o restante do conteúdo
        };
        reader.readAsDataURL(photoInput);
    } else {
        addContentToPDF(doc, template); // Se não houver foto, apenas adiciona o conteúdo
    }

    // Função para adicionar conteúdo ao PDF com base no template
    function addContentToPDF(doc, template) {
        let cursorY = 50; // Ajusta o cursor após a foto (ou começa do topo se não houver foto)
        const lineHeight = 10;

        // Template moderno
        if (template === 'modern') {
            doc.setFont('Arial', 'bold');
            doc.setFontSize(18);
            doc.text('Currículo Moderno', 105, cursorY, null, null, 'center');

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
                doc.text(objective, 10, cursorY, { maxWidth: 190 });
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
                cursorY += lineHeight * 2;
            }

            if (projects) {
                doc.setFont('Arial', 'bold');
                doc.text('Projetos Pessoais:', 10, cursorY);
                doc.setFont('Arial', 'normal');
                cursorY += lineHeight;
                doc.text(projects, 10, cursorY, { maxWidth: 190 });
            }
        }

        // Adicionar outros templates aqui (exemplo: elegante, simples)

        doc.save('curriculo.pdf');
    }
}

// Função para gerar o Word
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
                ${projects ? `<p><strong>Projetos Pessoais:</strong><br>${projects}</p>` : ''}
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

// Mostra a foto carregada no campo de upload
document.getElementById("photo").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const photoPreview = document.getElementById("photo-preview");

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photoPreview.src = e.target.result;
            photoPreview.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
    } else {
        photoPreview.src = "";
        photoPreview.classList.add("hidden");
    }
});

// Função para pré-visualizar o currículo em tempo real
function previewResume() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const objective = document.getElementById("objective").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const education = document.getElementById("education").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const projects = document.getElementById("projects").value.trim();

    const preview = document.getElementById("resume-preview");

    // Template Moderno
    preview.innerHTML = `
        <div class="p-4 border-l-4 border-blue-500">
            <h2 class="text-2xl font-bold text-blue-600">${name}</h2>
            <p class="text-gray-600">${email} | ${phone}</p>
            <p class="text-gray-600">${address}</p>
        </div>
        <h3 class="text-lg font-semibold mt-4 text-blue-500">Objetivo</h3>
        <p>${objective}</p>
        <h3 class="text-lg font-semibold mt-4 text-blue-500">Experiência Profissional</h3>
        <p>${experience}</p>
        <h3 class="text-lg font-semibold mt-4 text-blue-500">Formação Acadêmica</h3>
        <p>${education}</p>
        <h3 class="text-lg font-semibold mt-4 text-blue-500">Habilidades</h3>
        <p>${skills}</p>
        <h3 class="text-lg font-semibold mt-4 text-blue-500">Projetos Pessoais</h3>
        <p>${projects}</p>
    `;

    preview.style.display = "block";
}
