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
			self.vars.body.skin.current ? 0 : self.fn.skin.change("stand");
			self.fn.drawObj();
		},
		jumping:function(){
		}
	};

	this.events.onContact=function(obj){
		//TODO : implements
	};
}