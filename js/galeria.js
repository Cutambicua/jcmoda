document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll("[data-filtro-galeria]");
    const itens = document.querySelectorAll(".galeria__item");
    const secoes = document.querySelectorAll(".galeria-secao");

    botoes.forEach((botao) => {
        botao.addEventListener("click", () => {
            botoes.forEach((item) => item.classList.remove("selecionada"));
            botao.classList.add("selecionada");

            const filtro = botao.dataset.filtroGaleria;
            itens.forEach((item) => {
                const categorias = item.dataset.categorias || "";
                const visivel = filtro === "todos" || categorias.includes(filtro);
                item.classList.toggle("galeria__item--oculto", !visivel);
            });

            secoes.forEach((secao) => {
                const temItemVisivel = secao.querySelector(".galeria__item:not(.galeria__item--oculto)");
                secao.classList.toggle("galeria-secao--oculta", !temItemVisivel);
            });
        });
    });
});
