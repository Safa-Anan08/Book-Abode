import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Toaster } from "react-hot-toast";
import NoInternet from "@/components/common/NoInternet";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider
    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
>
        <AuthProvider>
          <NoInternet />
          <Navbar />
          {children}
           <Footer />
           <Toaster position="top-center" />
        </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}