class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super('preloadScene');
    }

    preload() {
  
        this.load.image("intro","assets/intro.png");
      }

    create () {
       // Add image and detect spacebar keypress
      this.add.image(0, 0, 'intro').setOrigin(0, 0);

        //this.input.once('pointerdown', function(){
        let spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, go to storylineScene");
        this.scene.start("storylineScene");
        }, this );

    }

}
