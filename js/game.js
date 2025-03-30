class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.player = null;
        this.platforms = [];
        this.coins = [];
        this.enemies = [];
        this.goal = null;
        this.gravity = 0.5;
        this.score = 0;
        this.currentLevel = 0;
        this.gameOver = false;
        this.levelComplete = false;
        this.keys = {};
        
        // 音效
        this.sounds = {
            jump: null,
            coin: null,
            hurt: null,
            levelComplete: null
        };
        
        this.loadSounds();
        this.setupEventListeners();
    }
    
    loadSounds() {
        // 在實際開發中，這裡會加載音效文件
        // this.sounds.jump = new Audio('assets/audio/jump.mp3');
        // this.sounds.coin = new Audio('assets/audio/coin.mp3');
        // this.sounds.hurt = new Audio('assets/audio/hurt.mp3');
        // this.sounds.levelComplete = new Audio('assets/audio/level-complete.mp3');
    }
    
    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // 移動設備控制
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        const jumpBtn = document.getElementById('jumpBtn');
        
        if (leftBtn && rightBtn && jumpBtn) {
            leftBtn.addEventListener('touchstart', () => { this.keys['ArrowLeft'] = true; });
            leftBtn.addEventListener('touchend', () => { this.keys['ArrowLeft'] = false; });
            
            rightBtn.addEventListener('touchstart', () => { this.keys['ArrowRight'] = true; });
            rightBtn.addEventListener('touchend', () => { this.keys['ArrowRight'] = false; });
            
            jumpBtn.addEventListener('touchstart', () => { this.keys['Space'] = true; });
            jumpBtn.addEventListener('touchend', () => { this.keys['Space'] = false; });
        }
    }
    
    loadLevel(levelData) {
        this.platforms = levelData.platforms;
        this.coins = levelData.coins;
        this.enemies = levelData.enemies;
        this.goal = levelData.goal;
        this.player = new Player(levelData.playerStart.x, levelData.playerStart.y, this);
        this.gameOver = false;
        this.levelComplete = false;
    }
    
    update() {
        if (this.gameOver || this.levelComplete) return;
        
        this.player.update();
        
        // 更新敵人
        this.enemies.forEach(enemy => {
            enemy.update();
            
            // 檢測與玩家的碰撞
            if (this.checkCollision(this.player, enemy)) {
                this.gameOver = true;
                // if (this.sounds.hurt) this.sounds.hurt.play();
                document.getElementById('gameOverScreen').classList.remove('hidden');
                document.getElementById('finalScore').textContent = this.score;
            }
        });
        
        // 檢測金幣收集
        for (let i = this.coins.length - 1; i >= 0; i--) {
            if (this.checkCollision(this.player, this.coins[i])) {
                this.score += 10;
                this.coins.splice(i, 1);
                // if (this.sounds.coin) this.sounds.coin.play();
            }
        }
        
        // 檢測是否到達終點
        if (this.goal && this.checkCollision(this.player, this.goal)) {
            this.levelComplete = true;
            // if (this.sounds.levelComplete) this.sounds.levelComplete.play();
            document.getElementById('levelCompleteScreen').classList.remove('hidden');
            document.getElementById('levelScore').textContent = this.score;
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // 繪製背景
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // 繪製平台
        this.platforms.forEach(platform => {
            this.ctx.fillStyle = '#8B4513';
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        });
        
        // 繪製金幣
        this.coins.forEach(coin => {
            this.ctx.fillStyle = '#FFD700';
            this.ctx.beginPath();
            this.ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // 繪製敵人
        this.enemies.forEach(enemy => {
            this.ctx.fillStyle = '#FF0000';
            this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        });
        
        // 繪製終點
        if (this.goal) {
            this.ctx.fillStyle = '#00FF00';
            this.ctx.fillRect(this.goal.x, this.goal.y, this.goal.width, this.goal.height);
        }
        
        // 繪製玩家
        this.player.render();
        
        // 繪製分數
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`分數: ${this.score}`, 20, 30);
    }
    
    checkCollision(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    start() {
        this.loadLevel(levels[this.currentLevel]);
        this.gameLoop();
    }
    
    nextLevel() {
        this.currentLevel++;
        if (this.currentLevel < levels.length) {
            this.loadLevel(levels[this.currentLevel]);
            document.getElementById('levelCompleteScreen').classList.add('hidden');
        } else {
            // 所有關卡完成
            document.getElementById('levelCompleteScreen').classList.add('hidden');
            document.getElementById('gameOverScreen').classList.remove('hidden');
            document.getElementById('finalScore').textContent = this.score;
        }
    }
    
    restart() {
        this.score = 0;
        this.currentLevel = 0;
        this.loadLevel(levels[this.currentLevel]);
        document.getElementById('gameOverScreen').classList.add('hidden');
    }
}