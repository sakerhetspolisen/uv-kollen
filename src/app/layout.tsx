import { Provider } from "@/components/ui/provider";
import Header from "@/components/Header";
import CookieNotice from "@/features/CookieNotice";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Header />
          {children}
          <CookieNotice />
        </Provider>
      </body>
    </html>
  );
}
