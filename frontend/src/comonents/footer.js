import React from "react";

const Footer=()=>{
    return(
      <footer className="ftco-footer ftco-section img">
  <div className="overlay" />
  <div className="container">
    <div className="row mb-5">
      <div className="col-md-3">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2">About Us</h2>
          <p>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
          <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
            <li className="">
              <a href="#">
                <span className="icon-twitter" />
              </a>
            </li>
            <li className="">
              <a href="#">
                <span className="icon-facebook" />
              </a>
            </li>
            <li className="">
              <a href="#">
                <span className="icon-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-4">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2">Recent Blog</h2>
          <div className="block-21 mb-4 d-flex">
            <a
              className="blog-img mr-4"
              style={{ backgroundImage: "url(images/image_1.jpg)" }}
            />
            <div className="text">
              <h3 className="heading">
                <a href="#">
                  Even the all-powerful Pointing has no control about
                </a>
              </h3>
              <div className="meta">
                <div>
                  <a href="#">
                    <span className="icon-calendar" /> July 12, 2018
                  </a>
                </div>
                <div>
                  <a href="#">
                    <span className="icon-person" /> Admin
                  </a>
                </div>
                <div>
                  <a href="#">
                    <span className="icon-chat" /> 19
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="block-21 mb-4 d-flex">
            <a
              className="blog-img mr-4"
              style={{ backgroundImage: "url(images/image_2.jpg)" }}
            />
            <div className="text">
              <h3 className="heading">
                <a href="#">
                  Even the all-powerful Pointing has no control about
                </a>
              </h3>
              <div className="meta">
                <div>
                  <a href="#">
                    <span className="icon-calendar" /> July 12, 2018
                  </a>
                </div>
                <div>
                  <a href="#">
                    <span className="icon-person" /> Admin
                  </a>
                </div>
                <div>
                  <a href="#">
                    <span className="icon-chat" /> 19
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <div className="ftco-footer-widget mb-4 ml-md-4">
          <h2 className="ftco-heading-2">Site Links</h2>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="py-2 d-block">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="py-2 d-block">
                Donate
              </a>
            </li>
            <li>
              <a href="#" className="py-2 d-block">
                Causes
              </a>
            </li>
            <li>
              <a href="#" className="py-2 d-block">
                Event
              </a>
            </li>
            <li>
              <a href="#" className="py-2 d-block">
                Blog
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-3">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2">Have a Questions?</h2>
          <div className="block-23 mb-3">
            <ul>
              <li>
                <span className="icon icon-map-marker" />
                <span className="text">
                  203 Fake St. Mountain View, San Francisco, California, USA
                </span>
              </li>
              <li>
                <a href="#">
                  <span className="icon icon-phone" />
                  <span className="text">7428089818</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon icon-envelope" />
                  <span className="text">phrms.soc@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 text-center">
        <p>
          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
          Copyright © All rights reserved | This template is made with{" "}
          <i className="icon-heart" aria-hidden="true" /> by{" "}
          <a href="" target="_blank">
            phrms
          </a>
          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
        </p>
      </div>
    </div>
  </div>
</footer>

    )

}
export default Footer;