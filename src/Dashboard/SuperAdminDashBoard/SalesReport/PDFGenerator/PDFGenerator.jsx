import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import logo from '../../../../assets/logo.png';
import axios from 'axios';

const PDFGenerator = ({ salesReport }) => {
    console.log(salesReport);
    const [totalArtistProfit, setTotalArtistProfit] = useState(0)
  const [totalWebsiteProfit, setTotalWebsiteProfit] = useState(0)
  const [totalPrisonProfit, setTotalPrisonProfit] = useState(0)
  const [totalCostPrice, setTotalCostPrice] = useState(0)
const [artist, setArtist] = useState();
const [prison, setPrison] = useState();
  

// Iterate through each product
useEffect(() => {
  let totalArtistProfit = 0;
  let totalWebsiteProfit = 0;
  let totalPrisonProfit = 0;
  let totalCostPrice = 0;

  salesReport?.products?.forEach(product => {
      // Calculate total profit for each type and multiply by quantity
      const artistProfit = product.profit_distribution.artist_profit_details.artistProfit * product.quantity;
      const websiteProfit = product.profit_distribution.website_profit_details.websiteProfit * product.quantity;
      const prisonProfit = product.profit_distribution.prison_profit_details.prisonProfit * product.quantity;
      const totalCost = product.price.cost_price * product.quantity;

      // Accumulate the totals
      totalArtistProfit += artistProfit;
      totalWebsiteProfit += websiteProfit;
      totalPrisonProfit += prisonProfit;
      totalCostPrice += totalCost;
  });

  axios.get(`http://localhost:8000/artist/${salesReport?.artistEmail}`)
    .then(res => {
        setArtist(res.data)
        console.log(res.data);
        axios.get(`http://localhost:8000/prison/${res.data?.billingInfo?.prison?.prison_email}`)
        .then(res => {
            console.log(res.data);
            setPrison(res.data)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  // Set the total profits after iterating through all products
  setTotalArtistProfit(totalArtistProfit);
  setTotalWebsiteProfit(totalWebsiteProfit);
  setTotalPrisonProfit(totalPrisonProfit);
  setTotalCostPrice(totalCostPrice)
}, [salesReport]);

console.log(prison);

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
            overflow: "hidden"
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
        logo: {
            width: 150,
            height: 60,
        },
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        table: {
            marginTop: 20,
            borderWidth: 1,
            borderColor: '#000',
            width: '100%',
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        tableCell: {
            padding: 5,
            flex: 1,
            textAlign: 'center',
            fontSize: 8, // Adjust the font size here
        },
        headerText: {
            fontSize: 12,
        },
        optionsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
        },
        optionColumn: {
            flex: 1,
            flexDirection: 'column',
        },
        optionText: {
            fontSize: 10,
            marginBottom: 5,
        },
        optionHeaderText: {
            fontSize: 14,
            marginBottom: 5,
        },
    });


    return (
        <div className='h-screen'>
            <PDFViewer className='w-full h-full'>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <View style={styles.headerContainer}>
                                <Image src={logo} style={styles.logo} />
                                <View>
                                    <Text style={styles.headerText}>ID: {salesReport?._id}</Text>
                                    <Text style={styles.headerText}>Status: {salesReport?.status}</Text>
                                </View>
                            </View>
                            {/* Table */}
                            <View style={styles.table}>
                                {/* Table Header */}
                                <View style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>Item</Text>
                                    <Text style={styles.tableCell}>Cost</Text>
                                    <Text style={styles.tableCell}>Artist</Text>
                                    <Text style={styles.tableCell}>MBB</Text>
                                    <Text style={styles.tableCell}>Prison</Text>
                                </View>
                                {/* Table Body */}
                                {salesReport?.products?.map((product, index) => (
                                    <View key={product?.order_id} style={styles.tableRow}>
                                        <Text style={[styles.tableCell, { flex: 2 }]}>{product?.product_name} x {product?.quantity}</Text>
                                        <Text style={styles.tableCell}>${product?.price?.cost_price * product?.quantity}</Text>
                                        <Text style={styles.tableCell}>${product?.profit_distribution?.artist_profit_details?.artistProfit * product?.quantity}</Text>
                                        <Text style={styles.tableCell}>${product?.profit_distribution?.website_profit_details?.websiteProfit * product?.quantity}</Text>
                                        <Text style={styles.tableCell}>${product?.profit_distribution?.prison_profit_details?.prisonProfit * product?.quantity}</Text>
                                    </View>
                                ))}
                                    <View style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>Total</Text>
                                    <Text style={styles.tableCell}>${totalCostPrice}</Text>
                                    <Text style={styles.tableCell}>${totalArtistProfit}</Text>
                                    <Text style={styles.tableCell}>${totalWebsiteProfit}</Text>
                                    <Text style={styles.tableCell}>${totalPrisonProfit}</Text>
                                    </View>
                            </View>
                            <View style={styles.optionsContainer}>
                                <View style={styles.optionColumn}>
                                    <Text style={styles.optionHeaderText}>MBB</Text>
                                    <Text style={styles.optionText}>Balance: ${totalWebsiteProfit}</Text>
                                </View>
                                <View style={styles.optionColumn}>
                                    <Text style={styles.optionHeaderText}>Artist</Text>
                                    <Text style={styles.optionText}>Balance: ${totalArtistProfit} + ${totalCostPrice} = ${totalArtistProfit + totalCostPrice}</Text>
                                    <Text style={styles.optionText}>Address: {artist?.billingInfo?.address}</Text>
                                    <Text style={styles.optionText}>Country: {artist?.billingInfo?.country}</Text>
                                    <Text style={styles.optionText}>State: {artist?.billingInfo?.states}</Text>
                                </View>
                                <View style={styles.optionColumn}>
                                <Text style={styles.optionHeaderText}>Prison</Text>
                                    <Text style={styles.optionText}>Balance: ${totalPrisonProfit}</Text>
                                    <Text style={styles.optionText}>Address: {prison?.address}</Text>
                                    <Text style={styles.optionText}>Country: {prison?.country}</Text>
                                    <Text style={styles.optionText}>State: {prison?.states}</Text>
                                </View>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default PDFGenerator;
