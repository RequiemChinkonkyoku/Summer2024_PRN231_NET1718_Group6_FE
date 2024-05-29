import React, { useEffect } from "react";

function Scripts() {
  useEffect(() => {
    const loadScript = (src, async = true, defer = true) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = async;
      script.defer = defer;
      document.body.appendChild(script);
    };

    loadScript("../assets/js/core/popper.min.js");
    loadScript("../assets/js/core/bootstrap.min.js");
    loadScript("../assets/js/plugins/perfect-scrollbar.min.js");
    loadScript("../assets/js/plugins/smooth-scrollbar.min.js");
    loadScript("https://buttons.github.io/buttons.js");
    loadScript("../assets/js/material-dashboard.min.js?v=3.1.0");

    const initializeScripts = () => {
      const win = navigator.platform.indexOf("Win") > -1;
      if (win && document.querySelector("#sidenav-scrollbar")) {
        const options = {
          damping: "0.5",
        };
        if (window.Scrollbar) {
          window.Scrollbar.init(
            document.querySelector("#sidenav-scrollbar"),
            options
          );
        }
      }
    };
    // Wait for the scripts to load and then initialize
    const timer = setTimeout(initializeScripts, 1000); // Adjust the delay as necessary

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  return null;
}

export default Scripts;
