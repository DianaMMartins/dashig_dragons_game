import Phaser from "phaser";
import map from "../assets/map.jpg";
import cristales from "../assets/cristals.png";
import imageEnemy from "../assets/wizard.png";

function GameWindow() {
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
  let enemy1;
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

  function create() {
    this.add.image(0, 0, "map").setOrigin(0, 0);
    goal = this.physics.add.staticImage(920, 384, "goal");

    const color1 = new Phaser.Display.Color(150, 0, 0);
    goalHealthBar = this.add.rectangle(920, 50, 300, 50, color1.color);

    goal.setInteractive().on("pointerover", () => {
      decreaseGoalHealth();
    });

    let enemy1 = this.physics.add.image(-100, 200, "imageEnemy")
    enemy1.scale = 0.2;

    this.physics.moveToObject(enemy1, goal, 150);
    //150 is the speed from the database object (1) 1 === 100

    this.physics.add.collider(enemy1, goal, decreaseGoalHealth, null, this)
    //on hit decreaseGoalHealth
    //make enemy go back to start
    //reset stats
  }

  function update() {}

  

  function decreaseGoalHealth(enemy1) {
    if (goalHealthBar.width > 0) {
      goal.setTint(0xff0000);
      goalHealthBar.width -= 100;
      setTimeout(() => {
        goal.setTint();
      }, 250);
    }
    enemy1.body.stop()
    //send back to group
  }

  return <div id="phaserContainer"></div>;
}

export default GameWindow;
