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
    startx: 650,
    starty: 300,
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

var hitit;

function init(){

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically= true;

	
}

function preload() {
 game.load.image('paddle', 'assets/sprites/betterpaddle.png');
 game.load.image('ball', 'assets/sprites/ball2.png');
 game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
   game.load.audio('hit', 'assets/sound/hit.wav');
   game.load.audio('background', 'assets/sound/backgroundLoop.wav');
   game.load.image('1player', 'assets/sprites/1player.png');
   game.load.image('2player', 'assets/sprites/2Player.png');

}

function startBall(){
	ball.reset(gameProperties.startx, gameProperties.starty);
	//ball.body.velocity.x = 350;

	ball.body.velocity.x = startDirection*350;
}


//a
var winText;
var paddle1;
var cursors;
var customBounds;
var font;
function create() {
	timer = game.time.create(false);

    //  Set a TimerEvent to occur after 3 seconds
    //timer.add(3000, fadePictures, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();

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

    		
    

    bmpText = game.add.bitmapText(270, 500, 'carrier_command', 'Player 1: Q&A \nPlayer 2: O&L', 46);
  	scoreText = game.add.bitmapText(270, 0, 'carrier_command', 'Player 1:' + scorePlayer1 + ' Player 2:' + scorePlayer2, 24);
  	winText =  game.add.bitmapText(270, 50, 'carrier_command',"Press a button to start.", 24);
  	startDemo();   



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

    if (game.input.keyboard.isDown(Phaser.Keyboard.O) && !singlePlayer)
    {
    	paddle2.body.velocity.y = -gameProperties.paddleSpeed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.L) && !singlePlayer)
    {
        paddle2.body.velocity.y = gameProperties.paddleSpeed;
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
	 	scoreText.setText('Player 1:' + scorePlayer1 + ' Player 2:' + scorePlayer2, 24);

	if(scorePlayer1 >= gameProperties.scoreToWin)
	{
		win("player1");
	}

	if(scorePlayer2 >= gameProperties.scoreToWin)
	{
		win("player2");
	}	
	console.log(singlePlayer);
/*	paddle2.body.y = ball.body.y + ball.body.height/2 - paddle2.body.height/2;
	if(ball.body.x > 1100)
		paddle2.body.y = 100*Math.sin(timer.elapsed/60) + ball.body.y + ball.body.height/2 - paddle2.body.height/2;
*/
	if(singlePlayer)
	{
		paddle2.body.velocity.y = 3*(ball.body.y-paddle2.body.y);//-200;
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