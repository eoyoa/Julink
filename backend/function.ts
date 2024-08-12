import {APIGatewayProxyResultV2, Handler} from "aws-lambda";
import {getWordOfTheDay} from "./get-word-of-the-day.js";

export const handler: Handler = async (): Promise<APIGatewayProxyResultV2> => {
    let payload = getWordOfTheDay();

    return {
        statusCode: 200,
        body: JSON.stringify(payload)
    }
}