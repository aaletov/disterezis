import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0x87ceeb, // Light blue background
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // No gravity for now
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

let player; // The basket or paddle
let items; // Group of falling items
let cursors; // Keyboard input
let score = 0; // Player's score
let scoreText;

function preload() {
  // Load any assets here
  this.load.image('basket', '/assets/rot.png');
  this.load.image('item', '/assets/hui.png');
}

function create() {
  // Add player (basket)
  player = this.physics.add.sprite(400, 550, 'basket').setImmovable();
  player.body.setCollideWorldBounds(true);

  // Add falling items group
  items = this.physics.add.group();

  // Create score text
  scoreText = this.add.text(10, 10, 'Score: 0', {
    fontSize: '20px',
    fill: '#000',
  });

  // Spawn items every 1 second
  this.time.addEvent({
    delay: 1000,
    loop: true,
    callback: () => {
      const x = Phaser.Math.Between(50, 750); // Random x position
      const item = items.create(x, 0, 'item');
      item.setVelocity(0, 200); // Set falling speed
      item.setCollideWorldBounds(true);
      item.setBounce(1);
    },
  });

  // Enable collision detection between player and items
  this.physics.add.collider(player, items, catchItem, null, this);

  // Set up cursor keys for movement
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Player movement
  if (cursors.left.isDown) {
    player.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    player.setVelocityX(300);
  } else {
    player.setVelocityX(0);
  }

  // Remove items that fall off the screen
  items.children.iterate((item) => {
    if (item.y > 600) {
      item.destroy();
      // Optional: Deduct points for missed items
    }
  });
}

function catchItem(player, item) {
  item.destroy(); // Remove the caught item
  score += 10; // Increment score
  scoreText.setText(`Score: ${score}`); // Update score text
}
