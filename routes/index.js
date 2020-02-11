var stockNames = ["AAPL", "SNAP", "GOOGL"]
var reqArr = ["GLOBAL_QUOTE", "MSFT", "1min", "H3FTWBXJYQ1YB9CK"]
var base = "https://www.alphavantage.co/query?"
var stockArray = []

var stockDictionary = new Object();
for(var i = 0; i < stockNames.length; i++){
    stockDictionary[stockNames[i]] = new Object();
}
console.log(stockDictionary)

function fetchData(callback) {
    var requests = [];

    for(var i = 0; i < stockNames.length; i++)
    {
        var url = base + "function=" + reqArr[0] + "&symbol=" + stockNames[i] + "&interval=" + reqArr[2] + "&apikey="+reqArr[3]
        requests.push($.get(url))
    }

    $.when.apply($, requests).then(function () {
        var array = $.map(arguments, function (arg) {
            return arg[0];
        });
        callback(array);
    })
}

fetchData(function (arr) {
    for(var i = 0; i < arr.length; i++){
        stockArray.push(arr[i]["Global Quote"])
    }
})

var stockJson = {}
stockJson["Stocks"] = stockArray;

exports.view = function(request, response){
	response.render('index', stockArray);
};