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

const App = () => {
  const [user, setUser] = useState(null);
  const [isTelegram, setIsTelegram] = useState("");

  const handleChecking = useCallback(async () => {
    if (await isTMA("complete", {timeout: 100})) {
      console.log("It is Telegram");
      // init();
      setIsTelegram("It is Telegram");
      const { tgWebAppData } = retrieveLaunchParams();
      const userDetail = tgWebAppData.user;
      setUser(userDetail?.first_name);
      console.log("userDetail", userDetail);
      return;
    }
    setIsTelegram("It is not  Telegram");
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
          <Hero />
        </section>

        <section className="padding">
          <PopularProduct />
        </section>
        <section className="padding">
          <SuperQuality />
          <p className="text-white  text-xl py-5 bg-black">
            Welcome {isTelegram} {user?.first}
          </p>
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
