import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { TSale } from "../../types/sales.types";

const SalesDocument = ({ data }: { data: TSale }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ sales invoice ~
      </Text>
      <Text style={styles.line}></Text>
      <Text style={styles.date}>Date: {data?.dateOfSale}</Text>
      <View style={styles.details}>
        <Text style={styles.text}>Product: {data?.productName}</Text>
        <View>
          <Text style={styles.text}>Per unit price: {data?.price}</Text>
          <Text style={styles.text}>Quantity: {data?.quantity}</Text>

          <Text style={styles.text}>Buyer name: {data?.buyerName}</Text>
        </View>
      </View>

      <Text style={styles.line}></Text>
      <Text style={styles.date}>
        Total price: {(data?.price * data?.quantity).toFixed(2)}
      </Text>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  line: {
    width: "100%",
    border: 1,
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 5,
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    marginBottom: 15,
  },
  text: {
    marginBottom: 5,
    fontSize: 12,
    textAlign: "justify",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default SalesDocument;
