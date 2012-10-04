function ggObject(){
	var self=this;
	this.core=null;
	this.vars={
		body:{
			color:"white",
			h:100,//100
			w:50,//50
			x:50,
			y:0,
			vx:1,
			vy:1,
			skin:{
				current:null,
				pos:0,
				stand:{
				},
				move:{
				},
				jump:{
				}
			}
		},
		id:null
	};
	this.fn={
		construct:function(){
			if(arguments[0]){
				if(typeof arguments[0] == "object"){
					if(arguments[0].id){
						self.vars.id=arguments[0].id;
					}
					if(arguments[0].x){
						self.vars.body.x=arguments[0].x;
					}
					if(arguments[0].y){
						self.vars.body.y=arguments[0].y;
					}
					if(arguments[0].h){
						self.vars.body.h=arguments[0].h;
					}
					if(arguments[0].w){
						self.vars.body.w=arguments[0].w;
					}
				}
			}

			if(arguments[1]){
				self.fn.init(arguments[1]);
			}
		},
		draw:function(){
			self.core.vars.ctx.save();

			//DRAW
			self.core.vars.ctx.fillStyle = self.vars.body.color;
			self.core.vars.ctx.fillRect(self.vars.body.x, self.vars.body.y, self.vars.body.w, self.vars.body.h);

			/*var date = new Date();
			var time = date.getTime();
			console.log(time);*/
			self.core.vars.ctx.restore();
		},
		init:function(ggCore_object){
			self.core=ggCore_object;
			ggCore_object.fn.addDraw(self.fn.draw);
		},
		isOnContact:function(obj){
			var __is=true, __isX=false, __isY=false;
			//x
			for(var __i=self.vars.body.x;__i<=(self.vars.body.x+self.vars.body.w);__i++){
				if( (obj.vars.body.x<=__i) && (__i<=(obj.vars.body.x+obj.vars.body.w)) ){
					__isX=true;
					break;
				}
			}
			//y
			for(var __i=self.vars.body.y;__i<=(self.vars.body.y+self.vars.body.h);__i++){
				if( (obj.vars.body.y<=__i) && (__i<=(obj.vars.body.y+obj.vars.body.h)) ){
					__isY=true;
					break;
				}
			}
			__is&=(__isX && __isY);

			if(__is) self.events.onContact(obj);
		}
	};
	this.events={
		onContact:function(obj){
			
		}
	};
}