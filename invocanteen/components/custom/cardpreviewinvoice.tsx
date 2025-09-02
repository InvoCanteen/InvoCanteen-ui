"use client";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
  text: { fontSize: 12 }
});

export default function CardPreviewinvoice() {
  return (
    <PDFViewer style={{ width: "100%", height: "90vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Invoice #INV-001</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Customer: John Doe</Text>
            <Text style={styles.text}>Date: 29/08/2025</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Item: Burger x2 - Rp 50.000</Text>
            <Text style={styles.text}>Item: Coke x1 - Rp 10.000</Text>
            <Text style={styles.text}>Total: Rp 60.000</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
