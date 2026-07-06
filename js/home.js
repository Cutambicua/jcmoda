document.addEventListener("DOMContentLoaded", () => {
    const carrossel = document.querySelector(".hero .carrossel-frio__janela");
    const contentor = carrossel?.closest(".hero-carrossel__contentor");
    const slides = carrossel?.querySelectorAll(".carrossel-frio__slide") || [];
    const indicadores = contentor?.querySelectorAll(".carrossel-frio__indicador") || [];
    const anterior = carrossel?.querySelector(".carrossel-frio__controlo--anterior");
    const proximo = carrossel?.querySelector(".carrossel-frio__controlo--proximo");
    let indiceAtual = 0;
    let temporizador;

    if (!slides.length) return;

    function mostrarSlide(indice) {
        indiceAtual = (indice + slides.length) % slides.length;
        slides.forEach((slide, posicao) => {
            slide.classList.toggle("carrossel-frio__slide--ativo", posicao === indiceAtual);
        });
        indicadores.forEach((indicador, posicao) => {
            indicador.classList.toggle("carrossel-frio__indicador--ativo", posicao === indiceAtual);
        });
    }

    function iniciarAutomatico() {
        clearInterval(temporizador);
        temporizador = setInterval(() => mostrarSlide(indiceAtual + 1), 4500);
    }

    anterior?.addEventListener("click", () => {
        mostrarSlide(indiceAtual - 1);
        iniciarAutomatico();
    });

    proximo?.addEventListener("click", () => {
        mostrarSlide(indiceAtual + 1);
        iniciarAutomatico();
    });

    indicadores.forEach((indicador, posicao) => {
        indicador.addEventListener("click", () => {
            mostrarSlide(posicao);
            iniciarAutomatico();
        });
    });

    mostrarSlide(0);
    iniciarAutomatico();
});
