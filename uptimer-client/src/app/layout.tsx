import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import IndexHeader from "@/components/headers/IndexHeader";
import { apolloClient } from "@/queries/apolloClient";
import ApolloProvider from "@/queries/apolloProvider";

const font = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '600']
});

export const metadata: Metadata = {
  title: "Uptimer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloProvider client={apolloClient}>
        <body
          className={`${font.className} antialiased`}
        >
          <IndexHeader />
          {children}
        </body>
      </ApolloProvider>
    </html>
  );
}
