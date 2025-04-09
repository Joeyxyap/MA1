class room1 extends Phaser.Scene {

  constructor() {
      super({ key: 'room1' });
      
      // Put global variable here
  }
//Hardwareshop

  init(data) {
      this.player = data.player
      this.inventory = data.inventory
  }

  preload() {
// Step 1, load JSON
this.load.tilemapTiledJSON("hardwareshop", "assets/hardwareshop.tmj")


// Step 2 : Preload any images here

//main characters
this.load.spritesheet('mrdiy', 'assets/mrdiy.png', { frameWidth:64, frameHeight:64 }); 

//collectables items
this.load.spritesheet('axe', 'assets/axe_spritesheet.png',{ frameWidth:180, frameHeight:402}); 

//enemy
// this.load.spritesheet('bucket', 'assets/bucketspritesheet.png',{ frameWidth:383, frameHeight:387}); 

//tileset
this.load.image("grocer", "assets/16_Grocery_store_32x32.png");
this.load.image("gym", "assets/8_Gym_32x32.png");
this.load.image("pipoya", "assets/pipoya.png");
this.load.image("builder", "assets/Room_Builder_32x32.png");
  }

  create() {
      console.log('*** room1 scene');

      //Step 3 - Create the map from main
  let map = this.make.tilemap({ key: "hardwareshop" });

  // Step 4 Load the game tiles
  // 1st parameter is name in Tiled,
  // 2nd parameter is key in Preload
  let grocerTiles = map.addTilesetImage("16_Grocery_store_32x32", "grocer");
  let gymTiles = map.addTilesetImage("8_Gym_32x32", "gym");
  let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya");
  let builderTiles = map.addTilesetImage("Room_Builder_32x32", "builder");
  
// Step 5  create an array of tiles
let tilesArray = [grocerTiles, gymTiles, pipoyaTiles, builderTiles];

// Step 6  Load in layers by layers
this.GroundBase = map.createLayer("GroundBase",tilesArray,0,0);
this.Ground = map.createLayer("Ground",tilesArray,0,0);
this.Wall = map.createLayer("Wall",tilesArray,0,0);
this.ObjectTop = map.createLayer("ObjectTop",tilesArray,0,0);

// //object layer
let start = map.findObject("ObjectLayer", obj => obj.name === "start"); 
let axe1 = map.findObject("ObjectLayer", obj => obj.name === "axe1"); 
// let enemy = map.findObject("objectLayer", (obj) => obj.name === "enemy")

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
  key:'axeAnim',
  frames:this.anims.generateFrameNumbers('axe',
    { start:0, end:3 }),
    frameRate:4,
    repeat:-1
});

this.anims.create({
key:'bucketAnim',
frames:this.anims.generateFrameNumbers('bucket',
  { start:0, end:3 }),
  frameRate:4,
  repeat:-1

})

// Add main player here with physics.add.sprite
this.player = this.physics.add.sprite(start.x, start.y, 'mrdiy');
window.player = this.player;

// adjust the width & height
this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.4)

this.axe1 = this.physics.add.sprite(axe1.x, axe1.y, 'axe').setScale(0.1).play('axeAnim')
// this.enemy1 = this.physics.add.sprite(enemy.x, enemy.y, "enemy").setScale(0.1).play('bucketAnim')

     // Add time event / movement here

  // get the tileIndex number in json, +1
  //mapLayer.setTileIndexCallback(11, this.room1, this);

  // Add custom properties in Tiled called "mouintain" as bool


  // What will collider witg what layers
  this.physics.add.collider(this.player,this.border);

//Enable Layer Collisions#
this.Ground.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.Ground)

this.Wall.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.Wall)

this.ObjectTop.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.ObjectTop)

  // create the arrow keys
  this.cursors = this.input.keyboard.createCursorKeys();

  // camera follow player
  this.cameras.main.startFollow(this.player);

  // collect item
  this.physics.add.overlap(this.player, this.axe1, this.CollectAxe, null, this);
  // this.physics.add.overlap(this.player,this.enemy,this.hitEnemy,null,this);



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
          this.player.x > 423 &&
          this.player.x < 510 &&
          this.player.y > 892 &&
          this.player.y < 908
        ) {
          console.log("world")
          this.world();
        }
  }


world(player, tile) {
  console.log("world function");
  let playerPos={}
    playerPos.x=293
    playerPos.y=926
    playerPos.facing="down"
    this.scene.start("world",  { playerPos: playerPos })
  // this.scene.start("world");
}

CollectAxe(player, axe1){
console.log("Player collect axe");

// disable axe
axe1.disableBody (true, true);
}

}
