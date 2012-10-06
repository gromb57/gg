function ggCore(canvasElm){
	//object representing self
	var self=this;

	self.vars={
		actions:{},
		canvas:null,
		ctx:null,
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
				/**
				* check object collisions
				*/
				check:function(obj){
					for(var __x in obj){
						if(obj.hasOwnProperty(__x)){
							if(__x != "mains"){
								if( obj[__x].hasOwnProperty('vars') && obj[__x].vars.hasOwnProperty('body') ){
									for(var __y in self.vars.scene.objects.characters.mains){
										if(self.vars.scene.objects.characters.mains.hasOwnProperty(__y)){
											self.vars.scene.objects.characters.mains[__y].fn.isOnContact(obj[__x]);
										}
									}
								}else{
									self.fn.events.collision.check(obj[__x]);
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
			self.fn.draw();
		},
		//draw self
		draw:function(){
			var __timeout=1000 / 60;
			self.vars.drawTimeout=setTimeout(function(){
				//clearRect
				self.vars.ctx.clearRect(0, 0, self.vars.scene.screen.w, self.vars.scene.screen.h);
				//draw
				if(self.vars.toDraw.length > 0){
					for(var __funcKey in self.vars.toDraw){
						self.vars.toDraw[__funcKey](self.vars.ctx);
					}
					__funcKey=null;
					
					self.fn.events.collision.check(self.vars.scene.objects);
				}
			},
			__timeout);
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