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
    scoreToWin: 11,
    startx: 640,
    starty: 300,
    paddleFPS: 10,
    segmentHeight: 10,
    segmentWidth: 5,
}

var scorePlayer1 = 0;
var scorePlayer2 = 0;
var startDirection = 1;
var scoreText;
var timer;

var singlePlayer = false;





function startDemo()
{
	 game.paused = true;
	 buttonSingle = game.add.button(game.world.centerX - 200, 400, '1player', unpause1, this);
	 buttonSingle.scale.set(3);
	 buttonSingle.smoothed = false;

	buttonTwo = game.add.button(game.world.centerX + 100, 400, '2player', unpause2, this);
	buttonTwo.scale.set(3);
	 buttonTwo.smoothed = false;
	// game.input.onDown.add(unpause, self);
	 startBall();


	 

}

function unpause(event)
{
	if(game.paused)
	{
		game.paused = false;
		console.log(event);
		winText.setText('');
		buttonSingle.destroy();
		buttonTwo.destroy();
	}
}

function unpause1(event)
{
	if(game.paused)
	{

		game.paused = false;
		singlePlayer = true;
		console.log(event);
		winText.setText('');
		buttonSingle.destroy();
		buttonTwo.destroy();
	}
}

function unpause2(event)
{
	if(game.paused)
	{
		game.paused = false;
		singlePlayer = false;
		console.log(event);
		winText.setText('');
		buttonSingle.destroy();
		buttonTwo.destroy();
	}
}

var centerLine;

function init(){

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically= true;

	
}

function preload() {


	//game.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
 game.load.image('paddle', 'assets/sprites/betterpaddle.png');
 game.load.image('ball', 'assets/sprites/ball2.png');
 game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
   game.load.audio('hit', 'assets/sound/hit.wav');
   game.load.audio('background', 'assets/sound/backgroundLoop.wav');
   game.load.audio('winning', 'assets/sound/winning.wav');
   game.load.image('1player', 'assets/sprites/1player.png');
   game.load.image('2player', 'assets/sprites/2player.png');
   game.load.atlasJSONHash('keys', 'assets/sprites/New Piskel.png', 'assets/sprites/New Piskel.json')



}

function startBall(){
	ball.reset(gameProperties.startx, gameProperties.starty);
	//ball.body.velocity.x = 350;
//thiss
	ball.body.velocity.x = startDirection*350;
}


//a
var winText;
var title;
var paddle1;
var cursors;
var customBounds;
var font;

var qKey;
var aKey;
var oKey;
var lKey;
var upPadde1;
var downPaddle1;
var upPaddle2;
var downPaddle2;


function create() {

	
	var graphics = game.add.graphics(100, 100);

    // set a fill and line style
    graphics.beginFill(0xFF3300);
    //graphics.drawRect(50, 250, 100, 100);
    
    graphics.lineStyle(2, 0xFFFFFF, 1);
	for(var y = 0;  y < 600;y += 20) //i equiv to y
	{
		graphics.moveTo(game.world.centerX - 100, y);
		graphics.lineTo(game.world.centerX - 100, y+10);
		console.log(y+gameProperties.segementHeight);
	}
	

	timer = game.time.create(false);

	qKey = game.add.sprite(50,500,'keys');
	qKey.anchor.set(0.5,0.5);
	qKey.scale.set(3);
	qKey.smoothed = false;
	qKey.animations.add('key',[0,1,2,1,0],gameProperties.paddleFPS,false);
	qKey.animations.play('key');

	aKey = game.add.sprite(150,500,'keys');
	aKey.anchor.set(0.5,0.5);
	aKey.scale.set(3);
	aKey.animations.add('key',[3,4,5,4,3],gameProperties.paddleFPS,false);
	aKey.animations.play('key');

	oKey = game.add.sprite(1130,500,'keys');
	oKey.anchor.set(0.5,0.5);
	oKey.scale.set(3);
	oKey.animations.add('key',[6,7,8,7,6],gameProperties.paddleFPS,false);
	oKey.animations.play('key');

	lKey = game.add.sprite(1230,500,'keys');
	lKey.anchor.set(0.5,0.5);
	lKey.scale.set(3);
	lKey.smoothed = false;
	lKey.animations.add('key',[9,10,11,10,9],gameProperties.paddleFPS,false);
	lKey.animations.play('key');



   

	sounds = game.sound.play('background');
	sounds.loopFull();

	



	
	var i = game.add.image(100,100,font)
	var bounds = new Phaser.Rectangle(100, 100, 400, 400);
	image = game.add.sprite(0, 0, 'paddle');
	game.world.setBounds(0, 0, 1280, 600);

    //  Enable P2 and it will use the updated world size
    game.physics.startSystem(Phaser.Physics.ARCADE);

    ball = game.add.sprite(gameProperties.startx,gameProperties.starty, 'ball');
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
    
    startDirection = 1;
	if(game.rnd.between(0,1) == 0)
	{
		startDirection = -1;
	}
    

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

    cursors = game.input.keyboard.createCursorKeys();

    //var lock = true;
    //bmpText = game.add.bitmapText(270, 500, 'carrier_command', 'Press Enter to Start', 46);

     game.input.mouse.capture = true;

    		
    

    //bmpText = game.add.bitmapText(270, 500, 'carrier_command', 'Player 1: Q&A \nPlayer 2: O&L', 46);
  	scoreText = game.add.bitmapText(450, 100, 'carrier_command', '1-' + scorePlayer1 + '   2-' + scorePlayer2, 24);
  	scoreText.anchor.set(0.5,0.5);
  	scoreText.x = game.world.centerX;

  	title = game.add.bitmapText(450,0, 'carrier_command', 'PONG');
  	title.anchor.set(.5,0);
  	title.x = game.world.centerX;

  	winText =  game.add.bitmapText(450, 50, 'carrier_command',"Press a button to start.", 24);
  	winText.anchor.set(.5,0);
  	winText.x = game.world.centerX;

  	startDemo();   
//game.stage.scale.startFullScreen();
game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
	upPaddle1 = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	downPaddle1 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	upPaddle2 = game.input.keyboard.addKey(Phaser.Keyboard.O);
	downPaddle2 = game.input.keyboard.addKey(Phaser.Keyboard.L);

	


}







function update(){
	

	paddle1.body.velocity.y = 0;
	paddle2.body.velocity.y = 0;





    if (upPaddle1.isDown)
    {
    	paddle1.body.velocity.y = -gameProperties.paddleSpeed;
    	qKey.animations.play('key');
	
    }
    else if (downPaddle1.isDown)
    {
        paddle1.body.velocity.y = gameProperties.paddleSpeed;
        aKey.animations.play('key');
    }
    if(paddle1.body.x != 100)
    {
    	paddle1.body.x = 100;
    }

    if (upPaddle2.isDown && !singlePlayer)
    {
    	paddle2.body.velocity.y = -gameProperties.paddleSpeed;
    	oKey.animations.play('key');
    }
    else if (downPaddle2.isDown && !singlePlayer)
    {
        paddle2.body.velocity.y = gameProperties.paddleSpeed;
        lKey.animations.play('key');
    }
    if(paddle2.body.x != 1180)
    {
    	paddle2.body.x = 1180;
    }

    game.time.slowMotion = 1.0;

    if(game.input.keyboard.isDown(Phaser.Keyboard.E))
    {
    	game.time.slowMotion = 2.0;
    }

game.physics.arcade.collide(ball, paddle2, collisionHandler, null, game);
game.physics.arcade.collide(ball, paddle1, collisionHandler, null, game);

	if(ball.x<50)
	{
		startDirection = -1;
		startBall();
		scorePlayer2++;

	}
	else if(ball.x > 1240)
	{
		startDirection = 1;
		scorePlayer1++;
		startBall();
	}
		//scoreText.destroy();
	 	scoreText.setText('1-' + scorePlayer1 + '  2-' + scorePlayer2, 24);

	if(scorePlayer1 >= gameProperties.scoreToWin)
	{
		win("player1");
	}

	if(scorePlayer2 >= gameProperties.scoreToWin)
	{
		win("player2");
	}	
	//console.log(singlePlayer);
/*	paddle2.body.y = ball.body.y + ball.body.height/2 - paddle2.body.height/2;
	if(ball.body.x > 1100)
		paddle2.body.y = 100*Math.sin(timer.elapsed/60) + ball.body.y + ball.body.height/2 - paddle2.body.height/2;
*/
	if(singlePlayer)
	{
		paddle2.body.velocity.y = 3*(ball.body.y-paddle2.body.y);//-200;
	}
	if(singlePlayer && paddle2.body.velocity.y > 0)
	{
		lKey.animations.play('key');
	}
	else if(singlePlayer)
	{
		oKey.animations.play('key');
	}

}

function win(player)
{
	winText = game.add.bitmapText(270, 50, 'carrier_command', player + " won the game!\n Click anywhere to restart.", 24);
	scorePlayer1 = 0;
	scorePlayer2 = 0;
	startDemo();

}

function collisionHandler (ball, paddle) {
	  		 music = game.sound.play('hit');




    //game.stage.backgroundColor = '#FFF';
   // game.time.events.add(Phaser.Timer.SECOND * .1, flash, game);
    var returnAngle = 0;
    var segmentHit = Math.floor(ball.y - paddle.y);
    if(segmentHit <= 5/8 * paddle.height && segmentHit >= 3/8 * paddle.height && paddle.x < gameProperties.screenWidth * 0.5)
   	{
   		game.physics.arcade.velocityFromAngle(0, gameProperties.ballVelocity, ball.body.velocity);

   	}
        
    else if(segmentHit >= paddle.height/2 && paddle.x < gameProperties.screenWidth * 0.5)
    {
        game.physics.arcade.velocityFromAngle(game.rnd.between(15,70), gameProperties.ballVelocity, ball.body.velocity);
    }
    else if (paddle.x < gameProperties.screenWidth * 0.5&& paddle.x  < gameProperties.screenWidth * 0.5)
    {
    	game.physics.arcade.velocityFromAngle(game.rnd.between(345,290), gameProperties.ballVelocity, ball.body.velocity);
    }

    if(segmentHit <= 5/8 * paddle.height && segmentHit >= 3/8 * paddle.height && paddle.x > gameProperties.screenWidth * 0.5)
   	{
   		game.physics.arcade.velocityFromAngle(180, gameProperties.ballVelocity, ball.body.velocity);
   	}
        
    else if(segmentHit >= paddle.height/2 && paddle.x > gameProperties.screenWidth * 0.5)
    {
        game.physics.arcade.velocityFromAngle(game.rnd.between(170,135), gameProperties.ballVelocity, ball.body.velocity);
    }
    else if (paddle.x > gameProperties.screenWidth * 0.5)
    {
    	game.physics.arcade.velocityFromAngle(game.rnd.between(190,225), gameProperties.ballVelocity, ball.body.velocity);
    }

    
    

}
function flash()
{
	game.stage.backgroundColor = '#000';
}


function render(){


    
}