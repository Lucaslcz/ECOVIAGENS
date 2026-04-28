let precoPassagem = 0;
let precoSeguro = 0;

function carregarResumo() {
    const dados = JSON.parse(localStorage.getItem('passagemSelecionada'));
    const resumo = document.getElementById('resumo-passagem');

    if (!dados) {
        resumo.innerHTML = "<p>Nenhuma passagem selecionada.</p>";
        return;
    }

    precoPassagem = parseFloat(dados.preco);
    
    resumo.innerHTML = `
        <div class="ticket-resumo">
            <h3>Passagem para ${dados.destino}</h3>
            <p>Transporte: ${dados.tipo.toUpperCase()}</p>
            <p>Preço Base: R$ ${precoPassagem.toFixed(2)}</p>
        </div>
    `;
    atualizarTotal();
}

function selecionarPlano(nome, valor) {
    precoSeguro = valor;
    
    document.querySelectorAll('.card-plano').forEach(card => {
        card.classList.remove('selected');
        if(card.querySelector('h4').innerText === nome) card.classList.add('selected');
    });

    atualizarTotal();
}

function atualizarTotal() {
    const total = precoPassagem + precoSeguro;
    document.getElementById('valor-total').innerText = `R$ ${total.toFixed(2)}`;
}

function finalizarCompra() {
    if (precoSeguro === 0) {
        alert("Por favor, selecione um plano de seguro para continuar.");
        return;
    }
    alert("Compra finalizada com sucesso! Boa viagem.");
    localStorage.removeItem('passagemSelecionada');
    window.location.href = "../index.html";
}

document.addEventListener('DOMContentLoaded', carregarResumo);