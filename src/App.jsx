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
import { mainButton } from "@tma.js/sdk";

const App = () => {
  const [user, setUser] = useState(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [startParams, setParams] = useState("");

  const handleChecking = useCallback(async () => {
    const telegram = await isTMA("complete", { timeout: 100 });

    if (!telegram) {
      setIsTelegram(false);
      setIsLaunched(true);
      return;
    }

    setIsTelegram(true);

    init();
    const { tgWebAppData } = retrieveLaunchParams();
    console.log("tgWebAppData:", tgWebAppData);

    if (tgWebAppData?.user) {
      setUser(tgWebAppData.user);
    }
    if (tgWebAppData?.start_param) {
      setParams(
        `${tgWebAppData?.start_param} ${window.location.pathname}`
      );
    }
    mainButton.mount();
    mainButton.setParams({
      text: "Open Website",
      bgColor: "#000000",
      textColor: "#ffffff",
      isVisible: true,
      isEnabled: true,
    });

    mainButton.onClick(() => {
      mainButton.hide();
      setIsLaunched(true);
    });
  }, []);

  useEffect(() => {
    handleChecking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isLaunched && isTelegram && (
        <div className="h-screen flex items-center justify-center text-xl font-semibold">
          Tap the button below to continue
        </div>
      )}

      {isLaunched && (
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
            <p className="text-white text-xl py-5 bg-black">
              Welcome <p>Parma: {startParams}</p>
              {user &&
                Object.entries(user).map(([key, values]) => {
                  return (
                    <span key={key}>
                      {key} {values}
                    </span>
                  );
                })}
            </p>
          </section>

          <section className="padding-x py-10">
            <p className="text-white text-xl py-5 bg-black">
              {window.location.search}
            </p>
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
      )}
    </>
  );
};

export default App;
