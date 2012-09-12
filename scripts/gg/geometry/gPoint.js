function gPoint(){
	gObject.call(this);
	gPoint.extendBy(gObject);

	this.x=arguments[0];
	this.y=arguments[1];
}