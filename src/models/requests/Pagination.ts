export interface PageRequest {
    page: number;
    pageSize: number;
    orderBy?: string;
    direction?: "asc" | "desc";
}

export interface PageResponse<T> {
    totalRows: number;
    data: T[];
    totalPages: number;
    currentPage: number;
    pageSize: number;
}
