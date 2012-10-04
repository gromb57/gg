/**
* rectangle object
*/
function gRect(){
	gObject.call(this);
	gRect.extendBy(gObject);
	//properties
	this.points=null;//array of gPoint
	this.x=null;//coordinate x start point left bottom corner
	this.y=null;//coordinate y start point left bottom corner
	this.w=null;//width
	this.h=null;//height

	//function
	this.is=function(p1, p2, p3, p4){
		var __is=true;

		//TODO : implement

		return __is;
	};

	this.draw=function(ctx, style){
		ctx.save();

		if(style) ctx.fillStyle = style;
		ctx.fillRect(this.x, this.y, this.w, this.h);

		ctx.restore();
	};

	//constructor
	if(arguments.length > 0){
		if( (arguments[0] instanceof gPoint) && (arguments[1] instanceof gPoint) && (arguments[2] instanceof gPoint) && (arguments[3] instanceof gPoint) ){
			if(this.is(arguments[0], arguments[1], arguments[2], arguments[3])){
				this.points=[arguments[0], arguments[1], arguments[2], arguments[3]];
				this.x=arguments[0].x;
				this.y=arguments[0].y;
				this.w=arguments[2].x;
				this.h=arguments[1].y;
			}else{
				throw new TypeError("gRect.constructor : not a valid rectangle");
			}
		}else if( (arguments[0] instanceof gPoint) && (typeof parseInt(arguments[1], 10) == 'number') && (typeof parseInt(arguments[2], 10) == 'number') ){
			this.x=arguments[0].x;
			this.y=arguments[0].y;
			this.w=arguments[1];
			this.h=arguments[2];
			this.points=[new gPoint(this.x, this.y), new gPoint(this.x, (this.y+this.h)), new gPoint((this.x+this.w), (this.y+this.h)), new gPoint((this.x+this.w), this.y)];
		}else if( (typeof parseInt(arguments[0], 10) == 'number') && (typeof parseInt(arguments[1], 10) == 'number') && (typeof parseInt(arguments[2], 10) == 'number') && (typeof parseInt(arguments[3], 10) == 'number') ){
			this.x=arguments[0];
			this.y=arguments[1];
			this.w=arguments[2];
			this.h=arguments[3];
			this.points=[new gPoint(this.x, this.y), new gPoint(this.x, (this.y+this.h)), new gPoint((this.x+this.w), (this.y+this.h)), new gPoint((this.x+this.w), this.y)];
		}else{
			throw new TypeError("gRect.constructor : bad arguments");
		}
	}
}