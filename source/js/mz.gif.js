var aya = 0;
function loadGIF(){
	aya = (aya+1)%27;
	document.querySelectorAll('.mz').forEach(function(x){
		x.src="/img/mz/mz"+aya+".png";
	})
	setTimeout(loadGIF, 100);
}
var images = new Array()
function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image();
		images[i].src = preload.arguments[i];
	}
}

// document.onload=function(){
	var all = document.querySelectorAll("img")
	var ok = true;
	all.forEach(function (x) {
		ok = ok && x.classList.contains('mz');
	})
	if(ok){
		preload(
			"/img/mz/mz0.png",
			"/img/mz/mz1.png",
			"/img/mz/mz2.png",
			"/img/mz/mz3.png",
			"/img/mz/mz4.png",
			"/img/mz/mz5.png",
			"/img/mz/mz6.png",
			"/img/mz/mz7.png",
			"/img/mz/mz8.png",
			"/img/mz/mz9.png",
			"/img/mz/mz10.png",
			"/img/mz/mz11.png",
			"/img/mz/mz12.png",
			"/img/mz/mz13.png",
			"/img/mz/mz14.png",
			"/img/mz/mz15.png",
			"/img/mz/mz16.png",
			"/img/mz/mz17.png",
			"/img/mz/mz18.png",
			"/img/mz/mz19.png",
			"/img/mz/mz20.png",
			"/img/mz/mz21.png",
			"/img/mz/mz22.png",
			"/img/mz/mz23.png",
			"/img/mz/mz24.png",
			"/img/mz/mz25.png",
			"/img/mz/mz26.png");
		loadGIF();
	}
// };