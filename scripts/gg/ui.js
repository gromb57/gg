function ggUI(){
	var self=this;
	self.core=null;
	self.vars={};
	self.fn={
		init:function(ggCore_object){
			self.core=ggCore_object;
			self.actions.set();
		}
	};
	self.actions={
		kd:{
			escape:function(){
				if(self.pause.vars.isPaused){
					self.pause.fn.unset();
				}else{
					self.pause.fn.set();
				}
			}
		},
		set:function(){
			//keydown
			self.core.fn.action.add(27, "keydown", self.actions.kd.escape);//escape
		}
	};
	self.score={
		vars:{
			value:0,
			h:scene.screen.h/10,
			w:scene.screen.w/5,
			padding:10
		},
		fn:{
			draw:function(ctx){
				ctx.save();
				ctx.beginPath();
				ctx.moveTo((self.score.vars.w*0.5+self.score.vars.padding), self.score.vars.padding);//milieu haut
				ctx.lineTo((self.score.vars.w*0.75+self.score.vars.padding), self.score.vars.padding);//3/4 haut
				ctx.quadraticCurveTo(self.score.vars.w+self.score.vars.padding, self.score.vars.padding, self.score.vars.w+self.score.vars.padding, (self.score.vars.h*0.25+self.score.vars.padding));//1/4 droite
				ctx.lineTo((self.score.vars.w+self.score.vars.padding), self.score.vars.h*0.75+self.score.vars.padding);//3/4 droite
				ctx.quadraticCurveTo((self.score.vars.w+self.score.vars.padding), (self.score.vars.h+self.score.vars.padding), (self.score.vars.w*0.75+self.score.vars.padding), (self.score.vars.h+self.score.vars.padding));//3/4 bas
				ctx.lineTo((self.score.vars.w*0.25+self.score.vars.padding), (self.score.vars.h+self.score.vars.padding));//1/4 bas
				ctx.quadraticCurveTo(self.score.vars.padding, (self.score.vars.h+self.score.vars.padding), self.score.vars.padding, (self.score.vars.h*0.75+self.score.vars.padding));
				ctx.lineTo(self.score.vars.padding, (self.score.vars.h*0.25+self.score.vars.padding));
				ctx.quadraticCurveTo(self.score.vars.padding, self.score.vars.padding, (self.score.vars.h+self.score.vars.padding), self.score.vars.padding);
				ctx.closePath();

				var scoreGrad = ctx.createLinearGradient(0, self.score.vars.padding , 0, (self.score.vars.h+self.score.vars.padding));
				scoreGrad.addColorStop(0, '#ccc');
				scoreGrad.addColorStop(1, '#aaa');

				ctx.fillStyle = scoreGrad;
				ctx.fill();
				ctx.strokeStyle = '#333';
				ctx.stroke();
				ctx.font = "20px Arial";
				ctx.fillStyle = '#333';
				ctx.fillText("Score : "+self.score.vars.value, (self.score.vars.padding*2), (self.score.vars.padding*4));
				ctx.restore();
			}
		}
	};
	self.pause={
		vars:{
			isPaused:0
		},
		fn:{
			draw:function(){
				var ctx=self.core.vars.ctx;
				ctx.save();

				//background
				var __background={};
				__background.x=scene.screen.w*0.2;
				__background.y=scene.screen.h*0.2;
				__background.w=scene.screen.w*0.6;
				__background.h=scene.screen.h*0.6;

				ctx.fillStyle='#333';
				ctx.fillRect(__background.x, __background.y, __background.w, __background.h);

				//title
				var __title='Pause';
				ctx.shadowOffsetX = 0;  
				ctx.shadowOffsetY = 0;  
				ctx.shadowBlur = 2;  
				ctx.shadowColor = "#c63";

				ctx.font = "60px Arial";
				ctx.fillStyle = '#F4C06C';
				var __lbl_dim=ctx.measureText(__title);
				ctx.fillText(__title, ((scene.screen.w/2)-__lbl_dim.width/2), (__background.y+50));
				__lbl_dim=null;

				ctx.restore();
				ctx=__title=__background=null;
			},
			set:function(){
				self.pause.vars.isPaused=1;
				self.core.fn.stopDraw();
				self.pause.fn.draw();
			},
			unset:function(){
				self.pause.vars.isPaused=0;
				self.core.fn.draw();
			}
		}
	};
	self.message={
		vars:{
			msg:'',
			isDisplayed:0,
			timeout:null
		},
		fn:{
			draw:function(){
				var ctx=self.core.vars.ctx;
				ctx.save();
				ctx.shadowOffsetX = 0;  
				ctx.shadowOffsetY = 0;  
				ctx.shadowBlur = 2;  
				ctx.shadowColor = "#c63";

				ctx.font = "60px Arial";
				ctx.fillStyle = '#F4C06C';
				var __lbl_dim=ctx.measureText(self.message.vars.msg);
				ctx.fillText(self.message.vars.msg, ((scene.screen.w/2)-__lbl_dim.width/2), 50);
				__lbl_dim=null;
				ctx.restore();

				if( self.message.vars.isDisplayed ){
					clearTimeout(self.message.vars.timeout);
					self.message.vars.timeout=setTimeout(function(){
						self.message.vars.msg='';
						self.core.fn.draw();
					}, 1000);
					self.message.vars.isDisplayed=0;
				}
				ctx=null;
			},
			set:function(msg){
				self.message.vars.isDisplayed=1;
				self.message.vars.msg=msg;
			}
		}
	};
}