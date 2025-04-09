class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super('preloadScene');
    }

    preload() {
  
        this.load.image("intro","assets/intro.png");

        this.load.audio('bgMusic', 'assets/bgmusic.mp3')
      }

    create () {
       // Add image and detect spacebar keypress
      this.add.image(0, 0, 'intro').setOrigin(0, 0);

      window.mainmusic - this.sound.add("bgMusic").setVolume(0.2).setLoop(true).play()

        //this.input.once('pointerdown', function(){
        let spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, go to storylineScene");
        this.scene.start("storylineScene");
        }, this );

       
        

    }

}
