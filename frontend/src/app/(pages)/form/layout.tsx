import Footer from "@/app/_components/Footer";

export default function NestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div className="">{children}</div>
      <Footer/>
    </div>
  );
}