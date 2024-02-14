import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryObj) => {
        const params = new URLSearchParams();

        Object.entries(queryObj)
          .filter(([, value]) => value !== undefined || value !== "")
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              params.append(`${key}`, `${value.join(",")}`);
            }
          });

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["products"],
    }),
    getDistinctProductValues: builder.query({
      query: () => ({
        url: "/distinct-values",
        method: "GET",
      }),
    }),
    getHighestPrice: builder.query({
      query: () => ({
        url: "/highest-price",
        method: "GET",
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    deleteProductInBulk: builder.mutation({
      query: (data) => ({
        url: "/delete-products",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: (payload) => ({
        url: `/update-product/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useDeleteProductInBulkMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetDistinctProductValuesQuery,
  useGetHighestPriceQuery,
} = productsApi;
