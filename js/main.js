var game = new Phaser.Game(1280, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render});

function init(){

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically= true;
}

function preload() {
 game.load.image('paddle', 'assets/sprites/betterpaddle.png');
 game.load.image('ball', 'assets/sprites/ball.png');
game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
}
var paddle1;
var cursors;
var customBounds;
var font;
function create() {
	
	var i = game.add.image(100,100,font)
	var bounds = new Phaser.Rectangle(100, 100, 400, 400);
	image = game.add.sprite(0, 0, 'paddle');
	game.world.setBounds(0, 0, 1280, 600);

    //  Enable P2 and it will use the updated world size
    game.physics.startSystem(Phaser.Physics.P2JS);

    

	paddle1 = game.add.sprite(100, 10, 'paddle');
    paddle1.scale.set(4);
    paddle1.smoothed = false;
    game.physics.p2.enable(paddle1, false);
    paddle1.body.fixedRotation = true;
    paddle1.body.damping = .5;

    paddle2 = game.add.sprite(1180,10, 'paddle');
    paddle2.scale.set(4);
    paddle2.smoothed = false;
    game.physics.p2.enable(paddle2, false);
    paddle2.body.fixedRotation = true;
    paddle2.body.damping = .5;

    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', paddle1.body);

    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
    //  those 2 materials collide it uses the following settings.
    //  A single material can be used by as many different sprites as you like.
    var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial);

    contactMaterial.friction = 0.3;     // Friction to use in the contact of these two materials.
    contactMaterial.restitution = 1.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
    contactMaterial.stiffness = 1e7;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
    contactMaterial.relaxation = 3;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
    contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
    contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
    contactMaterial.surfaceVelocity = 0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.



    //  Create our physics body. The 'true' parameter enables visual debugging.



    //  Alternatively create a circle for the ship instead (which more accurately matches its size)
    // ship.body.setCircle(28);



    
    

    //game.physics.p2.gravity.y = 100;
    //  Just to display the bounds


    cursors = game.input.keyboard.createCursorKeys();
    bmpText = game.add.bitmapText(270, 500, 'carrier_command', 'Player 1: Q&A \nPlayer 2: O&L', 46);
    


    
}



function update(){

	//paddle1.body.setZeroXVelocity();

    if (game.input.keyboard.isDown(Phaser.Keyboard.Q))
    {
    	paddle1.body.moveUp(350);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        paddle1.body.moveDown(350);
    }
    if(paddle1.body.x != 100)
    {
    	paddle1.body.x = 100;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.O))
    {
    	paddle2.body.moveUp(350);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.L))
    {
        paddle2.body.moveDown(350);
    }
    if(paddle2.body.x != 1180)
    {
    	paddle2.body.x = 1180;
    }


}

function render(){


    
}