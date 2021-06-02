export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

// PaginatedResult with any of the type we pass in
// T is representing an array of members
// for example PaginateResult<Member[]>
export class PaginatedResult<T> {
    // result will hold the list of members
    result: T;
    pagination: Pagination;
}