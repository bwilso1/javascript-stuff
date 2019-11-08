	//https://www.w3schools.com/jsref/met_win_clearinterval.asp
	//
	
	//ID’s = ‘#’ ‘.’ = classes.
	
	var clicks = 0;
	//function varialbes
	var timerLoop = null;
	var moleUpLoop = null;
	var moleDownLoop = null;

	//game variables
	var timeLeft = 0;
	var score = 0;
	var maxScore = 0;
	var setTimeLeft = 30;	//in seconds
	var moleClickableTime = 750; // in miliseconds
	var activeGame = false;
	var keyName = "highScore";  //name for local storage element
	console.log("begin script");
	
	if(window.localStorage.getItem(keyName) != null){
		console.log("previous high score exists in storage");
		document.getElementById("maxScore").innerHTML = window.localStorage.getItem(keyName);
	}
	
	//get all moles
	var moles = document.querySelectorAll(".mole");
	
	//---------------------adding event listeners------------------------------
	// (done at end of function declarations)
	
	
	
	// gameHelper
	//a function that checks if game is running, if so it displays a confirmation 
	// if no active game, it starts a new one
	function gameHelper(){
		if(activeGame == true){
			console.log("clicked start while game active");
			//prompt handles pausing.
			var resp = confirm("Restart game?  \nOK to restart, Cancel to continue");
			if(resp == true){
				console.log("restarting game");
				stop();
				start();
			}
		}
		else{
			activeGame = true;
			start();
			console.log("game started");
		}
		
	}
	
	// stop()
	// function that stops timers and cleans up game
	function stop(){
		
		clearInterval(timerLoop);
		clearInterval(moleUpLoop);
		document.getElementById("time").innerHTML = "Game Over"
		activeGame = false;
		if(score > maxScore){
			maxScore = score;
			document.getElementById("maxScore").innerHTML = maxScore;
			setMem(score);
			//alert("new high score!");
		}
		
		console.log("game ended via stop()");
	}
	
	
	//start()
	// function that starts all timer loops and begins game
	function start(){
		//prompt to start?
		timeLeft = setTimeLeft;
		score = 0;
		timerLoop = setInterval(function() {timerTic() }, 1000);
		moleUpLoop = setInterval(function() {moleUp() }, 1000);
		console.log("timer started at ",timeLeft,"  ",activeGame);
		
	}
	
	//decrements timer by 1 second.  calls stop() upon 0 time
	function timerTic(){
		timeLeft--;
		if(timeLeft== 0){
			document.getElementById("time").innerHTML = timeLeft;
			console.log("time is up: ",timeLeft);
			stop();
		}
		else {
			document.getElementById("time").innerHTML = timeLeft;
		}
	}
	
	
	//testing function, just toggles mole status.
	function moleToggleHandler(){
		//The 'this' inside of a handler refers to the object that triggered the event
		var url_string = this.getAttribute("src");
		if (url_string == "img/down.png" ){
			this.setAttribute("src","img/up.png");
		}
		else{
			this.setAttribute("src","img/down.png");
		}
		url_string = this.getAttribute("src");
		console.log(url_string);
		clicks++;
		console.log(clicks);
	}
	
	// checks if mole is clickable, if so, awards point and sets mole to down
	function moleWhackHandler(){
		if(activeGame == true){
			var url_string = this.getAttribute("src");
			if (url_string == "img/up.png" ){
				this.setAttribute("src","img/down.png");
				score++;
				document.getElementById("score").innerHTML = score;
				console.log("1pt, score: ",score);
			}
		}
		else{
			alert("press start to begin new game");
		}
	}
	
	
	//funciton that puts a mole up every second
	//starts timeOut to take down after 'moleClickableTime'  (see vars at top)
	function moleUp(){
		var index = Math.floor(Math.random() * (9) + 1);
		var doc = document.getElementById(index);
		if(doc != null){
			doc.setAttribute("src","img/up.png");
			setTimeout(function() {moleDown(index) }, moleClickableTime);
		}
		else{
			
			console.error("index ",index);
			console.error(doc);
		}
	}
	
	
	//function that takes the mole down.
	function moleDown(index){
		document.getElementById(index).setAttribute("src","img/down.png");
	}
	
	function clearMem(){
		if(activeGame == true){
			alert("Please reset after game is over");
		}else{
			window.localStorage.removeItem(keyName);
			document.getElementById("maxScore").innerHTML = 0;
		}
		
	}
	
	function setMem(score){
		console.log("setting storage to",score);
		window.localStorage.setItem(keyName,score);
	}
	
	
	
	
	//---------------------adding event listeners------------------------------
	console.log("begin adding event listeners");
	for(var i = 0; i < moles.length; i++){
		//moles[i].addEventListener('click',moleToggleHandler);
		moles[i].addEventListener('click',moleWhackHandler);
	}
	
	document.getElementById("start").addEventListener('click',gameHelper);
	document.getElementById("reset").addEventListener('click',clearMem);