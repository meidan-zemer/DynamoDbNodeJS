var AWS = require("aws-sdk");

AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    //ExclusiveStartTableName: 'table_name', // optional (for pagination, returned as LastEvaluatedTableName)
    Limit: 10, // optional (to further limit the number of table names returned per page)
};
dynamodb.listTables(params, function(err, data) {
    if (err) {
        console.error(JSON.stringify(err, null, 2));
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});