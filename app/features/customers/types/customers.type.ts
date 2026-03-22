export type Customer = {
    id: string;
    name: string;
    email: string;
    plan: string;
};

export type CustomerHTTPResponse = {
    first: number;
    prev: number;
    next: number;
    last: number;
    pages: number;
    items: number;
    data: Customer[];
};
