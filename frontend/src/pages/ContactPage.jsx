import React from 'react'
import Nav from '../comonents/Nav'
import Footer from '../comonents/footer'

const ContactPage = () => {
  return (
    <div>
      <>

      <Nav/>

{/* banner */}
      <section className="bg-success">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8 text-white">
              <h1 className="text-[80px]"> Contact Us </h1>
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

 
 {/* form section */}
  <section className="ftco-section contact-section ftco-degree-bg">
    <div className="container">
      <div className="row d-flex mb-5 contact-info">
        <div className="col-md-12 mb-4">
          <h2 className="h4">Contact Information</h2>
        </div>
        <div className="w-100" />
        <div className="col-md-3">
          <p>
            <span>Address:</span> 198 West 21th Street, Suite 721 New York NY
            10016
          </p>
        </div>
        <div className="col-md-3">
          <p>
            <span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a>
          </p>
        </div>
        <div className="col-md-3">
          <p>
            <span>Email:</span>{" "}
            <a href="mailto:info@yoursite.com">info@yoursite.com</a>
          </p>
        </div>
        <div className="col-md-3">
          <p>
            <span>Website</span> <a href="#">yoursite.com</a>
          </p>
        </div>
      </div>
      <div className="row block-9">
        <div className="col-md-6 pr-md-5">
          <h4 className="mb-4">Do you have any questions?</h4>
          <form action="#">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Email"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
              />
            </div>
            <div className="form-group">
              <textarea
                name=""
                id=""
                cols={30}
                rows={7}
                className="form-control"
                placeholder="Message"
                defaultValue={""}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                defaultValue="Send Message"
                className="btn btn-primary py-3 px-5"
              />
            </div>
          </form>
        </div>

{/* map section */}
        <div className="col-md-6 border border-black" id="map">
        </div>

      </div>

    </div>
  </section>


{/* footer page */}
  <Footer/>
 
</>

    </div>
  )
}

export default ContactPage
