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
            console.log("Spacebar pressed, go to world");
            this.scene.start("world");
            }, this );

        //     let aDown = this.input.keyboard.addKey('A');
        //     let rDown = this.input.keyboard.addKey('R');
        //     let eDown = this.input.keyboard.addKey('E');

        // rDown.on('down', function(){
        // console.log("R pressed (reload game)");
        //     this.scene.start("gameScene");
        // }, this );

        // aDown.on('down', function(){
        //     console.log("A pressed (main menu)");
        //     this.scene.start("preloadScene");
        //     }, this );

        //     eDown.on('down', function(){
        //         console.log("E pressed (main menu)");
        //         this.scene.start("gameoverScene");
        //         }, this );

    }
}
