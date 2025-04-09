class infoScene4 extends Phaser.Scene {

  constructor ()
  {
      super('infoScene4');
  }
  preload() {

      this.load.image("info4","assets/info4.png");
    }
  create ()
  {
     // Add image and detect spacebar keypress
     this.add.image(0, 0, 'info4').setOrigin(0, 0);

//this.input.once('pointerdown', function(){
  let spaceDown = this.input.keyboard.addKey('SPACE');

      
      spaceDown.on('down', function(){
          console.log("Spacebar pressed, go to world");
          this.scene.start("world");
          }, this );

          let playerPos = {}
          playerPos.x = 397
          playerPos.y = 550
          this.scene.start("world",  { playerPos: playerPos })

  }
}
