function ggScene(){
	var self=this, __fn;

	self.core=null;
	self.name='';
	self.type='';
	self.screen={
		w:document.width,
		h:document.height-5
	};
	self.ground={
		h:0
	};
	self.objects={
		characters:{
			mains:[],
			enemies:[]
		},
		items:[],
		solids:[],
		liquids:[]
	};
	self.fn={
		init:function(ggCore_object){
			scene.core=ggCore_object;
			scene.ground.h=scene.screen.h/10;
		},
		draw:function(context){
			/*context.save();
			//sky
			var skyGrad = context.createLinearGradient(0, 0 , 0, scene.screen.h);
			skyGrad.addColorStop(0, '#CBE4FA');
			skyGrad.addColorStop(0.5, '#70C0F8');

			context.fillStyle = skyGrad;
			context.fillRect(0, 0, scene.screen.w, scene.screen.h);

			//ground
			var groundGrad = context.createLinearGradient(0, (scene.screen.h - scene.ground.h) , 0, scene.screen.h);
			groundGrad.addColorStop(0, '#00AB00');
			groundGrad.addColorStop(0.1, '#582629');
			groundGrad.addColorStop(1, '#D4B58D');

			context.fillStyle = groundGrad;
			context.fillRect(0, (scene.screen.h - scene.ground.h), scene.screen.w, scene.screen.h);

			//cloud
			var cloud={};

			context.restore();*/
		},
		load:function(){
			//this is an url
			if(typeof arguments[0] == "string"){
				ggAjax(arguments[0], function(){
					__fn.load(JSON.parse(arguments[0]));
				});
			}else if(typeof arguments[0] == "object"){
				__fn.load(arguments[0]);
			}
		}
	};

	__fn={
		load:function(obj){
			if(obj.name) self.name=obj.name;
			if(obj.height) self.screen.h=obj.height;
			if(obj.width) self.screen.w=obj.width;
			if(obj.objects){
				for(var x in obj.objects){
					if(obj.objects.hasOwnProperty(x)){
						__fn.loadObj(obj.objects[x]);
					}
				}
			}
			self.core.fn.draw();
		},
		loadObj:function(obj){
			if(obj.type){
				switch(obj.type){
					case "enemy":
					if(ggEnemyChar){
						if( self.objects.characters.enemies && self.objects.characters.enemies.length ){
						}else{
							self.objects.characters.enemies=[];
						}
						var enemy=new ggEnemyChar(obj, self.core);
						self.objects.characters.enemies.push(enemy);
						//enemy.fn.startIA();
					}else{
						self.core.fn.errorMsg('ggEnemyChar not found');
					}
					break;
					case "item":
					//TODO : implements
					break;
					case "liquid":
					//TODO : implements
					break;
					case "particle":
					//TODO : implements
					break;
					case "sprite":
					//TODO : implements
					break;
					case "solid":
					if(ggSolid){
						if( self.objects.solids && self.objects.solids.length ){
						}else{
							self.objects.solids=[];
						}

						var solid=new ggSolid(obj, self.core);
						self.objects.solids.push(solid);
					}else{
						self.core.fn.errorMsg('ggSolid not found');
					}
					break;
					case "character":
					case "spawn":
					if(ggMainChar){
						if( self.objects.characters.mains && self.objects.characters.mains.length ){
						}else{
							self.objects.characters.mains=[];
						}
						var mainChar=new ggMainChar(obj, self.core);
						self.objects.characters.mains.push(mainChar);
					}else{
						self.core.fn.errorMsg('ggMainChar not found');
					}
					break;
					default:
				}
			}else{
				throw "type property not found";
			}
		}
	};

	//constructor
	if(arguments[0]){
		self.fn.load(arguments[0]);
	}
}