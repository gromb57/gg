function ggCore(canvasElm){
	//object representing self
	var self=this,
	collision_buffer=null;

	self.vars={
		actions:{},
		canvas:null,
		ctx:null,
		loopTO:null,//loop timeout
		scene:null,//currentScene
		scenes:[],//array containing scene to load
		sceneIndex:0,//index of current scene
		toDraw:[],
		drawTimeout:null,
		ui:null
	};
	self.fn={
		action:{
			add:function(key, type, fn){
				if(self.vars.actions[key]){
				}else{
					self.vars.actions[key]={};
				}
				self.vars.actions[key][type]=fn;
			},
			rem:function(key, type){
				delete self.vars.actions[key][type];
			}
		},
		events:{
			collision:{
				launch:function(){
					//set buffer
					collision_buffer={};
					for(var x in self.vars.scene.objects){
						if(self.vars.scene.objects.hasOwnProperty(x)){
							collision_buffer[x]=[];
							for(var y in self.vars.scene.objects[x]){
								if(self.vars.scene.objects[x].hasOwnProperty(y)){
									collision_buffer[x][y]=self.vars.scene.objects[x][y];
								}
							}
						}
					}
					//check
					self.fn.events.collision.check();
				},
				/**
				* check object collisions
				*/
				check:function(){
					//browse objects
					for(var x in self.vars.scene.objects){
						if(self.vars.scene.objects.hasOwnProperty(x)){
							//browse objects type
							for(var y in self.vars.scene.objects[x]){
								if(self.vars.scene.objects[x].hasOwnProperty(y)){
									//check buffer objects
									for(var bx in collision_buffer){
										if(collision_buffer.hasOwnProperty(bx)){
											//check buff objects type
											for(var by in collision_buffer[bx]){
												if(collision_buffer[bx].hasOwnProperty(by)){
													if(self.vars.scene.objects[x][y].vars.id == collision_buffer[bx][by].vars.id){
													}else{
														self.vars.scene.objects[x][y].fn.isOnContact(collision_buffer[bx][by]);
													}
												}
											}
										}
									}
									//remove objects type from buffer
									delete collision_buffer[x][y];
								}
							}
							//remove objects from buffer
							delete collision_buffer[x];
						}
					}
				}
			}
		},
		physics:{
			gravity:function(obj){
				for(var x in obj){
					if(obj.hasOwnProperty(x)){
						for(var y in obj[x]){
							if(obj[x].hasOwnProperty(y)){
								if( (obj[x][y] instanceof ggCharacter) || (obj[x][y] instanceof ggMainChar) || (obj[x][y] instanceof ggEnemyChar) ){
									if(obj[x][y].vars.isFalling && !obj[x][y].vars.isJumping){
										obj[x][y].vars.body.y+=obj[x][y].vars.body.vy;
									}
								}
							}
						}
					}
				}
				self.fn.draw();
			}
		},
		errorMsg:function(msg){
			console.error(msg);
		},
		init:function(){
			self.fn.draw();
		},
		//draw self
		draw:function(){
			self.vars.drawTimeout=setTimeout(function(){
				//clearRect
				self.vars.ctx.clearRect(0, 0, self.vars.scene.screen.w, self.vars.scene.screen.h);
				//draw
				if(self.vars.toDraw.length > 0){
					for(var __funcKey in self.vars.toDraw){
						self.vars.toDraw[__funcKey](self.vars.ctx);
					}
					__funcKey=null;

					self.fn.events.collision.launch();
				}
			}, 1000/60);
		},
		loop:{
			start:function(){
				self.vars.loopTO=setTimeout(function(){
					if(self.vars.scene.isGravity){
						self.fn.physics.gravity(self.vars.scene.objects);
						self.fn.loop.start();
					}else{
						self.fn.loop.stop();
					}
				}, 1000/60);
			},
			stop:function(){
				clearTimeout(self.vars.loopTO);
			}
		},
		//stop refresh drawing
		stopDraw:function(){
			clearTimeout(self.vars.drawTimeout);
		},
		addDraw:function(funcName){
			self.vars.toDraw.push(funcName);
		},
		addScene:function(ggScene_object){
			if(ggScene){
				if(ggScene_object instanceof ggScene){
					self.vars.scenes.push(ggScene_object);
					if(self.vars.scenes.length==1){
						self.fn.loadScene(0);
					}
				}else{
					self.fn.errorMsg('object passed is not an instance of ggScene');
				}
			}else{
				self.fn.errorMsg('ggScene not found');
			}
		},
		loadScene:function(index){
			self.vars.sceneIndex=index;
			self.vars.scene=self.vars.scenes[index];
			self.vars.ctx=self.vars.canvas.getContext('2d');
			self.vars.scene.fn.init(self);
			self.fn.addDraw(self.vars.scene.fn.draw);
		},
		addUI:function(ggUI_object){
			if(ggUI){
				self.vars.ui=ggUI_object;
				self.vars.ui.fn.init(self);
				self.fn.addDraw(ggUI_object.score.fn.draw);
				self.fn.addDraw(ggUI_object.message.fn.draw);
			}else{
				self.fn.errorMsg('ggUI not found');
			}
		}
	};

	//PRIVATE
	function _keyEvts(event){
		if( self.vars.actions[event.which] && self.vars.actions[event.which][event.type] && typeof self.vars.actions[event.which][event.type] == "function" ) self.vars.actions[event.which][event.type]();
	}

	//CONSTRUCTOR
	//Set canvas
	self.vars.canvas=document.getElementById(canvasElm);
	self.fn.init();
	//init key events
	window.addEventListener('keydown', _keyEvts);
	window.addEventListener('keyup', _keyEvts);
}