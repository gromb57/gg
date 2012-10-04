function ggEnemyChar(){
	ggCharacter.call(this);
	ggEnemyChar.extendBy(ggCharacter);

	var self=this;
	this.vars.IATimeout=null;
	this.vars.isIA=1;

	this.fn.IA=function(){
		if(self.vars.isIA){
			self.vars.IATimeout=setTimeout(function(){
				// update
				var date = new Date(),
				time = date.getTime(),
				amplitude = 150,
				period = 4000,// in ms
				centerX = self.core.vars.canvas.width / 2 - self.vars.body.w / 2,
				nextX = amplitude * Math.sin(time * 2 * Math.PI / period) + centerX;
				self.vars.body.x = nextX;

				self.core.fn.draw();
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

	//constructor
	//default value
	self.vars.body.color='red';

	self.fn.construct(arguments[0], arguments[1]);
}