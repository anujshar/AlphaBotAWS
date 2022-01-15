const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-south-1"});

exports.handler = (event, context, callback) =>
{
    console.log("Processing...");
    console.log(event.queryStringParameters.userid);
    console.log(event);
    const params =
    {
        TableName: "Strategies",
        FilterExpression: "#uid = :userid",
        ExpressionAttributeNames:{
            "#uid": "userId",
        },
        ExpressionAttributeValues: {
            ":userid": event.queryStringParameters.userid,
        }
    };

    docClient.scan(params, (err, data) => {
        if(err)
        {
            console.log(err);
            var response = {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(err)
            };
            callback(response, null);
        }
        else
        {
            console.log(data);
            var response = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(data)
            };
            callback(null, response);
        }
    });

};
