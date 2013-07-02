
var turnCount=1;
var i;
var j;
var board = [0,0,0,0,0,0,0,0,0];
var wins = [(board[0]+board[1]+board[2]), (board[3]+board[4]+board[5]), (board[6]+board[7]+board[8]), (board[0]+board[3]+board[6]), (board[1]+board[4]+board[7]), (board[2]+board[5]+board[8]), (board[0]+board[4]+board[8]), (board[2]+board[4]+board[6])];


function clickSquare(div) {
  var id = div.id;	
	var DIV = document.getElementById(id);
	if(DIV.innerHTML == ""){
		if(turnCount%2 == 1){
			DIV.innerHTML = "X";
			DIV.style.color = document.getElementById('selectXcolor').value;
			board [parseInt(DIV.id.charAt(1))-1]++;
			wins = [(board[0]+board[1]+board[2]), (board[3]+board[4]+board[5]), (board[6]+board[7]+board[8]), (board[0]+board[3]+board[6]), (board[1]+board[4]+board[7]), (board[2]+board[5]+board[8]), (board[0]+board[4]+board[8]), (board[2]+board[4]+board[6])];
			turnCount++;
		}
		else {
			DIV.innerHTML = "O";
			DIV.style.color = document.getElementById('selectOcolor').value;
			board [parseInt(DIV.id.charAt(1))-1]--;
			wins = [(board[0]+board[1]+board[2]), (board[3]+board[4]+board[5]), (board[6]+board[7]+board[8]), (board[0]+board[3]+board[6]), (board[1]+board[4]+board[7]), (board[2]+board[5]+board[8]), (board[0]+board[4]+board[8]), (board[2]+board[4]+board[6])];
			turnCount++;
		}
		
		checkWin();
	}
}

function clearAll() {
	for (i=1; i<=9; i++){
		var id = "s" + i.toString();
		var DIV = document.getElementById(id);
		DIV.innerHTML = "";
	}
	turnCount = 1;
	board = [0,0,0,0,0,0,0,0,0];
	wins = [0,0,0,0,0,0,0,0];
}

function checkWin() {
	for(i=0; i<=8; i++){
		if (wins[i]==3){
			alert("X wins!")
			clearAll();
			board = [0,0,0,0,0,0,0,0,0];
			wins = [0,0,0,0,0,0,0,0];
			turnCount=1;
		}
		else if (wins[i]==-3) {
			alert("O wins!")
			clearAll();
			board = [0,0,0,0,0,0,0,0,0];
			wins = [0,0,0,0,0,0,0,0];
			turnCount=1;
		}
	}
}


function algorithmO() {
	
	var selector = document.getElementById('selectComputer').value;
	var symb;
	var symbValue;
	if (selector == 1){
		symb = "X";
		symbValue = 1;
	}
	else if (selector == 0){
		symb = "O";
		symbValue = -1;
	}
	else {
		symb = "";
	}
	
	
	if (turnCount%2 == selector){
		var forWin="";
		var num;
		
		//computer checks if he can win
		if(forWin == "") {
			for (i=0; i<8; i=i+1){
				if(wins[i] == 2*symbValue){
					if(i<=2){
						forWin = "r" + (i+1).toString();
					}
					else if (i>=6) {
						forWin = "d" + (i-5).toString();
					}
					else {
						forWin = "c" + (i-2).toString();
					}
					
					num = checkFreeSquare(forWin);
					var squareId = "s" + num.toString();
					var square = document.getElementById(squareId);
				}
			}
		}
		
		
		//computer checks if he can block opponent's win
		if (forWin == ""){
			for (i=0; i<8; i=i+1){
				if(wins[i] == -2*symbValue){
					if(i<=2){
						forWin = "r" + (i+1).toString();
					}
					else if (i>=6) {
						forWin = "d" + (i-5).toString();
					}
					else {
						forWin = "c" + (i-2).toString();
					}
					num = checkFreeSquare(forWin);
					var squareId = "s" + num.toString();
					var square = document.getElementById(squareId);
				}
			}
		}
		
		
		
		//computer checks if he can make a fork
		if (forWin == ""){
			for (i=0; i<=8; i++){
				if (board[i] == 0){
					var n=0;
					board[i] = symbValue;
					wins = [(board[0]+board[1]+board[2]), (board[3]+board[4]+board[5]), (board[6]+board[7]+board[8]), (board[0]+board[3]+board[6]), (board[1]+board[4]+board[7]), (board[2]+board[5]+board[8]), (board[0]+board[4]+board[8]), (board[2]+board[4]+board[6])];
					for (j=0; j<8; j++){
						if(wins[j] == 2*symbValue){
							n++;
						}
					}
					board[i] = 0;
					wins = [(board[0]+board[1]+board[2]), (board[3]+board[4]+board[5]), (board[6]+board[7]+board[8]), (board[0]+board[3]+board[6]), (board[1]+board[4]+board[7]), (board[2]+board[5]+board[8]), (board[0]+board[4]+board[8]), (board[2]+board[4]+board[6])];
					if (n==2){
						num = i+1;
						var squareId = "s" + num.toString();
						var square = document.getElementById(squareId);
						forWin="aaa";
					}
				}
			}
		}
		
		
		//computer checks if he can block the opponent from making a fork
		if (forWin == ""){
			for (i=0; i<=8; i++){
				if (board[i] == 0){
					var n=0;
					board[i] = -1*symbValue;
					wins = [(board[0]+board[1]+board[2]), (board[3]+board[4]+board[5]), (board[6]+board[7]+board[8]), (board[0]+board[3]+board[6]), (board[1]+board[4]+board[7]), (board[2]+board[5]+board[8]), (board[0]+board[4]+board[8]), (board[2]+board[4]+board[6])];
					for (j=0; j<8; j++){
						if(wins[j] == -2*symbValue){
							n++;
						}
					}

					board[i] = symbValue;;
					wins = [(board[0]+board[1]+board[2]), (board[3]+board[4]+board[5]), (board[6]+board[7]+board[8]), (board[0]+board[3]+board[6]), (board[1]+board[4]+board[7]), (board[2]+board[5]+board[8]), (board[0]+board[4]+board[8]), (board[2]+board[4]+board[6])];
					for (j=0; j<8; j++){
						if(wins[j] == 2*symbValue){
							n--;
						}
					}

					if (n==2){
						num = i+1;
						var squareId = "s" + num.toString();
						var square = document.getElementById(squareId);
						forWin="aaa";
					}
					board[i] = 0;
					wins = [(board[0]+board[1]+board[2]), (board[3]+board[4]+board[5]), (board[6]+board[7]+board[8]), (board[0]+board[3]+board[6]), (board[1]+board[4]+board[7]), (board[2]+board[5]+board[8]), (board[0]+board[4]+board[8]), (board[2]+board[4]+board[6])];
				}
			}
		}
		
		
		//if computer cant win or block, he plays a random move
		if(forWin == ""){
			num = Math.floor(Math.random()*9+1);
			if (turnCount == 1){
				var notUsefulVariable = Math.floor(Math.random()*4+1)
				if (notUsefulVariable == 1){
					num = 1;
				}
				else if (notUsefulVariable == 2){
					num = 3;
				}
				else if (notUsefulVariable == 3){
					num = 7;
				}
				else if (notUsefulVariable == 4){
					num = 9;
				}
			}
			else if (turnCount == 2){
				num = 5;
			}
			var squareId = "s" + num.toString();
			var square = document.getElementById(squareId);			
			while(square.innerHTML != ""){
				num = Math.floor(Math.random()*9+1);
				var squareId = "s" + num.toString();
				var square = document.getElementById(squareId);	
			}
		}
		
		square.innerHTML = symb
		square.style.color = document.getElementById('select' + symb + 'color').value;
		if (symb == "O"){
			board [parseInt(square.id.charAt(1))-1]--;
		}
		else if (symb == "X"){
			board [parseInt(square.id.charAt(1))-1]++;
		}
		wins = [(board[0]+board[1]+board[2]), (board[3]+board[4]+board[5]), (board[6]+board[7]+board[8]), (board[0]+board[3]+board[6]), (board[1]+board[4]+board[7]), (board[2]+board[5]+board[8]), (board[0]+board[4]+board[8]), (board[2]+board[4]+board[6])];
		turnCount++;
		checkWin();
		forWin = "";
	}
}

function checkFreeSquare(position){
	if(position.charAt(0) == "r"){
		if(position.charAt(1) == "1"){
			for (j=0; j<=2; j++){
				if (board[j] == 0){
					return j+1;
				}
			}
		}
		if(position.charAt(1) == "2"){
			for (j=3; j<=5; j++){
				if (board[j] == 0){
					return j+1;
				}
			}
		}
		if(position.charAt(1) == "3"){
			for (j=6; j<=8; j++){
				if (board[j] == 0){
					return j+1;
				}
			}
		}
	}
	if(position.charAt(0) == "c"){
		if(position.charAt(1) == "1"){
			for (j=0; j<=6; j=j+3){
				if (board[j] == 0){
					return j+1;
				}
			}
		}
		if(position.charAt(1) == "2"){
			for (j=1; j<=7; j=j+3){
				if (board[j] == 0){
					return j+1;
				}
			}
		}
		if(position.charAt(1) == "3"){
			for (j=2; j<=8; j=j+3){
				if (board[j] == 0){
					return j+1;
				}
			}
		}
	}
	if(position.charAt(0) == "d"){
		if(position.charAt(1) == "1"){
			for (j=0; j<=8; j=j+4){
				if (board[j] == 0){
					return j+1;
				}
			}
		}
		if(position.charAt(1) == "2"){
			for (j=2; j<=6; j=j+2){
				if (board[j] == 0){
					return j+1;
				}
			}
		}
	}
}


