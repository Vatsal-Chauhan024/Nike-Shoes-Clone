/* eslint-disable no-undef */
import { useCallback, useEffect, useState } from "react";
import {
  CustomerReviews,
  Footer,
  Hero,
  PopularProduct,
  Services,
  SpecialOffer,
  Subscribe,
  SuperQuality,
} from "./sections";
import Nav from "./components/Nav";
import { isTMA, retrieveLaunchParams } from "@tma.js/bridge";
import { init } from "@tma.js/sdk-react";

const App = () => {

  const [user, setUser] = useState<any>(null)

  const handleChecking = useCallback(async () => {
    if (await isTMA("complete")) {
      console.log("It is Telegram");
      init();
      const { tgWebAppData } = retrieveLaunchParams();
      const userDetail = tgWebAppData.user
      setUser(userDetail)
    }
    return;
  }, [setUser]);

  useEffect(() => {
    handleChecking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="relative">
        <Nav />
        <section className="xl:padding-l wide:padding-r padding-b">
          <p className="text-black text-xl">{user?.first_name}</p>
          <Hero />
        </section>

        <section className="padding">
          <PopularProduct />
        </section>
        <section className="padding">
          <SuperQuality />
        </section>
        <section className="padding-x py-10">
          <Services />
        </section>
        <section className="padding">
          <SpecialOffer />
        </section>
        <section className="padding bg-pale-blue">
          <CustomerReviews />
        </section>
        <section className="padding sm:py-32 py-16 w-full">
          <Subscribe />
        </section>
        <section className="bg-black padding-x padding-t pb-8">
          <Footer />
        </section>
      </main>
    </>
  );
};

export default App;
