document.addEventListener("DOMContentLoaded", () => {
    prepararMenuResponsivo();
    prepararVoltarTopo();
    prepararValidacaoFormularios();
    prepararAnaliseDados();
});

function prepararMenuResponsivo() {
    const navInterior = document.querySelector(".nav__interior");
    const navLista = document.querySelector(".nav__lista");

    if (!navInterior || !navLista) return;

    const botao = document.createElement("button");
    botao.className = "nav__toggle";
    botao.type = "button";
    botao.setAttribute("aria-label", "Abrir menu");
    botao.setAttribute("aria-expanded", "false");
    botao.innerHTML = '<i class="fa-solid fa-bars"></i>';

    navInterior.insertBefore(botao, navLista);

    botao.addEventListener("click", () => {
        const menuAberto = navLista.classList.toggle("nav__lista--aberta");
        botao.setAttribute("aria-expanded", String(menuAberto));
        botao.innerHTML = menuAberto ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLista.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLista.classList.remove("nav__lista--aberta");
            botao.setAttribute("aria-expanded", "false");
            botao.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

function prepararVoltarTopo() {
    const botao = document.createElement("button");
    botao.className = "voltar-topo";
    botao.type = "button";
    botao.setAttribute("aria-label", "Voltar ao topo");
    botao.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(botao);

    window.addEventListener("scroll", () => {
        botao.classList.toggle("voltar-topo--visivel", window.scrollY > 420);
    });

    botao.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function prepararValidacaoFormularios() {
    document.querySelectorAll("form").forEach((formulario) => {
        formulario.setAttribute("novalidate", "true");

        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const erros = validarFormulario(formulario);
            mostrarResultadoFormulario(formulario, erros);

            if (erros.length === 0) {
                formulario.reset();
            }
        });
    });
}

function validarFormulario(formulario) {
    const erros = [];
    limparErros(formulario);

    formulario.querySelectorAll("input, textarea, select").forEach((campo) => {
        const valor = campo.value.trim();
        const obrigatorio = campo.hasAttribute("required");
        const tipo = campo.getAttribute("type");
        let mensagem = "";

        if (obrigatorio && !valor) {
            mensagem = "Preencha este campo.";
        } else if (tipo === "email" && valor && !emailValido(valor)) {
            mensagem = "Digite um email valido.";
        } else if (tipo === "tel" && valor && !telefoneValido(valor)) {
            mensagem = "Digite um telefone valido de Angola.";
        } else if (campo.tagName === "TEXTAREA" && valor && valor.length < 12) {
            mensagem = "Escreva uma mensagem com mais detalhes.";
        }

        if (mensagem) {
            erros.push(mensagem);
            campo.classList.add("campo-erro");
            campo.setAttribute("aria-invalid", "true");
            const aviso = document.createElement("small");
            aviso.className = "formulario__erro";
            aviso.textContent = mensagem;
            campo.insertAdjacentElement("afterend", aviso);
        } else {
            campo.removeAttribute("aria-invalid");
        }
    });

    return erros;
}

function limparErros(formulario) {
    formulario.querySelectorAll(".formulario__erro").forEach((erro) => erro.remove());
    formulario.querySelectorAll(".campo-erro").forEach((campo) => campo.classList.remove("campo-erro"));
    formulario.querySelectorAll(".formulario__sucesso").forEach((mensagem) => mensagem.remove());
}

function mostrarResultadoFormulario(formulario, erros) {
    if (erros.length > 0) return;

    const sucesso = document.createElement("p");
    sucesso.className = "formulario__sucesso";
    sucesso.textContent = "Dados validados com sucesso. Obrigada pelo contacto!";
    formulario.appendChild(sucesso);
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function telefoneValido(telefone) {
    return /^(\+244\s?)?9\d{2}\s?\d{3}\s?\d{3}$/.test(telefone);
}

function prepararAnaliseDados() {
    registarEvento("page_view", { pagina: document.title, caminho: location.pathname });

    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            registarEvento("click_link", {
                texto: link.textContent.trim() || link.getAttribute("aria-label") || "link",
                destino: link.href
            });
        });
    });

    document.querySelectorAll("form").forEach((formulario) => {
        formulario.addEventListener("submit", () => {
            registarEvento("form_submit", {
                pagina: document.title,
                tipo: formulario.classList.contains("newsletter__formulario") ? "newsletter" : "contacto"
            });
        });
    });
}

function registarEvento(nome, dados) {
    const eventos = JSON.parse(localStorage.getItem("jcmoda-analytics") || "[]");
    eventos.push({
        nome,
        dados,
        data: new Date().toISOString()
    });
    localStorage.setItem("jcmoda-analytics", JSON.stringify(eventos.slice(-50)));
}
