import Phaser from "phaser";
import map from "../assets/map.jpg";
import cristales from "../assets/cristals.png";
import imageEnemy from "../assets/wizard.png";
import characterImage from "../assets/player side.png";
import projectile from "../assets/wizard1.png";

function GameWindow({
  socket,
  enemiesData,
  id,
  allIds,
  setIsGameOver,
  isGameOver,
}) {
  const config = {
    type: Phaser.Auto,
    parent: "phaserContainer",
    width: 1920,
    height: 1080,
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  let goal;
  let goalHealthBar;
  let player1;
  let player2;
  let cursors;
  let projectile1;
  let projectile2;
  let player1Shooting = false;
  let player2Shooting = false;
  let enemy;
  let enemiesLeft;
  let enemiesRight;
  // let enemyLevel1 = enemiesData[0];
  const lanesY = [160, 344, 540, 736, 920];
  let enemiesCounterLeft = 10;
  let enemiesCounterRight = 10;
  let gameOver = false;

  const game = new Phaser.Game(config);

  function preload() {
    this.load.image("map", map);
    this.load.image("goal", cristales);
    this.load.image("character", characterImage);
    this.load.image("projectile", projectile);
    this.load.image("imageEnemy", imageEnemy);

    //coins counter
    //towers
    //scoreboard
    //timer
  }

  function create() {
    this.add.image(0, 0, "map").setOrigin(0, 0);
    goal = this.physics.add.staticImage(920, 540, "goal");

    player1 = this.physics.add
      .sprite(700, 500, "character")
      .setScale(0.3)
      .setFlip(true, false);
    player2 = this.physics.add.sprite(1150, 500, "character").setScale(0.3);

    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    const color1 = new Phaser.Display.Color(150, 0, 0);
    goalHealthBar = this.add.rectangle(920, 50, 300, 50, color1.color);

    // goal.setInteractive().on("pointerover", () => {
    //   decreaseGoalHealth();
    // });

    // enemy1.setInteractive().on("pointerover", () => {
    //   decreaseEnemyHealth(tempAtackDmg, tempEnemy1Health, enemy1);
    // });

    //on hit decreaseGoalHealth
    //make enemy go back to start
    //reset stats

    enemiesLeft = this.physics.add.group({
      setXY: { x: -100, y: -100 },
      repeat: 9,
      visible: true,
      key: "imageEnemy",
    });
    enemiesLeft.scaleXY(-0.7);

    enemiesLeft.children.iterate(function (child) {
      child.side = "left";
    });

    enemiesRight = this.physics.add.group({
      setXY: { x: -100, y: 2100 },
      repeat: 9,
      visible: true,
      key: "imageEnemy",
    });
    enemiesRight.scaleXY(-0.7);

    enemiesRight.children.iterate(function (child) {
      child.side = "right";
    });

    socket.emit("enemiesCreated");

    this.physics.add.collider(
      [enemiesLeft, enemiesRight],
      goal,
      decreaseGoalHealth,
      null,
      this
    );

    projectile1 = this.physics.add.group({
      setXY: { x: 960, y: 540 },
      repeat: 4,
      visible: false,
      key: "projectile",
    });
    projectile1.scaleXY(-0.75);
    projectile1.children.iterate(function (child) {
      child.setCollideWorldBounds(true);
      child.body.onWorldBounds = true;

      child.body.world.on(
        "worldbounds",
        function (body) {
          if (body.gameObject === this) {
            this.setVisible(false);
            this.setX(960);
            this.setY(540);
            this.body.velocity.set(0, 0);
          }
        },
        child
      );
    });

    projectile2 = this.physics.add.group({
      setXY: { x: 960, y: 540 },
      repeat: 4,
      visible: false,
      key: "projectile",
    });
    projectile2.scaleXY(-0.75);
    projectile2.children.iterate(function (child) {
      child.setCollideWorldBounds(true);
      child.body.onWorldBounds = true;

      child.body.world.on(
        "worldbounds",
        function (body) {
          if (body.gameObject === this) {
            this.setVisible(false);
            this.setX(960);
            this.setY(540);
            this.body.velocity.set(0, 0);
          }
        },
        child
      );
    });

    this.physics.add.collider(
      enemiesLeft,
      projectile1,
      decreaseEnemyHealth,
      null,
      this
    );

    this.physics.add.collider(
      enemiesRight,
      projectile2,
      decreaseEnemyHealth,
      null,
      this
    );

    this.gameOverRectangle = this.add.rectangle(960, 540, 1920, 1080, 0xffffff);
    this.gameOverRectangle.setOrigin(0.5);
    this.gameOverRectangle.visible = false;

    this.gameOverText = this.add.text(920, 540, "Game over", {
      fontSize: "90px",
      fill: "#000",
    });
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.visible = false;

    this.newGameText = this.add.text(
      920,
      600,
      "click anywhere to start a new game",
      { fontSize: "50px", fill: "#000" }
    );
    this.newGameText.setOrigin(0.5);
    this.newGameText.visible = false;
  }

  function update() {
    if (gameOver) {
      return;
    }
    if (cursors.up.isDown) {
      if (id === allIds[0]) {
        player1.setVelocityY(-160);
        player1.setAngle(90);
        socket.emit("updatePlayerOnePosition", player1.y, "up");
      } else {
        player2.setVelocityY(-160);
        player2.setAngle(-90);
        socket.emit("updatePlayerTwoPosition", player2.y, "up");
      }
    } else if (cursors.down.isDown) {
      if (id === allIds[0]) {
        player1.setVelocityY(160);
        player1.setAngle(-90);
        socket.emit("updatePlayerOnePosition", player1.y, "down");
      } else {
        player2.setVelocityY(160);
        player2.setAngle(90);
        socket.emit("updatePlayerTwoPosition", player2.y, "down");
      }
    } else {
      if (id === allIds[0]) {
        player1.setVelocityY(0);
        player1.setAngle(0);
        socket.emit("updatePlayerOnePosition", player1.y, "default");
      } else {
        player2.setVelocityY(0);
        player2.setAngle(0);
        socket.emit("updatePlayerTwoPosition", player2.y, "default");
      }
    }

    if (cursors.space.isDown) {
      if (id === allIds[0] && !player1Shooting) {
        socket.emit("player1shot");
        player1Shooting = true;
      } else if (id === allIds[1] && !player2Shooting) {
        socket.emit("player2shot");
        player2Shooting = true;
      }
    } else {
      if (id === allIds[0]) {
        player1Shooting = false;
      } else {
        player2Shooting = false;
      }
    }

    if (enemiesCounterLeft === 0 && enemiesCounterRight === 0) {
      socket.emit("generateNewEnemies");
      socket.emit("enemiesCreated");
      enemiesCounterLeft = 10;
      enemiesCounterRight = 10;
    }
    // console.log
    //update enemy to go back to group && reset stats
  }

  socket.on("updatePlayerTwoPosition", (location, direction) => {
    player2.y = location.y;
    if (direction === "up") {
      player2.setAngle(-90);
    } else if (direction === "down") {
      player2.setAngle(90);
    } else {
      player2.setAngle(0);
    }
  });

  socket.on("updatePlayerOnePosition", (location, direction) => {
    player1.y = location.y;
    if (direction === "up") {
      player1.setAngle(90);
    } else if (direction === "down") {
      player1.setAngle(-90);
    } else {
      player1.setAngle(0);
    }
  });

  socket.on("player1shot", () => {
    const bullets = projectile1.children.entries;
    for (let i = 0; i < bullets.length; i++) {
      if (!bullets[i].visible) {
        bullets[i].visible = true;
        bullets[i].x = player1.x;
        bullets[i].y = player1.y;
        bullets[i].body.velocity.set(-160, 0);
        break;
      }
    }
  });

  socket.on("player2shot", () => {
    const bullets = projectile2.children.entries;
    for (let i = 0; i < bullets.length; i++) {
      if (!bullets[i].visible) {
        bullets[i].visible = true;
        bullets[i].x = player2.x;
        bullets[i].y = player2.y;
        bullets[i].body.velocity.set(160, 0);
        break;
      }
    }
  });

  socket.on("enemyPositionLeft", (xArray, yArray) => {
    const enemies = enemiesLeft.children.entries;
    for (let i = 0; i < 10; i++) {
      enemies[i].x = xArray[i];
      enemies[i].y = lanesY[yArray[i]];

      enemies[i].body.velocity.set(160, 0);

      enemies[i].enableBody(null, null, null, true, true);
    }
  });

  socket.on("enemyPositionRight", (xArray, yArray) => {
    const enemies = enemiesRight.children.entries;
    for (let i = 0; i < 10; i++) {
      enemies[i].x = xArray[i];
      enemies[i].y = lanesY[yArray[i]];

      enemies[i].body.velocity.set(-160, 0);
      enemies[i].enableBody(null, null, null, true, true);
    }
  });

  socket.on("gameOver", () => {
    setIsGameOver(true);
  });

  function decreaseEnemyHealth(enemy, bullet) {
    enemy.disableBody(true, true);

    bullet.setVisible(false);
    bullet.setX(960);
    bullet.setY(540);
    bullet.body.velocity.set(0, 0);

    if (enemy.side === "left") {
      enemiesCounterLeft--;
    } else {
      enemiesCounterRight--;
    }
  }

  function decreaseGoalHealth(objective, enemy) {
    if (goalHealthBar.width > 0) {
      goal.setTint(0xff0000);
      goalHealthBar.width -= 10;
      setTimeout(() => {
        goal.setTint();
      }, 250);
    } else {
      this.physics.pause();
      gameOver = true;
      this.gameOverRectangle.visible = true;
      this.gameOverText.visible = true;
      this.newGameText.visible = true;
      socket.disconnect();
      this.input.on("pointerdown", () => {
        window.location.reload();
      });
    }

    if (enemy.side === "left") {
      enemiesCounterLeft--;
    } else {
      enemiesCounterRight--;
    }

    enemy.disableBody(true, true);
    // enemy.body.stop();
    // send back to group
  }

  return <div id="phaserContainer"></div>;
}
export default GameWindow;
