function ggSolid(){
	ggObject.call(this);
	ggSolid.extendBy(ggObject);

	var self=this;

	//constructor
	//default value
	self.vars.body.color='grey';

	self.fn.construct(arguments[0], arguments[1]);
}