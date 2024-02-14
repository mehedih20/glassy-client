import { useState } from "react";
import "./SellProduct.css";
import { useGetProductsQuery } from "../../../redux/features/products/productsApi";
import { ConfigProvider, Space } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { TProduct } from "../../../types/product.types";
import SellSingleProduct from "../../../components/ui/SellSingleProduct/SellSingleProduct";

type searchType = {
  searchTerm: string[];
};

const SellProduct = () => {
  const [queryObj, setQueryObj] = useState<searchType>({
    searchTerm: [],
  });
  const [skip, setSkip] = useState(true);
  const { data, isFetching, refetch } = useGetProductsQuery(queryObj, {
    skip,
  });

  const onSearch: SearchProps["onSearch"] = (value: string) => {
    if (value !== "") {
      setSkip(false);
      setQueryObj((prev) => ({
        ...prev,
        searchTerm: [value],
      }));
    }
  };

  return (
    <>
      <div className="sellProduct">
        <h1 className="page-title">Sell Product</h1>
        <div className="container">
          <div className="sellProduct-container">
            <div>
              <Space direction="vertical">
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#043d54",
                      fontSize: 14,
                    },
                  }}
                >
                  <Search
                    placeholder="Search by product name"
                    onSearch={onSearch}
                    loading={isFetching}
                    enterButton
                    width={400}
                    size="large"
                  />
                </ConfigProvider>
              </Space>
            </div>

            <div className="sellProduct-data">
              {!data ? (
                <h2 className="empty-data-text">Nothing to show!</h2>
              ) : data.products.length > 0 ? (
                data.products.map((item: TProduct) => (
                  <SellSingleProduct
                    data={item}
                    key={item._id}
                    refetch={refetch}
                  />
                ))
              ) : (
                <h2 className="empty-data-text">No products found!</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellProduct;
