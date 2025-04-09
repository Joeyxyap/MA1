class room3 extends Phaser.Scene {

  constructor() {
      super({ key: 'room3' });
      
      // Put global variable here
  }


  init(data) {
      this.player = data.player
      this.inventory = data.inventory
  }

  preload() {
// Step 1, load JSON
this.load.tilemapTiledJSON("Workshop", "assets/Workshop2.tmj")


// Step 2 : Preload any images here

//main characters
this.load.spritesheet('mrdiy', 'assets/mrdiy.png', { frameWidth:64, frameHeight:64 }); 
this.load.spritesheet('npc', 'assets/msnancy.png', { frameWidth:64, frameHeight:64 }); 

//Tileset
this.load.image("pipoya", "assets/pipoya.png");
this.load.image("builder", "assets/Room_Builder_32x32.png");
this.load.image("grocer", "assets/16_Grocery_store_32x32.png");
  }

  create() {
      console.log('*** room3 scene');

      //Step 3 - Create the map from main
  let map = this.make.tilemap({ key: "Workshop" });

  // Step 4 Load the game tiles
  // 1st parameter is name in Tiled,
  // 2nd parameter is key in Preload
  let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya");
  let builderTiles = map.addTilesetImage("Room_Builder_32x32", "builder");
  let grocerTiles = map.addTilesetImage("16_Grocery_store_32x32", "grocer");
  
// Step 5  create an array of tiles
let tilesArray = [ pipoyaTiles, builderTiles, grocerTiles];

// Step 6  Load in layers by layers
this.Ground = map.createLayer("Ground",tilesArray,0,0);
this.Border = map.createLayer("Border",tilesArray,0,0);
this.ObjectTop = map.createLayer("ObjectTop",tilesArray,0,0);
this.Object = map.createLayer("Object",tilesArray,0,0);


//  // //object layer
let start = map.findObject("Objectlayer", obj => obj.name === "start"); 

//  this.sign = map.findObject("objectLayer", (obj) => obj.name === "sign");

//Complete the game
// this.popUp1Area = new Phaser.Geom.Rectangle(
//   this.sign.x,
//   this.sign.y,
//   this.sign.width,
//   this.sign.height
// );

// this.dialogText = this.add
// .text(this.sign.x, this.sign.y, "Press SpaceBar complete the game", { font: "16px Arial Black", fill: "#ff00ff", stroke: '#000000', strokeThickness: 4 })
// .setOrigin(0.5)  // Center the text
// .setDepth(100)   // Make sure it's above other elements
// .setVisible(false); // Hide it initially





      // player animations, turning, walking left and walking right.
  this.anims.create({
      key:'up',
      frames:this.anims.generateFrameNumbers('mrdiy',
      { start:105, end:112 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
      key:'left',
      frames:this.anims.generateFrameNumbers('mrdiy',
      { start:118, end:125 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
      key:'down',
      frames:this.anims.generateFrameNumbers('mrdiy',
      { start:131, end:138 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
      key:'right',
      frames:this.anims.generateFrameNumbers('mrdiy',
      { start:144, end:151 }),
      frameRate:5,
      repeat:-1
  });

 



// Add main player here with physics.add.sprite
this.player = this.physics.add.sprite(start.x, start.y, 'mrdiy');
window.player = this.player;


// adjust the width & height
this.player.body.setSize(this.player.width * 0.2, this.player.height * 0.3)
this.player.setCollideWorldBounds(true)

  // // What will collider with what layers
  //Enable Layer Collisions#
  this.Border.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.Border)

  this.Object.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.Object)

  this.ObjectTop.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.ObjectTop)

  // create the arrow keys
  this.cursors = this.input.keyboard.createCursorKeys();

   // camera follow player
this.cameras.main.startFollow(this.player);
// Prevent black area of edge of the map
this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

//this.input.once('pointerdown', function(){
  let spaceDown = this.input.keyboard.addKey('SPACE');
  
  spaceDown.on('down', function(){
      console.log("Spacebar pressed, go to winningScene");
      this.scene.start("winningScene");
      }, this );

} /////////////////// end of create //////////////////////////////

  update() {
      if (this.cursors.left.isDown) {
          this.player.body.setVelocityX(-200);
          this.player.anims.play("left", true); // walk left
        } else if (this.cursors.right.isDown) {
          this.player.body.setVelocityX(200);
          this.player.anims.play("right", true);
        } else if (this.cursors.up.isDown) {
          this.player.body.setVelocityY(-200);
          this.player.anims.play("up", true);
          //console.log('up');
        } else if (this.cursors.down.isDown) {
          this.player.body.setVelocityY(200);
          this.player.anims.play("down", true);
          //console.log('down');
        } else {
          this.player.anims.stop();
          this.player.body.setVelocity(0, 0);
        }


  }

}
