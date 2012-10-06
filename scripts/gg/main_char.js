function ggMainChar(){
	ggCharacter.call(this);
	ggMainChar.extendBy(ggCharacter);
	// Ajout d'une nouvelle méthode
	/*ggMainChar.prototype.methodeC = function() {
		// code
	};*/

	var self=this;

	this.fn.move=function(){
		self.vars.moveTO=setTimeout(function(){
			self.vars.body.x+=(self.vars.direction*self.vars.body.vx*10);
			self.core.fn.draw();

			if(self.vars.isMoving){
				self.fn.skin.change("move");
				self.fn.move();
			}else{
				self.fn.skin.change("stand");
			}
		},
		1000/60);
	};

	this.fn.jump=function(){
		var __jump_px=6,//6
		__jump_height=90;//90

		self.vars.jumpTO=setTimeout(function(){
			//char is jumping
			if( self.vars.isJumping ){
				//set skin
				self.fn.skin.change("jump");

				if( self.vars.isUp && self.vars.body.y > (self.vars.b4jumpPos - __jump_height) ){
					self.vars.body.y+=(-__jump_px*self.vars.body.vy);
					self.fn.jump();
				}else{
					self.vars.isUp=0;
					self.vars.body.y+=(__jump_px*self.vars.body.vy);
					self.fn.jump();
				}
			}else{//char start jump
				//set skin
				self.fn.skin.change("stand");

				//display message
				if(self.core.vars.ui){
					self.core.vars.ui.message.fn.set('JUMP !');
				}

				self.vars.b4jumpPos=self.vars.body.y;
				self.vars.isJumping=1;

				self.fn.jump();
			}
			self.core.fn.draw();
		},
		1000/60);
	};

	this.fn.actions={
		kd:{
			left:function(){
				if(self.vars.isMoving){
					if(self.vars.direction==1){
						clearTimeout(self.vars.moveTO);
					}
					
				}else{
					self.vars.isMoving=1;
					self.vars.direction=-1;
					self.fn.move();
				}
			},
			top:function(){
				if( self.vars.isJumping ){
				}else{
					self.fn.jump();
				}
			},
			right:function(){
				if(self.vars.isMoving){
					if(self.vars.direction==-1){
						clearTimeout(self.vars.moveTO);
					}
				}else{
					self.vars.isMoving=1;
					self.vars.direction=1;
					self.fn.move();
				}
			},
			bottom:function(){
				
			}
		},
		ku:{
			left:function(){
				self.vars.isMoving=0;
				clearTimeout(self.vars.moveTO);
			},
			top:function(){
				
			},
			right:function(){
				self.vars.isMoving=0;
				clearTimeout(self.vars.moveTO);
			},
			bottom:function(){
				
			}
		},
		set:function(){
			//keydown
			self.core.fn.action.add(37, "keydown", self.fn.actions.kd.left);//left
			self.core.fn.action.add(38, "keydown", self.fn.actions.kd.top);//top
			self.core.fn.action.add(39, "keydown", self.fn.actions.kd.right);//right
			self.core.fn.action.add(40, "keydown", self.fn.actions.kd.bottom);//bottom
			//keyup
			self.core.fn.action.add(37, "keyup", self.fn.actions.ku.left);//left
			self.core.fn.action.add(38, "keyup", self.fn.actions.ku.top);//top
			self.core.fn.action.add(39, "keyup", self.fn.actions.ku.right);//right
			self.core.fn.action.add(40, "keyup", self.fn.actions.ku.bottom);//bottom
		}
	};

	this.events.onContact=function(obj){
		if(obj instanceof ggEnemyChar){
			self.core.vars.ui.message.fn.set('Collision with an enemy !');
		}else if(obj instanceof ggSolid){
			self.vars.isFalling=0;
			self.vars.isJumping=0;
			self.vars.isUp=1;
			clearTimeout(self.vars.jumpTO);
		}
	};

	//constructor
	//default value
	self.vars.body.color='green';
	self.vars.body.vx=1.5;
	self.vars.body.vy=1.5;
	self.vars.isMoving=0;
	self.vars.isJumping=0;
	self.vars.b4jumpPos=0;
	self.vars.jumpTO=null;//jump timeout
	self.vars.isUp=1;//direction of jump; 1=up, 0=down
	self.vars.direction=1;//1 right, -1 left
	self.vars.moveTO=null;//timeout for movement

	self.fn.construct(arguments[0], arguments[1]);
	self.fn.actions.set();
}