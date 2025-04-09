class instructionScene extends Phaser.Scene {

  constructor ()
  {
      super('instructionScene');
  }
  preload() {

      this.load.image("instruction","assets/instruction.png");
    }
  create ()
  {
     // Add image and detect spacebar keypress
     this.add.image(0, 0, 'instruction').setOrigin(0, 0);

//this.input.once('pointerdown', function(){
  let spaceDown = this.input.keyboard.addKey('SPACE');

      
      spaceDown.on('down', function(){
          console.log("Spacebar pressed, go to infoScene1");
          this.scene.start("infoScene1");
          }, this );

      

  }
}
