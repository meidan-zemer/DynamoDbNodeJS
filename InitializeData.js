var AWS = require("aws-sdk");

AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

var projectsTableParams = {
    TableName : "Projects",
    KeySchema: [
        { AttributeName: "AccountId", KeyType: "HASH"},  //Partition key
        { AttributeName: "ProjectId", KeyType: "RANGE" }  //Sort key
        ],
    AttributeDefinitions: [
        { AttributeName: "AccountId", AttributeType: "N" },
        { AttributeName: "ProjectId", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

var projectsDataParams = {
    RequestItems:{
        Projects:createProjectsData()
    }

};

CreateTable(projectsTableParams).then(function(){LoadData(projectsDataParams);}).catch(function(err){console.log(JSON.stringify(err));});

var animationsTableParams = {
    TableName : "Animations",
    KeySchema: [
        { AttributeName: "AccountId", KeyType: "HASH"},  //Partition key
        { AttributeName: "AnimationId", KeyType: "RANGE" }  //Sort key
        ],
    AttributeDefinitions: [
        { AttributeName: "AccountId", AttributeType: "N" },
        { AttributeName: "AnimationId", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

var animationsDataParams = {
    RequestItems:{
        Animations:createAnimationsData()
    }

};

CreateTable(animationsTableParams).then(function(){LoadData(animationsDataParams);}).catch(function(err){console.log(JSON.stringify(err));});


function CreateTable(params){
    return new Promise(function(resolve,reject){
                var dynamodb = new AWS.DynamoDB();
                dynamodb.createTable(params, function(err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
    });
}


function LoadData(params){
    return new Promise(function(resolve, reject){
        var docClient = new AWS.DynamoDB.DocumentClient();
        docClient.batchWrite(params, function(err,data){
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function createAnimationsData(){
    var animations = [];

    for(var i=0;i<20;i++)
    {
        var animation={};
        animation.AccountId=1;
        animation.AnimationId=i;
        animation.Name="Animation Number " + i;
        animations.push({PutRequest:{Item:animation}});
    }
    return animations;
}

function createProjectsData(){
    var projects = [];

    for(var i=0;i<20;i++)
    {
        var project={};
        project.AccountId=1;
        project.ProjectId=i;
        project.Name="Project Number " + i;
        projects.push({PutRequest:{Item:project}});
    }
    return projects;
}

