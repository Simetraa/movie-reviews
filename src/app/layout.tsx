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
        <div className="px-4 md:px-8 flex flex-col w-full">
            {children}
        </div>
        <footer>
            <div className="text-center text-sm text-neutral-500 py-4">
                &copy; {new Date().getFullYear()} Movie Reviews
            </div>
        </footer>
        </body>
        </html>
    );
}
