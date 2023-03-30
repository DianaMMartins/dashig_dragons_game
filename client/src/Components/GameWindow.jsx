import Phaser from "phaser";
import map from "../assets/map.jpg";
import cristales from "../assets/cristals.png";
import imageEnemy from "../assets/wizard.png"
import pathOne from "../assets/"

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
  let enemy;
  //get enemy objs from db
  const enemies = [];

  const game = new Phaser.Game(config);

  function preload() {
    this.load.image("map", map);
    this.load.image("goal", cristales);
    this.load.image("imageEnemy", imageEnemy);
    //coins counter
    //goal
    //enemies
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

    enemies = this.physics.add.group();
    this.physics.add.collider(enemies, goal, hitGoal)

    function hitGoal(goal, enemies) {
      //causes damage to goal when enemy collider reaches goal collider
    }
  }

  function update() {}

  function decreaseGoalHealth() {
    if (goalHealthBar.width > 0) {
      goal.setTint(0xff0000);
      goalHealthBar.width -= 100;
      setTimeout(() => {
        goal.setTint();
      }, 250);
    }
  }

  return <div id="phaserContainer"></div>;
}

export default GameWindow;
