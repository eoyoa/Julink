import {APIGatewayEvent, APIGatewayProxyResultV2, Handler} from "aws-lambda";
import {getWordOfTheDay} from "./get-word-of-the-day.js";
import {BackendRequest} from "./request.js";

function isProperBackendRequest(request: unknown): request is BackendRequest {
    if (!request || typeof request !== 'object') return false;
    if (!('timestamp' in request)) return false;

    return typeof request.timestamp === 'number';
}

export const handler: Handler = async ({ body }: APIGatewayEvent): Promise<APIGatewayProxyResultV2> => {
    if (!body) throw new Error("Missing request body");
    const request: unknown = JSON.parse(body);
    if (!isProperBackendRequest(request)) throw new Error("Invalid request body");

    const { timestamp } = request;

    const payload = getWordOfTheDay();

    return {
        statusCode: 200,
        body: JSON.stringify(payload),
    }
}