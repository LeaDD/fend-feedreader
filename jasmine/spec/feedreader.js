/* feedreader.js *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //Check that the feeds each have a url property
        //and that the length is not 0
        //http://tosbourn.com/using-loops-in-jasmine/

        //This was originally done with two functions, one for name and one
        //for url. Changed function to take an additional parameter defining
        //the feed property to be checked. Reviewer suggestion - THANK YOU!
        function checkProps(feed, prop) {
            it('have a valid ' + prop, function() {
                expect(prop).toBeDefined();
                expect(prop.length).not.toBe(0);
            });
         }

         for (var i = 0;i < allFeeds.length; i++) {
            checkProps(allFeeds[i], allFeeds[i].url);
         }

         for (var j = 0;j < allFeeds.length; j++) {
            checkProps(allFeeds[j], allFeeds[j].name);
         }
    });

    describe('The menu', function() {
         /* Ensure the menu element is hidden by default.*/
         it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
         /* Ensure the menu changes visibility when the menu icon
          * is clicked. This test has two expectations: does the
          * menu display when clicked and does it hide when
          * clicked again.
          */
         describe('toggles when clicked', function() {
            beforeEach(function() {
                $('.menu-icon-link').click();
            });

            it('displays the menu when first clicked', function() {
                expect($('body').hasClass('menu-hidden')).toBe(false);
            });

            it('then hides the menu when clicked again', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
         });
    });

    /* Ensure when the loadFeed function is called and completes
     * its work, there is at least single .entry element within
     * the .feed container.
     */
    describe('Initial entries', function() {
        //Since the callback function (the second argument of loadFeed) contains only
        //one call to done(), you can shorten your code by passing the function itself
        //(without invoking it) as the second argument: Reviewer suggestion - THANK YOU!
        beforeEach(function(done) {
            loadFeed(0, done);
            //loadFeed(0, function() { <-OLD CODE - KEEP FOR REFERENCE
        });

        it('contain at least one entry', function() {
            //https:stackoverflow.com/questions/12250693/jquery-check-if-a-div-contains-a-div-with-class-on
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    /* Ensure when a new feed is loaded by the loadFeed function
     * that the content actually changes.
     */
    describe('New feed selection', function() {
        //Load first feed
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('changes the content', function(done) {
            //Capture the HTML of the currently loaded feed ([0])
            var curFeed = $('.feed').html();
            //Load the next feed and compare its html to the previous
            loadFeed(1, function() {
                expect($('.feed').html()).not.toEqual(curFeed);
                done();
            });
        });
    });
}());
