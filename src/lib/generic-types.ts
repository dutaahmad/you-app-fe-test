export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export interface YouAppRequestHeaders extends Partial<Headers> {
    ['x-access-token']?: string;
    ['Content-Type']: string;
}

// Conditional: token is required if withAuth is true
type AuthToken<T extends boolean | undefined> = T extends true ? { token: string } : { token?: string };

// Conditional: data is required if method is POST
type RequestData<M extends HttpMethods, D> = M extends HttpMethods.POST ? { data: D } : { data?: D };

// Final conditional interface
export type YouAppFetchRequest<
    RequestBodyType = unknown,
    URLParamsType = Record<string, string>,
    M extends HttpMethods = HttpMethods,
    Auth extends boolean | undefined = undefined
> = {
    method: M;
    url: string;
    params?: URLParamsType;
    headers?: YouAppRequestHeaders;
    withAuth?: Auth;
} & AuthToken<Auth> & RequestData<M, RequestBodyType>;