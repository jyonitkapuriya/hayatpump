/* eslint-disable @next/next/next-script-for-ga */
import "./globals.css";
import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import { Layout } from "@/components";
import { FirebaseProvider } from '../firebase/firebase';

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700", "900"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Hayat pumps | Home page",
  description:
    "Hayat Pumps & Motors has established itself as a distinguished manufacturer of Premium quality, efficient, reliable and long-lasting pumps and motors for more than 40 years.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-site="YOUR_DOMAIN_HERE"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        ></script>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={roboto.className}>
        <div className="" style={{ backgroundImage: "url('/images/featurs/bgImage.jpg')" }}>
          <Layout>
            <FirebaseProvider>
              {children}
            </FirebaseProvider>
            {/* <FixedPlugin /> */}
          </Layout>
        </div>
      </body>
    </html>
  );
}
