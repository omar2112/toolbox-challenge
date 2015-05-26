
//7) delete these later. 

"use strict";


var reTiles = 16;
var rePairs = 8;
var attempts = 0;
var matches = 0;
var turnTile = [];
var saveImg = [];
var running = false;
var streak = 0;


var tiles = [];


//does all the operations needed to initialize the game. 
function initialize() {
	reTiles = 16;
	rePairs = 8;
	attempts = 0;
	matches = 0;
	turnTile = [];
	saveImg = [];
	running = false;
	streak = 0;

	tiles = [];
	var idx;
	for(idx = 1; idx <= 32; idx++) {
		tiles.push({
			tileNum: idx,
			src: 'img/tile' + idx + '.jpg',
			flipped: false,
			matched: false
		});
	}//for each tile.

}


//when document is ready...
$(document).ready(function() {
	//catch click event of start game button
	$('#start-game').click(function() {
		console.log('start game button clicked!');
		initialize();

		tiles = _.shuffle(tiles);
		var selectedTiles = tiles.slice(0,8);
		var tilePairs = [];
		_.forEach(selectedTiles, function(tile){
			tilePairs.push(tile);
			tilePairs.push(_.clone(tile));
		});
		tilePairs = _.shuffle(tilePairs);
		console.log(tilePairs);

		var gameBoard = $('#game-board');
		var row = $(document.createElement('div'));
		var img;
		_.forEach(tilePairs, function(tile, elemIndex) {
			if (elemIndex > 0 && 0 == (elemIndex % 4)) {
				gameBoard.append(row);
				row = $(document.createElement('div'));
			}
			img = $(document.createElement('img'));
			img.attr({
			src: 'img/tile-back.png',
			alt: 'tile ' + tile.tileNum
		});
		img.data('tile', tile);
		row.append(img);

		});
		gameBoard.append(row);

		//get starting milliseconds
		var startTime = Date.now();
		window.setInterval(function() {
			$('#matches-id').text(matches);
			$('#hit-markers').text(attempts);
			$('#reMain-id').text(rePairs);
			var elapsedSeconds = (Date.now() - startTime) / 1000;
			elapsedSeconds = Math.floor(elapsedSeconds);
			$('#elapsed-seconds').text(elapsedSeconds + ' seconds');
		}, 1000);

		$('#game-board img').click(function() {
			if (running) {
				return;
			}
				var foundMatch;
				var clickedImg = $(this);
				var tile = clickedImg.data('tile');

				//if the tile has not been flipped previously, push it onto the 'turn' tile. Does not include previously matcheed
				//tiles, or the tile that has just been flipped. 
				if (!tile.flipped) {
					turnTile.push(tile);
					saveImg.push(clickedImg);
					flipTile(tile, clickedImg);
				}

				//the operations for a turn happen when 2 tiles are in the turn tile array
				if (turnTile.length === 2) {
					running = true;
					console.log("two have been flipped!");

					if (turnTile[0].tileNum === turnTile[1].tileNum) {
						streak++;
						turnTile[0].matched = true;
						turnTile[1].matched = true;
						matches++;
						rePairs--;
						/*
						if (streak === 3) {
							var tripleSound = document.getElementById('triple-sound');
							tripleSound.play();
						}
						if (streak === 5) {
							var fiveSound = document.getElementById('6-sound');
							fiveSound.play();
						}
						if (streak === 2) {
							var twoSound = document.getElementById('number2-sound');
							twoSound.play();
						}
						if (streak === 4) {
							var fourSound = document.getElementById('number2-sound');
							fourSound.play();
						}
						*/
						running = false;
					} else {
						streak = 0;
						var hitSound = document.getElementById('hitmarker-sound');
						hitSound.play();
						attempts++;
						console.log(saveImg[0]);
						console.log(saveImg[1]);
						
						//for some completely unknown reason, javascript gives me an error if I try to pass turnTile[0] and the like
						//directly as parameters to the function, hence why I made them variables. I imagine it's just a javascript quirk. 
						var oldTile = turnTile[0];
						var oldImg = saveImg[0];
						var newTile = turnTile[1];
						var newImg = saveImg[1];

						window.setTimeout(function() {
   							flipTile(oldTile, oldImg);
   							flipTile(newTile, newImg);
    						running = false;
							}, 1000);
						}
						
						turnTile.splice(0,1);
						turnTile.splice(0,1);
						saveImg.splice(0,1);
						saveImg.splice(0,1);

						//winning condition
						if (matches === 8) {
							//var womboSound = document.getElementById('wombo-sound');
							//womboSound.play();
							alert('You won!!!11!2! asdfasdfaslkdfj0lkasjdflkajsdf');
							
						}

				}

		});
	});//start game button click


}); // document ready function

function flipTile(tile, img) {
	img.fadeOut(100, function() {
		if(tile.flipped) {
			img.attr('src', 'img/tile-back.png');
		}
		else {
			img.attr('src', tile.src);
		}
		tile.flipped = !tile.flipped;
		img.fadeIn(100);
	});
}
