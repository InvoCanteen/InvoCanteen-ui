"use client";
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import * as React from "react"
import { useMemo, useState } from "react";

// const invoiceNumber = "INV-001";
const today = new Date().toLocaleDateString("id-ID");
const items = [
  { name: "Burger", qty: 2, price: 25000 },
  { name: "Coke", qty: 1, price: 10000 },
];
const total = items.reduce((sum, it) => sum + it.qty * it.price, 0);

interface CardPreviewProps {
  onClose: () => void;
  totalwithtax: number;
  customername: string;
  customerNo: number;
  change: number;
  tendered: number;
}

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, color: "#111827" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { width: 140, objectFit: "contain" },

  // Right header (address + QR)
  rightHeader: { alignItems: "flex-end" },
  brandName: { fontSize: 14, fontWeight: 700, marginBottom: 2 },
  addrLine: { fontSize: 10, color: "#6B7280" },
  qrWrap: { marginTop: 8, alignItems: "flex-end" },
  qrImg: { width: 88, height: 88, borderRadius: 4 },

  // Invoice meta
  meta: { marginBottom: 14 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 6,
  },
  invTitle: { fontSize: 18, fontWeight: 700 },
  metaRight: { alignItems: "flex-end" },
  muted: { color: "#6B7280" },

  // Customer block
  section: { marginBottom: 10 },
  label: { color: "#6B7280" },

  // Table
  table: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
  },
  thead: {
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  trow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  colName: { flex: 4 },
  colQty: { flex: 1, textAlign: "center" as const },
  colPrice: { flex: 2, textAlign: "right" as const },
  colSub: { flex: 2, textAlign: "right" as const },
  th: { fontWeight: 700 },

  // Totals
  totals: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  totalsBox: {
    width: 260,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  totalLabel: { color: "#374151" },
  totalValue: { fontWeight: 700 },
  totalValuetotal: { fontWeight: 700, fontcolor: "#000000" },
  note: { marginTop: 12, color: "#6B7280" },
});

const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID").format(Number(n));

export default function CardPreviewinvoice({ totalwithtax, customername, customerNo, change, tendered }: CardPreviewProps) {
  return (
    <PDFViewer style={{ width: "100%", height: "90vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image
              src="/invocanteen-icon-black-long.png"
              style={styles.logo}
            />

            <View style={styles.rightHeader}>
              <Text style={styles.brandName}>Dumbways Depok</Text>
              <Text style={styles.addrLine}>Ruko Citra Lake Sawangan</Text>
              <Text style={styles.addrLine}>Blok D-01. 15, Jl. Cinangka Raya</Text>
              <Text style={styles.addrLine}>Telp: 0811-1513-388</Text>

              <View style={styles.qrWrap}>
                <Image src="/qr-dummy.png" style={styles.qrImg} />
              </View>
            </View>
          </View>

          {/* Meta invoice */}
          <View style={styles.meta}>
            <View style={styles.titleRow}>
              <Text style={styles.invTitle}>Invoice {customerNo}</Text>
              <View style={styles.metaRight}>
                <Text style={styles.muted}>Tanggal: {today}</Text>
                <Text style={styles.muted}>Customer: {customername}</Text>
              </View>
            </View>
          </View>

          {/* Tabel items */}
          <View style={styles.table}>
            <View style={styles.thead}>
              <Text style={[styles.colName, styles.th]}>Item</Text>
              <Text style={[styles.colQty, styles.th]}>Qty</Text>
              <Text style={[styles.colPrice, styles.th]}>Harga</Text>
              <Text style={[styles.colSub, styles.th]}>Subtotal</Text>
            </View>

            {items.map((it, idx) => (
              <View key={idx} style={styles.trow}>
                <Text style={styles.colName}>{it.name}</Text>
                <Text style={styles.colQty}>{it.qty}</Text>
                <Text style={styles.colPrice}>Rp {formatIDR(it.price)}</Text>
                <Text style={styles.colSub}>
                  Rp {formatIDR(it.qty * it.price)}
                </Text>
              </View>
            ))}
          </View>

          {/* Ringkasan total */}
          <View style={styles.totals}>
            <View style={styles.totalsBox}>
              <View style={[styles.totalRow, { borderTopWidth: 0 }]}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text>Rp {formatIDR(total)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Cash Tendered</Text>
                <Text style={styles.totalValue}>Rp {tendered}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Change</Text>
                <Text style={styles.totalValue}>Rp {change}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Price</Text>
                <Text style={styles.totalValue}>Rp {totalwithtax}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}