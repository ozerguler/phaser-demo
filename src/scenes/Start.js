export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }
init() {
    this.score = 0;
    this.timeLeft = 5;
    this.gameOver = false;

    this.highScore = localStorage.getItem('highScore')
        ? parseInt(localStorage.getItem('highScore'))
        : 0;
}
    preload() {
        this.load.image('box', 'assets/box.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#1e1e1e');

        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '24px',
            color: '#ffffff'
        });

        this.timerText = this.add.text(20, 50, 'Time: 5', {
            fontSize: '24px',
            color: '#ffffff'
        });
        this.highScoreText = this.add.text(20, 80, 'High Score: ' + this.highScore, {
            fontSize: '20px',
            color: '#ffff00'
        });

        this.spawnBox();

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                    this.timerText.setText('Time: ' + this.timeLeft);
                } else {
                    this.endGame();
                }
            },
            loop: true
        });
    }

    spawnBox() {
        if (this.gameOver) return;

        if (this.box) {
            this.box.destroy();
        }

        const x = Phaser.Math.Between(100, 1180);
        const y = Phaser.Math.Between(100, 620);

        this.box = this.add.image(x, y, 'box');
        this.box.setInteractive({ useHandCursor: true });

        this.box.on('pointerdown', () => {
            if (this.gameOver) return;

            this.score += 1;
            this.scoreText.setText('Score: ' + this.score);
            this.spawnBox();
        });
    }

    endGame() {
        if (this.score > this.highScore) {
          this.highScore = this.score;
          localStorage.setItem('highScore', this.highScore);
        }

        this.gameOver = true;

        if (this.timerEvent) {
            this.timerEvent.remove(false);
        }

        if (this.box) {
            this.box.destroy();
        }

        this.add.text(640, 320, 'GAME OVER', {
            fontSize: '48px',
            color: '#ff4444'
        }).setOrigin(0.5);

        this.add.text(640, 380, 'Score: ' + this.score, {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        this.add.text(640, 420, 'High Score: ' + this.highScore, {
            fontSize: '26px',
            color: '#ffff00'
        }).setOrigin(0.5);

        const restart = this.add.text(640, 460, 'RESTART', {
            fontSize: '28px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        restart.on('pointerdown', () => {
            this.scene.restart();
        });
        const cta = this.add.text(640, 550, '🏆 Üye ol, rekabete başla!', {
            fontSize: '28px',
            color: '#ffffff',
            backgroundColor: '#ff6b00',
             padding: { x: 20, y: 10 }
            })
            .setOrigin(0.5)
            .setInteractive();

            cta.on('pointerdown', () => {
            console.log('CTA clicked');
            window.top.location.href = 'https://bidikadam.com/web/signup?redirect=/games';
            

            });

    }
}
