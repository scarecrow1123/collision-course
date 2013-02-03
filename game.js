


var b2Vec2 = Box2D.Common.Math.b2Vec2
	, b2AABB = Box2D.Collision.b2AABB
	, b2BodyDef = Box2D.Dynamics.b2BodyDef
	, b2Body = Box2D.Dynamics.b2Body
	, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	, b2Fixture = Box2D.Dynamics.b2Fixture
	, b2World = Box2D.Dynamics.b2World
	, b2MassData = Box2D.Collision.Shapes.b2MassData
	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
	, b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
	, b2Shape = Box2D.Collision.Shapes.b2Shape
	, b2Joint = Box2D.Dynamics.Joints.b2Joint
	, b2Settings = Box2D.Common.b2Settings
	;
var diff=1;
var count = 0;
var endCheck = false;
var world;
var ctx;
var canvas_height;
var canvas_width;
var mouse_pressed = false;
var mouse_joint = false;
var mouse_x, mouse_y;
var scale = 30;
var flag = 0;

function draw_world() 
{
	var canvas1 = $('#canvasGame');
	var ctx1 = canvas1.get(0).getContext('2d');
	
	//convert the canvas coordinate directions to cartesian coordinate direction by translating and scaling
	ctx1.save();
	//ctx.translate(0 , canvas_height);
	//ctx.scale(1 , -1);
	world.DrawDebugData();
	ctx1.restore();
	
	/*ctx1.font = 'bold 18px arial';
	ctx1.textAlign = 'center';
	ctx1.fillStyle = '#fff';
	ctx1.fillText('Collision Course', canvas_width/2, 20);
	ctx1.font = 'bold 14px arial';
	ctx1.fillText('Dodge the Red Fucking balls', canvas_width/2, 40);
	
/*	
      var centerX = 2;
      var centerY = 2;
      var radius = 5;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#003300';
      ctx.stroke();
	*/
	 // console.log(world);
}


//moving background
var backgroundX = 0;
function move(){
		backgroundX -= 1;
		if(backgroundX == -6 * canvas_width){
			backgroundX = 00;
		}
		}

var bodyRedBallDef = new Array(50);
var fixRedBall = new Array(50);
var bodyRedBall = new Array(50);




function createWorld(){
	world = new b2World( new b2Vec2(0,0), false);
	
	//setup debugDraw
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("canvasGame").getContext("2d"));
	debugDraw.SetDrawScale(scale);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	
	world.SetDebugDraw(debugDraw);
	
	//draw the walls

	var fixWallLeft = new b2FixtureDef;
	fixWallLeft.density = 0;
	fixWallLeft.friction = 0;
	fixWallLeft.restitution = 0;
	fixWallLeft.shape = new b2PolygonShape;
    fixWallLeft.shape.SetAsBox(0.1, 10);
    var bodyLeftDef = new b2BodyDef;
    bodyLeftDef.type = b2Body.b2_staticBody;
    bodyLeftDef.position.x = 0;
    bodyLeftDef.position.y = 10;
	var bodyLeft = world.CreateBody(bodyLeftDef); 
	bodyLeft.CreateFixture(fixWallLeft);


	var fixWallRight = new b2FixtureDef;
	fixWallRight.density = 0;
	fixWallRight.friction = 0;
	fixWallRight.restitution = 0;
	fixWallRight.shape = new b2PolygonShape;
    fixWallRight.shape.SetAsBox(0.1, 10);
	var bodyRightDef = new b2BodyDef;
	bodyRightDef.type = b2Body.b2_staticBody;
    bodyRightDef.position.x = 20;
    bodyRightDef.position.y = 4;
	var bodyRight = world.CreateBody(bodyRightDef);
	bodyRight.CreateFixture(fixWallRight);

	var fixWallTop = new b2FixtureDef;
	fixWallTop.density = 0;
	fixWallTop.friction = 0;
	fixWallTop.restitution = 0;
	fixWallTop.shape = new b2PolygonShape;
    fixWallTop.shape.SetAsBox(10, .1);
    var bodyTopDef = new b2BodyDef;
	bodyTopDef.type = b2Body.b2_staticBody;
    bodyTopDef.position.x = 10;
    bodyTopDef.position.y = 0;
	var bodyTop = world.CreateBody(bodyTopDef);
	bodyTop.CreateFixture(fixWallTop);

	var fixWallBottom = new b2FixtureDef;
	fixWallBottom.density = 0;
	fixWallBottom.friction = 0;
	fixWallBottom.restitution = 0;
	fixWallBottom.shape = new b2PolygonShape;
    fixWallBottom.shape.SetAsBox(10, .1);
	var bodyBottomDef = new b2BodyDef;
	bodyBottomDef.type = b2Body.b2_staticBody;
    bodyBottomDef.position.x = 10;
    bodyBottomDef.position.y = 13.5;
	var bodyBottom = world.CreateBody(bodyBottomDef);
	bodyBottom.CreateFixture(fixWallBottom);

	ground = bodyBottom;

	//rounded edges

	var bodyTopRightDef = new b2BodyDef;
	bodyTopRightDef.type = b2Body.b2_staticBody;
	bodyTopRightDef.position.x = 0;
	bodyTopRightDef.position.y = 0;
	var fixTopRight = new b2FixtureDef;
	fixTopRight.shape = new b2CircleShape(0.5);
	var bodyTopRight = world.CreateBody(bodyTopRightDef);
	bodyTopRight.CreateFixture(fixTopRight);

	var bodyTopLeftDef = new b2BodyDef;
	bodyTopLeftDef.type = b2Body.b2_staticBody;
	bodyTopLeftDef.position.x = 20;
	bodyTopLeftDef.position.y = 0;
	var fixTopLeft = new b2FixtureDef;
	fixTopLeft.shape = new b2CircleShape(0.5);
	var bodyTopLeft = world.CreateBody(bodyTopLeftDef);
	bodyTopLeft.CreateFixture(fixTopLeft);

	var bodyBottomRightDef = new b2BodyDef;
	bodyBottomRightDef.type = b2Body.b2_staticBody;
	bodyBottomRightDef.position.x = 20;
	bodyBottomRightDef.position.y = 13.5;
	var fixBottomRight = new b2FixtureDef;
	fixBottomRight.shape = new b2CircleShape(0.5);
	var bodyBottomRight = world.CreateBody(bodyBottomRightDef);
	bodyBottomRight.CreateFixture(fixBottomRight);

	var bodyBottomLeftDef = new b2BodyDef;
	bodyBottomLeftDef.type = b2Body.b2_staticBody;
	bodyBottomLeftDef.position.x = 0;
	bodyBottomLeftDef.position.y = 13.5;
	var fixBottomLeft = new b2FixtureDef;
	fixBottomLeft.shape = new b2CircleShape(0.5);
	var bodyBottomLeft = world.CreateBody(bodyBottomLeftDef);
	bodyBottomLeft.CreateFixture(fixBottomLeft);

	for( var i=0; i<50; i++){
		bodyRedBallDef[i] = new b2BodyDef;
		bodyRedBallDef[i].type = b2Body.b2_dynamicBody;
		fixRedBall[i] = new b2FixtureDef;
		fixRedBall[i].friction = 0;
		fixRedBall[i].density = 0;
		fixRedBall[i].restitution = 1;
	}


	for( var i=0; i<4; i++){
		fixRedBall[i].shape = new b2CircleShape(0.5);
		bodyRedBallDef[i].position.x = Math.random() * 10;
		bodyRedBallDef[i].position.y = Math.random() * 10;
		bodyRedBallDef[i].userData = {'fill_color' : '#D50000' , 'border_color' : '#D50000' };
		bodyRedBall[i] = world.CreateBody(bodyRedBallDef[i]);
		bodyRedBall[i].CreateFixture(fixRedBall[i]);
		switch(diff){
			case 0:
				bodyRedBall[i].SetLinearVelocity(new b2Vec2(3,3));
				break;
			case 1:
				bodyRedBall[i].SetLinearVelocity(new b2Vec2(5,5));
				break;
			case 2:
				bodyRedBall[i].SetLinearVelocity(new b2Vec2(7,7));
				break;
		}
		
	}




	var contactListener = new Box2D.Dynamics.b2ContactListener;
	contactListener.BeginContact = function(contact, manifold) {
   	//do some stuff 
   	console.log('colliding...!!!');
   	console.log(contact.GetFixtureA().GetBody().GetUserData().fill_color,
                               contact.GetFixtureB().GetBody().GetUserData().fill_color);
   	if (contact.GetFixtureA().GetBody().GetUserData().fill_color=='#411BFF' || contact.GetFixtureB().GetBody().GetUserData().fill_color=='#411BFF'){
   		console.log("Game should be over!");
   		endCheck = true;
   	}
   }
   	world.SetContactListener(contactListener);

	return world;
}

var seconds = 0;
function startTimer(){
	setInterval(function(){
		seconds += 1;
	}, 100);
}


function newBall(){
	$('canvas').css('cursor','none');
	setInterval(function(){
		console.log('loop');
	 	var bodyRedBallDef = new b2BodyDef;
	 	var fixRedBall = new b2FixtureDef;
	 	fixRedBall.density = 0;
	 	fixRedBall.friction = 0;
	 	fixRedBall.restitution = 1;
		console.log("new ball");
		 bodyRedBallDef.type = b2Body.b2_dynamicBody;
		 
       
               fixRedBall.shape = new b2CircleShape(
                  .5 //radius
               );
            
            bodyRedBallDef.position.x = Math.random()*10;
            bodyRedBallDef.position.y = Math.random()*10;
            bodyRedBallDef.userData = {'fill_color' : '#D50000' , 'border_color' : '#D50000' };
            var new_body =  window.world.CreateBody(bodyRedBallDef);
			new_body.CreateFixture(fixRedBall);
			 switch(diff){
			case 0:
				new_body.SetLinearVelocity(new b2Vec2(3,3));
				break;
			case 1:
				new_body.SetLinearVelocity(new b2Vec2(5,5));
				break;
			case 2:
				new_body.SetLinearVelocity(new b2Vec2(7,7));
				break;
		}
		
		
	  }, 5000);
	if( count == 0){
	startTimer();
	var bodyBlueBallDef = new b2BodyDef;
	var fixBlueBall = new b2FixtureDef;
	fixBlueBall.shape = new b2PolygonShape(0.5);
	fixBlueBall.shape.SetAsBox(0.5,0.5);
	fixBlueBall.density = 0;
	fixBlueBall.friction = 0;
	fixBlueBall.restitution = 0;
	bodyBlueBallDef.type = b2Body.b2_dynamicBody;
	bodyBlueBallDef.position.x = (window.event.clientX)/30;
	bodyBlueBallDef.position.y = (window.event.clientY)/30;
	bodyBlueBallDef.linearDamping = 0;
	bodyBlueBallDef.angularDamping = 0;
	bodyBlueBallDef.userData = {'fill_color' : '#411BFF' , 'border_color' : '#411BFF' };
	var bodyBlueBall = world.CreateBody(bodyBlueBallDef);
	bodyBlueBall.CreateFixture(fixBlueBall);
	count += 1;
	}
	else{
		return;
	}

/*
var bodyDefBlue = new b2BodyDef;
	    var fixDefBlue = new b2FixtureDef;
         fixDefBlue.density = 0;
         fixDefBlue.friction = 0;
         fixDefBlue.restitution = 0;
*/
}

var imageBlue = new Image();
	imageBlue.src = "Images/Kockroach.png";

var imageRed = new Image();
	imageRed.src = "Images/aestro.png";
	
var imageBG = new Image();
	imageBG.src = "Images/bg.jpg";

function doStep(){

move();



if (endCheck==false){
 
	///console.log(image.src);	
	
	//console.log("inside step");
	var fps = 60;
	var timeStep = 1.0/(fps * 0.8);
	
	
	var canvas = document.getElementById("canvasGame");
    var context = canvas.getContext("2d");
	
	
	//move the box2d world ahead
	world.Step(timeStep , 8 , 3);
	world.ClearForces();
	
	
	context.clearRect(0, 0, 1024, 720);
	
	 context.save();
	context.drawImage(imageBG, backgroundX, 0);
		  context.restore();
	
	//console.log(world.GetBodyList().GetNext().GetUserData());
        for (b = world.GetBodyList() ; b; b = b.GetNext()) {

            if (b.GetType() == b2Body.b2_dynamicBody) {
                var pos = b.GetPosition();
                //console.log(pos.x, pos.y);
                context.save();
                context.translate(pos.x * scale, pos.y * scale);
                context.rotate(b.GetAngle());
                if(b.GetUserData().fill_color=='#411BFF'){
                context.drawImage(imageBlue, -12.5, -12.5);
            	}
            	else{
            		context.drawImage(imageRed, -12.5,-12.5);
            	}
				
                context.restore();
            }
        }
		context.fillStyle = '#f00';
		context.font = 'italic bold 20px sans-serif';
		context.textBaseline = 'bottom';
		context.fillText('Score: '+seconds, 490, 400);
	 		 //collision event listener


		
	
	//redraw the world
//	draw_world();
	
	
	  
	//call this function again after 1/60 seconds or 16.7ms
	 	
	  
	  
	 world.Step(
               1 / 60   //frame-rate
            ,  10      //velocity iterations
            ,  10      //position iterations
         );
         //world.DrawDebugData();
         world.ClearForces();
		 
}
else{
	if(flag == 0){
		var finalScore = seconds;
	var canvas = document.getElementById("canvasGame");
    var context = canvas.getContext("2d");
    setTimeout(function(){
    	fs = finalScore-10;
    	context.clearRect(0, 0, 1024, 720);

    context.drawImage(imageBG, 0, 0);
	context.fillText('Final Score: '+fs, 200, 200);
	setTimeout(function(){
		location.reload();
	}, 2500);
	console.log("end");
	flag += 1;
    }, 1000);
    
}
	//window.context.clearRect(0, 0, canvas.width, canvas.height);
}
}


window.setInterval(doStep, 1000/60);

function get_real(p)
{
	return new b2Vec2(p.x + 0,  p.y);
}
function GetBodyAtMouse(includeStatic)
{
	var mouse_p = new b2Vec2(mouse_x, mouse_y);
	
	var aabb = new b2AABB();
	aabb.lowerBound.Set(mouse_x - 0.001, mouse_y - 0.001);
	aabb.upperBound.Set(mouse_x + 0.001, mouse_y + 0.001);
	
	var body = null;
	
	// Query the world for overlapping shapes.
	function GetBodyCallback(fixture)
	{
		var shape = fixture.GetShape();
		var colorInfo = fixture.GetBody();
		//console.log(typeof colorInfo.m_userData.fill_color);
		if(colorInfo.m_userData.fill_color == "#D50000"){
		return false;
		}
		else {
			
		if (fixture.GetBody().GetType() != b2Body.b2_staticBody || includeStatic)
		{
			var inside = shape.TestPoint(fixture.GetBody().GetTransform(), mouse_p);
			
			if (inside)
			{
				body = fixture.GetBody();
				//console.log(body);
				return false;
			}
			
			
		}
		
		return true;
	}
	}
	
	world.QueryAABB(GetBodyCallback, aabb);
	return body;
}


function startGame(){
	console.log('blah balh');
	
	world = createWorld();
	var canvas = $('#canvasGame');
	ctx = canvas.get(0).getContext('2d');
	console.log('here');
	//get internal dimensions of the canvas
	canvas_width = parseInt(canvas.attr('width'));
	canvas_height = parseInt(canvas.attr('height'));
	canvas_height_m = canvas_height / scale;
	



	//If mouse is moving over the thing
	$(canvas).mousemove(function(e) 
	{
		var p = get_real(new b2Vec2(e.pageX/scale, e.pageY/scale))
		
		mouse_x = p.x;
		mouse_y = p.y;
		
		if(mouse_pressed && !mouse_joint )
		{
			var body = GetBodyAtMouse();
			
			if(body)
			{
				//if joint exists then create
				var def = new b2MouseJointDef();
				
				def.bodyA = window.ground;
				def.bodyB = body;
				def.target = p;
				
				def.collideConnected = true;
				def.maxForce = 99999999999999999999999999999999999999999999 * body.GetMass();
				def.dampingRatio = 0;
				def.frequencyHz = 100;
				mouse_joint = world.CreateJoint(def);
				
				body.SetAwake(true);
			}
		}
		else
		{
			//nothing
		}
		
		if(mouse_joint)
		{
			mouse_joint.SetTarget(p);
		}
	});
	
	$(canvas).mousemove(function() 
	{
		//flag to indicate if mouse is pressed or not
		mouse_pressed = true;
	});
	
	$(canvas).click(function() 
	{
		//flag to indicate if mouse is pressed or not
		mouse_pressed = true;
	});
	
	$(canvas).mousedown(function() 
	{
		//flag to indicate if mouse is pressed or not
		mouse_pressed = true;
	});
	/*
		When mouse button is release, mark pressed as false and delete the mouse joint if it exists
	*/
	$(canvas).mouseup(function() 
	{
		mouse_pressed = false;
		
		if(mouse_joint)
		{
			world.DestroyJoint(mouse_joint);
			mouse_joint = false;
		}
	});
	
	doStep();
}
window.startGame = startGame;