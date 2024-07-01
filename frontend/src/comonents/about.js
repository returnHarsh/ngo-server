import React from "react";
import Nav from "./Nav";
import Footer from "./footer";

const About=()=>{
return(
    <>
    <Nav/>
    <section className="bg-success">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8 text-white">
              <h1 className="text-[80px]">About Us</h1>
              <p className="text-gray-200">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="col-md-4">
              <img src="assets/img/about-hero.svg" alt="About Hero" />
            </div>
          </div>
        </div>
      </section>

  <section className="ftco-section">
    <div className="container">
      <div className="row d-flex">
        <div className="col-md-6 d-flex ">
          <div
            className="img img-about align-self-stretch"
            style={{ backgroundImage: "url(images/bg_3.jpg)", width: "100%" }}
          />
        </div>
        <div className="col-md-6 pl-md-5 ">
          <h2 className="mb-4">Welcome to Welfare Stablished Since 1898</h2>
          <p>
            The Big Oxmox advised her not to do so, because there were thousands
            of bad Commas, wild Question Marks and devious Semikoli, but the
            Little Blind Text didn’t listen. She packed her seven versalia, put
            her initial into the belt and made herself on the way.
          </p>
          <p>
            On her way she met a copy. The copy warned the Little Blind Text,
            that where it came from it would have been rewritten a thousand
            times and everything that was left from its origin would be the word
            "and" and the Little Blind Text should turn around and return to its
            own, safe country. But nothing the copy said could convince her and
            so it didn’t take long until a few insidious Copy Writers ambushed
            her, made her drunk with Longe and Parole and dragged her into their
            agency, where they abused her for their.
          </p>
        </div>
      </div>
    </div>
  </section>
  
  <section
    className="ftco-counter ftco-intro ftco-intro-2"
    id="section-counter"
  >
    <div className="container">
      <div className="row no-gutters">
        <div className="col-md-5 d-flex justify-content-center counter-wrap ">
          <div className="block-18 color-1 align-items-stretch">
            <div className="text">
              <span>Served Over</span>
              <strong className="number" data-number={1432805}>
                0
              </strong>
              <span>Children in 190 countries in the world</span>
            </div>
          </div>
        </div>
        <div className="col-md d-flex justify-content-center counter-wrap ">
          <div className="block-18 color-2 align-items-stretch">
            <div className="text">
              <h3 className="mb-4">Donate Money</h3>
              <p>
                Even the all-powerful Pointing has no control about the blind
                texts.
              </p>
              <p>
                <a href="#" className="btn btn-white px-3 py-2 mt-2">
                  Donate Now
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md d-flex justify-content-center counter-wrap ">
          <div className="block-18 color-3 align-items-stretch">
            <div className="text">
              <h3 className="mb-4">Be a Volunteer</h3>
              <p>
                Even the all-powerful Pointing has no control about the blind
                texts.
              </p>
              <p>
                <a href="#" className="btn btn-white px-3 py-2 mt-2">
                  Be A Volunteer
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="ftco-section bg-light">
    <div className="container">
      <div className="row justify-content-center mb-5 pb-3">
        <div className="col-md-7 heading-section  text-center">
          <h2 className="mb-4">Latest Donations</h2>
          <p>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 d-flex mb-sm-4 ">
          <div className="staff">
            <div className="d-flex mb-4">
              <div
                className="img"
                style={{ backgroundImage: "url(images/person_1.jpg)" }}
              />
              <div className="info ml-4">
                <h3>
                  <a href="teacher-single.html">Ivan Jacobson</a>
                </h3>
                <span className="position">Donated Just now</span>
                <div className="text">
                  <p>
                    Donated <span>$300</span> for{" "}
                    <a href="#">Children Needs Food</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 d-flex mb-sm-4 ">
          <div className="staff">
            <div className="d-flex mb-4">
              <div
                className="img"
                style={{ backgroundImage: "url(images/person_2.jpg)" }}
              />
              <div className="info ml-4">
                <h3>
                  <a href="teacher-single.html">Ivan Jacobson</a>
                </h3>
                <span className="position">Donated Just now</span>
                <div className="text">
                  <p>
                    Donated <span>$150</span> for{" "}
                    <a href="#">Children Needs Food</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 d-flex mb-sm-4 ">
          <div className="staff">
            <div className="d-flex mb-4">
              <div
                className="img"
                style={{ backgroundImage: "url(images/person_3.jpg)" }}
              />
              <div className="info ml-4">
                <h3>
                  <a href="teacher-single.html">Ivan Jacobson</a>
                </h3>
                <span className="position">Donated Just now</span>
                <div className="text">
                  <p>
                    Donated <span>$250</span> for{" "}
                    <a href="#">Children Needs Food</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <Footer/>
</>

)

}
export default About;