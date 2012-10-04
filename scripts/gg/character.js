function ggCharacter(){
	ggObject.call(this);
	ggCharacter.extendBy(ggObject);

	var self=this;

	this.fn.draw=function(context){
		context.save();

		if(self.vars.body.x > self.core.vars.scene.screen.w){
			self.vars.body.x=0;
		}else if(self.vars.body.x < 0){
			self.vars.body.x=self.core.vars.scene.screen.w;
		}

		//DRAW
		self.fn.animation.moving();

		/*var date = new Date();
		var time = date.getTime();
		console.log(time);*/
		context.restore();
	};

	this.fn.animation={
		moving:function(){
			if(self.vars.body.skin.current){
			}else{
				self.vars.body.skin.current=self.vars.body.skin.stand;
			}

			switch(self.vars.body.skin.current.type){
				case 'img':
				var __img = new Image();   // Create new img element
				__img.src=self.vars.body.skin.current.data[self.vars.body.skin.pos];
				if( (self.vars.body.skin.pos == self.vars.body.skin.current.data.length-1) || (self.vars.body.skin.pos > self.vars.body.skin.current.data.length-1) ){
					self.vars.body.skin.pos=0;
				}else{
					self.vars.body.skin.pos++;
				}
				self.core.vars.ctx.drawImage(__img, self.vars.body.x, (self.vars.body.y - self.vars.body.h), self.vars.body.w, self.vars.body.h);
				break;
				default:
				self.core.vars.ctx.fillStyle = self.vars.body.color;
				self.core.vars.ctx.fillRect(self.vars.body.x, self.vars.body.y, self.vars.body.w, self.vars.body.h);
			}
		},
		jumping:function(){
		}
	};

	this.fn.skin={
		stand:{
			set:null,
			/**
			* @imgArray : (array) containing images needed for moving animation
			*/
			setByImg:function(imgArray){
				self.vars.body.skin.stand.type='img';
				if(typeof imgArray == 'string'){
					self.vars.body.skin.stand.data=[imgArray];
				}else{
					self.vars.body.skin.stand.data=imgArray;
				}
			}
		},
		move:{
			set:null,
			/**
			* @imgArray : (array) containing images needed for moving animation
			*/
			setByImg:function(imgArray){
				self.vars.body.skin.move.type='img';
				if(typeof imgArray == 'string'){
					self.vars.body.skin.move.data=[imgArray];
				}else{
					self.vars.body.skin.move.data=imgArray;
				}
			}
		},
		jump:{
			set:null,
			/**
			* @imgArray : (array) containing images needed for moving animation
			*/
			setByImg:function(imgArray){
				self.vars.body.skin.jump.type='img';
				if(typeof imgArray == 'string'){
					self.vars.body.skin.jump.data=[imgArray];
				}else{
					self.vars.body.skin.jump.data=imgArray;
				}
			}
		}
	};

	this.events.onContact=function(obj){
		//TODO : implements
	};
}