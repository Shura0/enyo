/**
	_enyo.Signals_ components are used to listen to global messages.

	An object with a Signals component can listen to messages sent from anywhere
	by declaring handlers for them.

	DOM events that have no node targets are broadcast as signals. These events
	include Window events, like _onload_ and _onbeforeunload_, and events that
	occur directly on _document_, like _onkeypress_ if _document_ has the focus.

	For more information, see the
	<a href="https://github.com/enyojs/enyo/wiki/Signals">Signals documentation</a>
	in the Enyo Developer Guide.
*/
enyo.kind({
	name: "enyo.Signals",
	kind: "enyo.Component",
	//* @protected
	create: enyo.super(function (sup) {
		return function() {
			sup.apply(this, arguments);
			enyo.Signals.addListener(this);
		};
	}),
	destroy: enyo.super(function (sup) {
		return function() {
			enyo.Signals.removeListener(this);
			sup.apply(this, arguments);
		};
	}),
	notify: function(inMsg, inPayload) {
		this.dispatchEvent(inMsg, inPayload);
	},
	protectedStatics: {
		listeners: [],
		addListener: function(inListener) {
			this.listeners.push(inListener);
		},
		removeListener: function(inListener) {
			enyo.remove(inListener, this.listeners);
		}
	},
	statics: {
		send: function(inMsg, inPayload) {
			enyo.forEach(this.listeners, function(l) {
				l.notify(inMsg, inPayload);
			});
		}
	}
});
