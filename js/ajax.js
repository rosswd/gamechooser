// setup
'use strict';
var selectGroup = document.getElementById('platform-select');
var games;

// ajax request for json file
var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var responseObject = JSON.parse(xhr.responseText);
    games = responseObject;
  }

  return games;
};

xhr.open('GET', 'data/games.json', true);
xhr.send(null);

// gets a random game from an array
function random_game(games) {
    var game = Math.floor(Math.random() * games.length);
    return games[game];
}

// takes 'select option' from form and gets a random game for a particular platform
function get_random_game(option) {
  switch (option) {
    case "ps4":
      var title = random_game(games["console"]["ps4"]);
      break;
    case "xbox_one":
      var title = random_game(games["console"]["xbox_one"]);
      break;
    case "windows":
      var title = random_game(games["pc"]["windows"]);
      break;
    case "linux":
      var title = random_game(games["pc"]["linux"]);
      break;
    case "macos":
      var title = random_game(games["pc"]["macos"]);
      break;
    default:
      console.log("option not received from form!");
  }

  return title;
}

// when form is submitted, prints out random game
addEventListener('submit', function(event) {
  event.preventDefault();
  var platform = selectGroup.value;
  var result = get_random_game(platform);

  // hide form
  var form = document.getElementById('platform-form');
  var div = form.parentNode;
  div.removeChild(form);

  // populate 'choice' div
  var choice = document.getElementById('choice');
  choice.innerHTML = '<p>' + '<a href="/">back</a> ' + result + '</p>';
}, false);

