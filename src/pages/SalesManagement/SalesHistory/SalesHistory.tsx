import { ConfigProvider, Radio } from "antd";
import "./SalesHistory.css";
import { useState } from "react";
import { useGetSalesQuery } from "../../../redux/features/sales/salesApi";
import SalesHistoryProducts from "../../../components/ui/SalesHistoryProducts/SalesHistoryProducts";

const SalesHistory = () => {
  const [historyType, setHistoryType] = useState("daily");
  const { data, isFetching } = useGetSalesQuery(historyType);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#043d54",
        },
      }}
    >
      <div className="salesHistor">
        <h1 className="page-title">Sales History</h1>
        <div className="container">
          <div className="salesHistory-container">
            <Radio.Group
              defaultValue="daily"
              buttonStyle="solid"
              style={{ marginBottom: "50px" }}
              onChange={(e) => setHistoryType(e.target.value)}
            >
              <Radio.Button value="daily">Daily</Radio.Button>
              <Radio.Button value="weekly">Weekly</Radio.Button>
              <Radio.Button value="monthly">Monthly</Radio.Button>
              <Radio.Button value="yearly">Yearly</Radio.Button>
            </Radio.Group>
            <SalesHistoryProducts data={data} isFetching={isFetching} />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SalesHistory;
