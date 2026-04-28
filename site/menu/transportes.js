let baseDeDados = [];

async function carregarDados() {
    try {
        const resposta = await fetch('transportes.json');
        baseDeDados = await resposta.json();
        filtrar('todos');
    } catch (erro) {
        console.error("Erro ao carregar passagens:", erro);
    }
}

function gerarHorarioAleatorio() {
    const hora = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minuto = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hora}:${minuto}`;
}

function selecionarPassagem(tipo, destino, preco) {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
        alert("Você precisa estar logado para continuar!");
        window.location.href = "../login.html";
        return;
    }

    const passagem = { 
        tipo, 
        destino, 
        preco, 
        data: new Date().toLocaleDateString() 
    };
    
    localStorage.setItem('passagemSelecionada', JSON.stringify(passagem));
    window.location.href = "seguros.html";
}

function filtrar(tipo) {
    const container = document.getElementById('passagens-container');
    const botoes = document.querySelectorAll('.btn-transporte');
    
    botoes.forEach(btn => {
        btn.classList.remove('active');
        
        const textoBotao = btn.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const tipoNormalizado = tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (textoBotao === tipoNormalizado) {
            btn.classList.add('active');
        }
    });

    container.innerHTML = '';

    let filtradas = tipo === 'todos' 
        ? [...baseDeDados] 
        : baseDeDados.filter(p => p.tipo.toLowerCase() === tipo.toLowerCase());

    let selecionadas = filtradas.sort(() => Math.random() - 0.5).slice(0, 20);

    selecionadas.forEach(p => {
        const icones = { aviao: '✈️', onibus: '🚌', trem: '🚆' };
        
        container.innerHTML += `
            <div class="ticket">
                <div class="ticket-type">
                    <span class="icon">${icones[p.tipo] || '📍'}</span>
                    <span class="type-text">${p.tipo.toUpperCase()}</span>
                </div>
                <div class="ticket-info">
                    <h4>Destino</h4>
                    <p>${p.destino}</p>
                </div>
                <div class="ticket-route">
                    <h4>Saída</h4>
                    <p>${gerarHorarioAleatorio()}</p>
                    <span class="route-time">Duração: ${p.tempo}</span>
                </div>
                <div class="ticket-price">
                    <h4>Preço</h4>
                    <span class="valor">R$ ${p.preco}</span>
                </div>
                <button class="btn-comprar" onclick="selecionarPassagem('${p.tipo}', '${p.destino}', '${p.preco}')">SELECIONAR</button>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', carregarDados);