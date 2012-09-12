function ggScene(){
	var scene={
		core:null,
		screen:{
			w:document.width,
			h:document.height-5
		},
		ground:{
			h:0
		},
		fn:{
			init:function(ggCore_object){
				scene.core=ggCore_object;
				scene.ground.h=scene.screen.h/10;
			},
			draw:function(context){
				context.save();
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

				context.restore();
			}
		}
	};
	return scene;
}