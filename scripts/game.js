//INIT
var game=new ggCore("canvas1"),
scene=new ggScene('assets/scene/001.json'),
ui=new ggUI();

game.fn.addUI(ui);
game.fn.addScene(scene);

/*var scene=new ggScene();
game.fn.addScene(scene);

var hero=new ggMainChar();
hero.fn.skin.stand.setByImg('assets/img/hero.png');
hero.fn.skin.move.setByImg(['assets/img/hero.png', 'assets/img/mariowalk2.gif']);
hero.fn.skin.jump.setByImg('assets/img/hero.png');
game.fn.addMain(hero);

var __m1=new ggEnemyChar();
__m1.fn.skin.stand.setByImg('assets/img/monster.png');
game.fn.addEnemy(__m1);

//test gRect
var rect1=new gRect(0, 0, 10, 20),
rect2=new gRect(),
rect3=new gRect(new gPoint(0,0), new gPoint(0,10), new gPoint(10,10), new gPoint(10,0)),
rect4=new gRect(new gPoint(10,20), 20, 30);
//test ajax
ggAjax('assets/scene/001.json', function(){
	console.log(JSON.parse(arguments[0]));
});*/