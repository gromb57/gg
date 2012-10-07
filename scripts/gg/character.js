function ggCharacter(){
	ggObject.call(this);
	ggCharacter.extendBy(ggObject);

	var self=this;

	this.fn.draw=function(context){
		context.save();

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

	this.events.onContact=function(obj, isTop, isRight, isBot, isLeft){
		if(obj instanceof ggSolid){
			self.vars.isFalling=0;
		}
	};

	this.vars.isFalling=1;
}