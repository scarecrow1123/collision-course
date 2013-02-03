$('document').ready(function(){
	console.log('here');
	
	$('#canvasMenu').css('background-image', 'url(\'Images/Background.png\')');
	/*var canvas = document.getElementById('canvasMenu');
	var ctx = canvas.getContext('2d');
	var image = new Image();
	image.src = 'Images/logo.png';

	ctx.drawImage(image, 0,0);*/
	/*$('body').append('<button class="btn btn-primary" style="position: absolute; top:150px; left: 250px;">Play</button><button class="btn btn-primary" style="position: absolute; top:195px; left:230px;">Instructions</button><button class="btn btn-primary" style="position: absolute; top:240px;left:240px;">Credits</button>');

	$('body').append('<button class="btn btn-primary" style="position: absolute: top: 150px; left: 250px; visibility:hidden;')*/
	$('img#logo').css('visibility', 'visible');
	$('img#ship').css('visibility', 'visible');
	$('img#sel').css('visibility', 'hidden');
	$('#play').css('visibility', 'visible');
	$('#instns').css('visibility', 'visible');
	$('#credits').css('visibility', 'visible');

	$('#play').click(function(){

		$('img').css('visibility', 'hidden');
		$('img#sel').css('visibility', 'visible');
		//$('#canvasMenu').css('visibility', 'hidden');
		$('#play').css('visibility', 'hidden');
		$('#instns').css('visibility', 'hidden');
		$('#credits').css('visibility', 'hidden');

		$('#fast1').css('visibility', 'visible');
		$('#fast2').css('visibility', 'visible');
		$('#fast3').css('visibility', 'visible');
		$('#back').css('visibility', 'visible');	
	});


	$('#instns').click(function(){
		$('img').css('visibility', 'hidden');
		$('#play').css('visibility', 'hidden');
		$('#instns').css('visibility', 'hidden');
		$('#credits').css('visibility', 'hidden');
		$('#canvasMenu').css('background-image', 'url(\'Images/instructionsnew.jpg\')');
		$('#back').css('visibility', 'visible');
		$('#proceed').css('visibility', 'visible');
	});

	$('#proceed').click(function(){
		$('button').css('visibility', 'hidden');
		$('#back').css('visibility', 'visible');
		$('#canvasMenu').css('background-image', 'url(\'Images/Background.png\')');
		$('#fast1').css('visibility', 'visible');
		$('#fast2').css('visibility', 'visible');
		$('#fast3').css('visibility', 'visible');
	});

	$('#back').click(function(){
		$('img#logo').css('visibility', 'visible');
		$('img#ship').css('visibility', 'visible');
		$('img#sel').css('visibility', 'hidden');
		$('#canvasMenu').css('background-image', 'url(\'Images/Background.png\')');
		$('button').css('visibility', 'hidden');
		$('#play').css('visibility', 'visible');
	$('#instns').css('visibility', 'visible');
	$('#credits').css('visibility', 'visible');
	$('#back').css('visibility', 'hidden');
	$('#proceed').css('visibility', 'hidden');
	});

	$('#credits').click(function(){
		$('img').css('visibility', 'hidden');
		$('#play').css('visibility', 'hidden');
		$('#instns').css('visibility', 'hidden');
		$('#credits').css('visibility', 'hidden');
		$('#canvasMenu').css('background-image', 'url(\'Images/actualCredits.png\')');
		$('#back').css('visibility', 'visible');
	});


	$('#fast1').click(function(){
		console.log('fast1');
		diff = 0;
		$('#canvasMenu').css('visibility', 'hidden');
		$('button').css('visibility', 'hidden');
		$('#canvasGame').css('visibility', 'visible');
		startGame();
	});

	$('#fast2').click(function(){
		console.log('fast2');
		diff = 1;
		$('#canvasMenu').css('visibility', 'hidden');
		$('button').css('visibility', 'hidden');
		$('#canvasGame').css('visibility', 'visible');
		startGame();
	});

	$('#fast3').click(function(){
		console.log('fast3');
		diff = 2;
		$('#canvasMenu').css('visibility', 'hidden');
		$('button').css('visibility', 'hidden');
		$('#canvasGame').css('visibility', 'visible');
		startGame();
	});

});