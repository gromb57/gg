function ggEnemyChar(){
	ggCharacter.call(this);
	ggEnemyChar.extendBy(ggCharacter);

	var self=this;
	this.vars.IATimeout=null;
	this.vars.isIA=1;

	this.fn.init=function(ggCore_object){
		self.vars.core=ggCore_object;
		self.vars.body.h=50;
		self.vars.body.w=50;
		self.vars.body.x=ggCore_object.vars.canvas.width / 2 - self.vars.body.w / 2;
		self.vars.body.y=ggCore_object.vars.scene.screen.h - ggCore_object.vars.scene.ground.h;
		self.vars.body.color='green';
	};

	this.fn.draw=function(context){
		context.save();
		/*context.fillStyle = monsters.body.color;
		context.fillRect(monsters.body.x, (monsters.body.y - monsters.body.h), monsters.body.w, monsters.body.h);*/
		self.fn.animation.moving();
		context.restore();
	};

	this.fn.IA=function(){
		if(self.vars.isIA){
			self.vars.IATimeout=setTimeout(function(){
				// update
				var date = new Date();
				var time = date.getTime();
				var amplitude = 150;
				var period = 4000; // in ms
				var centerX = self.vars.core.vars.canvas.width / 2 - self.vars.body.w / 2;
				var nextX = amplitude * Math.sin(time * 2 * Math.PI / period) + centerX;
				self.vars.body.x = nextX;

				self.vars.core.fn.draw();
				self.fn.IA();
			},
			1000/60);
		}
	};

	this.fn.startIA=function(){
		self.vars.isIA=1;
		self.fn.IA();
	};

	this.fn.stopIA=function(){
		self.vars.isIA=0;
		clearTimeout(self.vars.IATimeout);
	};
}