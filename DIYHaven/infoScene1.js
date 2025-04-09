class infoScene1 extends Phaser.Scene {

  constructor ()
  {
      super('infoScene1');
  }
  preload() {

      this.load.image("info1","assets/info1.png");
    }
  create ()
  {
     // Add image and detect spacebar keypress
     this.add.image(0, 0, 'info1').setOrigin(0, 0);

//this.input.once('pointerdown', function(){
  let spaceDown = this.input.keyboard.addKey('SPACE');

      
      spaceDown.on('down', function(){
          console.log("Spacebar pressed, go to infoScene2");
          this.scene.start("infoScene2");
          }, this );

      

  }
}
