import React, { useState } from "react";

import "./Home.css";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import Product from "../../../components/Ecommerce/Product";
import Button from "../../../components/Button";
import MessengerCustomerChat from "react-messenger-customer-chat";

const Home = () => {
  const [showInstallPrompt, setshowInstallPrompt] = useState(false);

  window.addEventListener("beforeinstallprompt", (event) => {
    console.log("👍", "beforeinstallprompt", event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Show the install button
    setshowInstallPrompt(true);
  });

  window.addEventListener("appinstalled", () => {
    // Hide the app-provided install promotion
    hideInstallPromotion();
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log("PWA was installed");
  });

  const closeInstallPrompt = () => {
    setshowInstallPrompt(false);
  };

  const installHandler = async () => {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install prompt.
    setshowInstallPrompt(false);
  };

  return (
    <>
      <section className="products">
        <Product />
      </section>
      {showInstallPrompt && (
        <div className="modal-wrapper">
          <div className="install-propmt">
            <h5>Keep shopping wherever you are!</h5>
            <div className="buttons">
              <Button
                text="Later"
                cName="not-now"
                functionality={closeInstallPrompt}
              />
              <Button
                text="Install"
                cName="install"
                functionality={installHandler}
              />
            </div>
          </div>
        </div>
      )}
      <MessengerCustomerChat
        pageId="1581882548771634"
        appId="446840523087062"
      />
      <Navbottom />
    </>
  );
};

export default Home;
