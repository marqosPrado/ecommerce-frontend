export type ContentPageable<T> = {
  content: T,
  pageable: PageableData,
  last: boolean,
  totalPages: number,
  totalElements: number,
  size: number
  number: number,
  sort: Sort,
  first: boolean,
  numberOfElements: number,
  empty: false
}

export type PageableData = {
  pageNumber: number,
  pageSize: number,
  offset: number,
  paged: boolean,
  unpaged: boolean
}

export type Sort = {
  sorted: boolean,
  empty: boolean,
  unsorted: boolean
}
