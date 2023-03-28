import Phaser from "phaser";
import map from "../assets/map.jpg";

function GameWindow() {
  const config = {
    type: Phaser.Auto,
    parent: "phaserContainer",
    width: 1920,
    heigh: 1080,
    scene: {
      preload: preload,
      create: create,
      // update: update,
    },
  };

  const game = new Phaser.Game(config);

  function preload() {
    this.load.image("map", map);
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
  }

  // function update() {

  // }
  return <div id="phaserContainer"></div>;
}

export default GameWindow;
