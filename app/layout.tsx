import type { Metadata } from "next";
import { Nova_Mono, Saira, Mulish, Nova_Flat, Questrial } from "next/font/google";
import "./globals.css";
import Head from "@/components/Head/Head";
import Foot from "@/components/Foot/Foot";

const Nova = Nova_Mono({
  variable: "--font-nova",
  subsets: ["latin"],
  weight: '400',
});

const NovaF = Nova_Flat({
  variable: "--font-novaf",
  subsets: ["latin"],
  weight: '400',
});

const SairaSans = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

const MulishSans = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"]
})
const QuickSans = Questrial({
  variable: "--font-quick",
  subsets: ["latin"],
  weight: '400'
})
export const metadata: Metadata = {
  title: "AL.S.M",
  description: "A Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Nova.variable} ${NovaF.variable} ${SairaSans.variable} ${QuickSans.variable} ${MulishSans.variable}`}>
        <Head/>
        <div className="noise"></div>
        {children}
        <Foot/>
      </body>
    </html>
  );
}
