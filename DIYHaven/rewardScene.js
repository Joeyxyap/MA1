class rewardScene extends Phaser.Scene {

  constructor ()
  {
      super('rewardScene');
  }
  preload() {

      this.load.image("reward","assets/reward.png");
    
      }
    
  create ()
  {
     // Add image and detect spacebar keypress
     this.add.image(0, 0, 'reward').setOrigin(0, 0);

//this.input.once('pointerdown', function(){
  let spaceDown = this.input.keyboard.addKey('SPACE');

      
      spaceDown.on('down', function(){
          console.log("Spacebar pressed, go to preloadScene");
          this.scene.start("preloadScene");
          }, this );

          


  }
}
