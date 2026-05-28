export interface PageResponse<T> {
    success: boolean;
    data: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}