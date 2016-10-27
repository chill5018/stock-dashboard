
$(document).ready(function() {
  var apiKey = '06a3f86266a91a6c57153e802d9eec04'; // Constant
  var username = 'COLI0107';                       // Constant
  var action_accountInfo = 'account_info';         // Action Type
  var action_offers = 'offers';                    // Action type
  var action_buy = 'buy';                          // Action Type
  var action_sell = 'sell';                        // Action Type
  var action_exchangeRate = 'exchange_rate'        // Action Type

  // var transaction_id = document.getElementById("transactionId");
  var transaction_id = ''; // get from input field
  var qtyStocks = ''; // get from input field

  var currency1 = 'ANDR705V'
  var currency2 = 'COLI0107'

  //Send the AJAX call to the server

  setInterval(function() {
    $.ajax({
      //The URL to process the request
      'url': 'http://52.57.228.6//man2API/php/BankPhp.php',
      //The type of request, also known as the "method" in HTML forms
      //Can be 'GET' or 'POST'
      'type': 'GET',
      //Any post-data/get-data parameters
      //This is optional
      'data': {
        'what': action_offers,
        'apikey': apiKey
      },
      //The response from the server
      'success': function (dataString) {//You can use any jQuery/JavaScript here!!!
        console.log(dataString);

        var data = JSON.parse(dataString)
        // console.log(data);

        // var graphData = [];
        for (var i = 0; i < data.data.length; i++) {
          var idJS = data.data[i].id;
          var amountJS = data.data[i].amount;
          var currencyJS = data.data[i].currency;

          // var graphPoint = {};
          // graphPoint.label = currencyJS;
          // graphPoint.value = amountJS;
          // graphData.push(graphPoint);
          $('#currentOffers').append("<tr><td>"+idJS+"</td><td>"+currencyJS+"</td><td >"+amountJS+"</td></tr>");
        }

        // console.log(graphData);
        $('.lastUpdated').text('Last Updated: '+moment().toString());
      }
    });
  },1000*30);

  var interval = 1000 * 60 * 1; // where X is your every X minutes


  setInterval(performAnAction(action_accountInfo, username), interval);


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
      'success': function (dataString) {//You can use any jQuery/JavaScript here!!!
        console.log(dataString);

        var data = JSON.parse(dataString)
        console.log(data);

        var graphData = [];
        for (var i = 0; i < data.data.length; i++) {
          var amountJS = data.data[i].amount;
          var currencyJS = data.data[i].currency;

          var graphPoint = {};

          graphPoint.label = currencyJS;
          graphPoint.value = amountJS;

          graphData.push(graphPoint);
        }

        console.log(graphData);

        // Do something with the data
        $('#myAmount').append(data.data[0].amount);
        $('.conversionLabel').append(data.data[0].amount);
        $('#myCurrency').append(data.data[0].currency);
        $('.lastUpdated').text('Last Updated: '+moment().toString());




      }
    });
  }
})

// new Morris.Line({
//   // ID of the element in which to draw the chart.
//   element: 'myfirstchart',
//   // Chart data records -- each entry in this array corresponds to a point on
//   // the chart.
//   data: [
//     { year: '2008', value: 20 },
//     { year: '2009', value: 10 },
//     { year: '2010', value: 5 },
//     { year: '2011', value: 5 },
//     { year: '2012', value: 20 }
//   ],
//   // The name of the data record attribute that contains x-values.
//   xkey: 'year',
//   // A list of names of data record attributes that contain y-values.
//   ykeys: ['value'],
//   // Labels for the ykeys -- will be displayed when you hover over the
//   // chart.
//   labels: ['Value']
// });

// new Morris.Area({
//   // ID of the element in which to draw the chart.
//   element: 'net-worth',
//   // Chart data records -- each entry in this array corresponds to a point on
//   // the chart.
//   data: [
//     { day: '2016-10-21', value: 5 },
//     { day: '2016-10-22', value: 10 },
//     { day: '2016-10-23', value: 7 },
//     { day: '2016-10-24', value: 9 },
//     { day: '2016-10-25', value: 12 }
//   ],
//   // The name of the data record attribute that contains x-values.
//   xkey: 'day',
//   // A list of names of data record attributes that contain y-values.
//   ykeys: ['value'],
//   // Labels for the ykeys -- will be displayed when you hover over the
//   // chart.
//   labels: ['Value']
// })
