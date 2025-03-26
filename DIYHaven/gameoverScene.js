class gameoverScene extends Phaser.Scene {

    constructor ()
    {
        super('gameoverScene');
    }

    create ()
    {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffcc33, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(300, 100, 100, 100);

        this.add.text(320, 110, 'G', { font: '96px Courier', fill: '#000000' });
        this.add.text(120, 310, 'Press 1 to preloadScene', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 350, 'Press 2 to gameScene', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 450, 'Press 3 to endScene', { font: '24px Courier', fill: '#000000' });

        let aDown = this.input.keyboard.addKey('A');
        let rDown = this.input.keyboard.addKey('R');
        
        let key1Down = this.input.keyboard.addKey(49);
        let key2Down = this.input.keyboard.addKey(50);
        let key3Down = this.input.keyboard.addKey(51);
        
        key1Down.on('down', function(){
        console.log("R pressed (reload game)");
         this.scene.start("preloadScene");
        }, this );

       
         key2Down.on('down', function(){
          console.log("A pressed (main menu)");
        this.scene.start("gameScene");
          }, this );

          key3Down.on('down', function(){
            console.log("A pressed (main menu)");
          this.scene.start("endScene");
            }, this );

    }
}
