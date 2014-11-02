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
var rePairs = 8;
var attempts = 0;
var matches = 0;
var turnTile = [];
var saveImg = [];
var running = false;
var streak = 0;


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

				if (!tile.flipped) {
					turnTile.push(tile);
					saveImg.push(clickedImg);
					flipTile(tile, clickedImg);
				}

				if (turnTile.length === 2) {
					running = true;
					console.log("two have been flipped!");
							
					if (turnTile[0].tileNum === turnTile[1].tileNum) {
						streak++;
						turnTile[0].matched = true;
						turnTile[1].matched = true;
						matches++;
						rePairs--;
						if (streak === 1) {
							var tripleSound = document.getElementById('triple-sound');
							tripleSound.play();
							//var womboSound = document.getElementById('wombo-sound');
							//womboSound.play();
						}
						running = false;
					} else {
						streak = 0;
						var hitSound = document.getElementById('hitmarker-sound');
						hitSound.play();
						attempts++;
						console.log(saveImg[0]);
						console.log(saveImg[1]);
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

function newFunction(tile1, img1, tile2, img2) {
	flipTile(tile1, img1);
	flipTile(tile2, img2);
}