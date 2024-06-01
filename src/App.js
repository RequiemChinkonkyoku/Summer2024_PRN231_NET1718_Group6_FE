import React, { useEffect, useState } from "react";
import axios from "axios";

import logo from "./logo.svg";
import MainHead from "./components/MainHead";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "./assets/css/nucleo-icons.css"; // Local CSS file for icons
import "./assets/css/nucleo-svg.css"; // Local CSS file for SVGs
import "./assets/css/material-dashboard.css"; // Local CSS for material dashboard
import "./assets/css/material-kit.css";

const App = () => {
  return (
    <div>
      <MainHead />
      <body class="presentation-page bg-gray-200">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NKDMSK6"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          ></iframe>
        </noscript>

        <div class="container position-sticky z-index-sticky top-0">
          <div class="row">
            <div class="col-12">
              <Navbar />
            </div>
          </div>
        </div>
        <header class="header-2">
          <div
            class="page-header min-vh-75 relative"
            style={{
              backgroundImage:
                "url(" +
                "https://cdn.create.vista.com/api/media/small/307038266/stock-photo-healthcare-people-group-professional-doctor-working-hospital-office-clinic-other" +
                ")",
            }}
          >
            <span class="mask bg-gradient-info opacity-4"></span>
            <div class="container">
              <div class="row">
                <div class="col-lg-7 text-center mx-auto">
                  <h1 class="text-white pt-3 mt-n5">ARISU DENTAL CLINIC</h1>
                  <p class="lead text-white mt-3">
                    Your smile is our happiness. <br /> We provides exceptional
                    dental services to meet the unique needs of every patient.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
          <section class="pt-3 pb-4" id="count-stats">
            <div class="container">
              <div class="row">
                <div class="col-lg-9 mx-auto py-3">
                  <div class="row">
                    <div class="col-md-4 position-relative">
                      <div class="p-3 text-center">
                        <h1 class="text-gradient text-info">
                          <span id="state1" countto="2000000">
                            2000000
                          </span>
                          +
                        </h1>
                        <h5 class="mt-3">Customers</h5>
                        <p class="text-sm font-weight-normal">
                          Our customers are always satisfied with our services.
                        </p>
                      </div>
                      <hr class="vertical dark" />
                    </div>
                    <div class="col-md-4 position-relative">
                      <div class="p-3 text-center">
                        <h1 class="text-gradient text-info">
                          {" "}
                          <span id="state2" countto="100">
                            100
                          </span>
                          +
                        </h1>
                        <h5 class="mt-3">Dentists</h5>
                        <p class="text-sm font-weight-normal">
                          Our teams are ensured to have the highest expertise in
                          all dental fields.
                        </p>
                      </div>
                      <hr class="vertical dark" />
                    </div>
                    <div class="col-md-4">
                      <div class="p-3 text-center">
                        <h1
                          class="text-gradient text-info"
                          id="state3"
                          countto="4"
                        >
                          4
                        </h1>
                        <h5 class="mt-3">Branches</h5>
                        <p class="text-sm font-weight-normal">
                          We are located all over the world for the convenience
                          of our patients.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="my-5 py-5">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
                  <div class="rotating-card-container">
                    <div class="card card-rotate card-background card-background-mask-info shadow-info mt-md-0 mt-5">
                      <div
                        class="front front-background"
                        style={{
                          backgroundImage:
                            "url(" +
                            "https://1.img-dpreview.com/files/p/TS560x560~forums/62803172/ae5fffae14814b88b8eb7551ef16ea84" +
                            ")",
                          backgroundSize: "cover",
                        }}
                      >
                        <div class="card-body py-7 text-center">
                          <i class="material-icons text-white text-4xl my-3">
                            touch_app
                          </i>
                          <h3 class="text-white">
                            Embrace <br /> your smile.
                          </h3>
                          <p class="text-white opacity-8">
                            At Arisu Dental Clinic, we believe that your smile
                            is a reflection of your inner confidence and joy.
                            Our mission is to help you embrace your smile with
                            pride by offering top-notch dental care tailored to
                            your unique needs.
                          </p>
                        </div>
                      </div>
                      <div
                        class="back back-background"
                        style={{
                          backgroundImage:
                            "url(" +
                            "https://st.hzcdn.com/simgs/pictures/landscapes/houzz-grasses-chanticleer-1-lowres-jpg-cyan-horticulture-img~6271516900e8a324_4-9742-1-55ffc7c.jpg" +
                            ")",
                          backgroundSize: "cover",
                        }}
                      >
                        <div class="card-body pt-7 text-center">
                          <h3 class="text-white">Book an appointment now.</h3>
                          <p class="text-white opacity-8">
                            {" "}
                            Your journey to a brighter, healthier smile begins
                            with a simple step. Don’t wait – book your
                            appointment today and experience the Arisu Dental
                            Clinic difference.
                          </p>
                          <a
                            href=".//sections/page-sections/hero-sections.html"
                            target="_blank"
                            class="btn btn-white btn-sm w-50 mx-auto mt-3"
                          >
                            Get Started
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 ms-auto">
                  <div class="row justify-content-start">
                    <div class="col-md-6">
                      <div class="info">
                        <i class="material-icons text-gradient text-info text-3xl">
                          content_copy
                        </i>
                        <h5 class="font-weight-bolder mt-3">
                          Your Smile, Our Passion
                        </h5>
                        <p class="pe-5">
                          We are dedicated to providing top-tier dental services
                          tailored to meet the unique needs of every patient.
                        </p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info">
                        <i class="material-icons text-gradient text-info text-3xl">
                          flip_to_front
                        </i>
                        <h5 class="font-weight-bolder mt-3">
                          Meet Our Dentists
                        </h5>
                        <p class="pe-3">
                          Each dentist is carefully selected for their
                          dedication to patient care, continuing education, and
                          advanced clinical skills.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row justify-content-start mt-5">
                    <div class="col-md-6 mt-3">
                      <i class="material-icons text-gradient text-info text-3xl">
                        price_change
                      </i>
                      <h5 class="font-weight-bolder mt-3">
                        State-of-the-Art Facilities
                      </h5>
                      <p class="pe-5">
                        Our clinic is equipped with the latest dental technology
                        to ensure that you receive the highest standard of care.
                      </p>
                    </div>
                    <div class="col-md-6 mt-3">
                      <div class="info">
                        <i class="material-icons text-gradient text-info text-3xl">
                          devices
                        </i>
                        <h5 class="font-weight-bolder mt-3">
                          Convenient Locations
                        </h5>
                        <p class="pe-3">
                          No matter where you are, quality dental care from
                          Arisu Dental Clinic is always within reach.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="container mt-sm-5">
            <div
              class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
              style={{
                backgroundImage:
                  "url(" +
                  "https://www.gittlemandental.com/wp-content/uploads/2019/03/4-31_Dehart_St_Low_Res-1024x684.jpg" +
                  ")",
              }}
              loading="lazy"
            >
              <span class="mask bg-gradient-dark"></span>
              <div class="container">
                <div class="row">
                  <div class="col-lg-6 ms-lg-5">
                    <h4 class="text-white">Our solutions</h4>
                    <h1 class="text-white">How can we help you?</h1>
                    <p class="lead text-white opacity-8">
                      Ready to embrace your smile? Booking an appointment at
                      Arisu Dental Clinic is easy and convenient. Whether you
                      need a routine check-up, a cosmetic consultation, or an
                      emergency visit, our friendly team is here to assist you.
                    </p>
                    <a
                      href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-kit"
                      class="text-white icon-move-right"
                    >
                      Read docs
                      <i
                        class="fas fa-arrow-right text-sm ms-1"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-4">
                <div class="info-horizontal bg-gradient-info border-radius-xl d-block d-md-flex p-4">
                  <i class="material-icons text-white text-3xl">flag</i>
                  <div class="ps-0 ps-md-3 mt-3 mt-md-0">
                    <h5 class="text-white">Let us diagnose your problem</h5>
                    <p class="text-white">
                      We will check you up with certain accuracy to find out
                      what you need best.
                      <br />
                      <br />
                    </p>
                    <a
                      href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-kit"
                      class="text-white icon-move-right"
                    >
                      Let's start
                      <i
                        class="fas fa-arrow-right text-sm ms-1"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 px-lg-1 mt-lg-0 mt-4">
                <div class="info-horizontal bg-gray-100 border-radius-xl d-block d-md-flex p-4 h-100">
                  <i class="material-icons text-gradient text-info text-3xl">
                    precision_manufacturing
                  </i>
                  <div class="ps-0 ps-md-3 mt-3 mt-md-0">
                    <h5>Multiple services</h5>
                    <p>
                      Don't worry about anything - we always have the cure, and
                      even ways to make it thousand times better.
                    </p>
                    <a
                      href="https://www.creative-tim.com/learning-lab/bootstrap/datepicker/material-kit"
                      class="text-info icon-move-right"
                    >
                      Read more
                      <i
                        class="fas fa-arrow-right text-sm ms-1"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 mt-lg-0 mt-4">
                <div class="info-horizontal bg-gray-100 border-radius-xl d-block d-md-flex p-4">
                  <i class="material-icons text-gradient text-info text-3xl">
                    receipt_long
                  </i>
                  <div class="ps-0 ps-md-3 mt-3 mt-md-0">
                    <h5>Dentist expertise</h5>
                    <p>
                      Our dentists are the most skilled doctors you will ever
                      witness in your entire life.
                      <br />
                      <br />
                    </p>
                    <a
                      href="https://www.creative-tim.com/learning-lab/bootstrap/utilities/material-kit"
                      class="text-info icon-move-right"
                    >
                      Find out
                      <i
                        class="fas fa-arrow-right text-sm ms-1"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section class="py-7">
            <div class="container">
              <div class="row">
                <div class="col-lg-6 mx-auto text-center">
                  <h2 class="mb-0">Trusted by over</h2>
                  <h2 class="text-gradient text-info mb-3">169,420+ experts</h2>
                  <p class="lead">
                    Many dental experts recommend Arisu Dental Clinic as their
                    first choice in the dental care field.
                  </p>
                </div>
              </div>
              <div class="row mt-6">
                <div class="col-lg-4 col-md-8">
                  <div class="card card-plain">
                    <div class="card-body">
                      <div class="author">
                        <div class="name">
                          <h6 class="mb-0 font-weight-bolder">Saiba Momoi</h6>
                          <div class="stats">"Amazing Experience"</div>
                        </div>
                      </div>
                      <p class="mt-4">
                        "The staff at Arisu Dental Clinic are incredibly
                        professional and friendly. They made me feel comfortable
                        from the moment I walked in. Highly recommend!"
                      </p>
                      <div class="rating mt-3">
                        <i class="fas fa-star" aria-hidden="true"></i>
                        <i class="fas fa-star" aria-hidden="true"></i>
                        <i class="fas fa-star" aria-hidden="true"></i>
                        <i class="fas fa-star" aria-hidden="true"></i>
                        <i class="fas fa-star" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-8 ms-md-auto">
                  <div class="card bg-gradient-info">
                    <div class="card-body">
                      <div class="author align-items-center">
                        <div class="name">
                          <h6 class="text-white mb-0 font-weight-bolder">
                            Saiba Midori
                          </h6>
                          <div class="stats text-white">
                            "Highly Recommended"
                          </div>
                        </div>
                      </div>
                      <p class="mt-4 text-white">
                        "I had a great experience at Arisu Dental Clinic. The
                        entire team is welcoming and the service is top-notch. I
                        felt at ease throughout my treatment."
                        <br />
                        <br />
                      </p>
                      <div class="rating mt-3">
                        <i
                          class="fas fa-star text-white"
                          aria-hidden="true"
                        ></i>
                        <i
                          class="fas fa-star text-white"
                          aria-hidden="true"
                        ></i>
                        <i
                          class="fas fa-star text-white"
                          aria-hidden="true"
                        ></i>
                        <i
                          class="fas fa-star text-white"
                          aria-hidden="true"
                        ></i>
                        <i
                          class="fas fa-star text-white"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-8">
                  <div class="card card-plain">
                    <div class="card-body">
                      <div class="author">
                        <div class="name">
                          <h6 class="mb-0 font-weight-bolder">Hanaoka Yuzu</h6>
                          <div class="stats">"..."</div>
                        </div>
                      </div>
                      <p class="mt-4">
                        "I was forced to write a review."
                        <br />
                        <br />
                        <br />
                        <br />
                      </p>
                      <div class="rating mt-3">
                        <i class="fas fa-star" aria-hidden="true"></i>
                        <i class="fas fa-star" aria-hidden="true"></i>
                        <i class="fas fa-star" aria-hidden="true"></i>
                        <i class="fas fa-star" aria-hidden="true"></i>
                        <i class="fas fa-star" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="horizontal dark my-5" />
            </div>
          </section>
        </div>
        <Footer />
      </body>
    </div>
  );
};

export default App;
