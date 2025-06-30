// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});

// Global GameManager instance
var gameManager;

// Wait until the browser is ready to render the game
window.requestAnimationFrame(function () {
  gameManager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});

// Helper function to fill tiles based on startIndex
function fillTiles(startIndex) {
  gameManager.grid.cells.forEach(column => column.forEach(tile => {
    if(tile) gameManager.grid.removeTile(tile);
  }));

  var values = [2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072,262144,524288,1048576];
  var index = startIndex;

  for (var x = 0; x < gameManager.size; x++) {
    for (var y = 0; y < gameManager.size; y++) {
      if (index < values.length) {
        var tile = new Tile({x: y, y: x}, values[index]);
        gameManager.grid.insertTile(tile);
        index++;
      }
    }
  }

  gameManager.actuate();
}

// "tinski" button: fills first 16 tiles (2 to 65536)
document.getElementById('hack-button-tinski').addEventListener('click', function() {
  fillTiles(0);
  alert("✨ Hack activated by tinski! Showing first set of tiles! ✨");
});

// "princesa" button: fills remaining tiles (131072 to 1048576)
document.getElementById('hack-button-princesa').addEventListener('click', function() {
  fillTiles(16);
  alert("👑 Hack activated by princesa! Showing remaining set of tiles! 👑");
});
