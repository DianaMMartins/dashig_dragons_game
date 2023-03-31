import Phaser from "phaser";
import map from "../assets/map.jpg";
import cristales from "../assets/cristals.png";
import imageEnemy from "../assets/wizard.png";

function GameWindow({ socket, enemiesData }) {
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
  // let enemy1;
  let tempEnemy1Health = 5;
  // let tempAtackDmg = 1;
  // let enemiesGroup = [];

  let enemiesGroup = enemiesData;

  let enemyLevel1 = enemiesData[0];
  const lanesY = [135, 270, 405, 540, 675]
  let enemyImg;

  const game = new Phaser.Game(config);

  function preload() {
    this.load.image("map", map);
    this.load.image("goal", cristales);
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
      const enemyYPosition = lanesY[Math.floor(Math.random()*lanesY.length)]
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

    this.physics.add.collider(enemiesLeft, goal, decreaseGoalHealth, null, this);
   
    const enemiesRight = this.add.group();
    for (let i = 0; i < 10; i++) {
      const enemyYPosition = lanesY[Math.floor(Math.random()*lanesY.length)]
      let enemy = this.physics.add.sprite(0, enemyYPosition, "imageEnemy")
      enemy.scale = 0.2;
      enemy.flipX=true;
      const enemyGo = Math.abs(enemyPlay()) + 1920;

      enemy.x = enemyGo;
      this.physics.moveToObject(
        enemy,
        { x: goal.x, y: enemy.y },
        enemyLevel1.walkSpeed
        );
        enemiesRight.add(enemy);
     }

    this.physics.add.collider(enemiesRight, goal, decreaseGoalHealth, null, this);
  }

  function enemyPlay() {
    let enemyCall = - (Math.floor(Math.floor(Math.random() * 1080) / 100) * 180);
    return enemyCall;
  }

  function update() {
    //update enemy to go back to group && reset stats
  }

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
