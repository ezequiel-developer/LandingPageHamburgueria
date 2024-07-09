const menuToggle = document.getElementById('menu-toggle') // Seleciona o toggle do menu
const mobileMenu = document.getElementById('mobile-menu') // Seleciona o menu móvel

// Event listener para alternar a visibilidade do menu móvel ao clicar no toggle
menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden') // Alternar a classe 'hidden' no menu móvel
})

// Event listener para fechar o menu móvel ao clicar fora dele ou no toggle
document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target) // Verifica se o clique foi dentro do menu
    const isClickInsideToggle = menuToggle.contains(event.target) // Verifica se o clique foi no toggle

    if (!isClickInsideMenu && !isClickInsideToggle) {
        mobileMenu.classList.add('hidden') // Esconde o menu móvel se o clique foi fora dele ou no toggle
    }
})

// Função para abrir um modal pelo ID
function openModalCard(modalId) {
    var modal = document.getElementById(modalId)
    modal.classList.remove('hidden') // Remove a classe 'hidden' para mostrar o modal

    // Adicionar event listener para fechar o modal ao clicar fora dele
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalCard(modalId)
        }
    })
}

// Função para fechar um modal pelo ID
function closeModalCard(modalId) {
    var modal = document.getElementById(modalId)
    modal.classList.add('hidden') // Adiciona a classe 'hidden' para esconder o modal

    // Remover event listener ao fechar o modal
    modal.removeEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalCard(modalId)
        }
    })
}

const slideWrapper = document.getElementById('slideWrapper') // Seleciona o wrapper do slide
const prevBtn = document.getElementById('prevBtn') // Seleciona o botão de slide anterior
const nextBtn = document.getElementById('nextBtn') // Seleciona o botão de slide próximo

let currentIndex = 0 // Índice inicial do slide
const totalSlides = slideWrapper.children.length // Número total de slides

// Função para avançar para o próximo slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides // Calcula o próximo índice do slide
    updateSlide() // Atualiza a exibição do slide
}

// Função para voltar para o slide anterior
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides // Calcula o índice anterior do slide
    updateSlide() // Atualiza a exibição do slide
}

// Função para atualizar a posição do slide com base no índice atual
function updateSlide() {
    const slideWidth = slideWrapper.clientWidth // Largura do wrapper do slide
    slideWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)` // Atualiza a posição do slide
}

// Função para iniciar o autoplay do slide
function startAutoplay() {
    setInterval(nextSlide, 3000) // Avança para o próximo slide a cada 3 segundos
}

// Event listeners para os botões de slide anterior e próximo
prevBtn.addEventListener('click', prevSlide)
nextBtn.addEventListener('click', nextSlide)

// Inicia o autoplay do slide
startAutoplay()

// Função para observar a interseção de elementos com o viewport
function observeIntersection(elements, axis) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add(`show${axis}`) // Adiciona classe para mostrar o elemento quando visível
            } else {
                entry.target.classList.remove(`show${axis}`) // Remove classe quando o elemento não está visível
            }
        })
    })

    elements.forEach((element) => {
        observer.observe(element) // Observa cada elemento fornecido
    })
}

// Seleciona todos os elementos para observar na direção X e Y
const elementsX = document.querySelectorAll('.elementsX')
const elementsY = document.querySelectorAll('.elementsY')

// Observa a interseção dos elementos nas direções X e Y
observeIntersection(elementsX, 'X')
observeIntersection(elementsY, 'Y')
