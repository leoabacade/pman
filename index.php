<!DOCTYPE html>
<html>
    <head>
        <title>Pac-Man</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       
    </head>
    <body>
        <!-- Raphael paper holder -->
        <div id="pacman"></div>
        <div id="points"></div>
        <div id="lives"></div>
        <div id="level"></div>
        <!-- Libraries -->
        <script src="jquery-1.8.3.min.js"></script>
        <script src="raphael-min.js"></script>
        <!-- Game files -->
        <script src="pacman.js"></script>
        <script src="pacman-tools.js"></script>
        <script src="pacman-player.js"></script>
        <script src="pacman-enemy.js"></script>
        <script src="pacman-enemy-ai.js"></script>
        <script src="pacman-config.js"></script>
        <script src="pacman-field.js"></script>
        <script src="pacman-keyhandler.js"></script>
        <script src="pacman-svg.js"></script>
        <script src="pacman-stats.js"></script>
        <script src="Helper.js"></script>
        <script type="text/javascript" src="https://cdn.firebase.com/v0/firebase.js"></script>
<script type="text/javascript" src="https://cdn.firebase.com/v0/firebase-auth-client.js"></script>
        <script src="Phonetroller.js"></script>
        <script>
  	var authClient = null;
		var phonetroller = null;
		
		$(document).ready(function() {
			authClient = new FirebaseAuthClient(
				new Firebase(Phonetroller.firebase),
				function(error, user) {
					if ( error != null) {
						// an error occurred while attempting login
						console.log(error);
					} else if (!user) {
						// user authenticated with Firebase
						console.log('User ID: ' + 123 + ', Provider: ' + 1);
						
						phonetroller = new Phonetroller([1, 123].join('/'));

						var keys = {
					A		: '#a',
					B		: '#b',

					UP		: '#up',
					RIGHT	: '#right',
					DOWN	: '#down',
					LEFT	: '#left',

					START	: '.start',
					SELECT	: '.select'
				}

				$('#login_screen').hide();

				if(Helper.UA.mobile() || window.location.hash == '#controller') {
					// never called
				} else {
					
					
					phonetroller.Keys.RIGHT.on('press', function() {
						pacman.keyhandler.keydown(39);
						
					});

					phonetroller.Keys.LEFT.on('press', function() {
						pacman.keyhandler.keydown(37);
						
					});

					phonetroller.Keys.UP.on('press', function() {
						pacman.keyhandler.keydown(38);
						
					});

					phonetroller.Keys.DOWN.on('press', function() {
						pacman.keyhandler.keydown(40);
						
					});

					phonetroller.Keys.A.on('press', function() {
						$($('.gamebox').get(selectedBox)).toggleClass('highlighted');
					});

					phonetroller.Keys.B.on('press', function() {
						$($('.gamebox').get(selectedBox)).toggleClass('highlighted');
					});
				}
					} else {
						// user is logged out
						console.log('user is logged out');
					}
					
				}
			);
		});

        </script>
    </body>
</html>
