/* eslint-disable @typescript-eslint/no-explicit-any */
import { TSale } from "../../../types/sales.types";
import "./SalesHistoryProducts.css";
import Loading from "../Loading";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "../../miscellaneous/PdfDocument";

const SalesHistoryProducts = ({
  data,
  isFetching,
}: {
  data: any;
  isFetching: boolean;
}) => {
  return (
    <div className="salesHistory-data">
      {isFetching ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loading />
        </div>
      ) : data?.sales?.length > 0 ? (
        data.sales.map((item: TSale) => (
          <div key={item._id} className="salesHistory-data-box">
            <h4>{item.productName}</h4>
            <p>
              <span className="color-orange-dark">Brand:</span> {item.brand}
            </p>
            <p>
              <span>Price:</span> {item.price}
            </p>
            <p>
              <span className="color-green-dark">Quantity:</span>{" "}
              {item.quantity}
            </p>
            <p>
              <span>Buyer:</span> {item.buyerName}
            </p>
            <p>
              <span className="color-yellow-dark">Date:</span> {item.dateOfSale}
            </p>
            <PDFDownloadLink
              document={<PdfDocument data={item} />}
              fileName="invoice"
            >
              Download invoice
            </PDFDownloadLink>
          </div>
        ))
      ) : (
        <p className="empty-data-text">No sales yet!</p>
      )}
    </div>
  );
};

export default SalesHistoryProducts;
