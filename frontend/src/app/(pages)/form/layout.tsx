import Footer from "@/app/_components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
        {children}
        <Footer/>
        </div>
      </body>
    </html>
  );
}
