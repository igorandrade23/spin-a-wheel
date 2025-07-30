// Configurações iniciais
const config = {
    slices: 12,
    colors: ['#1a1a1a', '#8B0000', '#4B0082', '#006400', '#8B4513', '#2F4F4F', '#8B008B', '#228B22', '#483D8B', '#556B2F', '#B8860B', '#000000'],
};

// Frases e ícones para a roda
const wheelItems = [
    { text: 'Bepantol', emoji: '🧼', message: 'Você passou bepantol por uma semana e agora brilha igual bacon!' },
    { text: 'Coçou', emoji: '🔥', message: 'Tatuou no calor, se coçou no banho, e agora sua tattoo virou arte abstrata.' },
    { text: 'Vó viu', emoji: '👵', message: 'Sua avó viu e perguntou se virou marginal.' },
    { text: 'PIX', emoji: '💸', message: 'Gastou todo o PIX e agora vive de miojo. Mas tá estilosa.' },
    { text: 'Desmaiou', emoji: '💉', message: 'Você desmaiou na linha fina. Mas jurou que foi pressão baixa.' },
    { text: 'Filtro', emoji: '🧴', message: 'Usou filtro no Instagram pra esconder a casquinha. A beleza tá no healing!' },
    { text: 'Ex', emoji: '🫣', message: 'Descobriu que o nome do ex não sai com laser tão fácil assim…' },
    { text: 'Vegana', emoji: '🌿', message: 'Fez a tattoo, virou vegana, está no seu auge espiritual.' },
    { text: 'Arrependeu', emoji: '👁', message: 'Todo mundo reparou na sua tattoo. Ou no seu arrependimento?' },
    { text: 'Cicatrizou', emoji: '🕷', message: 'A tattoo cicatrizou linda. Só não mostra porque tá com vergonha da frase.' },
    { text: 'Obra de arte', emoji: '🎨', message: 'Cliente virou obra de arte. Literalmente. Até a mãe aplaudiu.' },
    { text: 'Bêbada', emoji: '💀', message: 'Fez a tattoo bêbada. Agora tem um ET nas costas.' }
];

// Variável global para o confetti
let confettiEffect = null;

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spin');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const resultIcon = document.getElementById('result-icon');
    const playAgainBtn = document.getElementById('play-again');
    const shareBtn = document.getElementById('share');
    const giftBtn = document.getElementById('gift');

    let isSpinning = false;
    let currentRotation = 0;

    // Inicialização
    createWheel();
    setupEventListeners();

    function createWheel() {
        const sliceAngle = 360 / config.slices;
        const gradientColors = config.colors.map((color, index) => {
            return `${color} ${index * sliceAngle}deg ${(index + 1) * sliceAngle}deg`;
        }).join(', ');

        wheel.style.background = `conic-gradient(${gradientColors})`;

        const sliceRadius = wheel.offsetWidth / 2;

        wheelItems.forEach((item, index) => {
            const itemContainer = document.createElement('div');
            itemContainer.className = 'wheel-item-container'; // Use a different class for the container

            const itemContent = document.createElement('div');
            itemContent.className = 'wheel-item-content';

            const emoji = document.createElement('div');
            emoji.className = 'emoji';
            emoji.textContent = item.emoji;

            const text = document.createElement('div');
            text.className = 'text';
            text.textContent = item.text;

            itemContent.appendChild(emoji);
            itemContent.appendChild(text);
            itemContainer.appendChild(itemContent);

            const angle = (sliceAngle * index) + (sliceAngle / 2);

            // A rotação do contêiner é (angle + 90). A contra-rotação do conteúdo deve ser o inverso.
            itemContent.style.transform = `rotate(-${angle + 90}deg)`;
            const rotation = angle * (Math.PI / 180);
            const x = Math.cos(rotation) * (sliceRadius * 0.65); // 65% from center
            const y = Math.sin(rotation) * (sliceRadius * 0.65);

            itemContainer.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`;

            wheel.appendChild(itemContainer);
        });
    }

    function setupEventListeners() {
        spinBtn.addEventListener('click', spinWheel);
        playAgainBtn.addEventListener('click', () => {
            resultContainer.style.display = 'none';
            resultContainer.style.opacity = '0';
            spinBtn.disabled = false;
            spinBtn.focus();
        });
        shareBtn.addEventListener('click', shareResult);
        giftBtn.addEventListener('click', () => {
            alert('Mostre este resultado na recepção da Akasha para ganhar seu mimo especial!');
        });
    }

    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;
        spinBtn.disabled = true;

        const randomSpins = Math.floor(Math.random() * 5) + 5; // 5 to 10 full spins
        const randomStopAngle = Math.floor(Math.random() * 360);
        const totalRotation = (randomSpins * 360) + randomStopAngle;

        currentRotation += totalRotation;
        wheel.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        wheel.addEventListener('transitionend', () => {
            const finalRotation = currentRotation % 360;
            const sliceAngle = 360 / config.slices;
            const winningIndex = Math.floor((360 - finalRotation + (sliceAngle / 2)) % 360 / sliceAngle);

            showResult(winningIndex);
            isSpinning = false;
        }, { once: true });
    }

    function showResult(index) {
        const winner = wheelItems[index];
        resultText.textContent = winner.message;
        resultIcon.innerHTML = `<div class="emoji">${winner.emoji}</div>`;

        resultContainer.style.display = 'flex';
        setTimeout(() => {
            resultContainer.style.opacity = '1';
            if (typeof triggerConfetti === 'function') {
                if (confettiEffect) confettiEffect.stop();
                confettiEffect = triggerConfetti();
            }
        }, 100);
    }

    function shareResult() {
        navigator.share({
            title: 'Tattouleta do Destino',
            text: `Minha sorte na Tattouleta: ${resultText.textContent}`,
            url: window.location.href
        }).catch(console.error);
    }

    document.body.classList.add('js-enabled');

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resultContainer.style.display === 'flex') {
            playAgainBtn.click();
        }
        if (e.key === ' ' && !spinBtn.disabled) {
            e.preventDefault();
            spinWheel();
        }
    });

    document.querySelectorAll('button, [role="button"]').forEach(button => {
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
});


