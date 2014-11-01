//Images to include: Shrek, Gabe's beard, more gabe, mountain dew, mlg, doritos, mountain dew, fox shine.  
//Sounds: If you miss, hitmarker.
//come up with a back design. 
//1) Get no scoped!
//2) NUMBER TWOO!!!! 
//3) Oh baby a triple! 
//4) Kimmy j : QUAAAAD!
//5) Was it 6? I would have cried if it was 6. 
//6) Some crying one.
//7) 

//When you win: wombo combo. Oh oh OH OH!! Where you at! Oh my god!

//app.js: our main javascript file for this app


"use strict";


var reTiles = 16;
var rePairs;
var attempts = 0;
var matches = 0;
var turnTile = [];
var saveImg = [];
var running = false;

var tiles = [];
var idx;
for(idx = 1; idx <= 32; idx++) {
	tiles.push({
		tileNum: idx,
		src: 'img/tile' + idx + '.jpg',
		flipped: false,
		matched: false
	});
}//for each tile.

console.log(tiles);

//when document is ready...
$(document).ready(function() {
	//catch click event of start game button
	$('#start-game').click(function() {
		console.log('start game button clicked!');

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
			var elapsedSeconds = (Date.now() - startTime) / 1000;
			elapsedSeconds = Math.floor(elapsedSeconds);
			$('#elapsed-seconds').text(elapsedSeconds + ' seconds');
		}, 1000);

		//game mechanics go
		//gobal: matches, remaining. keep track. turn logic. 
		//tilenum
		$('#game-board img').click(function() {
			//console.log(this.alt);
			//running = true;
			if (running) {
				//running = true;
				return;
			}

				
				var foundMatch;

	
				var clickedImg = $(this);
				var tile = clickedImg.data('tile');
		
				
				console.log(tile.flipped);
				if (!tile.flipped) {
					console.log(tile.flipped);
					turnTile.push(tile);
					saveImg.push(clickedImg);
					flipTile(tile, clickedImg);
					
					console.log(tile);
				}

				if (turnTile.length === 2) {
					running = true;
					console.log("two have been flipped!");
					/*
					if (running) {
						running = false;
						return false;
					}
					running = true;*/
							
					if (turnTile[0].tileNum === turnTile[1].tileNum) {
						turnTile[0].matched = true;
						turnTile[1].matched = true;
						matches++;
						rePairs -= 2;
					} else {
						//setTimeout(function(){flipTile(turnTile[1], saveImg[1])}, 3000);
						//setTimeout(function(){flipTile(turnTile[0], saveImg[0])}, 3000);
						//I get the error 'img is undefined' when img is passed into the function. Does not happen with normal calls. 
						console.log(saveImg[0]);
						console.log(saveImg[1]);
						var oldTile = turnTile[0];
						var oldImg = saveImg[0];
						var newTile = turnTile[1];
						var newImg = saveImg[1];

						//if(!running) {

				//			if (turnTile.length === 2) {
				//				running = true;
				//			}
							
							window.setTimeout(function() {
   							 flipTile(oldTile, oldImg);
   							 flipTile(newTile, newImg);
    						running = false;
							}, 1000);
							//running = false;

							
							//running = true;
						//}

						
						
						//window.clearTimeout(timeoutVar);
						//window.clearTimeout(timeoutVar2);
						setTimeout(function(){flipTile(turnTile[0], saveImg[0])}, 3000);
						setTimeout(function(){flipTile(turnTile[1], saveImg[1])}, 3000);
						//setTimeout(function(){newFunction(turnTile[0], saveImg[0], turnTile[1], saveImg[1])});
						//flipTile(turnTile[0], saveImg[0]);
						//flipTile(turnTile[1], saveImg[1]);
							

					}
			turnTile.splice(0,1);
			turnTile.splice(0,1);
			saveImg.splice(0,1);
			saveImg.splice(0,1);
			

				}
		

			

			/*
			if (!tile.flipped) {
				flipTile(tile, clickedImg);
				turnTile.push(tile);
				for (var i = 0; i < tiles.length; i++) {
					if (tile.tileNum == tiles[i].tileNum && !tiles[i].tileNum) {
						tile.matched = true;
						tiles[i].matched = true;
						matches++;
						remaining -= 2;
					}
				}
			}
			*///
			//running = false;

			//running = false;
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

function newFunction(tile1, img1, tile2, img2) {
	flipTile(tile1, img1);
	flipTile(tile2, img2);
}