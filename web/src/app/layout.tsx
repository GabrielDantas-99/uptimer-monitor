import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { apolloClient } from "@/queries/apolloClient";
import ApolloProvider from "@/queries/apolloProvider";
import { Toaster } from "@/components/ui/toaster";

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
      <body
        className={`${font.className} antialiased`}
      >
        <ApolloProvider client={apolloClient}>
          {children}
        </ApolloProvider>
        <Toaster />
      </body>
    </html>
  );
}
