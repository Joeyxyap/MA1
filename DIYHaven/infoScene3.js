class infoScene3 extends Phaser.Scene {

  constructor ()
  {
      super('infoScene3');
  }
  preload() {

      this.load.image("info3","assets/info3.png");
    }
  create ()
  {
     // Add image and detect spacebar keypress
     this.add.image(0, 0, 'info3').setOrigin(0, 0);

//this.input.once('pointerdown', function(){
  let spaceDown = this.input.keyboard.addKey('SPACE');

      
      spaceDown.on('down', function(){
          console.log("Spacebar pressed, go to infoScene4");
          this.scene.start("infoScene4");
          }, this );

      

  }
}
