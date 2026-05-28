import api from "../config/axios";
import type { ApiResponse, ApiSuccess } from "../types/response/ApiResponse";
import type { BookResponse } from "../types/response/BookResponse";
import type { PageResponse } from "../types/response/PageResponse";
import type { SortOption } from "../types/util/sort";

type GetBooksParams = {
  page?: number;
  size?: number;
  genreId?: number | null;
  sort?: SortOption;
};

type SearchBooksParams = {
  keyword: string;
  page?: number;
  size?: number;
};

const getSortParams = (sort: SortOption) => {
  switch (sort) {
    case "priceAsc":
      return {
        sort: "price",
        dir: "asc",
      };

    case "priceDesc":
      return {
        sort: "price",
        dir: "desc",
      };

    case "newest":
      return {
        sort: "createdAt",
        dir: "desc",
      };

    case "titleAsc":
      return {
        sort: "title",
        dir: "asc",
      };

    default:
      return {
        sort: "createdAt",
        dir: "desc",
      };
  }
};

export const getFeaturedBooks = async (page: number, size: number): Promise<BookResponse[]> => {
    try {
        const res = await api.get<PageResponse<BookResponse>>("/books/featured", {
            params: {
                page: page,
                size: size
            }
        });
        return res.data.data;
    } catch (error) {
        console.error("Error fetching featured books:", error);
        throw error;
    }
}

export const getNewArrivals = async (page: number, size: number): Promise<BookResponse[]> => {
    try {
        const res = await api.get<PageResponse<BookResponse>>("/books/new-arrivals", { 
            params: {
                page: page,
                size: size 
            }
        });
        return res.data.data;
    } catch (error) {
        console.error("Error fetching new arrivals:", error);
        throw error;
    }
}

export const getBooks = async ({
  page = 0,
  size = 6,
  genreId,
  sort = "newest",
}: GetBooksParams): Promise<PageResponse<BookResponse>> => {
  const sortParams = getSortParams(sort);

  const res = await api.get<PageResponse<BookResponse>>("/books", {
    params: {
      page,
      size,
      genreId: genreId ?? null,
      ...sortParams,
    },
  });

  return res.data;
};

export const searchBooks = async ({ keyword, page = 0, size = 6 }: SearchBooksParams): Promise<PageResponse<BookResponse>> => {
    try {
        const res = await api.get<PageResponse<BookResponse>>("/books/search", {
            params: {
                keyword: keyword,
                page: page,
                size: size,
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error searching books:", error);
        throw error;
    }
};

export const getBooksByIds = async (ids: string): Promise<ApiResponse<BookResponse>> => {
    try {
        const res = await api.get<ApiSuccess<BookResponse>>(`/books/${ids}`)
        return res.data;
    } catch (error: any) {
       return {
            success: false,
            message: error.response?.data?.message || "",
        }
    }
};
