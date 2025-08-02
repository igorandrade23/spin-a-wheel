// Configurações iniciais para a roleta Cartink
const config = {
    slices: 7,
    colors: ['#000000', '#f5f5dc', '#ff0000', '#ffff00', '#ffa500', '#00ffff', '#ffc0cb'],
};

// Apenas emojis para a roleta Cartink
const wheelItems = [
    { emoji: '💀' },  // Preto
    { emoji: '💬' },  // Bege
    { emoji: '🔞' },  // Vermelho
    { emoji: '🤔' },  // Amarelo
    { emoji: '⭐' },  // Laranja
    { emoji: '🧼' },  // Ciano
    { emoji: '🎉' }   // Rosa
];

document.addEventListener('DOMContentLoaded', () => {
    // Elementos da interface
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spin');
    const resultContainer = document.getElementById('result-container');
    const resultIcon = document.getElementById('result-icon');
    const playAgainBtn = document.getElementById('play-again');

    let isSpinning = false;
    let currentRotation = 0;

    // Inicialização
    createWheel();
    setupEventListeners();

    function createWheel() {
        // Calcula o ângulo de cada fatia
        const sliceAngle = 360 / config.slices;

        // Cria o gradiente
        const gradientColors = config.colors.map((color, index) => {
            return `${color} ${index * sliceAngle}deg ${(index + 1) * sliceAngle}deg`;
        }).join(', ');

        wheel.style.background = `conic-gradient(${gradientColors})`;

        // Cria as fatias
        wheelItems.forEach((item, index) => {
            const itemContainer = document.createElement('div');
            itemContainer.className = 'wheel-item-container';

            // Cria o emoji diretamente no container
            const emoji = document.createElement('div');
            emoji.className = 'emoji';
            emoji.textContent = item.emoji;
            itemContainer.appendChild(emoji);
            
            // Ângulo central da fatia em graus
            const angle = index * sliceAngle + (sliceAngle / 2);
            
            // Posiciona o container da fatia
            itemContainer.style.transform = `rotate(${angle}deg)`;
            
            wheel.appendChild(itemContainer);
        });
    }

    function setupEventListeners() {
        // Adiciona os listeners
        spinBtn.addEventListener('click', spinWheel);
        
        playAgainBtn.addEventListener('click', resetWheel);
    }

    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;
        spinBtn.disabled = true;

        // Escolhe um índice aleatório para parar
        const targetIndex = Math.floor(Math.random() * config.slices);
        const sliceAngle = 360 / config.slices;
        
        // Calcula o ângulo para parar a roleta com o ponteiro apontando para cima (0 graus)
        // Ajusta para que o meio da fatia fique no topo
        const targetAngle = 360 - (targetIndex * sliceAngle) - (sliceAngle / 2);
        
        // Adiciona voltas completas para dar um efeito de rotação
        const fullRotations = 5; // Número de voltas completas antes de parar
        const totalRotation = (fullRotations * 360) + targetAngle;
        
        // Remove a transição para definir a posição inicial sem animação
        wheel.style.transition = 'none';
        // Define a posição inicial (uma volta completa para trás)
        wheel.style.transform = `rotate(-360deg)`;
        
        // Força o navegador a aplicar a mudança
        void wheel.offsetWidth;
        
        // Aplica a rotação com animação
        currentRotation = totalRotation;
        wheel.style.transition = 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        wheel.addEventListener('transitionend', () => {
            // Mostra o resultado correspondente ao índice escolhido
            showResult(targetIndex);
            isSpinning = false;
        }, { once: true });
    }

    function showResult(index) {
        // Mostra apenas o emoji como resultado
        const winner = wheelItems[index];
        resultIcon.innerHTML = `<div class="result-icon" style="font-size: 3em;">${winner.emoji}</div>`;

        resultContainer.style.display = 'flex';
        setTimeout(() => {
            resultContainer.style.opacity = '1';
        }, 100);
    }

    function resetWheel() {
        // Reseta a rotação da roda para a posição inicial
        wheel.style.transition = 'none';
        wheel.style.transform = 'rotate(0deg)';
        currentRotation = 0;
        
        // Esconde o resultado e reativa o botão
        resultContainer.style.display = 'none';
        resultContainer.style.opacity = '0';
        spinBtn.disabled = false;
        spinBtn.focus();
    }

    // Acessibilidade - teclado
    spinBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            spinWheel();
        }
    });

    playAgainBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            resetWheel();
        }
    });
});