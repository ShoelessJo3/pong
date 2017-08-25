var game = new Phaser.Game(1280, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render});

var gameProperties = {
    screenWidth: 640,
    screenHeight: 480,
    
    dashSize: 5,
    
    paddleLeft_x: 50,
    paddleRight_x: 590,
        ballVelocity: 750,
    ballStartDelay: 2,
    ballRandomStartingAngleLeft: [-120, 120],
    ballRandomStartingAngleRight: [-60, 60],
    paddleSpeed: 700,
}
function init(){

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically= true;
	
}

function preload() {
 game.load.image('paddle', 'assets/sprites/betterpaddle.png');
 game.load.image('ball', 'assets/sprites/ball2.png');
 game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
}
//a
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
    game.physics.startSystem(Phaser.Physics.ARCADE);

    ball = game.add.sprite(500,300, 'ball');
    ball.scale.set(3);
    ball.smoothed = false;
    //game.physics.p2.enable(ball, false);
    //ball.body.setCircle(35);
    //ball.body.fixedRotation = true;
    //ball.body.moveRight(400);
    ball.anchor.set(0.5,0.5);
    game.physics.enable(ball, Phaser.Physics.ARCADE);

        ball.checkWorldBounds = true;
        ball.body.enable = true;
        ball.body.collideWorldBounds = true;
        ball.body.immovable = true;
        ball.body.bounce.set(1);
    ball.body.velocity.x = 350;
    

	paddle1 = game.add.sprite(100, 10, 'paddle');
	game.physics.enable(paddle1, Phaser.Physics.ARCADE);
    paddle1.scale.set(4);
    paddle1.smoothed = false;
    paddle1.checkWorldBounds = true;
    paddle1.body.collideWorldBounds = true;
    paddle1.body.immovable = true;
    paddle1.body.bounce.set(1);
    paddle1.body.enable = true;
    //game.physics.p2.enable(paddle1, false);
    //paddle1.body.fixedRotation = true;
    //paddle1.body.damping = .5;



    paddle2 = game.add.sprite(1180,10, 'paddle');
    game.physics.enable(paddle2, Phaser.Physics.ARCADE);
    paddle2.scale.set(4);
    paddle2.smoothed = false;
     paddle2.scale.set(4);
    paddle2.smoothed = false;
    paddle2.checkWorldBounds = true;
    paddle2.body.collideWorldBounds = true;
    paddle2.body.immovable = true;
    paddle2.body.bounce.set(1);
       paddle2.body.enable = true;
    //game.physics.p2.enable(paddle2, false);
    //paddle2.body.fixedRotation = true;
    //paddle2.body.damping = .5;

    //var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', paddle1.body);
    //var spriteMaterial2 = game.physics.p2.createMaterial('spriteMaterial2', paddle2.body);
    //var spriteBall = game.physics.p2.createMaterial('spriteBall', ball.body);


    //var worldMaterial = game.physics.p2.createMaterial('worldMaterial');

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    //game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
    //  those 2 materials collide it uses the following settings.
    //  A single material can be used by as many different sprites as you like.
    


    
    

    //game.physics.p2.gravity.y = 100;
    //  Just to display the bounds
  
        //game.time.events.add(Phaser.Timer.SECOND * gameProperties.ballStartDelay, game.startBall, game);

 
        
        //var randomAngle = game.rnd.pick(gameProperties.ballRandomStartingAngleRight.concat(gameProperties.ballRandomStartingAngleLeft));
        
        //game.physics.arcade.velocityFromAngle(randomAngle, gameProperties.ballVelocity, game.ballSprite.body.velocity);


    cursors = game.input.keyboard.createCursorKeys();

    //var lock = true;
    //bmpText = game.add.bitmapText(270, 500, 'carrier_command', 'Press Enter to Start', 46);

    		
    

    bmpText = game.add.bitmapText(270, 500, 'carrier_command', 'Player 1: Q&A \nPlayer 2: O&L', 46);

    


    
}





function update(){

	paddle1.body.velocity.y = 0;
	paddle2.body.velocity.y = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.Q))
    {
    	paddle1.body.velocity.y = -gameProperties.paddleSpeed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        paddle1.body.velocity.y = gameProperties.paddleSpeed;
    }
    if(paddle1.body.x != 100)
    {
    	paddle1.body.x = 100;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.O))
    {
    	paddle2.body.velocity.y = -gameProperties.paddleSpeed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.L))
    {
        paddle2.body.velocity.y = gameProperties.paddleSpeed;
    }
    if(paddle2.body.x != 1180)
    {
    	paddle2.body.x = 1180;
    }

game.physics.arcade.collide(ball, paddle2, collisionHandler, null, game);
game.physics.arcade.collide(ball, paddle1, collisionHandler, null, game);

}

function collisionHandler (ball, paddle) {

    game.stage.backgroundColor = '#FFF';
    game.time.events.add(Phaser.Timer.SECOND * .1, flash, game);
    var returnAngle = 0;
    var segmentHit = Math.floor(ball.y - paddle.y);
    if(segmentHit <= 5/8 * paddle.height && segmentHit >= 3/8 * paddle.height && paddle.x < gameProperties.screenWidth * 0.5)
   	{
   		game.physics.arcade.velocityFromAngle(0, gameProperties.ballVelocity, ball.body.velocity);
   	}
        
    else if(segmentHit >= paddle.height/2 && paddle.x < gameProperties.screenWidth * 0.5)
    {
        game.physics.arcade.velocityFromAngle(45, gameProperties.ballVelocity, ball.body.velocity);
    }
    else if (paddle.x < gameProperties.screenWidth * 0.5&& paddle.x  < gameProperties.screenWidth * 0.5)
    {
    	game.physics.arcade.velocityFromAngle(315, gameProperties.ballVelocity, ball.body.velocity);
    }

    if(segmentHit <= 5/8 * paddle.height && segmentHit >= 3/8 * paddle.height && paddle.x > gameProperties.screenWidth * 0.5)
   	{
   		game.physics.arcade.velocityFromAngle(180, gameProperties.ballVelocity, ball.body.velocity);
   	}
        
    else if(segmentHit >= paddle.height/2 && paddle.x > gameProperties.screenWidth * 0.5)
    {
        game.physics.arcade.velocityFromAngle(135, gameProperties.ballVelocity, ball.body.velocity);
    }
    else if (paddle.x > gameProperties.screenWidth * 0.5)
    {
    	game.physics.arcade.velocityFromAngle(225, gameProperties.ballVelocity, ball.body.velocity);
    }

    
    

}
function flash()
{
	game.stage.backgroundColor = '#000';
}


function render(){


    
}