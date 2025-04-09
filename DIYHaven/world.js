class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos;
    this.inventory = data.inventory;
  }
  

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("mainmap", "assets/MainMaps.tmj");

    // Step 2 : Preload any images here

    //main characters
    this.load.spritesheet('mrdiy', 'assets/mrdiy.png', { frameWidth:64, frameHeight:64 }); 

    //collectables items
    this.load.spritesheet('wood', 'assets/woodspritesheet.png',{ frameWidth:546, frameHeight:328}); 

    //market
    this.load.image("terrains", "assets/1_Terrains_and_Fences_32x32.png");
    this.load.image("building", "assets/5_Floor_Modular_Buildings_32x32.png");
    this.load.image("villa", "assets/7_Villas_32x32.png");
    this.load.image("camping", "assets/11_Camping_32x32.png");
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "mainmap" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let terrainsTiles = map.addTilesetImage("1_Terrains_and_Fences_32x32", "terrains");
    let buildingTiles = map.addTilesetImage("5_Floor_Modular_Buildings_32x32", "building");
    let villaTiles = map.addTilesetImage("7_Villas_32x32", "villa");
    let campingTiles = map.addTilesetImage("11_Camping_32x32", "camping");
    

    // Step 5  create an array of tiles
    let tilesArray = [terrainsTiles, buildingTiles, villaTiles, campingTiles];

    // Step 6  Load in layers by layers
    this.GroundBase = map.createLayer("GroundBase",tilesArray,0,0);
    this.Groundside = map.createLayer("Groundside",tilesArray,0,0);

     //Collider for ground
     this.physics.world.bounds.width = this.GroundBase.width;
     this.physics.world.bounds.height = this.GroundBase.height;
    //  this.physics.world.bounds.width = this.Groundside.width;
    //  this.physics.world.bounds.height = this.Groundside.height;

    this.Ground = map.createLayer("Ground",tilesArray,0,0);
    this.Object = map.createLayer("Object",tilesArray,0,0);
    this.ObjectTop = map.createLayer("ObjectTop",tilesArray,0,0);

  // //object layer
    let start = map.findObject("objectLayer", obj => obj.name === "start"); 
    let wood1 = map.findObject("objectLayer", obj => obj.name === "wood1"); 
    let wood2 = map.findObject("objectLayer", obj => obj.name === "wood2");
    let wood3 = map.findObject("objectLayer", obj => obj.name === "wood3");
   
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
  key:'woodAnim',
  frames:this.anims.generateFrameNumbers('wood',
    { start:0, end:3 }),
    frameRate:4,
    repeat:-1
});

// Add main player here with physics.add.sprite
this.player = this.physics.add.sprite(this.playerPos.x, this.playerPos.y, "mrdiy").play("down")

window.player = this.player;
this.player.setCollideWorldBounds(true)

// adjust the width & height
this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.4)

this.wood1 = this.physics.add.sprite(wood1.x, wood1.y, 'wood').setScale(0.1).play('woodAnim')
this.wood2 = this.physics.add.sprite(wood2.x, wood2.y, 'wood').setScale(0.1).play('woodAnim')
this.wood3 = this.physics.add.sprite(wood3.x, wood3.y, 'wood').setScale(0.1).play('woodAnim')


    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool


    // What will collider witg what layers, bulding collider

     //Enable Layer Collisions#
    this.Ground.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.Ground)

    this.Object.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.Object)
  
    // this.ObjectTop.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player, this.ObjectTop)
  

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

  // camera follow player
  this.cameras.main.startFollow(this.player);
  // Prevent black area of edge of the map
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
// start another scene in parallel
// this.scene.launch("showInventory");

		// collect item
    // this.physics.add.overlap(this.player, [this.wood1,this.wood2,this.wood3], globalCollectWood, null, this);
    this.physics.add.overlap(this.player, this.wood1, this.CollectWood, null, this);
    this.physics.add.overlap(this.player, this.wood2, this.CollectWood, null, this);
    this.physics.add.overlap(this.player, this.wood3, this.CollectWood, null, this);
 
        // //change room for checking
        let key2Down = this.input.keyboard.addKey(50);
        let key3Down = this.input.keyboard.addKey(51);
      
        key2Down.on('down', function(){
        console.log("2 pressed (room1)");
            this.scene.start("room1");
            }, this );
          
        key3Down.on('down', function(){
         console.log("3 pressed (room2)");
         this.scene.start("room2");
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

  if (
    this.player.x > 261 &&
    this.player.x < 314 &&
    this.player.y > 908 &&
    this.player.y < 925
  ) {
    console.log("room1")
    this.room1();
  }

  if (
    this.player.x > 581 &&
    this.player.x < 608 &&
    this.player.y > 908 &&
    this.player.y < 925
  ) {
    console.log("room2")
    this.room2();
  }

  if (
    this.player.x > 417 &&
    this.player.x < 441 &&
    this.player.y > 1228 &&
    this.player.y < 1235
  ) {
    console.log("room3")
    this.room3();
  }

  // let aDown = this.input.keyboard.addKey('A');
  // let rDown = this.input.keyboard.addKey('R');
  // let eDown = this.input.keyboard.addKey('E');
  
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

} /////////////////// end of update //////////////////////////////

// Function to jump to room1
room1(player, tile) {
  console.log("room1 function");
  this.scene.start("room1");
}

// Function to jump to room2
  room2(player, tile) {
    console.log("room2 function");
    this.scene.start("room2");
  }

  // Function to jump to room2
  room3(player, tile) {
    console.log("room3 function");
    this.scene.start("room3");
  }

  CollectWood(player, wood1){
    console.log("Player collect woods");
    
    // disable wood
    wood1.disableBody (true, true);
 }
 endGame() {
  // Stop game logic
  this.gameOver = true;
  
  

 }

} //////////// end of class world ////////////////////////
