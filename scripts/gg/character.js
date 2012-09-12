function ggCharacter(){
	ggObject.call(this);
	ggCharacter.extendBy(ggObject);

	var self=this;

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
				self.vars.core.vars.ctx.drawImage(__img, self.vars.body.x, (self.vars.body.y - self.vars.body.h), self.vars.body.w, self.vars.body.h);
				break;
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
}