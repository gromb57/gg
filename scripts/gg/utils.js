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

function ggAjax(){
	var self=this;
	self.config={
		url:'',
		method:'get',
		data:null,
		success:null,
		error:null,
		complete:null
	};

	function createXMLHttp(){
		//Initializing our object
		var xmlHttp = null;
		//if XMLHttpRequest is available then creating and returning it
		if(typeof(XMLHttpRequest) != undefined){
			xmlHttp = new XMLHttpRequest;
			return xmlHttp;
			//if window.ActiveXObject is available than the user is using IE...so we have to create the newest version XMLHttp object
		}else if(window.ActiveXObject){
			var ieXMLHttpVersions = ['MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 'Microsoft.XMLHttp'];
			//In this array we are starting from the first element (newest version) and trying to create it. If there is an
			//exception thrown we are handling it (and doing nothing ^^)
			for(var i = 0; i < ieXMLHttpVersions.length; i++){
				try {
					xmlHttp = new ActiveXObject(ieXMLHttpVersions[i]);
					return xmlHttp;
				} catch (e) {
				}
			}
		}
	}

	function getData(url, method, data, CB_success){
		var xmlHttp = createXMLHttp();
		xmlHttp.open(method, url, true);
		xmlHttp.send(insinfo(data));
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState===4){
				if(xmlHttp.status===200) {
					//var rspH=xmlHttp.getAllResponseHeaders();
					if(CB_success){
						CB_success(xmlHttp.responseText);
					}
				}else{
				}
			}else{
				//still loading
			}
		};
	}

	function insinfo(sendForm){
		if(sendForm){
			var dataArray = [];
			//Getting the data from all elements in the form
			for (var i = 0; i < sendForm.elements.length; i++) {
				var encodedData = encodeURIComponent(sendForm.elements[i].name);
				encodedData += "=";
				encodedData += encodeURIComponent(sendForm.elements[i].value);
				dataArray.push(ProM);
			}
			return dataArray.join("&");
		}else{
			return ;
		}
	}

	if(arguments){
		//url
		if(arguments[0] && typeof arguments[0]=='string'){
			self.config.url=arguments[0];
		}
		//config
		if(arguments[1]){
			//TODO : implements config set
			if(typeof arguments[1] == 'object'){
				
			}else if(typeof arguments[1] == 'function'){
				self.config.success=arguments[1];
			}
		}
		getData(self.config.url, self.config.method, self.config.data, self.config.success);
	}else{
		console.error("[ggAjax] no arguments");
	}
}