function ggCore(canvasElm){
	//object representing game
	var game={
		vars:{
			canvas:null,
			ctx:null,
			scene:null,
			toDraw:[],
			drawTimeout:null,
			ui:null,
			objects:{
				characters:{
					mains:null,
					enemies:null
				}
			}
		},
		fn:{
			events:{
				collision:{
					/**
					* check object collisions
					*/
					check:function(obj){
						for(var __x in obj){
							if(obj.hasOwnProperty(__x)){
								if(__x != mains){
									if( obj[__x].hasOwnProperty('vars') && obj[__x].vars.hasOwnProperty('body') ){
										for(var __y in game.vars.objects.characters.mains){
											if(game.vars.objects.characters.mains.hasOwnProperty(__y)){
												
											}
										}
									}else{
										game.fn.events.collision.check(obj[__x]);
									}
								}
							}
						}
					}
				}
			},
			errorMsg:function(msg){
				console.error(msg);
			},
			init:function(){
				game.fn.draw();
			},
			//draw game
			draw:function(){
				var __timeout=1000 / 60;
				game.vars.drawTimeout=setTimeout(function(){
					for(var __funcKey in game.vars.toDraw){
						game.vars.toDraw[__funcKey](game.vars.ctx);
					}
					__funcKey=null;
					game.fn.events.collision.check(game.vars.object);
				},
				__timeout);
			},
			//stop refresh drawing
			stopDraw:function(){
				clearTimeout(game.vars.drawTimeout);
			},
			addDraw:function(funcName){
				game.vars.toDraw.push(funcName);
			},
			addScene:function(ggScene_object){
				if(ggScene){
					game.vars.scene=ggScene_object;
					game.vars.canvas.setAttribute('width', ggScene_object.screen.w);
					game.vars.canvas.setAttribute('height', ggScene_object.screen.h);
					game.vars.ctx=game.vars.canvas.getContext('2d');
					game.vars.scene.fn.init(game);
					game.fn.addDraw(ggScene_object.fn.draw);
				}else{
					game.fn.errorMsg('ggScene not found');
				}
			},
			addUI:function(ggUI_object){
				if(ggUI){
					game.vars.ui=ggUI_object;
					game.vars.ui.fn.init(game);
					game.fn.addDraw(ggUI_object.score.fn.draw);
					game.fn.addDraw(ggUI_object.message.fn.draw);
				}else{
					game.fn.errorMsg('ggUI not found');
				}
			},
			addMain:function(ggMainChar_object){
				if(ggCharacter && ggMainChar){
					if( game.vars.objects.characters.mains && game.vars.objects.characters.mains.hasProperty('length') ){
					}else{
						game.vars.objects.characters.mains=[];
					}
					game.vars.objects.characters.mains.push(ggMainChar_object);
					ggMainChar_object.fn.init(game);
					game.fn.addDraw(ggMainChar_object.fn.draw);
				}else{
					game.fn.errorMsg('ggCharacter || ggMainChar not found');
				}
			},
			addEnemy:function(ggEnemyChar_object){
				if(ggCharacter && ggEnemyChar){
					if( game.vars.objects.characters.enemies && game.vars.objects.characters.enemies.hasProperty('length') ){
					}else{
						game.vars.objects.characters.enemies=[];
					}
					game.vars.objects.characters.enemies.push(ggEnemyChar_object);
					ggEnemyChar_object.fn.init(game);
					ggEnemyChar_object.fn.startIA();
					game.fn.addDraw(ggEnemyChar_object.fn.draw);
				}else{
					game.fn.errorMsg('ggCharacter || ggEnemyChar not found');
				}
			}
		}
	};

	//Set canvas
	game.vars.canvas=document.getElementById(canvasElm);
	game.fn.init();

	return game;
}