const BASE_URL = "http://localhost:3000";

type RequestOptions = RequestInit & {
    params?: Record<string, string | number | boolean>;
};

const buildUrl = (url: string, params?: RequestOptions["params"]) => {
    const fullUrl = new URL(`${BASE_URL}${url}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            fullUrl.searchParams.append(key, String(value));
        });
    }

    return fullUrl.toString();
};

const request = async <T>(
    url: string,
    options?: RequestOptions,
): Promise<T> => {
    const finalUrl = buildUrl(url, options?.params);

    const res = await fetch(finalUrl, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!res.ok) {
        throw new Error("API Error");
    }

    return res.json();
};

export const http = {
    get: <T>(url: string, params?: RequestOptions["params"]) =>
        request<T>(url, { method: "GET", params }),

    post: <T>(url: string, body: unknown) =>
        request<T>(url, {
            method: "POST",
            body: JSON.stringify(body),
        }),

    put: <T>(url: string, body: unknown) =>
        request<T>(url, {
            method: "PUT",
            body: JSON.stringify(body),
        }),

    patch: <T>(url: string, body: unknown) =>
        request<T>(url, {
            method: "PATCH",
            body: JSON.stringify(body),
        }),

    delete: <T>(url: string) =>
        request<T>(url, {
            method: "DELETE",
        }),
};
