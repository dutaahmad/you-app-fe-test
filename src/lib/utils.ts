import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { HttpMethods, YouAppFetchRequest, YouAppRequestHeaders } from "./generic-types";
import { env } from "@/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function youAppFetch<TResponseData, TRequestBody = unknown, TURLParams = Record<string, string>>(requestInit: YouAppFetchRequest<TRequestBody, TURLParams>): Promise<TResponseData> {
  let headers: YouAppRequestHeaders = {
    "Content-Type": "application/json",
  };

  if (requestInit.token) {
    headers = {
      ...headers,
      "x-access-token": requestInit.token,
    };
  }

  let url = env.NEXT_PUBLIC_YOU_APP_API_URL + "/" + requestInit.path;
  switch (requestInit.method) {
    case HttpMethods.GET:
      if (requestInit.params) {
        const urlSearchParams = new URLSearchParams();
        Object.entries(requestInit.params).forEach(([key, value]) => {
          urlSearchParams.append(key, value as string);
        });
        url += `?${urlSearchParams.toString()}`;
      }
      return fetch(url, {
        method: requestInit.method,
        // @ts-expect-error YouAppRequestHeader is not assignable to HeadersInit
        headers: headers,
      }).then((res) => res.json());
    case HttpMethods.POST:
      return fetch(url, {
        method: requestInit.method,
        // @ts-expect-error YouAppRequestHeader is not assignable to HeadersInit
        headers: headers,
        body: JSON.stringify(requestInit.data),
      }).then((res) => res.json());
    case HttpMethods.PUT:
      return fetch(url, {
        method: requestInit.method,
        // @ts-expect-error YouAppRequestHeader is not assignable to HeadersInit
        headers: headers,
        body: JSON.stringify(requestInit.data),
      }).then((res) => res.json());
    case HttpMethods.DELETE:
      return fetch(url, {
        method: requestInit.method,
        // @ts-expect-error YouAppRequestHeader is not assignable to HeadersInit
        headers: headers,
        body: JSON.stringify(requestInit.data),
      }).then((res) => res.json());
    case HttpMethods.PATCH:
      return fetch(url, {
        method: requestInit.method,
        // @ts-expect-error YouAppRequestHeader is not assignable to HeadersInit
        headers: headers,
        body: JSON.stringify(requestInit.data),
      }).then((res) => res.json());
  };
}