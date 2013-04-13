var Phonetroller = function(fbid) {
  var _this = this;

	this.fbid = fbid;

	this.Keys = {
		A		: new Phonetroller.Key('A', _this),
		B		: new Phonetroller.Key('B', _this),
		
		UP		: new Phonetroller.Key('UP', _this),
		RIGHT	: new Phonetroller.Key('RIGHT', _this),
		DOWN	: new Phonetroller.Key('DOWN', _this),
		LEFT	: new Phonetroller.Key('LEFT', _this),
		
		START	: new Phonetroller.Key('START', _this),
		SELECT	: new Phonetroller.Key('SELECT', _this)
	};
	
	this.state = function() {
		var ret = {};
	
		$.each(_this.Keys, function(keyName, keyObj) {
			ret[keyName] = keyObj.getState();
		});
		
		return ret;
	}
}

Phonetroller.firebase = 'https://phonetroller.firebaseio.com';

Phonetroller.Key = function(identifier, parent) {
	var _this = this;

	var listeners = {
		press: [],
		release: []
	};
	
	this.identifier = identifier
	
	var state = 'unpressed';

	this.on = function(action, callback) {
		if(!$.isFunction(callback)) throw 'Passed non-function as a callback to Keys.' + this.identifier + '.on';
	
		switch(action) {
			case 'press':
			case 'pressed':
				listeners.press.push(callback);
				break;
			case 'release':
			case 'released':
			case 'unpress':
			case 'unpressed':
				listeners.release.push(callback);
				break;
			default:
				throw 'Unknown action passed to Keys.' + this.identifier + '.on: ' + action;
		}
	}
	
	this.off = function(action, callback) {
		if(!$.isFunction(callback)) {
			// Remove all listeners for the action!
			switch(action) {
				case 'press':
				case 'pressed':
					listeners.press = [];
					break;
				case 'release':
				case 'released':
				case 'unpress':
				case 'unpressed':
					listeners.release = [];
					break;
				case undefined:
					listeners.press = [];
					listeners.release = [];
					break;
				default:
					throw 'Unknown action passed to Keys.' + this.identifier + '.off: ' + action;
			}
		} else {
			switch(action) {
				case 'press':
				case 'pressed':
					listeners.press = $.grep(listeners.press, function(listener) {
						return listener != callback;
					});
					break;
				case 'release':
				case 'released':
				case 'unpress':
				case 'unpressed':
					listeners.release = $.grep(listeners.release, function(listener) {
						return listener != callback;
					});
					break;
				default:
					throw 'Unknown action passed to Keys.' + this.identifier + '.off: ' + action;
			}
		}
	}
	
	this.trigger = function(action) {
		switch(action) {
			case 'press':
			case 'pressed':
				state = 'pressed';
				
				$.each(listeners.press, function(index, callback) {
					callback();
				});
				break;
			case 'release':
			case 'released':
			case 'unpress':
			case 'unpressed':
				state = 'unpressed';
			
				$.each(listeners.release, function(index, callback) {
					callback();
				});
				break;
			default:
				throw 'Unknown action triggered on Keys.' + this.identifier + ': ' + action;
		}
	}
	
	// Setup listener
	console.log('Canonical URL: ' + Phonetroller.firebase + '/controllers/' + parent.fbid + '/' + identifier);
	var firebaseRef = new Firebase(Phonetroller.firebase + '/controllers/' + parent.fbid + '/' + identifier);
	firebaseRef.on('value', function(snapshot) {
		var pressed = snapshot.val();
		
		console.log('Pressed: ' + pressed);
		console.log('State: ' + state);
		console.log(listeners);
		
		if(pressed && state == 'unpressed') {
			console.log('press triggered');
		
			_this.trigger('press');
		} else if(!pressed && state == 'pressed') {
			console.log('release triggered');
		
			_this.trigger('release');
		}
	});
	
	this.getState = function() {
		return state;
	}
	
	this.setState = function(s) {
		switch(s) {
			case 'pressed':
			case 'press':
				firebaseRef.set(1);
				break;
			case 'unpressed':
			case 'released':
			case 'unpress':
			case 'release':
				firebaseRef.set(0);
				break;
			default:
				throw 'Unknown state passed to setState: ' + s;
				break;
		}
	}
}
