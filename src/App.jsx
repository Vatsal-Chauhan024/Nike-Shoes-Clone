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
import { cloudStorage } from "@tma.js/sdk";

const App = () => {
  const [user, setUser] = useState(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [startParams, setParams] = useState("");
  const [message, setMessage] = useState();
  const [keys, setKeys] = useState("");

  const handleChecking = useCallback(async () => {
    const telegram = await isTMA("complete", { timeout: 100 });

    if (!telegram) {
      setIsTelegram(false);
      setIsLaunched(true);
      return;
    }

    setIsTelegram(true);
    init();
    cloudStorage.isSupported();
    await cloudStorage.setItem("a", JSON.stringify(window.location));
    const existent = await cloudStorage.getItem("a");
    setKeys(window?.Telegram.WebApp?.initDataUnsafe?.start_param);

    // Retrieve params from the SDK bridge
    const { initData, startParam } = retrieveLaunchParams();

    // 1. Capture the parameter
    // It may be directly in 'startParam' or inside 'initData.startParam'
    const paramValue = startParam || initData?.startParam || "";
    setParams(paramValue);

    if (initData?.user) {
      setUser(initData.user);
    }

    // 2. Setup the "Manual Start" button
    mainButton.mount();
    mainButton.setParams({
      text: "START BOT", // Mimic the bot's start button
      bgColor: "#248bcf",
      textColor: "#ffffff",
      isVisible: true,
    });

    mainButton.onClick(() => {
      mainButton.hide();
      setIsLaunched(true); // Only now reveal the main app content
    });
  }, []);

  useEffect(() => {
    handleChecking();

    window.addEventListener("message", ({ data }) => {
      const { eventType, eventData } = JSON.parse(data);
      setMessage(eventType, eventData);
    });

    window.removeEventListener("message", ({ data }) => {
      const { eventType, eventData } = JSON.parse(data);
      setMessage(eventType, eventData);
    });
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
              Welcome {message && <p>Message: {message}</p>}
              Welcome {message && <p>Message: {message}</p>}
              Welcome {keys !== "" && keys && <p>Message: {keys}</p>}
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
