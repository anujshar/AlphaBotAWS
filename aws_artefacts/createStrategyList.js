const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-south-1"});

exports.handler = (event, context, callback) =>
{
    console.log("Processing...");
    console.log(event.strategy.strategyRules);
 /*   const params =
    {
        TableName: "Strategies",
        Item: {
                    "strategyId": "6",
                    "userId": "999",
                    "strategyName": "API strategy 2",
                    "startegyDesc": "Low 9m return, high 3m return, high market cap",
                    "createdAt": "2021-03-27T19:58:22.947Z",
                    "modifiedAt": "2021-03-27T19:58:22.947Z",
                    "groupId": "0",
                    "groupName": "Strategy group 1",
                    "isOpen": false,
                    "strategyRules":
                        [
                            {
                                "multiple": "3Mgrowth",
                                "percentile": "25",
                                "order": "top",
                            },
                            {
                                "multiple": "9Mgrowth",
                                "percentile": "45",
                                "order": "bottom",
                            },
                        ]
                }
    };
  */
    var rulesCount = event.strategy.strategyRules.length;
    var strategyRules = [];

    for(var i = 0; i < rulesCount; i++)
    {
        var rule = {};
        var order = (event.strategy.strategyRules[i].criteria.substring(0, 3) === "Top") ? "top" : "bottom";
        var percentile = (event.strategy.strategyRules[i].criteria.substring(event.strategy.strategyRules[i].criteria.length - 2, event.strategy.strategyRules[i].criteria.length -1) === "x") ? event.strategy.strategyRules[i].criteriaValue : event.strategy.strategyRules[i].criteria.substring(event.strategy.strategyRules[i].criteria.length - 3, event.strategy.strategyRules[i].criteria.length -1)
        rule["multiple"] = event.strategy.strategyRules[i].multiple;
        rule["order"] = order;
        rule["percentile"] = percentile;
        strategyRules.push(rule);
    }

     const params =
    {
        TableName: "Strategies",
        Item: {
                    "strategyId": event.strategy.strategyId,
                    "userId": event.strategy.userId,
                    "strategyName": event.strategy.strategyName,
                    "strategyDesc": event.strategy.strategyDesc,
                    "createdAt": event.strategy.createdAt,
                    "modifiedAt": event.strategy.modifiedAt,
                    "groupId": event.strategy.groupId,
                    "groupName": event.strategy.groupName,
                    "isOpen": event.strategy.isOpen,
                    "strategyRules": strategyRules,
                }
    };

    docClient.put(params, (err, data) => {
        if(err)
        {
            console.log(err);
            callback(err, null);
        }
        else
        {
            console.log(data);
            callback(null, data);
        }
    });

};
