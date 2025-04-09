class room2 extends Phaser.Scene {

  constructor() {
      super({ key: 'room2' });
      
      // Put global variable here
  }


  init(data) {
      this.player = data.player
      this.inventory = data.inventory
  }

  preload() {
// Step 1, load JSON
this.load.tilemapTiledJSON("Fabricshop", "assets/Fabricshop.tmj")


// Step 2 : Preload any images here

//main characters
this.load.spritesheet('mrdiy', 'assets/mrdiy.png', { frameWidth:64, frameHeight:64 }); 

//collectables items
this.load.spritesheet('fabric', 'assets/fabricspritesheet.png',{ frameWidth:317, frameHeight:246}); 

//market
this.load.image("clothing", "assets/21_Clothing_Store_32x32.png");
this.load.image("pipoya", "assets/pipoya.png");
this.load.image("builder", "assets/Room_Builder_32x32.png");
  }

  create() {
      console.log('*** room2 scene');

      //Step 3 - Create the map from main
  let map = this.make.tilemap({ key: "Fabricshop" });

  // Step 4 Load the game tiles
  // 1st parameter is name in Tiled,
  // 2nd parameter is key in Preload
  let clothingTiles = map.addTilesetImage("21_Clothing_Store_32x32", "clothing");
  let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya");
  let builderTiles = map.addTilesetImage("Room_Builder_32x32", "builder");
  
// Step 5  create an array of tiles
let tilesArray = [clothingTiles, pipoyaTiles, builderTiles];

// Step 6  Load in layers by layers
this.Floor = map.createLayer("Floor",tilesArray,0,0);
this.Border = map.createLayer("Border",tilesArray,0,0);
this.Object = map.createLayer("Object",tilesArray,0,0);

// //object layer
let start = map.findObject("ObjectLayer", obj => obj.name === "start"); 
let fabric1 = map.findObject("ObjectLayer", obj => obj.name === "fabric1"); 
let fabric2 = map.findObject("ObjectLayer", obj => obj.name === "fabric2"); 

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

  //icon anims
this.anims.create({
  key:'fabricAnim',
  frames:this.anims.generateFrameNumbers('fabric',
    { start:0, end:3 }),
    frameRate:4,
    repeat:-1
});

// Add main player here with physics.add.sprite
this.player = this.physics.add.sprite(start.x, start.y, 'mrdiy');
window.player = this.player;
// this.player.setCollideWorldBounds(true)

// adjust the width & height
this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.4)

this.fabric1 = this.physics.add.sprite(fabric1.x, fabric1.y, 'fabric').setScale(0.1).play('fabricAnim')
this.fabric2 = this.physics.add.sprite(fabric2.x, fabric2.y, 'fabric').setScale(0.1).play('fabricAnim')

     // Add time event / movement here

  // get the tileIndex number in json, +1
  //mapLayer.setTileIndexCallback(11, this.room1, this);

  // Add custom properties in Tiled called "mouintain" as bool


  // What will collider with what layers
  this.physics.add.collider(this.player,this.border);

  //Enable Layer Collisions#
  this.Border.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.Border)

  this.Object.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.Object)

  // create the arrow keys
  this.cursors = this.input.keyboard.createCursorKeys();

   // camera follow player
this.cameras.main.startFollow(this.player);
// Prevent black area of edge of the map
// this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // this.scene.launch("showInventory");

  // collect item
  // this.physics.add.overlap(this.player, [this.fabric1,this.fabric2], globalCollectFabric, null, this);
  this.physics.add.overlap(this.player, this.fabric1, this.CollectFabric, null, this);
  this.physics.add.overlap(this.player, this.fabric2, this.CollectFabric, null, this);


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

        if (
          this.player.x > 454 &&
          this.player.x < 494 &&
          this.player.y > 883 &&
          this.player.y < 916
        ) {
          console.log("world")
          this.world();
      
        }
  }


 // Function to jump to world
 world(player, tile) {
  console.log("world function");
  let playerPos={}
    playerPos.x=596
    playerPos.y=926
    playerPos.facing="down"
    this.scene.start("world",  { playerPos: playerPos })
  // this.scene.start("world");
}

CollectFabric(player, fabric1){
console.log("Player collect fabric");

// disable fabric
fabric1.disableBody (true, true);
}

}
