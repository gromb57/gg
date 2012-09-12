//INIT
var game=new ggCore("canvas1");

var scene=new ggScene();
game.fn.addScene(scene);

var hero=new ggMainChar();
hero.fn.skin.stand.setByImg('img/hero.png');
hero.fn.skin.move.setByImg(['img/hero.png', 'img/mariowalk2.gif']);
hero.fn.skin.jump.setByImg('img/hero.png');
game.fn.addMain(hero);

var __m1=new ggEnemyChar();
__m1.fn.skin.stand.setByImg('img/monster.png');
game.fn.addEnemy(__m1);

var ui=new ggUI();
game.fn.addUI(ui);

//test
var rect1=new gRect(0, 0, 10, 20),
rect2=new gRect(),
rect3=new gRect(new gPoint(0,0), new gPoint(0,10), new gPoint(10,10), new gPoint(10,0)),
rect4=new gRect(new gPoint(10,20), 20, 30);


window.addEventListener('keydown', function(event){

	//arrowUp
	if( (event.which == 38) ){
		if( hero.vars.body.isJumping ){
		}else{
			hero.fn.jump();
		}
	}

	//arrowRight
	if( (event.which == 39) ){
		if(hero.vars.body.isMoving){
		}else{
			hero.vars.body.isMoving=1;
			hero.vars.body.direction=1;
			hero.fn.move();
		}
	}

	//arrowLeft
	if(event.which == 37){
		if(hero.vars.body.isMoving){
		}else{
			hero.vars.body.isMoving=1;
			hero.vars.body.direction=-1;
			hero.fn.move();
		}
	}

	//arrowDown
	if(event.which == 40){

	}

	//escape
	if(event.which == 27){
		__m1.fn.stopIA();
		game.fn.stopDraw;
		ui.pause.fn.draw();
	}
});

window.addEventListener('keyup', function(event){
	//arrowUp
	if(event.which == 38){
		
	}

	//arrowRight
	if(event.which == 39){
		hero.vars.body.isMoving=0;
		clearTimeout(hero.vars.move_timeout);
	}

	//arrowLeft
	if(event.which == 37){
		hero.vars.body.isMoving=0;
		clearTimeout(hero.vars.move_timeout);
	}

	//arrowDown
	if(event.which == 40){

	}
});