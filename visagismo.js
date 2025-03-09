// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Carousel
const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;

function updateSlide() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
    updateSlide();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slideItems.length;
    updateSlide();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateSlide();
    });
});

// Auto-slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % slideItems.length;
    updateSlide();
}, 5000);

// Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.classList.toggle('active');
        
        // Update the + or - indicator
        const indicator = header.querySelector('span');
        indicator.textContent = content.classList.contains('active') ? '−' : '+';
    });
});

// Quiz
const quizOptions = document.querySelectorAll('.quiz-option');
const quizBtn = document.querySelector('.quiz-btn');
const quizResult = document.querySelector('.quiz-result');
const resultStyle = document.getElementById('result-style');
const resultDescription = document.getElementById('result-description');
const resultSuggestions = document.getElementById('result-suggestions');

let answers = {
    'A': 0,
    'B': 0,
    'C': 0,
    'D': 0
};

quizOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Deselect other options in the same question
        const parent = option.parentElement;
        parent.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Select the clicked option
        option.classList.add('selected');
        
        // Update answers
        const value = option.getAttribute('data-value');
        answers[value]++;
    });
});

quizBtn.addEventListener('click', () => {
    // Find the dominant style
    let dominantStyle = 'A';
    let maxCount = answers['A'];
    
    for (const [style, count] of Object.entries(answers)) {
        if (count > maxCount) {
            maxCount = count;
            dominantStyle = style;
        }
    }
    
    // Set results based on dominant style
    let styleName, description, suggestions;
    
    switch(dominantStyle) {
        case 'A':
            styleName = "Dramático";
            description = "Você tem uma personalidade forte e marcante. Gosta de se destacar e não tem medo de assumir o centro das atenções. Seu estilo transmite confiança, assertividade e dinamismo.";
            suggestions = "Cortes de cabelo com linhas retas e ângulos definidos; cores intensas e contrastantes; maquiagem marcante; acessórios statement; roupas com caimento estruturado.";
            break;
        case 'B':
            styleName = "Clássico";
            description = "Você valoriza a tradição, a organização e a consistência. Prefere um estilo atemporal e sofisticado a seguir tendências passageiras. Transmite confiabilidade, elegância e competência.";
            suggestions = "Cortes de cabelo tradicionais e bem estruturados; cores neutras e tons sóbrios; maquiagem suave e elegante; acessórios discretos e de qualidade; roupas bem cortadas e de bom caimento.";
            break;
        case 'C':
            styleName = "Romântico";
            description = "Você tem uma personalidade acolhedora, gentil e receptiva. Valoriza a harmonia nas relações e nos ambientes. Seu estilo transmite suavidade, delicadeza e feminilidade/masculinidade sem exageros.";
            suggestions = "Cortes de cabelo com ondas suaves e movimento; cores pastéis e tons suaves; maquiagem natural e iluminadora; acessórios delicados; roupas fluidas e confortáveis.";
            break;
        case 'D':
            styleName = "Criativo";
            description = "Você tem uma personalidade original e inovadora. Gosta de experimentar e não tem medo de ousar. Seu estilo transmite originalidade, expressividade e não-conformismo.";
            suggestions = "Cortes de cabelo assimétricos ou não-convencionais; cores vibrantes ou combinações inusitadas; maquiagem expressiva e artística; acessórios únicos e diferenciados; roupas com mix de texturas e estilos.";
            break;
    }
    
    resultStyle.textContent = styleName;
    resultDescription.textContent = description;
    resultSuggestions.textContent = suggestions;
    
    quizResult.style.display = 'block';
    
    // Reset answers for retaking the quiz
    answers = { 'A': 0, 'B': 0, 'C': 0, 'D': 0 };
    
    // Scroll to results
    quizResult.scrollIntoView({ behavior: 'smooth' });
});

// Face Analysis Tool
const fileInput = document.querySelector('.file-input');
const analyzeBtn = document.querySelector('.analyze-btn');
const resultImg = document.getElementById('result-img');
const faceShape = document.getElementById('face-shape');
const shapeDescription = document.getElementById('shape-description');
const haircutRec = document.getElementById('haircut-rec');
const makeupRec = document.getElementById('makeup-rec');
const accessoriesRec = document.getElementById('accessories-rec');
const toolResult = document.querySelector('.tool-result');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            resultImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

analyzeBtn.addEventListener('click', () => {
    // Simulação de análise facial (substituir por lógica real)
    const simulatedResults = {
        shape: "Oval",
        description: "O formato oval é considerado o mais equilibrado, com proporções harmoniosas e contornos suaves.",
        haircut: "Cortes que mantenham a forma natural do rosto, como camadas suaves ou franjas laterais.",
        makeup: "Maquiagem que realce as maçãs do rosto e os olhos, com contorno sutil.",
        accessories: "Brincos longos ou colares que complementem o formato do rosto."
    };

    faceShape.textContent = simulatedResults.shape;
    shapeDescription.textContent = simulatedResults.description;
    haircutRec.textContent = simulatedResults.haircut;
    makeupRec.textContent = simulatedResults.makeup;
    accessoriesRec.textContent = simulatedResults.accessories;

    toolResult.style.display = 'block';
    toolResult.scrollIntoView({ behavior: 'smooth' });
});