export interface BackendRequest {
    timestamp: number;
}

export function isProperBackendRequest(request: unknown): request is BackendRequest {
    if (!request || typeof request !== 'object') return false;
    if (!('timestamp' in request)) return false;

    return typeof request.timestamp === 'number';
}

export interface BackendPayload {
    word: string
}

export function isBackendPayload(payload: unknown): payload is BackendPayload {
    if (!payload || typeof payload !== 'object') return false;
    if (!('word' in payload)) return false;
    return typeof payload.word === 'string';
}