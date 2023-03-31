import Phaser from "phaser";
import map from "../assets/map.jpg";
import cristales from "../assets/cristals.png";
import imageEnemy from "../assets/wizard.png";
import characterImage from "../assets/player side.png";
import projectile from "../assets/wizard1.png";

function GameWindow({ socket, enemiesData, id, allIds }) {
  const config = {
    type: Phaser.Auto,
    parent: "phaserContainer",
    width: 1920,
    heigh: 1080,
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
  let enemyLevel1 = enemiesData[0];
  const lanesY = [135, 270, 405, 540, 675];

  const game = new Phaser.Game(config);

  function preload() {
    this.load.image("map", map);
    this.load.image("goal", cristales);
    this.load.image("character", characterImage);
    this.load.image("projectile", projectile);
    this.load.image("imageEnemy", imageEnemy);
    //coins counter
    //player
    //towers
    //scoreboard
    //timer
  }

  //
  function create() {
    this.add.image(0, 0, "map").setOrigin(0, 0);
    goal = this.physics.add.staticImage(920, 384, "goal");

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
    const enemiesLeft = this.add.group();
    for (let i = 0; i < 10; i++) {
      const enemyYPosition = lanesY[Math.floor(Math.random() * lanesY.length)];
      let enemy = this.physics.add.sprite(0, enemyYPosition, "imageEnemy");
      enemy.scale = 0.2;
      const enemyGo = enemyPlay();
      enemy.x = enemyGo;
      this.physics.moveToObject(
        enemy,
        { x: goal.x, y: enemy.y },
        enemyLevel1.walkSpeed
      );
      enemiesLeft.add(enemy);
      console.log(enemy.x);
    }

    this.physics.add.collider(
      enemiesLeft,
      goal,
      decreaseGoalHealth,
      null,
      this
    );

    const enemiesRight = this.add.group();
    for (let i = 0; i < 10; i++) {
      const enemyYPosition = lanesY[Math.floor(Math.random() * lanesY.length)];
      let enemy = this.physics.add.sprite(0, enemyYPosition, "imageEnemy");
      enemy.scale = 0.2;
      enemy.flipX = true;
      const enemyGo = Math.abs(enemyPlay()) + 1920;

      enemy.x = enemyGo;
      this.physics.moveToObject(
        enemy,
        { x: goal.x, y: enemy.y },
        enemyLevel1.walkSpeed
      );
      enemiesRight.add(enemy);
    }

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
          }
        },
        child
      );
    });

    this.physics.add.collider(
      enemiesRight,
      goal,
      decreaseGoalHealth,
      null,
      this
    );
  }

  function enemyPlay() {
    let enemyCall = -(Math.floor(Math.floor(Math.random() * 1080) / 100) * 180);
    return enemyCall;
  }

  function update() {
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

  function decreaseEnemyHealth(damageTaken, enemyHealth, enemy1) {
    // const updatedEnemyHealth = enemyHealth - damageTaken;
    // enemy1.setTint(0xff0000);
    // setTimeout(() => {
    //   enemy1.setTint();
    // }, 250);
    // if (updatedEnemyHealth <= 0) {
    //   console.log(enemy1);
    //   // enemy1.body.stop();
    //   console.log("you are dead!");
    // }
    // tempEnemy1Health = updatedEnemyHealth;
  }

  function decreaseGoalHealth(enemy1) {
    if (goalHealthBar.width > 0) {
      goal.setTint(0xff0000);
      goalHealthBar.width -= 100;
      setTimeout(() => {
        goal.setTint();
      }, 250);
    }
    enemy1.body.stop();
    // send back to group
  }

  return <div id="phaserContainer"></div>;
}
export default GameWindow;
