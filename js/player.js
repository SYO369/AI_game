class Player {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 50;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpForce = -12;
        this.game = game;
        this.isJumping = false;
    }
    
    update() {
        // 水平移動
        this.velocityX = 0;
        
        if (this.game.keys['ArrowLeft']) {
            this.velocityX = -this.speed;
        }
        
        if (this.game.keys['ArrowRight']) {
            this.velocityX = this.speed;
        }
        
        // 跳躍
        if ((this.game.keys['Space'] || this.game.keys['ArrowUp']) && !this.isJumping) {
            this.velocityY = this.jumpForce;
            this.isJumping = true;
            // if (this.game.sounds.jump) this.game.sounds.jump.play();
        }
        
        // 應用重力
        this.velocityY += this.game.gravity;
        
        // 更新位置
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // 檢測與平台的碰撞
        this.checkPlatformCollisions();
        
        // 邊界檢查
        this.checkBoundaries();
    }
    
    checkPlatformCollisions() {
        let onPlatform = false;
        
        for (const platform of this.game.platforms) {
            // 檢查是否站在平台上
            if (this.velocityY >= 0 &&
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width &&
                this.y + this.height >= platform.y &&
                this.y + this.height <= platform.y + this.velocityY + 5) {
                
                this.y = platform.y - this.height;
                this.velocityY = 0;
                this.isJumping = false;
                onPlatform = true;
            }
            
            // 檢查頭部碰撞
            if (this.velocityY < 0 &&
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width &&
                this.y <= platform.y + platform.height &&
                this.y >= platform.y + platform.height + this.velocityY) {
                
                this.y = platform.y + platform.height;
                this.velocityY = 0;
            }
            
            // 檢查左側碰撞
            if (this.velocityX < 0 &&
                this.y + this.height > platform.y &&
                this.y < platform.y + platform.height &&
                this.x <= platform.x + platform.width &&
                this.x >= platform.x + platform.width + this.velocityX) {
                
                this.x = platform.x + platform.width;
                this.velocityX = 0;
            }
            
            // 檢查右側碰撞
            if (this.velocityX > 0 &&
                this.y + this.height > platform.y &&
                this.y < platform.y + platform.height &&
                this.x + this.width >= platform.x &&
                this.x + this.width <= platform.x + this.velocityX) {
                
                this.x = platform.x - this.width;
                this.velocityX = 0;
            }
        }
        
        // 如果不在任何平台上且不在跳躍中，則設置為跳躍狀態
        if (!onPlatform && this.velocityY === 0) {
            this.isJumping = true;
        }
    }
    
    checkBoundaries() {
        // 左右邊界
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.game.width) {
            this.x = this.game.width - this.width;
        }
        
        // 底部邊界（掉落檢測）
        if (this.y > this.game.height) {
            this.game.gameOver = true;
            // if (this.game.sounds.hurt) this.game.sounds.hurt.play();
            document.getElementById('gameOverScreen').classList.remove('hidden');
            document.getElementById('finalScore').textContent = this.game.score;
        }
    }
    
    render() {
        this.game.ctx.fillStyle = '#3498db';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // 繪製眼睛（簡單的角色細節）
        this.game.ctx.fillStyle = '#FFFFFF';
        this.game.ctx.fillRect(this.x + 7, this.y + 10, 5, 5);
        this.game.ctx.fillRect(this.x + 18, this.y + 10, 5, 5);
    }
}