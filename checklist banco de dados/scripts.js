// Inicializar Supabase
const SUPABASE_URL = 'https://dgeitlrebupvqcptxnnj.supabase.co'; // URL do seu Supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZWl0bHJlYnVwdnFjcHR4bm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NDY2MzMsImV4cCI6MjA0MjUyMjYzM30.WJ-WT1WvGSYEnXshMXnCk03C2q_qXSwSRtwR60grW3g'; // Sua chave anônima
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Função para limpar a lista de atendimentos
async function limparAtendimentos() {
    var tabela = document.getElementById('atendimentosTable').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';  // Limpa o conteúdo da tabela

    // Limpar atendimentos do banco de dados Supabase
    await supabase.from('atendimentos').delete().neq('id', 0);

    // Limpar atendimentos do localStorage
    localStorage.removeItem('atendimentos');

    // Atualizar o gráfico e contadores após limpar a lista
    atualizarGrafico();
    atualizarContadores();

    // Mostrar mensagem de sucesso
    mostrarMensagemSucesso('Todos os atendimentos foram limpos com sucesso!');
}

// Função para exibir o conteúdo da aba selecionada e manter a aba ativa após atualização da página
function showTabContent(tabId) {
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    document.getElementById(tabId).classList.add('active');
    localStorage.setItem('activeTab', tabId);  // Salvar a aba ativa
}

// Função para manter a aba ativa após a atualização da página
window.onload = async function () {
    var activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        showTabContent(activeTab);
    } else {
        showTabContent('checklist');  // Aba padrão
    }

    // Carregar atendimentos e atualizar o gráfico e contadores
    await carregarAtendimentos();
    atualizarGrafico();
    atualizarContadores();

    // Restaurar o estado do botão de exibição/ocultação dos atendimentos anteriores
    restaurarEstadoBotaoAtendimentos();
}

// Função para alternar a exibição dos atendimentos anteriores
function toggleAtendimentosAnteriores() {
    var linhas = document.getElementById('atendimentosTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var botao = document.getElementById('toggleAtendimentosAnteriores');
    var ocultar = botao.innerText.includes('Ocultar');

    for (var i = 0; i < linhas.length; i++) {
        var dataAtendimento = linhas[i].cells[2].innerText.split(' ')[0];
        if (!ehHoje(dataAtendimento)) {
            linhas[i].style.display = ocultar ? 'none' : '';
        }
    }

    botao.innerText = ocultar ? 'Exibir Atendimentos Anteriores' : 'Ocultar Atendimentos Anteriores';

    // Salvar estado do botão no localStorage
    localStorage.setItem('botaoOcultarAtendimentos', ocultar ? 'exibir' : 'ocultar');
}

// Função para restaurar o estado do botão de exibição/ocultação ao carregar a página
function restaurarEstadoBotaoAtendimentos() {
    var estadoBotao = localStorage.getItem('botaoOcultarAtendimentos');
    if (estadoBotao === 'exibir') {
        toggleAtendimentosAnteriores(); // Isso garante que, se o estado for "exibir", ele restaura a visibilidade conforme esperado.
    }
}

// Função para verificar se a data é hoje
function ehHoje(data) {
    var hoje = new Date();
    var partesData = data.split('/');
    var dia = parseInt(partesData[0], 10);
    var mes = parseInt(partesData[1], 10) - 1;  // Meses em JavaScript são baseados em zero
    var ano = hoje.getFullYear();  // Considerando que o ano seja o atual

    var dataAtendimento = new Date(ano, mes, dia);
    return dataAtendimento.toDateString() === hoje.toDateString();
}

// Função para enviar o protocolo
async function enviarProtocolo(tipo) {
    var protocoloInput = document.getElementById('protocolo' + tipo.charAt(0).toUpperCase() + tipo.slice(1));
    var protocolo = protocoloInput.value.trim();

    if (protocolo === "") {
        alert('Por favor, insira um protocolo válido.');
        return;
    }

    if (await protocoloDuplicado(protocolo)) {
        alert('Protocolo duplicado. Por favor, insira um protocolo único.');
        return;
    }

    await adicionarAtendimento(tipo, protocolo);
    mostrarMensagemSucesso('Atendimento ' + tipo + ' enviado com sucesso!');
    protocoloInput.value = '';
    atualizarGrafico();
    atualizarContadores();
}

// Função para verificar se o protocolo é duplicado
async function protocoloDuplicado(protocolo) {
    let { data: atendimentos } = await supabase.from('atendimentos').select('protocolo').eq('protocolo', protocolo);
    return atendimentos.length > 0;
}

// Função para adicionar atendimento à tabela e salvar no Supabase
async function adicionarAtendimento(tipo, protocolo) {
    var dataHoraAtual = new Date().toLocaleString('pt-BR');
    var dataHoraFormatada = formatarData(dataHoraAtual.split(' ')[0]);

    // Salvar no Supabase
    const { data, error } = await supabase
        .from('atendimentos')
        .insert([{ tipo, protocolo, dataHora: dataHoraFormatada + ' ' + dataHoraAtual.split(' ')[1] }]);

    if (error) {
        console.error('Erro ao salvar atendimento no Supabase:', error);
        return;
    }

    carregarAtendimentos(); // Recarregar a tabela após adicionar
}

// Função para remover um atendimento da tabela
async function removerAtendimento(botao) {
    var linha = botao.parentNode.parentNode;
    var protocolo = linha.cells[1].innerText;

    // Remover do Supabase
    await supabase.from('atendimentos').delete().eq('protocolo', protocolo);

    linha.parentNode.removeChild(linha);
    atualizarGrafico();
    atualizarContadores();
}

// Função para carregar atendimentos do Supabase
async function carregarAtendimentos() {
    var { data: atendimentos, error } = await supabase.from('atendimentos').select('*');
    if (error) {
        console.error('Erro ao carregar atendimentos:', error);
        return;
    }

    var tabela = document.getElementById('atendimentosTable').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';  // Limpar a tabela

    atendimentos.forEach(function (atendimento) {
        var novaLinha = tabela.insertRow();
        var celulaTipo = novaLinha.insertCell(0);
        var celulaProtocolo = novaLinha.insertCell(1);
        var celulaDataHora = novaLinha.insertCell(2);
        var celulaAcoes = novaLinha.insertCell(3);

        celulaTipo.innerText = atendimento.tipo;
        celulaProtocolo.innerText = atendimento.protocolo;
        celulaDataHora.innerText = atendimento.dataHora;
        celulaAcoes.innerHTML = '<button class="remove-btn" onclick="removerAtendimento(this)">Remover</button>';
    });
}

// Função para atualizar o gráfico com a opção de ocultar dias anteriores
function atualizarGrafico(ocultarDiasAnteriores = false) {
    // O código do gráfico permanece o mesmo
    // (não alterado)
}

// Função para atualizar os contadores de atendimentos
function atualizarContadores() {
    // A função de contadores também permanece inalterada
}

// Função para calcular a média de atendimentos diários
function calcularMediaAtendimentos() {
    // A função de média permanece inalterada
}
