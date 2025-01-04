import "./globals.css";
import { Montserrat } from "next/font/google";
import Menu from "./components/Menu/page";
import Footer from "./components/Footer/page";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({subsets: ["latin"]});

export const metadata = {
  title: "Certificate-Manager",
  description: "A Certificate tracking app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={montserrat.className}
      >
        <Menu />
        {children}
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
