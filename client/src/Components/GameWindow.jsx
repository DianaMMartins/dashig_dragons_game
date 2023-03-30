import Phaser from "phaser";
import map from "../assets/map.jpg";
import cristales from "../assets/cristals.png";
import characterImage from "../assets/player side.png";
import { useState } from "react";

function GameWindow({ socket, id, allIds }) {
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

  const game = new Phaser.Game(config);

  function preload() {
    this.load.image("map", map);
    this.load.image("goal", cristales);
    this.load.image("character", characterImage);
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

    player1 = this.physics.add.sprite(480, 500, "character").setScale(0.3);
    player2 = this.physics.add.sprite(1440, 500, "character").setScale(0.3);

    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);

    const color1 = new Phaser.Display.Color(150, 0, 0);
    goalHealthBar = this.add.rectangle(920, 50, 300, 50, color1.color);

    goal.setInteractive().on("pointerover", () => {
      decreaseGoalHealth();
    });

    cursors = this.input.keyboard.createCursorKeys();
  }

  function update() {
    if (cursors.up.isDown) {
      if (id === allIds[0]) {
        player1.setVelocityY(-160);
        let data = player1.y;
        socket.emit("updatePlayerOnePosition", data);
      } else {
        player2.setVelocityY(-160);
        let data = player2.y;
        socket.emit("updatePlayerTwoPosition", data);
      }
    } else {
      if (id === allIds[0]) {
        player1.setVelocityY(0);
        let data = player1.y;
        socket.emit("updatePlayerOnePosition", data);
      } else {
        player2.setVelocityY(0);
        let data = player2.y;
        socket.emit("updatePlayerTwoPosition", data);
      }
    }

    socket.on("updatePlayerOnePosition", (location) => {
      console.log(location);
      player1.y = location.y;
    });

    socket.on("updatePlayerTwoPosition", (location) => {
      console.log(location);
      player2.y = location.y;
    });
  }

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
