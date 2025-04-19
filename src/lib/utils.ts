import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { HttpMethods, YouAppFetchRequest, YouAppRequestHeaders } from "./generic-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function youAppFetch<TResponseData, TRequestBody = unknown, TURLParams = Record<string, string>>(requestInit: YouAppFetchRequest<TRequestBody, TURLParams>): Promise<TResponseData> {
  let headers: YouAppRequestHeaders = {
    "Content-Type": "application/json",
  };

  if (requestInit.withAuth) {
    headers = {
      ...headers,
      "x-access-token": requestInit.token,
    };
  }
  switch (requestInit.method) {
    case HttpMethods.GET:
      if (requestInit.params) {
        const urlSearchParams = new URLSearchParams();
        Object.entries(requestInit.params).forEach(([key, value]) => {
          urlSearchParams.append(key, value as string);
        });
        requestInit.url += `?${urlSearchParams.toString()}`;
      }
      return fetch(requestInit.url, {
        method: requestInit.method,
        // @ts-expect-error YouAppRequestHeader is not assignable to HeadersInit
        headers: headers,
      }).then((res) => res.json());
    case HttpMethods.POST:
      return fetch(requestInit.url, {
        method: requestInit.method,
        // @ts-expect-error YouAppRequestHeader is not assignable to HeadersInit
        headers: headers,
        body: JSON.stringify(requestInit.data),
      }).then((res) => res.json());
    case HttpMethods.PUT:
      return fetch(requestInit.url, {
        method: requestInit.method,
        // @ts-expect-error YouAppRequestHeader is not assignable to HeadersInit
        headers: headers,
        body: JSON.stringify(requestInit.data),
      }).then((res) => res.json());
    case HttpMethods.DELETE:
      return fetch(requestInit.url, {
        method: requestInit.method,
        // @ts-expect-error YouAppRequestHeader is not assignable to HeadersInit
        headers: headers,
        body: JSON.stringify(requestInit.data),
      }).then((res) => res.json());
    case HttpMethods.PATCH:
      return fetch(requestInit.url, {
        method: requestInit.method,
        // @ts-expect-error YouAppRequestHeader is not assignable to HeadersInit
        headers: headers,
        body: JSON.stringify(requestInit.data),
      }).then((res) => res.json());
  };
}