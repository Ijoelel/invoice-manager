type ApiParams = {
    page: number;
    limit: number;
    status?: string;
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
};
