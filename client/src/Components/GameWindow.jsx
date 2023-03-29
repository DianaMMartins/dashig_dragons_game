import Phaser from "phaser";
import map from "../assets/map.jpg";
import cristales from "../assets/cristales.png"

function GameWindow() {
  const config = {
    type: Phaser.Auto,
    parent: "phaserContainer",
    width: 1920,
    heigh: 1080,
    physics:{
      default:"arcade",
      arcade:{
        debug:true
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  let goal
  let goals
  let goalHealthBar
  const game = new Phaser.Game(config);

  function preload() {
    this.load.image("map", map);
    this.load.image("goal",cristales)
    //coins counter
    //goal
    //enemies
    //player
    //towers
    //scoreboard
    //timer
  }

  function create() {
    goals=this.physics.add.staticGroup();

    this.add.image(0, 0, "map").setOrigin(0, 0);
    goals.create(920,84,"goal").setScale(0.35).refreshBody()
    goals.create(920,184,"goal").setScale(0.4).refreshBody()





    // this.add.image(920,84,"goal").setScale(0.35)
    // this.add.image(920,184,"goal").setScale(0.4)
    // this.add.image(920,284,"goal").setScale(0.45)
    goal=this.physics.add.staticImage(920,384,"goal").setScale(0.5)
    // this.add.image(920,485,"goal").setScale(0.45)
    // this.add.image(920,585,"goal").setScale(0.4)
    // this.add.image(920,685,"goal").setScale(0.35)
    goal.body.setSize(200,768,0,0)
    goal.body.y=0
    goal.body.x=820

    const color1 = new Phaser.Display.Color(150, 0, 0);
    goalHealthBar = this.add.rectangle(920, 50, 300, 50, color1.color);

    goal.setInteractive().on("pointerover",()=>{decreaseGoalHealth()})
  }

  function update() {

  }

  function decreaseGoalHealth(){
    if(goalHealthBar.width>0){
      goal.setTint(0xff0000)
    goalHealthBar.width-=100;
    setTimeout(()=>{goal.setTint()},250)
    }
  }

  return <div id="phaserContainer"></div>;
}

export default GameWindow;
