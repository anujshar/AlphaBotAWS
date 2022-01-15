const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-south-1"});

exports.handler = (event, context, callback) =>
{
    console.log("Processing...");
    console.log(event.strategyId);
    const params =
    {
        TableName: "Strategies",
        Key:
        {
            "strategyId": event.strategyId.toString(),
            "userId": "999",
        }
    };

    var ruleResultList = [];

    docClient.get(params, (err, data) =>
    {
        if(err)
        {
            callback(err, null);
        }
        else
        {
            var rulesList = data.Item.strategyRules;
            for(var i=0; i < data.Item.strategyRules.length; i++)
            {
                computeRule(data.Item.strategyRules[i] , (ruleResult, j) =>
                {
                    ruleResultList.push(ruleResult);
                    if(ruleResultList.length == data.Item.strategyRules.length)
                    {
                        // call compile result function
                        var compiledResult = getIntersectionList(ruleResultList);
                        console.log(compiledResult);
                        callback(null, compiledResult);
                    }
                });
            }
        }
    });
};

// returns result for one rule (list of stocks)
function computeRule(rule , callback)
{
    switch(rule.multiple)
    {
      case "3Mgrowth":
      case "6Mgrowth":
      case "9Mgrowth":
      case "1Ygrowth":
      case "2Ygrowth":
      case "3Ygrowth":
      case "3M return":
      case "6M return":
      case "9M return":
      case "1Y return":
      case "2Y return":
      case "3Y return":
        growthRule(rule, (list) => {
            callback(list);
        });
        break;
      default:
        // code block
    }
}

// compute all growth related rules
function growthRule(rule, callback)
{
    // get date range for the rule
    var startDate = computeStartDateGrowthRule(rule.multiple);
    // end date is today's date currently
    var d = new Date("2020-12-02T00:00:00");

    // if Saturday, move 1 day back
    if(d.getDay() == 6)
    {
        d.setDate(d.getDate()-1);
    }

    // if Sunday, move 2 days back
    if(d.getDay() == 0)
    {
        d.setDate(d.getDate()-2);
    }

    var endDate = d.toISOString().slice(0,10);

    var growthList = [];


    /*
    getTickerList((tickerList) => {
        for(var i = 0; i< tickerList.Items.length; i++)
        {
            getTickerGrowth(tickerList.Items[i], startDate, endDate, rule, (growth) => {
               growthList.push(growth);
               if(growthList.length == tickerList.Items.length)
               {
                   var finalResult = getPercentileAndSortedList(growthList, rule);
                   callback(finalResult);
               }
            });
        }
    });

    */

    getGrowthList(startDate, endDate, rule, (growthList) => {
        var finalResult = getPercentileAndSortedList(growthList, rule);
        callback(finalResult);
    });

}

// get the list of results for a growth rule
function getGrowthList (startDate, endDate, rule, callback)
{
    const params_startDate =
    {
        "TableName": "Prices_2020",
        "FilterExpression": "#s_date = :sDate",
        "ExpressionAttributeValues": {":sDate": startDate},
        "ExpressionAttributeNames": { "#s_date": "date" }
    };


    var resultList = [];

    docClient.scan(params_startDate, (err, startResult) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            var startResultArray = startResult.Items;
            const params_endDate =
            {
                "TableName": "Prices_2020",
                "FilterExpression": "#s_date = :sDate",
                "ExpressionAttributeValues": {":sDate": endDate},
                "ExpressionAttributeNames": { "#s_date": "date" }
            };

            docClient.scan(params_endDate, (err, endResult) => {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    var endResultArray = endResult.Items;
                    for(var i=0; i< startResultArray.length; i++)
                    {
                        var endItem = endResultArray.find((item) => { return item.ticker == startResultArray[i].ticker});
                        var multipleName = rule.multiple;
                        var obj = {};
                        obj["ticker"] = startResultArray[i].ticker;
                        obj[multipleName] = Math.round((endItem.close/startResultArray[i].close - 1)*1000*100)/1000 ;
                        resultList.push(obj);
                    }
                    callback(resultList);
                }
            });

        }
    });
}

// compute start date for the rule
function computeStartDateGrowthRule(multiple)
{
    var date;
    var days;
    switch(multiple)
    {
      case "3Mgrowth":
      case "3M return":
        days = 90;
        break;
      case "6Mgrowth":
      case "6M return":
        days = 180;
        break;
      case "9Mgrowth":
      case "9M return":
        days = 270;
        break;
      case "1Ygrowth":
      case "1Y return":
        days = 365;
        break;
      case "2Ygrowth":
      case "2Y return":
        days = 730;
        break;
      case "3Ygrowth":
      case "3Y return":
        days = 1095;
        break;
      default:
        days = 0;
    }

    var d = new Date("2020-12-02T00:00:00");
    d.setDate(d.getDate()-days);

    // if Saturday, move 1 day back
    if(d.getDay() == 6)
    {
        d.setDate(d.getDate()-1);
    }

    // if Sunday, move 2 days back
    if(d.getDay() == 0)
    {
        d.setDate(d.getDate()-2);
    }
    date = d.toISOString().slice(0,10);
    return date;
}


function getTickerList(callback)
{
    const params =
    {
        TableName: "CompanyProfile",
        ProjectionExpression: "ticker"
    };

    docClient.scan(params, (err, result) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            callback(result);
        }
    });

}

function getTickerGrowth(ticker, startDate, endDate, rule, callback)
{

    /*
    const params_startDate =
    {
        TableName: "Prices_2020",
        Key: {
            "ticker": ticker.ticker,
            "date": startDate
        }
    };


    docClient.get(params_startDate, (err, startResult) => {
        if(err)
        {
            console.log("Error encountered while fetching stock price");
            console.log(err);
        }
        else if(startResult == null)
        {

        }

        else
        {
            var start_price = startResult.Item.close;

            const params_endDate =
            {
                TableName: "Prices_2020",
                Key: {
                    "ticker": ticker.ticker,
                    "date": endDate
                }
            };
            docClient.get(params_endDate, (err, endResult) => {
                if(err)
                {
                    console.log("Error encountered while fetching end stock price");
                }
                else if(endResult == null)
                {

                }
                else
                {
                    var multipleName = rule.multiple;
                    var obj = {};
                    obj["ticker"] = ticker.ticker;
                    obj[multipleName] = endResult.Item.close/ start_price;
                    callback(obj);
                }
            });
        }

    });

    */
}

function getPercentileAndSortedList(growthList, rule)
{
    var sorted_array = (growthList.sort(getSortOrder(rule.multiple, rule.order)));
    var array_length = (Math.ceil(parseInt(rule.percentile)/100 * growthList.length));
    return (sorted_array.slice(0,array_length));
}

function getSortOrder(property, order)
{
    return function(a,b)
    {
        if(order == 'bottom')
        {
              if(a[property] > b[property])
                 return 1;
              else if(a[property] < b[property])
                 return -1;

              return 0;
        }

        if(order == 'top')
        {
              if(a[property] < b[property])
                 return 1;
              else if(a[property] > b[property])
                 return -1;

              return 0;
        }

        else
            return 0;
    }
}

function getIntersectionList(list)
{
    var intersectionList = list[0];
    for (var i = 1; i < list.length; i++)
    {
        intersectionList = intersectionList.filter(item1 => list[i].some(item2 => item1.ticker === item2.ticker))
    }

    for (var i = 0; i < intersectionList.length; i++)
    {
        for(var j = 1; j < list.length; j++)
        {
            var tickerObj = (list[j].find((item) => { return item.ticker == intersectionList[i].ticker}));
            for(var key in tickerObj)
            {
                if(key != "ticker")
                intersectionList[i][key] = tickerObj[key];
            }
        }

    }
    return intersectionList;
}
