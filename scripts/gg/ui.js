function ggUI(){
	var ui={
		vars:{
			core:null
		},
		fn:{
			init:function(ggCore_object){
				ui.vars.core=ggCore_object;
			}
		},
		score:{
			vars:{
				value:0,
				h:scene.screen.h/10,
				w:scene.screen.w/5,
				padding:10
			},
			fn:{
				draw:function(context){
					context.save();
					context.beginPath();
					context.moveTo((ui.score.vars.w*0.5+ui.score.vars.padding), ui.score.vars.padding);//milieu haut
					context.lineTo((ui.score.vars.w*0.75+ui.score.vars.padding), ui.score.vars.padding);//3/4 haut
					context.quadraticCurveTo(ui.score.vars.w+ui.score.vars.padding, ui.score.vars.padding, ui.score.vars.w+ui.score.vars.padding, (ui.score.vars.h*0.25+ui.score.vars.padding));//1/4 droite
					context.lineTo((ui.score.vars.w+ui.score.vars.padding), ui.score.vars.h*0.75+ui.score.vars.padding);//3/4 droite
					context.quadraticCurveTo((ui.score.vars.w+ui.score.vars.padding), (ui.score.vars.h+ui.score.vars.padding), (ui.score.vars.w*0.75+ui.score.vars.padding), (ui.score.vars.h+ui.score.vars.padding));//3/4 bas
					context.lineTo((ui.score.vars.w*0.25+ui.score.vars.padding), (ui.score.vars.h+ui.score.vars.padding));//1/4 bas
					context.quadraticCurveTo(ui.score.vars.padding, (ui.score.vars.h+ui.score.vars.padding), ui.score.vars.padding, (ui.score.vars.h*0.75+ui.score.vars.padding));
					context.lineTo(ui.score.vars.padding, (ui.score.vars.h*0.25+ui.score.vars.padding));
					context.quadraticCurveTo(ui.score.vars.padding, ui.score.vars.padding, (ui.score.vars.h+ui.score.vars.padding), ui.score.vars.padding);
					context.closePath();

					var scoreGrad = context.createLinearGradient(0, ui.score.vars.padding , 0, (ui.score.vars.h+ui.score.vars.padding));
					scoreGrad.addColorStop(0, '#ccc');
					scoreGrad.addColorStop(1, '#aaa');

					context.fillStyle = scoreGrad;
					context.fill();
					context.strokeStyle = '#333';
					context.stroke();
					context.font = "20px Arial";
					context.fillStyle = '#333';
					context.fillText("Score : "+ui.score.vars.value, (ui.score.vars.padding*2), (ui.score.vars.padding*4));
					context.restore();
				}
			}
		},
		pause:{
			fn:{
				draw:function(){
					var context=ui.vars.core.vars.ctx;
					context.save();

					//background
					var __background={};
					__background.x=scene.screen.w*0.2;
					__background.y=scene.screen.h*0.2;
					__background.w=scene.screen.w*0.6;
					__background.h=scene.screen.h*0.6;

					context.fillStyle='#333';
					context.fillRect(__background.x, __background.y, __background.w, __background.h);

					//title
					var __title='Pause';
					context.shadowOffsetX = 0;  
					context.shadowOffsetY = 0;  
					context.shadowBlur = 2;  
					context.shadowColor = "#c63";

					context.font = "60px Arial";
					context.fillStyle = '#F4C06C';
					var __lbl_dim=context.measureText(__title);
					context.fillText(__title, ((scene.screen.w/2)-__lbl_dim.width/2), (__background.y+50));
					__lbl_dim=null;

					context.restore();
					context=__title=__background=null;
				}
			}
		},
		message:{
			vars:{
				msg:'',
				isDisplayed:0,
				timeout:null
			},
			fn:{
				draw:function(){
					var context=ui.vars.core.vars.ctx;
					context.save();
					context.shadowOffsetX = 0;  
					context.shadowOffsetY = 0;  
					context.shadowBlur = 2;  
					context.shadowColor = "#c63";

					context.font = "60px Arial";
					context.fillStyle = '#F4C06C';
					var __lbl_dim=context.measureText(ui.message.vars.msg);
					context.fillText(ui.message.vars.msg, ((scene.screen.w/2)-__lbl_dim.width/2), 50);
					__lbl_dim=null;
					context.restore();

					if( ui.message.vars.isDisplayed ){
						clearTimeout(ui.message.vars.timeout);
						ui.message.vars.timeout=setTimeout(function(){
							ui.message.vars.msg='';
							ui.vars.core.fn.draw();
						}, 1000);
						ui.message.vars.isDisplayed=0;
					}
					context=null;
				}
			}
		}
	};

	return ui;
}