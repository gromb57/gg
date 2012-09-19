function ggMainChar(){
	ggCharacter.call(this);
	ggMainChar.extendBy(ggCharacter);
	// Ajout d'une nouvelle méthode
	/*ggMainChar.prototype.methodeC = function() {
		// code
	};*/

	var self=this;

	this.fn.init=function(ggCore_object){
		self.vars.core=ggCore_object;
		self.vars.body.h=100;//100
		self.vars.body.w=50;//50
		self.vars.body.x=50;
		self.vars.body.y=self.vars.core.vars.scene.screen.h - self.vars.core.vars.scene.ground.h;
		self.vars.body.vx=1.5;
		self.vars.body.vy=1.5;
		self.vars.body.isMoving=0;
		self.vars.body.isJumping=0;
		self.vars.body.isUp=1;
		self.vars.body.direction=1;//1 right, -1 left
		self.vars.move_timeout=null;
	};

	this.fn.draw=function(context){
		context.save();

		if(self.vars.body.x > self.vars.core.vars.scene.screen.w){
			self.vars.body.x=0;
		}else if(self.vars.body.x < 0){
			self.vars.body.x=self.vars.core.vars.scene.screen.w;
		}

		//DRAW
		self.fn.animation.moving();

		/*var date = new Date();
		var time = date.getTime();
		console.log(time);*/
		context.restore();
	};

	this.fn.move=function(){
		self.vars.move_timeout=setTimeout(function(){
			self.vars.body.x+=(self.vars.body.direction*self.vars.body.vx*10);
			self.vars.core.fn.draw();

			if(self.vars.body.isMoving){
				self.vars.body.skin.current=self.vars.body.skin.move;
				self.fn.move();
			}else{
				self.vars.body.skin.current=self.vars.body.skin.stand;
			}
		},
		1000/60);
	};

	this.fn.jump=function(){
		var __jump_px=6;//6
		var __jump_height=90;//90

		setTimeout(function(){
			if( self.vars.body.isJumping ){
				self.vars.body.skin.current=self.vars.body.skin.jump;

				if( self.vars.body.y ==  (self.vars.core.vars.scene.screen.h - self.vars.core.vars.scene.ground.h) ){
					self.vars.body.isJumping=0;
					self.vars.body.isUp=1;
				}else if( self.vars.body.isUp && self.vars.body.y != (self.vars.core.vars.scene.screen.h - self.vars.core.vars.scene.ground.h - __jump_height) ){
					self.vars.body.y+=(-__jump_px*self.vars.body.vy);
					self.fn.jump();
				}else{
					self.vars.body.isUp=0;
					self.vars.body.y+=(__jump_px*self.vars.body.vy);
					self.fn.jump();
				}
			}else{
				self.vars.body.skin.current=self.vars.body.skin.stand;

				ui.message.vars.isDisplayed=1;
				ui.message.vars.msg='JUMP !';

				self.vars.body.y+=(-__jump_px*self.vars.body.vy);
				self.vars.body.isJumping=1;

				self.fn.jump();
			}
			self.vars.core.fn.draw();
		},
		1000/60);
	};

	this.events.onContact=function(obj){
		ui.message.vars.isDisplayed=1;
		ui.message.vars.msg='Collision !';
	};
}