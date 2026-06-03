// Navigation Functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Show corresponding section
        const sectionId = link.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }
    });
});

// Quiz Data
const quizData = {
    facil: [
        {
            question: "Qual é a importância da agricultura sustentável?",
            options: [
                "Aumentar o lucro sem pensar no meio ambiente",
                "Produzir alimentos preservando os recursos naturais para o futuro",
                "Usar o máximo de químicos possível",
                "Derrubar mais árvores para plantar"
            ],
            correct: 1
        },
        {
            question: "O Rio Paranapanema é importante para Itambaracá principalmente para:",
            options: [
                "Turismo e lazer apenas",
                "Irrigação, geração de energia e abastecimento de água",
                "Descarte de lixo industrial",
                "Nenhuma utilidade"
            ],
            correct: 1
        },
        {
            question: "Qual dessas é uma prática sustentável na agricultura?",
            options: [
                "Usar pesticidas em excesso",
                "Desmatar indiscriminadamente",
                "Rotação de cultivos e uso de adubos naturais",
                "Monocultura intensiva"
            ],
            correct: 2
        },
        {
            question: "A piscicultura em Itambaracá é importante porque:",
            options: [
                "Gera renda complementar e diversifica a economia local",
                "Polui os rios",
                "É uma atividade ilegal",
                "Não tem importância"
            ],
            correct: 0
        },
        {
            question: "O que significa 'Agro Forte'?",
            options: [
                "Um programa de agrotóxicos",
                "Incentivo ao desmatamento",
                "Fortalecimento da agricultura sustentável e inovadora",
                "Destruição da natureza"
            ],
            correct: 2
        }
    ],
    medio: [
        {
            question: "Como a tecnologia de precisão contribui para a sustentabilidade agrícola?",
            options: [
                "Aumenta o uso de água indiscriminadamente",
                "Otimiza irrigação, fertilização e colheita com mínimo impacto ambiental",
                "Substitui completamente o trabalho humano",
                "Aumenta a dependência de químicos"
            ],
            correct: 1
        },
        {
            question: "Qual é um desafio ambiental crítico em Itambaracá?",
            options: [
                "Excesso de chuva",
                "Falta de tecnologia agrícola",
                "Desmatamento inadequado e expansão agrícola desordenada",
                "Falta de piscicultura"
            ],
            correct: 2
        },
        {
            question: "Como o setor agrícola move a economia de Itambaracá?",
            options: [
                "Não tem importância econômica",
                "Gera apenas 20% dos empregos",
                "Impulsiona 70%+ dos empregos, indústria, comércio e serviços",
                "Apenas exporta para outros países"
            ],
            correct: 2
        },
        {
            question: "Qual tecnologia é utilizada modernamente em piscicultura?",
            options: [
                "Apenas alimentação manual",
                "Sistemas de recirculação de água, oxigenadores inteligentes e automação",
                "Métodos totalmente artesanais",
                "Nenhuma tecnologia"
            ],
            correct: 1
        },
        {
            question: "Os rios Paranapanema e Cinza têm qual função ecológica?",
            options: [
                "Apenas recreativa",
                "Essencial para o ecossistema, abastecimento e agricultura",
                "Nenhuma função importante",
                "Apenas para navegação"
            ],
            correct: 1
        }
    ],
    dificil: [
        {
            question: "Como a rotação de cultivos contribui para a sostenibilidade a longo prazo?",
            options: [
                "Não tem benefício real",
                "Reduz a fertilidade do solo progressivamente",
                "Restaura nutrientes do solo, reduz pragas naturalmente e melhora biodiversidade",
                "Aumenta o uso de defensivos agrícolas"
            ],
            correct: 2
        },
        {
            question: "Qual é o paradoxo entre crescimento agrícola e desmatamento em regiões como Itambaracá?",
            options: [
                "Não existe paradoxo",
                "O crescimento agrícola necessita sempre de desmatamento",
                "Expansão inadequada ameaça ecossistemas; solução é intensificação sustentável e preservação",
                "O desmatamento não afeta a produção agrícola"
            ],
            correct: 2
        },
        {
            question: "Como Big Data e IA transformam a agricultura de precisão?",
            options: [
                "Não têm aplicação real",
                "Permitem apenas coleta manual de dados",
                "Análise de padrões meteorológicos, solo e safras anteriores para decisões inteligentes",
                "Aumentam os custos sem benefícios"
            ],
            correct: 2
        },
        {
            question: "Qual é a importância econômica do 'corredor agrícola' formado por Itambaracá, Andira e Bandeirantes?",
            options: [
                "Nenhuma importância",
                "Compartilha infraestrutura e mercados, potencializando desenvolvimento regional",
                "Apenas competem entre si",
                "Prejudica o comércio local"
            ],
            correct: 1
        },
        {
            question: "Como energias renováveis (solar e eólica) melhoram a sustentabilidade agrícola?",
            options: [
                "Não afetam a agricultura",
                "Aumentam o custo sem benefícios",
                "Reduzem custos operacionais, emissões de carbono e dependência energética",
                "Diminuem a produtividade"
            ],
            correct: 2
        }
    ]
};

// Quiz Variables
let currentDifficulty = '';
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStarted = false;

function initQuiz(difficulty) {
    currentDifficulty = difficulty;
    currentQuestionIndex = 0;
    userAnswers = [];
    quizStarted = true;

    // Hide difficulty selector
    document.querySelector('.difficulty-selector').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'flex';
    document.getElementById('quiz-results').style.display = 'none';

    displayQuestion();
}

function displayQuestion() {
    const questions = quizData[currentDifficulty];
    const question = questions[currentQuestionIndex];

    // Update progress
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('question-counter').textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;

    // Display question
    document.getElementById('quiz-question').innerHTML = `<p>${question.question}</p>`;

    // Display options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);

        if (userAnswers[currentQuestionIndex] === index) {
            button.classList.add('selected');
        }

        optionsContainer.appendChild(button);
    });
}

function selectAnswer(index) {
    userAnswers[currentQuestionIndex] = index;

    // Update visual feedback
    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => {
        opt.classList.remove('selected', 'correct', 'incorrect');
        if (i === index) {
            opt.classList.add('selected');
        }
    });
}

function nextQuestion() {
    const questions = quizData[currentDifficulty];

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function showResults() {
    const questions = quizData[currentDifficulty];
    let correctCount = 0;

    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
            correctCount++;
        }
    });

    // Hide quiz content
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';

    // Display results
    document.getElementById('final-score').textContent = `${correctCount}/${questions.length}`;

    let message = '';
    const percentage = (correctCount / questions.length) * 100;

    if (percentage === 100) {
        message = '🎉 Perfeito! Você é um expert em sustentabilidade!';
    } else if (percentage >= 80) {
        message = '⭐ Excelente! Você tem ótimo conhecimento sobre sustentabilidade agrícola!';
    } else if (percentage >= 60) {
        message = '👍 Bom! Continue aprendendo sobre sustentabilidade e agricultura!';
    } else if (percentage >= 40) {
        message = '📚 Continue estudando! Há muito mais a aprender sobre o tema!';
    } else {
        message = '💪 Não desista! Revise o conteúdo e tente novamente!';
    }

    document.getElementById('result-message').textContent = message;
}

function resetQuiz() {
    currentDifficulty = '';
    currentQuestionIndex = 0;
    userAnswers = [];
    quizStarted = false;

    // Show difficulty selector
    document.querySelector('.difficulty-selector').style.display = 'flex';
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';
}

// Contact Form
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create mailto link
    const recipientEmail = 'pedro.oliveira.souza21@escola.pr.gov.br';
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Show confirmation
    alert('Mensagem preparada para envio! Seu cliente de email será aberto.');

    // Reset form
    this.reset();
});

// Smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set home as active on load
    document.querySelector('[data-section="home"]').classList.add('active');
    document.getElementById('home').classList.add('active');

    // Add animation delay to hero content
    const heroElements = document.querySelectorAll('.fade-in');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${0.2 + index * 0.2}s`;
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for scroll animation
document.querySelectorAll('.card, .gallery-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
