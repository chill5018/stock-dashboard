$(document).ready(function() {
  var apiKey = '06a3f86266a91a6c57153e802d9eec04'; // Constant
  var username = 'COLI0107';                       // Constant

  var action_accountInfo = 'account_info';         // Action Types
  var action_offers = 'offers';                    // Action types
  var action_buy = 'buy';                          // Action Types
  var action_sell = 'sell';                        // Action Types
  var action_exchangeRate = 'exchange_rate'        // Action Types
  var action_conversionChart = 'exchange_rate'     // Action Types

  //Send the AJAX call to the server
  var interval = 1000 * 60 * 1; // where X is your every X minutes

  // Global Lists
  var uniqueOfferers = [];
  var exchangeRates = [];

  var currentValue;

  // Initial Call to populate the screen
  performAnAction(action_accountInfo);
  performAnAction(action_offers);

  // Refresh Data every minute
  setInterval(function() {
    performAnAction(action_accountInfo),
    performAnAction(action_offers)
  }, interval);


  // Generic Function to perform all of the necessary AJAX Calls
  function performAnAction(action, currency1, currency2, qtyStocks, transaction_id, username) {
    $.ajax({
      //The URL to process the request
      'url': 'http://52.57.228.6//man2API/php/BankPhp.php',
      //The type of request, also known as the "method" in HTML forms
      //Can be 'GET' or 'POST'
      'type': 'GET',
      //Any post-data/get-data parameters
      //This is optional
      'data': {
        'what': action,
        'from': currency1,
        'to': currency2,
        'amount': qtyStocks,
        'offer': transaction_id,
        'name': username,
        'apikey': apiKey
      },
      //The response from the server
      'success': function (dataString) {
        //You can use any jQuery/JavaScript here!!!
        // console.log(dataString);

        var data = JSON.parse(dataString)
        // console.log(data);

        // Switch to handle how data is
        // displayed for each call
        switch (action) {
          case action_offers:
            currentOffers(data);
            break;
          case action_accountInfo:
            accountInfo(data);
            break;
          case action_exchangeRate:
            exchangeRate(data);
            break;
          case action_conversionChart:
            calculateConversionRates(data);
            break;
          case action_buy:
            // Show some sort of confirmation?
            console.log('You completed a purchase');
            break;
          case action_sell:
            // Show some sort of confirmation?
            console.log('You completed an offer');
            break;
          default:
            throw new "Action Type unknown... Check your call to performAnAction()";
        }
      }
    });
  }

  // Button Click Functions
  $('.stockActionBuyButton').click(function () {
      var id = $('#transaction-id').val();
      performAnAction(action_buy, null, null, null, parseInt(id));
      refreshView();
      id.value = "34";
  });

  $('.stockActionSellButton').click(function () {
      var amount = $('#currency-amount').val();
      // performAnAction(action_sell, parseInt(amount));
      performAnAction(action_sell,null, null, parseFloat(amount));
      refreshView();
      amount.value = '';
  });

  $('.convertButton').click(function () {
      var c1 = $('#currencyFrom').val();
      var c2 = $('#currencyTo').val();

      performAnAction(action_exchangeRate, c1, c2);
  });

  var offersChart = new Morris.Bar ({
    element: 'offersChart',
    data: [],
    xkey: 'label',
    ykeys: ['value'],
    labels: ['Value'],
    resize: true,
    barColors: 'red',

  });

  var conversionChart = new Morris.Bar ({
    element: 'conversionChart',
    data: [],
    xkey: 'label',
    ykeys: ['value'],
    labels: ['Value'],
    resize: true,

  });

  var portfolioValue = new Morris.Donut ({
    element: 'portfolioValue',
    data: [{label: 'COLI0107', value: currentValue}],
    resize: true,

  });

  // Functions to Display various Data
  function currentOffers(data) {
    $('#currentOffers').text('');
    var graphData = [];
    for (var i = 0; i < data.data.length; i++) {
      var idJS = data.data[i].id;
      var amountJS = data.data[i].amount;
      var currencyJS = data.data[i].currency;

      graphPoint = {};
      graphPoint.label = currencyJS;
      graphPoint.value = amountJS;
      graphData.push(graphPoint);

      // Add all users to the list
      // uniqueOfferers.push(currencyJS);

      $('#currentOffers').append("<tr><td>"+idJS+"</td><td>"+currencyJS+"</td><td >"+amountJS+"</td></tr>");
    }

    // Filter duplicate currencies
    // uniqueOfferers.removeDuplicates();

    offersChart.setData(graphData);
    $('.lastUpdated').text('Last Updated: '+moment().format('MMMM DD YYYY HH:mm:ss'));
  }

  // Shows data in account info panel
  function accountInfo(data) {
    currentValue = data.data[0].amount
    $('#myAmount').text('Name: '+data.data[0].amount);
    $('#myCurrency').text('Amount: '+data.data[0].currency);
    $('.lastUpdated').text('Last Updated: '+moment().toString());
  }

  // Used in Conversion Widget
  function exchangeRate(data) {
    $('.conversionLabel').text(data.data.amount);
  }

  // Used for Exchange Rate Graph
  function calculateConversionRates(data) {
    console.log(data);
  }

  function refreshView() {
    //Refresh the view after some action
    performAnAction(action_offers);
    performAnAction(action_accountInfo);
  }

  // https://www.kirupa.com/html5/removing_duplicate_items_from_an_array.htm
  Array.prototype.removeDuplicates = function() {
    var input = this;
    var hashObject = new Object();

    for (var i = input.length - 1; i >= 0; i--) {
      var currentItem = input[i];

      if (hashObject[currentItem] == true) {
        input.splice(i, 1);
      }
      hashObject[currentItem] = true;
    }
    return input;
  }


})
