function ggObject(){
	var self=this;
	this.vars={
		core:null,
		body:{
			h:100,//100
			w:50,//50
			x:50,
			y:0,
			vx:1.5,
			vy:1.5,
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
		}
	};
	this.fn={
		init:function(ggCore_object){
			self.vars.core=ggCore_object;
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