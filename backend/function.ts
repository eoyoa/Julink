import {APIGatewayEvent, APIGatewayProxyResultV2, Handler} from "aws-lambda";
import {getWordOfTheDay} from "./get-word-of-the-day.js";
import {BackendPayload, isProperBackendRequest} from "./api_types.js";

export const handler: Handler = async ({ body }: APIGatewayEvent): Promise<APIGatewayProxyResultV2> => {
    if (!body) throw new Error("Missing request body");
    const request: unknown = JSON.parse(body);
    if (!isProperBackendRequest(request)) throw new Error("Invalid request body");

    const { timestamp } = request;

    const payload: BackendPayload = getWordOfTheDay();

    return {
        statusCode: 200,
        body: JSON.stringify(payload),
    }
}