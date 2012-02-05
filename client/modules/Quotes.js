/**
 * Quotes.js
 *
 * Manage historical quotes fetched from the quote server.
 */
(function(Quotes) {

	/**
	 * Store a monthly date/price timeseries for a single ticker.
	 */
	Quotes.TickerSeries = Backbone.Model.extend({
		// ticker
		// dates
		// prices
	});


	/**
	 * Fetch a collection of TickerSeries from the quote server, using a required 'tickers' options.
	 */
	Quotes.TickerSeriesCollection = Backbone.Collection.extend({

		model: Quotes.TickerSeries,
		baseUrl: '/quotes/monthly?s=',

		initialize: function (models, options) {
			options = options || {};
			if (!options.tickers) {
				throw new Error('Missing required option: tickers');
			}
			if (!_.isArray(options.tickers)) {
				throw new Error('tickers must be an array');
			}

			// Append tickers to the URL from which to fetch quotes.
			this.url = this.baseUrl + options.tickers.join(',');
		}
	});


	// Fetch all monthly quotes for some given tickers.
	Quotes.fetch = function (tickers) {

		var collection = new Quotes.TickerSeriesCollection([], {
			'tickers': tickers
		});

		console.log('fetch', collection.url);
		collection.fetch({
			success: function (collection, response) {
				alert('Success');
			},
			error: function () {
				alert('An error occurred!');
			}
		});
	}

})(Backtester.module('Quotes'));
