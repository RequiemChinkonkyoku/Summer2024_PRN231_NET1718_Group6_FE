import React from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

const MainHead = () => {
  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="./assets/img/apple-icon.png"
        />
        <link rel="icon" type="image/png" href="./assets/img/favicon.png" />

        <title>Arisu Dental Clinic</title>

        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700"
        />

        <link href="./assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="./assets/css/nucleo-svg.css" rel="stylesheet" />

        <script
          src="https://kit.fontawesome.com/42d5adcbca.js"
          crossorigin="anonymous"
        ></script>

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />

        <link
          id="pagestyle"
          href="./assets/css/material-kit.css?v=3.0.4"
          rel="stylesheet"
        />

        <script
          defer
          data-site="YOUR_DOMAIN_HERE"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        ></script>
      </Helmet>
      <Outlet />
    </div>
  );
};

export default MainHead;
