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

async function cadastrarUsuario(event) {
    event.preventDefault();

    const spans = document.querySelectorAll('.msg-erro');
    spans.forEach(s => { 
        s.textContent = ""; 
        s.classList.remove('ativo'); 
        s.style.color = "#ff4d4d";
    });

    const nome = document.getElementById("nome").value;
    const usuario = document.getElementById("usuario").value.toLowerCase().trim();
    const email = document.getElementById("email").value.toLowerCase().trim();
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;
    const btn = document.querySelector(".btn-cadastro-submit");
    const originalText = btn.innerHTML;

    function mostrarErro(id, msg) {
        const span = document.getElementById(id);
        if (span) {
            span.textContent = msg;
            span.classList.add('ativo');
        }
    }

    if (nome.trim().length < 3) return mostrarErro("erro-nome", "Nome muito curto");
    if (!/^[a-z0-9]+$/.test(usuario)) return mostrarErro("erro-usuario", "Apenas letras minúsculas e números");
    if (!/^[a-z0-9._%+-]+@gmail\.com$/.test(email)) return mostrarErro("erro-email", "Use apenas @gmail.com");
    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(senha)) return mostrarErro("erro-senha", "Senha fraca");
    if (senha !== confirmar) return mostrarErro("erro-confirmar", "As senhas não coincidem");

    btn.disabled = true;
    btn.innerHTML = '<span class="loader"></span>';

    try {
        const resposta = await fetch("http://localhost:5110/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, usuario, email, senha })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            const msgSucesso = document.getElementById("erro-final");
            msgSucesso.textContent = "Cadastro realizado com sucesso!";
            msgSucesso.style.color = "#00ff88";
            msgSucesso.classList.add("ativo");

            localStorage.setItem("usuarioLogado", JSON.stringify({ nome, usuario }));

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 3000);
        } else {
            btn.disabled = false;
            btn.innerHTML = originalText;
            mostrarErro("erro-final", resultado.erro);
        }
    } catch (e) {
        btn.disabled = false;
        btn.innerHTML = originalText;
        mostrarErro("erro-final", "Servidor offline!");
    }
}