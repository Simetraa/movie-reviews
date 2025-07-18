import { Navbar } from "./components/nav-main";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        <div className="px-4 md:px-8 flex flex-col gap-8 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
