/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * Tests PureMVC Observer class.
 * 
 * Since the Observer encapsulates the interested object's
 * callback information, there are no getters, only setters. 
 * It is, in effect write-only memory.
 *
 * Therefore, the only way to test it is to set the 
 * notification method and context and call the notifyObserver
 * method.
 *
 * @see puremvc.Observer
 */
var ObserverTest = new YUITest.TestCase
(
	{	
       /**
         * The name of the test case - if not provided, one is automatically
         * generated by the YUITest framework.
         * 
         * @type {String}
         * @private
         */
        name: "PureMVC Observer class tests",  

        /**
         * Sets up data that is needed by each test.
         */
        setUp: function()
		{
        },
        
        /**
         * Cleans up everything that was created by setUp().
         */
        tearDown: function()
		{
        },

  		/**
  		 * A test variable that proves the notify method was executed with
  		 * 'this' as its execution context.
  		 * 
  		 * @type {Number}
  		 * @private
  		 */
  		observerTestVar: null,
		
		/**
  		 * Tests observer class when initialized by accessor methods.
  		 */
  		testObserverAccessors: function()
		{
    		var Observer = extract("puremvc.Observer");
    		var Notification = extract("puremvc.Notification");

   			// Create observer with null args, then
   			// use accessors to set notification method and context
    		var observer/*Observer*/ = new Observer( null, null );
    		observer.setNotifyContext(this);
   			observer.setNotifyMethod( this.observerTestMethod );
  			
   			// create a test event, setting a payload value and notify 
   			// the observer with it. since the observer is this class 
   			// and the notification method is observerTestMethod,
   			// successful notification will result in our local 
   			// observerTestVar being set to the value we pass in 
   			// on the note body.
   			var note/*Notification*/ = new Notification( 'ObserverTestNote', 10 );
			observer.notifyObserver(note);

			// test assertions  			
   			YUITest.Assert.areSame
			(
				10,
				this.observerTestVar,
				"Expecting observerTestVar === 10"
			);
   		},

  		/**
  		 * Tests observer class when initd by constructor.
 		 */
  		testObserverConstructor: function()
		{
    		var Observer = extract("puremvc.Observer");
    		var Notification = extract("puremvc.Notification");

   			// Create observer passing in notification method and context
   			var observer/*Observer*/ = new Observer( this.observerTestMethod, this );
  			
   			// create a test note, setting a body value and notify 
   			// the observer with it. since the observer is this class 
   			// and the notification method is observerTestMethod,
   			// successful notification will result in our local 
   			// observerTestVar being set to the value we pass in 
   			// on the note body.
   			var note/*Notification*/ = new Notification( 'ObserverTestNote', 5 );
			observer.notifyObserver(note);

			// test assertions  			
   			YUITest.Assert.areSame
			(
				5,
				this.observerTestVar,
				"Expecting observerTestVar === 5"
			);
   		},

  		/**
  		 * Tests the compareNotifyContext method of the Observer class
  		 * 
 		 */
  		testCompareNotifyContext: function()
		{
    		var Observer = extract("puremvc.Observer");

   			// Create observer passing in notification method and context
   			var observer/*Observer*/ = new Observer( this.observerTestMethod, this );
  			
  			var negTestObj/*Object*/ = new Object();
  			
			// test assertions  			
   			YUITest.Assert.isFalse
			(
				observer.compareNotifyContext(negTestObj),
				"Expecting observer.compareNotifyContext(negTestObj) === false"
			);
			
   			YUITest.Assert.isTrue
			(
				observer.compareNotifyContext(this),
				"Expecting observer.compareNotifyContext(this) === true"
			);
   		},

  		/**
  		 * A function that is used as the observer notification
  		 * method.
  		 * 
  		 * @private
  		 */
  		observerTestMethod: function( note )
  		{
  			this.observerTestVar = note.getBody();
  		},
  	}
);