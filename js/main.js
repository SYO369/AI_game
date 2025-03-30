document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const startScreen = document.getElementById('startScreen');
    const levelCompleteScreen = document.getElementById('levelCompleteScreen');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const startBtn = document.getElementById('startBtn');
    const nextLevelBtn = document.getElementById('nextLevelBtn');
    const restartBtn = document.getElementById('restartBtn');
    
    // 設置畫布尺寸
    canvas.width = 800;
    canvas.height = 600;
    
    // 創建遊戲實例
    const game = new Game(canvas);
    
    // 事件監聽器
    startBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        game.start();
    });
    
    nextLevelBtn.addEventListener('click', () => {
        game.nextLevel();
    });
    
    restartBtn.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        game.restart();
    });
    
    // 檢測設備類型，顯示/隱藏虛擬按鈕
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const mobileControls = document.getElementById('mobileControls');
    
    if (isMobile) {
        mobileControls.style.display = 'flex';
    } else {
        mobileControls.style.display = 'none';
    }
    
    // 響應式調整
    window.addEventListener('resize', () => {
        // 可以在這裡添加響應式邏輯
    });
});