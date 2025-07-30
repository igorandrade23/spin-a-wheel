// Efeito de confete
window.Confetti = class Confetti {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1000';
        document.body.appendChild(this.canvas);
        
        this.particles = [];
        this.particleCount = 150;
        this.colors = [
            '#ff0000', '#ff6b6b', '#ff9a9e', '#ffd3b6', 
            '#a8e6cf', '#dcedc1', '#ffaaa5', '#ff8b94',
            '#b5ead7', '#c7ceea', '#e2f0cb', '#ffb7b2'
        ];
        
        this.animationId = null;
        this.resizeTimeout = null;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Usando bind para manter a referência correta do this
        this.handleResize = () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                if (this.canvas) {
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                }
            }, 250);
        };
        
        window.addEventListener('resize', this.handleResize);
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -20,
                size: Math.random() * 12 + 8,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                speed: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 20,
                shape: Math.floor(Math.random() * 3) // 0: rectangle, 1: circle, 2: triangle
            });
        }
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotation * Math.PI / 180);
        this.ctx.fillStyle = particle.color;
        
        switch(particle.shape) {
            case 0: // Rectangle
                this.ctx.fillRect(
                    -particle.size / 2, 
                    -particle.size / 2, 
                    particle.size, 
                    particle.size
                );
                break;
                
            case 1: // Circle
                this.ctx.beginPath();
                this.ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                break;
                
            case 2: // Triangle
                this.ctx.beginPath();
                this.ctx.moveTo(0, -particle.size / 2);
                this.ctx.lineTo(particle.size / 2, particle.size / 2);
                this.ctx.lineTo(-particle.size / 2, particle.size / 2);
                this.ctx.closePath();
                this.ctx.fill();
                break;
        }
        
        this.ctx.restore();
    }
    
    updateParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            p.y += p.speed;
            p.rotation += p.rotationSpeed * 0.1;
            
            // Adiciona um pouco de movimento horizontal
            p.x += Math.sin(p.y * 0.02) * 0.8;
            
            // Remove partículas que saíram da tela
            if (p.y > this.canvas.height + p.size) {
                p.y = -p.size;
                p.x = Math.random() * this.canvas.width;
            }
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            this.drawParticle(this.particles[i]);
        }
        
        this.updateParticles();
        this.animationId = requestAnimationFrame(() => this.render());
    }
    
    start() {
        this.createParticles();
        this.render();
        
        // Para a animação após 5 segundos
        setTimeout(() => {
            this.stop();
        }, 5000);
    }
    
    stop() {
        cancelAnimationFrame(this.animationId);
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.remove();
        }
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
    }
}

// Função global para ativar o confete
window.triggerConfetti = function() {
    const confetti = new Confetti();
    confetti.start();
    return confetti;
};
