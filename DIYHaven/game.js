var config = {
    type: Phaser.AUTO,
    ////// pixel size * tile map size 
    width: 32 * 20,
    height: 32 * 20,
    /////////////////////////////////////////
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    //// Add all scenes below in the array
    scene: [preloadScene, storylineScene, instructionScene,infoScene1, infoScene2, infoScene3, infoScene4, world, room1, room2, room3, winningScene , rewardScene]
};

var game = new Phaser.Game(config);



