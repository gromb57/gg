Object.prototype.extendBy=function(from){
	for (var element in from.prototype ) {
		this.prototype[element] = from.prototype[element];
	}
};

function ggUtils(){
	var self=this;
	this.fn={
		/**
		* add properties to object "to" from object "from"
		*/
		extend:function(to, from){
			for (var element in from.prototype ) {
				to.prototype[element] = from.prototype[element];
			}
		}
	};
}