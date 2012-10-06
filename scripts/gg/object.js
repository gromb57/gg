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
				current:null,//current skin
				pos:0,//index used for img type to know which step in animation is currently displayed
				stand:{
				},
				move:{
				},
				jump:{
				}
			}
		},
		id:null,
		isFalling:0,
		on:null//reference to another object
	};
	this.fn={
		construct:function(){
			if(arguments[0]){
				if(typeof arguments[0] == "object"){
					if(arguments[0].id){
						self.vars.id=arguments[0].id;
					}
					if(arguments[0].x){
						self.vars.body.x=parseInt(arguments[0].x, 10);
					}
					if(arguments[0].y){
						self.vars.body.y=parseInt(arguments[0].y, 10);
					}
					if(arguments[0].h){
						self.vars.body.h=parseInt(arguments[0].h, 10);
					}
					if(arguments[0].w){
						self.vars.body.w=parseInt(arguments[0].w, 10);
					}
					//default stand skin
					self.fn.skin.set();
					if(arguments[0].skin){
						for(var x in arguments[0].skin){
							if(arguments[0].skin.hasOwnProperty(x)){
								self.fn.skin.set(x, arguments[0].skin[x].type, arguments[0].skin[x].data);
							}
						}
					}
					self.fn.skin.change("stand");
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
		drawObj:function(){
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
				case 'rect':
				if(self.vars.body.skin.current.data instanceof gRect){
					self.vars.body.skin.current.data.draw(self.core.vars.ctx);
				}else{
					throw "object type is rect but data are invalid";
				}
				break;
				default:
				self.core.vars.ctx.fillStyle = self.vars.body.color;
				self.core.vars.ctx.fillRect(self.vars.body.x, self.vars.body.y, self.vars.body.w, self.vars.body.h);
			}
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

			//test if object is on another
			if(self.vars.on && self.vars.on.vars.id == obj.vars.id ){
				if(__is){
				}else{
					self.vars.on=null;
				}
			}else{
				if(__is){
					self.vars.on=obj;
					self.events.onContact(obj);
				}
			}
		},
		skin:{
			change:function(sel){
				if(self.vars.body.skin[sel]) self.vars.body.skin.current=self.vars.body.skin[sel];
			},
			set:function(stance, type, data){
				stance=stance == undefined ? "stand" : stance ;

				var data;

				switch(type){
					case "img":
					self.vars.body.skin.stand.type='img';
					self.vars.body.skin.stand.data=typeof data == 'string' ? [data] : data;
					break;
					case "rect":
					default:
					data=new gRect(self.vars.body.x, self.vars.body.y, self.vars.body.w, self.vars.body.h);
				}
				self.vars.body.skin[stance].type=type;
				self.vars.body.skin[stance].data=data;
			}
		}
	};
	this.events={
		onContact:function(obj){
			
		}
	};
}