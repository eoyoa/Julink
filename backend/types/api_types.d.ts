export interface BackendRequest {
    timestamp: number;
}
export declare function isProperBackendRequest(request: unknown): request is BackendRequest;
export interface BackendPayload {
    word: string;
}
export declare function isBackendPayload(payload: unknown): payload is BackendPayload;
