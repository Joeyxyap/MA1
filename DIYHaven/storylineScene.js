class storylineScene extends Phaser.Scene {

    constructor ()
    {
        super('storylineScene');
    }

    preload() {
  
        this.load.image("storyline","assets/storyline.png");
      }

    create () {
       // Add image and detect spacebar keypress
      this.add.image(0, 0, 'storyline').setOrigin(0, 0);

        //this.input.once('pointerdown', function(){
        let spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, go to instructionScene");
        this.scene.start("instructionScene");
        }, this );

    }

}
