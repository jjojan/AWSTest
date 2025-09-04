import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, 
    PutCommand, 
    DynamoDBDocumentClient, 
    ScanCommand, 
    DeleteCommand} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({region:"us-west-1"});
const docCilent = DynamoDBClient.from(client)

export const fetchTasks = async () => {
    const command = new ScanCommand({
        ExpressionAttributeNames: {
            "#name": "name"
        },
        ProjectionExpression: "id, #name, completed",
        TableName: "Tasks",
    });

    const response = await docCilent.send(command);

    return response;
};

export const createTasks = async (name, completed ) => {
    const uuid = crypto.randomUUID()


    const command = new PutCommand({
        TableName: "Tasks",
        Item: {
            id: uuid,
            name,
            completed
        }
    });

    const response = await docCilent.send(command);

    return response;
};

export const updateTasks = async (id, name, completed ) => {
    const uuid = crypto.randomUUID()


    const command = new UpdateCommand({
        TableName: "Tasks",
        Key: {
            id
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        UpdateExpression: "set #name = :name, completed= :c",
        ExpressionAttributeValues: {
            ":n": name,
            ":c": completed
        },
        ReturnValues: "ALL_NEW"
        
    });

    const response = await docCilent.send(command);

    return response;
};

export const deleteTasks = async (id) => {
    const uuid = crypto.randomUUID()


    const command = new DeleteCommand({
        TableName: "Tasks",
        Key: {
            id
        }
    });

    const response = await docCilent.send(command);

    return response;
};