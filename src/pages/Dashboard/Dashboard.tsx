import Loading from "../../components/ui/Loading";
import SalesHistoryProducts from "../../components/ui/SalesHistoryProducts/SalesHistoryProducts";
import SellSingleProduct from "../../components/ui/SellSingleProduct/SellSingleProduct";
import { useGetProductsQuery } from "../../redux/features/products/productsApi";
import { useGetSalesQuery } from "../../redux/features/sales/salesApi";
import { useAppSelector } from "../../redux/hooks";
import { TProduct } from "../../types/product.types";
import "./Dashboard.css";
import { UserOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: productData, isLoading } = useGetProductsQuery({
    searchTerm: undefined,
  });
  const { data: salesData, isFetching } = useGetSalesQuery("daily");

  return (
    <div className="dashboard">
      <div className="dashboard-title">
        <h1 className="page-title">Dashboard</h1>
        <p>
          <UserOutlined /> <span>{user?.username}</span>
        </p>
      </div>
      <div className="container">
        <div className="dashboard-container">
          <div className="new-content">
            <h2 className="new-content-title">Newly Added</h2>
            {isLoading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Loading />
              </div>
            ) : (
              productData.products
                .slice()
                .reverse()
                .slice(0, 3)
                .map((item: TProduct) => (
                  <SellSingleProduct
                    key={item._id}
                    data={item}
                    location="dashboard"
                  />
                ))
            )}
          </div>
          <div className="sales-content">
            <h2 className="sales-content-title">Today Sales</h2>
            <div style={{ position: "relative" }}>
              {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Loading />
                </div>
              ) : (
                <SalesHistoryProducts
                  data={salesData}
                  isFetching={isFetching}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
