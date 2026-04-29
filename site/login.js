function toggleSenha(idInput, icone) {
    const input = document.getElementById(idInput);
    if (input.type === "password") {
        input.type = "text";
        icone.textContent = "🙈";
    } else {
        input.type = "password";
        icone.textContent = "🙉";
    }
}

async function fazerLogin(event) {
    event.preventDefault();

    const spans = document.querySelectorAll('.msg-erro');
    spans.forEach(s => { 
        s.textContent = ""; 
        s.classList.remove('ativo'); 
    });

    const usuario = document.getElementById("usuario").value.toLowerCase().trim();
    const senha = document.getElementById("senha").value;
    const btn = document.querySelector(".btn-cadastro-submit");
    const originalText = btn.innerHTML;

    function mostrarErro(id, msg) {
        const span = document.getElementById(id);
        if (span) {
            span.textContent = msg;
            span.classList.add('ativo');
            span.style.color = "#ff4d4d";
        }
    }

    if (!/^[a-z0-9]+$/.test(usuario)) {
        return mostrarErro("erro-usuario", "Usuário inválido (apenas letras minúsculas e números)");
    }

    if (senha.length < 6) {
        return mostrarErro("erro-senha", "A senha deve ter no mínimo 6 caracteres");
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="loader"></span>';

    try {
        const resposta = await fetch("http://localhost:5110/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, senha })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            const msgSucesso = document.getElementById("erro-final");
            msgSucesso.textContent = "Login realizado! Entrando...";
            msgSucesso.style.color = "#00ff88";
            msgSucesso.classList.add("ativo");

            localStorage.setItem("usuarioLogado", JSON.stringify({
                usuario: usuario,
                nome: resultado.nome || usuario
            }));

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000);
        } else {
            btn.disabled = false;
            btn.innerHTML = originalText;
            
            if (resultado.erro.toLowerCase().includes("usuário")) {
                mostrarErro("erro-usuario", resultado.erro);
            } else if (resultado.erro.toLowerCase().includes("senha")) {
                mostrarErro("erro-senha", resultado.erro);
            } else {
                mostrarErro("erro-final", resultado.erro);
            }
        }
    } catch (e) {
        btn.disabled = false;
        btn.innerHTML = originalText;
        mostrarErro("erro-final", "Servidor offline!");
    }
}