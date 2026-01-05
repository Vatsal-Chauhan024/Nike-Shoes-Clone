/* eslint-disable no-undef */
import { useEffect, useState } from "react";

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

const App = () => {
  const [user, setUser] = useState(null);
  const [isTelegram, setIsTelegram] = useState(false);
  console.log("isTelegram", isTelegram);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      setIsTelegram("Not running inside Telegram");
      return;
    }

    setIsTelegram("Running inside Telegram Mini App");

    // Tell Telegram the app is ready
    tg.ready();

    // Get user data
    if (tg.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }
  }, []);

  return (
    <main className="relative">
      <Nav />

      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>

      <section className="padding">
        <PopularProduct />
      </section>

      <p className="text-white py-7 bg-black text-xl px-6">
        Welcome,{isTelegram}  {user?.first_name} 
      </p>

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
  );
};

export default App;
