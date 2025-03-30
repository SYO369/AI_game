const levels = [
    // 第一關 - 簡單介紹
    {
        playerStart: { x: 50, y: 300 },
        platforms: [
            { x: 0, y: 500, width: 800, height: 100 },  // 地面
            { x: 200, y: 400, width: 100, height: 20 },
            { x: 350, y: 350, width: 100, height: 20 },
            { x: 500, y: 300, width: 100, height: 20 }
        ],
        coins: [
            { x: 220, y: 370, width: 20, height: 20 },
            { x: 380, y: 320, width: 20, height: 20 },
            { x: 530, y: 270, width: 20, height: 20 }
        ],
        enemies: [
            { x: 300, y: 480, width: 30, height: 20, speedX: 1, range: 100 }
        ],
        goal: { x: 700, y: 450, width: 50, height: 50 }
    },
    
    // 第二關 - 增加難度
    {
        playerStart: { x: 50, y: 300 },
        platforms: [
            { x: 0, y: 500, width: 300, height: 100 },  // 左側地面
            { x: 500, y: 500, width: 300, height: 100 }, // 右側地面
            { x: 150, y: 400, width: 80, height: 20 },
            { x: 300, y: 350, width: 80, height: 20 },
            { x: 450, y: 400, width: 80, height: 20 },
            { x: 600, y: 350, width: 80, height: 20 }
        ],
        coins: [
            { x: 170, y: 370, width: 20, height: 20 },
            { x: 320, y: 320, width: 20, height: 20 },
            { x: 470, y: 370, width: 20, height: 20 },
            { x: 620, y: 320, width: 20, height: 20 }
        ],
        enemies: [
            { x: 100, y: 480, width: 30, height: 20, speedX: 1.5, range: 150 },
            { x: 600, y: 480, width: 30, height: 20, speedX: 1.5, range: 150 }
        ],
        goal: { x: 700, y: 450, width: 50, height: 50 }
    },
    
    // 第三關 - 更複雜的地形
    {
        playerStart: { x: 50, y: 200 },
        platforms: [
            { x: 0, y: 500, width: 800, height: 100 },  // 地面
            { x: 120, y: 400, width: 60, height: 20 },
            { x: 240, y: 350, width: 60, height: 20 },
            { x: 360, y: 300, width: 60, height: 20 },
            { x: 480, y: 250, width: 60, height: 20 },
            { x: 600, y: 300, width: 60, height: 20 },
            { x: 720, y: 350, width: 60, height: 20 },
            // 移動平台可以在遊戲邏輯中實現
        ],
        coins: [
            { x: 130, y: 370, width: 20, height: 20 },
            { x: 250, y: 320, width: 20, height: 20 },
            { x: 370, y: 270, width: 20, height: 20 },
            { x: 490, y: 220, width: 20, height: 20 },
            { x: 610, y: 270, width: 20, height: 20 },
            { x: 730, y: 320, width: 20, height: 20 }
        ],
        enemies: [
            { x: 200, y: 480, width: 30, height: 20, speedX: 2, range: 200 },
            { x: 500, y: 480, width: 30, height: 20, speedX: 2, range: 200 },
            { x: 400, y: 280, width: 30, height: 20, speedX: 1, range: 50 }
        ],
        goal: { x: 720, y: 300, width: 50, height: 50 }
    }
];

// 為敵人添加移動邏輯
levels.forEach(level => {
    level.enemies.forEach(enemy => {
        enemy.startX = enemy.x;
        enemy.direction = 1;
        
        // 添加更新方法
        enemy.update = function() {
            this.x += this.speedX * this.direction;
            
            // 檢查是否達到移動範圍邊界
            if (this.x > this.startX + this.range || this.x < this.startX - this.range) {
                this.direction *= -1;
            }
        };
    });
});