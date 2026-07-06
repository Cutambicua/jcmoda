const detalhesProdutos = {
    "T-Shirt Clássica": {
        cores: "Castanho, branco e preto",
        tamanhos: "P, M, G e GG",
        tecido: "Algodão leve",
        publico: "Homem e mulher",
        descricao: "Boa para o dia a dia em Luanda, combina com jeans, saia ou ténis casual."
    },
    "Vestido Elegante": {
        cores: "Caramelo e bege",
        tamanhos: "S, M e L",
        tecido: "Crepe com toque suave",
        publico: "Mulher",
        descricao: "Indicado para jantar, culto, eventos e ocasiões em que o visual precisa ser mais sofisticado."
    },
    "Ténis Desportivo": {
        cores: "Branco com detalhes castanhos",
        tamanhos: "37 ao 44",
        tecido: "Sintético respirável",
        publico: "Homem e mulher",
        descricao: "Confortável para caminhadas, aulas, compras e rotinas com muita mobilidade."
    },
    "Sapato Social": {
        cores: "Castanho",
        tamanhos: "38 ao 44",
        tecido: "Couro sintético",
        publico: "Homem",
        descricao: "Ideal para trabalho, reuniões, cerimónias e looks formais."
    },
    "Camisa Formal": {
        cores: "Branco e bege",
        tamanhos: "M, L e XL",
        tecido: "Algodão misto",
        publico: "Homem",
        descricao: "Peça versátil para escritório, apresentações e eventos sociais."
    },
    "Vestido Casual": {
        cores: "Nude e castanho claro",
        tamanhos: "S, M e L",
        tecido: "Viscose",
        publico: "Mulher",
        descricao: "Leve, confortável e fácil de usar em passeios, encontros e fins de semana."
    },
    "Ténis Casual": {
        cores: "Branco, creme e castanho",
        tamanhos: "36 ao 43",
        tecido: "Sintético com sola em borracha",
        publico: "Homem e mulher",
        descricao: "Combina com vestidos, calças, saias e looks descontraídos."
    },
    "Saia Longa": {
        cores: "Bege, castanho e caramelo",
        tamanhos: "S, M, L e XL",
        tecido: "Malha canelada",
        publico: "Mulher",
        descricao: "Boa para dias frescos e para montar looks elegantes sem perder conforto."
    },
    "Blusa Casual": {
        cores: "Bege e castanho",
        tamanhos: "P, M e G",
        tecido: "Algodão com elastano",
        publico: "Mulher",
        descricao: "Peça prática para combinar com saias, calças e calçados casuais."
    }
};

document.addEventListener("DOMContentLoaded", () => {
    prepararFiltrosProdutos();
    prepararModalProduto();
});

function prepararFiltrosProdutos() {
    const botoes = document.querySelectorAll("[data-filtro-produto]");
    const produtos = document.querySelectorAll(".area-produtos__grelha .produto");

    function aplicarFiltro(filtro) {
        const filtroSeguro = filtro || "todos";

        botoes.forEach((item) => {
            item.classList.toggle("selecionada", item.dataset.filtroProduto === filtroSeguro);
        });

        produtos.forEach((produto) => {
            const categorias = produto.dataset.categorias || "";
            const visivel = filtroSeguro === "todos" || categorias.includes(filtroSeguro);
            produto.classList.toggle("produto--oculto", !visivel);
        });
    }

    botoes.forEach((botao) => {
        botao.addEventListener("click", () => {
            aplicarFiltro(botao.dataset.filtroProduto);
        });
    });

    const filtroUrl = new URLSearchParams(window.location.search).get("filtro");
    const filtroExiste = [...botoes].some((botao) => botao.dataset.filtroProduto === filtroUrl);
    aplicarFiltro(filtroExiste ? filtroUrl : "todos");
}

function prepararModalProduto() {
    const modal = criarModalProduto();
    document.body.appendChild(modal);

    document.querySelectorAll(".js-ver-produto").forEach((botao) => {
        botao.addEventListener("click", () => {
            const card = botao.closest(".produto");
            const nome = card.querySelector(".produto__nome").textContent.trim();
            const preco = card.querySelector(".produto__preco").textContent.trim();
            const imagem = card.querySelector("img");
            abrirModalProduto(modal, nome, preco, imagem);
        });
    });

    modal.addEventListener("click", (evento) => {
        if (evento.target.matches(".modal-produto, .modal-produto__fechar")) {
            fecharModalProduto(modal);
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") fecharModalProduto(modal);
    });
}

function criarModalProduto() {
    const modal = document.createElement("div");
    modal.className = "modal-produto";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
        <div class="modal-produto__caixa" role="dialog" aria-modal="true" aria-labelledby="modal-produto-titulo">
            <button class="modal-produto__fechar" type="button" aria-label="Fechar detalhes">&times;</button>
            <div class="modal-produto__imagem"></div>
            <div class="modal-produto__info">
                <span class="rotulo">Detalhes do produto</span>
                <h2 id="modal-produto-titulo"></h2>
                <p class="modal-produto__preco"></p>
                <p class="modal-produto__descricao"></p>
                <dl class="modal-produto__lista"></dl>
                <a class="botao botao--principal botao--completo" href="contactos.html">Pedir pelo WhatsApp ou contacto</a>
            </div>
        </div>
    `;
    return modal;
}

function abrirModalProduto(modal, nome, preco, imagem) {
    const detalhes = detalhesProdutos[nome] || {};
    modal.querySelector(".modal-produto__imagem").innerHTML = `<img src="${imagem.src}" alt="${imagem.alt}">`;
    modal.querySelector("#modal-produto-titulo").textContent = nome;
    modal.querySelector(".modal-produto__preco").textContent = preco;
    modal.querySelector(".modal-produto__descricao").textContent = detalhes.descricao || "Produto JCModa com qualidade, conforto e estilo.";
    modal.querySelector(".modal-produto__lista").innerHTML = `
        <div><dt>Cores</dt><dd>${detalhes.cores || "Consultar disponibilidade"}</dd></div>
        <div><dt>Tamanhos</dt><dd>${detalhes.tamanhos || "Consultar disponibilidade"}</dd></div>
        <div><dt>Tecido</dt><dd>${detalhes.tecido || "Consultar na loja"}</dd></div>
        <div><dt>Público</dt><dd>${detalhes.publico || "Todos"}</dd></div>
    `;
    modal.classList.add("modal-produto--aberto");
    modal.setAttribute("aria-hidden", "false");
}

function fecharModalProduto(modal) {
    modal.classList.remove("modal-produto--aberto");
    modal.setAttribute("aria-hidden", "true");
}
