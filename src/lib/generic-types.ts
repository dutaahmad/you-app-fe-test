export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export enum ApiPaths {
    LOGIN = "login",
    REGISTER = "register",
    GET_PROFILE = "getProfile",
    UPDATE_PROFILE = "updateProfile",
    CREATE_PROFILE = "createProfile",
}

export interface YouAppRequestHeaders extends Partial<Headers> {
    ['x-access-token']?: string;
    ['Content-Type']: string;
}

// Conditional: data is required if method is POST
type RequestData<M extends HttpMethods, D> = M extends HttpMethods.POST ? { data: D } : { data?: D };

// Final conditional interface
export type YouAppFetchRequest<
    RequestBodyType = unknown,
    URLParamsType = Record<string, string>,
    M extends HttpMethods = HttpMethods
> = {
    method: M;
        path: string;
    params?: URLParamsType;
    headers?: YouAppRequestHeaders;
    token?: string
} & RequestData<M, RequestBodyType>;