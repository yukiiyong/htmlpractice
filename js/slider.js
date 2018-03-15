(function(){
	const sliders=$("sliders");
	const pre = $("pre");
	const next = $("next");
	var Slider = function(){
		this.slider=sliders.children;
		console.log(this.slider);
		this.sliderLen =  this.slider.length -1;
		this.timer=null;
		this.current = 0;
		this.isAuto = true;
		this.duration ={
			auto: 5000,
			slider: 1400
		};
		this.running = false;
		this.autoPlay(this.slider);
		pre.addEventListener('click',(e) => {
			if(this.running) {return;}
			if(this.isAuto) {
				this.isAuto = false;
			}
			this.process(this.slider, -1);
		})
		next.addEventListener('click',(e) => {
			if(this.running) {return;}
			if(this.isAuto) {
				this.isAuto = false;
			}
			this.process(this.slider, 1);
		})
	};
	Slider.prototype.process = function(slider, num) {
		num = parseInt(num);
		clearTimeout(this.timer);
		let currentIndex = this.current;
		let nextIndex = checkNum(this.current, num, slider)
		console.log(1)
		slider[currentIndex].className = 'slider hide'
		slider[currentIndex].style.zIndex = '30'
		slider[nextIndex].style.zIndex = '20'	
		timer=setTimeout(() => {
			running =true;
			slider[currentIndex].className = 'slider';
			slider[currentIndex].style.zIndex = '10';
			slider[nextIndex].style.zIndex = '30';
			this.current = nextIndex;
			running=false;
		}, this.duration.slider)
		if(!this.isAuto) {
			this.isAuto=true;
			this.autoPlay(this.slider);
		}
	};
	Slider.prototype.autoPlay =function(slider) {
		clearTimeout(this.timer)
		this.timer = setTimeout(()=> {
			this.process(slider, 1);
			this.autoPlay(slider);
		},this.duration.auto)
	};
	var slider = new Slider();
	function $(id) {
		return document.getElementById(id) || id
	}
	function checkNum(index, num, slider) {
		let cI = index + num;
		if(num > 0) {
			if(cI === slider.length -1) {
				cI =0;
			}
		} else {
			if(cI === -1) {
				cI = slider.length -2;
			}
		}	
		return cI;
	}
})();