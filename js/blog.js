const artigosBlog = {
    "looks-dia": {
        titulo: "5 looks versáteis para usar no dia a dia",
        categoria: "Estilo",
        imagem: "../img/blog1.svg",
        resumo: "Um guarda-roupa funcional começa por peças que combinam entre si e servem para mais de uma ocasião.",
        pontos: [
            "T-shirt neutra com jeans e ténis para aulas, compras ou passeios rápidos.",
            "Vestido casual com ténis para manter conforto sem perder elegância.",
            "Camisa formal com calça simples para trabalho, reuniões ou atendimento.",
            "Saia longa com blusa leve para dias frescos e compromissos informais.",
            "Sapato social com camisa para ocasiões que pedem uma presença mais cuidada."
        ],
        dica: "Para o público de Luanda, vale priorizar tecidos leves, peças respiráveis e cores fáceis de combinar, como bege, castanho, branco e caramelo."
    },
    tendencias: {
        titulo: "Tendências de moda que estão em alta",
        categoria: "Tendências",
        imagem: "../img/blog2.svg",
        resumo: "As tendências mais fortes são as que conseguem adaptar estilo, conforto e realidade local.",
        pontos: [
            "Tons terrosos continuam fortes porque combinam com várias peles e ocasiões.",
            "Peças minimalistas deixam o look mais elegante sem exigir muitos acessórios.",
            "Conjuntos confortáveis ajudam quem precisa sair cedo e passar o dia fora.",
            "Calçados casuais ganharam espaço por serem práticos para deslocações diárias."
        ],
        dica: "A melhor tendência é a que respeita o seu estilo pessoal: use novidades como complemento, não como obrigação."
    },
    "calcado-ideal": {
        titulo: "Como escolher o calçado ideal para cada ocasião",
        categoria: "Calçado",
        imagem: "../img/blog3.svg",
        resumo: "O calçado certo melhora o conforto, completa o visual e evita compras que ficam paradas no armário.",
        pontos: [
            "Para trabalho formal, escolha sapatos sociais com cor neutra e sola confortável.",
            "Para passeios, ténis leves funcionam melhor em dias longos.",
            "Para eventos, prefira modelos que combinem com pelo menos duas peças do guarda-roupa.",
            "Observe o tamanho, o material e a estabilidade antes de comprar."
        ],
        dica: "Na dúvida, escolha primeiro conforto e acabamento. Um calçado bonito que magoa o pé acaba por não ser usado."
    },
    "combinar-cores": {
        titulo: "Guia para combinar cores na roupa",
        categoria: "Dicas",
        imagem: "../img/blog1.svg",
        resumo: "Combinar cores fica mais simples quando se começa por uma base neutra e se adiciona uma cor de destaque.",
        pontos: [
            "Bege, branco, preto e castanho são boas bases para looks diários.",
            "Caramelo combina bem com tons claros e também com jeans.",
            "Se usar uma peça muito chamativa, deixe o resto do look mais simples.",
            "Repita uma cor em dois pontos do visual, como sapato e acessório, para criar harmonia."
        ],
        dica: "Para uma loja de moda, mostrar combinações prontas ajuda o cliente a imaginar como usaria cada produto."
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const modal = criarModalArtigo();
    document.body.appendChild(modal);

    document.querySelectorAll(".js-ver-artigo").forEach((botao) => {
        botao.addEventListener("click", () => abrirModalArtigo(modal, botao.dataset.artigo));
    });

    modal.addEventListener("click", (evento) => {
        if (evento.target.matches(".modal-artigo, .modal-artigo__fechar")) {
            fecharModalArtigo(modal);
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") fecharModalArtigo(modal);
    });
});

function criarModalArtigo() {
    const modal = document.createElement("div");
    modal.className = "modal-artigo";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
        <div class="modal-artigo__caixa" role="dialog" aria-modal="true" aria-labelledby="modal-artigo-titulo">
            <button class="modal-artigo__fechar" type="button" aria-label="Fechar artigo">&times;</button>
            <div class="modal-artigo__imagem"></div>
            <div class="modal-artigo__corpo">
                <span class="rotulo modal-artigo__categoria"></span>
                <h2 id="modal-artigo-titulo"></h2>
                <p class="modal-artigo__resumo"></p>
                <ul class="modal-artigo__lista"></ul>
                <p class="modal-artigo__dica"></p>
                <a href="produtos.html" class="botao botao--principal">Ver produtos relacionados</a>
            </div>
        </div>
    `;
    return modal;
}

function abrirModalArtigo(modal, chave) {
    const artigo = artigosBlog[chave];
    if (!artigo) return;

    modal.querySelector(".modal-artigo__imagem").innerHTML = `<img src="${artigo.imagem}" alt="${artigo.titulo}">`;
    modal.querySelector(".modal-artigo__categoria").textContent = artigo.categoria;
    modal.querySelector("#modal-artigo-titulo").textContent = artigo.titulo;
    modal.querySelector(".modal-artigo__resumo").textContent = artigo.resumo;
    modal.querySelector(".modal-artigo__lista").innerHTML = artigo.pontos.map((ponto) => `<li>${ponto}</li>`).join("");
    modal.querySelector(".modal-artigo__dica").textContent = artigo.dica;
    modal.classList.add("modal-artigo--aberto");
    modal.setAttribute("aria-hidden", "false");
}

function fecharModalArtigo(modal) {
    modal.classList.remove("modal-artigo--aberto");
    modal.setAttribute("aria-hidden", "true");
}
