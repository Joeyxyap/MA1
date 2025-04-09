class infoScene2 extends Phaser.Scene {

  constructor ()
  {
      super('infoScene2');
  }
  preload() {

      this.load.image("info2","assets/info2.png");
    }
  create ()
  {
     // Add image and detect spacebar keypress
     this.add.image(0, 0, 'info2').setOrigin(0, 0);

//this.input.once('pointerdown', function(){
  let spaceDown = this.input.keyboard.addKey('SPACE');

      
      spaceDown.on('down', function(){
          console.log("Spacebar pressed, go to infoScene3");
          this.scene.start("infoScene3");
          }, this );

      

  }
}
