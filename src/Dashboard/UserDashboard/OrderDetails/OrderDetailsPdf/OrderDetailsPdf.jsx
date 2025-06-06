import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import logo from "../../../../assets/logo.png";

const OrderDetailsPdf = ({ order }) => {
  const styles = StyleSheet.create({
    container: {
      margin: 20,
      padding: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
    },
    label: {
      fontWeight: "bold",
      marginRight: 5,
    },
    tableContainer: {
      // marginTop: 50,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#f0f0f0",
      padding: 4,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    tableRow: {
      flexDirection: "row",
      padding: 4,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    tableCell: {
      flex: 1,
      padding: 4,
      fontSize: 10,
    },
  });

  const {
    email,
    additional_info,
    userName,
    companyName,
    country,
    address,
    states,
    zipCode,
    userPhoneNumber,
  } = order.userDetails;

  return (
    <PDFViewer width="100%" height="100%">
      <Document>
        <Page size="A4">
          <View style={styles.container}>
            <Image
              src={logo}
              style={{ width: 150, height: 60, marginBottom: 35 }}
            />
            <View style={styles.row}>
              <Text style={styles.title}>Order Details</Text>
              <Text style={styles.text}>
                Date: {order?.createdAt.slice(0, 10)}
              </Text>
              <Text style={styles.text}>
                Total {order?.products?.length} Products
              </Text>
            </View>
            <View style={styles.tableContainer}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.subtitle}>Billing Address</Text>
                  <Text style={styles.text}> {userName || "Unknown"}</Text>
                  <Text style={styles.text}>{address || "Unknown"}, </Text>
                  <Text style={styles.text}>
                    {country}, {states}-{zipCode}{" "}
                  </Text>
                  <Text style={styles.text}> {email || "Unknown"}</Text>
                  <Text style={styles.text}>
                    {userPhoneNumber || "Unknown"}
                  </Text>
                </View>
                <View>
                  <Text style={styles.subtitle}>Shipping Address</Text>
                  <Text style={styles.text}>
                    {order?.shipping_address?.userName || userName || "Unknown"}
                  </Text>
                  <Text style={styles.text}>
                    {order?.shipping_address?.address || address || "Unknown"},
                  </Text>
                  <Text style={styles.text}>
                  {order?.shipping_address?.country || country},{" "}
                    {order?.shipping_address?.states || states}-{order?.shipping_address?.zipCode || zipCode}
                  </Text>
                  <Text style={styles.text}>
                    {order?.shipping_address?.email || email || "Unknown"}
                  </Text>
                  <Text style={styles.text}>
                    {order?.shipping_address?.userPhoneNumber ||
                      userPhoneNumber ||
                      "Unknown"}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={styles.subtitle}>Transaction Details</Text>
                  <Text style={styles.text}>
                    Order ID:{" "}
                    <Text style={{ color: "green" }}>
                      #{order?._id?.slice(-4)}
                    </Text>
                  </Text>
                  <Text style={styles.text}>
                    Transaction ID:{" "}
                    <Text style={{ color: "green" }}>
                      {order?.transactionId}
                    </Text>
                  </Text>
                  <Text style={styles.text}>
                    Payment Method:{" "}
                    <Text style={{ color: "#333" }}>STRIPE</Text>
                  </Text>
                </View>
                <View>
                  <Text style={styles.subtitle}>Order Summary</Text>
                  <Text style={styles.text}>Subtotal: ${order?.subTotal}</Text>
                  <Text style={styles.text}>Tax: ${order?.tax}</Text>
                  <Text style={styles.text}>
                    {order?.shippingMethod?.standard_shipping
                      ? `Standard Shipping: $${order?.shippingMethod?.standard_shipping}`
                      : ""}
                    {order?.shippingMethod?.express_shipping
                      ? `Express Shipping: $${order?.shippingMethod?.express_shipping}`
                      : ""}
                    {order?.shippingMethod?.free_shipping == 0
                      ? `Free Shipping`
                      : ""}
                  </Text>
                  <Text style={styles.subtitle}>
                    Total: ${order?.total_price}
                  </Text>
                </View>
              </View>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCell}>PRODUCT</Text>
                <Text style={styles.tableCell}>PRICE</Text>
                <Text style={styles.tableCell}>QUANTITY</Text>
                <Text style={styles.tableCell}>SUBTOTAL</Text>
              </View>
              {order?.products?.map((product, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{product?.product_name}</Text>
                  <Text style={styles.tableCell}>
                    $
                    {product?.price?.sale_price ||
                      product?.price?.regular_price}
                  </Text>
                  <Text style={styles.tableCell}>x{product?.quantity}</Text>
                  <Text style={styles.tableCell}>
                    $
                    {(product?.price?.sale_price ||
                      product?.price?.regular_price) * product?.quantity}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

// Render the PDF content to a string
// const PDFContent = renderToString(<PDFGenerator order={/* provide the order data */} />);

// In your actual React component, you would return the PDFContent string

export default OrderDetailsPdf;
