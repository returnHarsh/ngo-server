import React from 'react'
import Footer from "../comonents/footer";
import Nav from "../comonents/Nav"

const Education = () => {
  return (
    <div>

      <Nav />

      <section className="bg-success">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8 text-white">
              <h1 className="text-[80px]"> Education </h1>
              <p className="text-gray-200">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="col-md-4">
              <img src="/images/education-main.png" alt="About Hero" />
            </div>
          </div>
        </div>
      </section>

      {/* middle section */}
      <section className="ftco-section">
  <div className="container">
    <div className="row d-flex">
      <div className="col-md-3 d-flex ">
        <div className="blog-entry align-self-stretch">
          <a
            href="blog-single.html"
            className="block-20"
            style={{ backgroundImage: 'url("images/1.jpg")' }}
          ></a>
          <div className="text p-4 d-block">
            <div className="meta mb-3">
             
              <div>
                <a href="#">Admin</a>
              </div>
              <div>
                <a href="#" className="meta-chat">
                  <span className="icon-chat" /> 3
                </a>
              </div>
            </div>
            <h3 className="heading mt-3">
              <a href="#"> English classes </a>
            </h3>
            <p>
              Offering tutoring and academic support to reintegrate dropouts into formal education.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3 d-flex ">
        <div className="blog-entry align-self-stretch">
          <a
            href="blog-single.html"
            className="block-20"
            style={{ backgroundImage: 'url("images/2.jpg")' }}
          ></a>
          <div className="text p-4 d-block">
            <div className="meta mb-3">
             
              <div>
                <a href="#">Admin</a>
              </div>
              <div>
                <a href="#" className="meta-chat">
                  <span className="icon-chat" /> 3
                </a>
              </div>
            </div>
            <h3 className="heading mt-3">
              <a href="#"> Communication Classes </a>
            </h3>
            <p>
            Teaching essential life skills like communication, critical thinking, problem solving & financial literacy.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3 d-flex ">
        <div className="blog-entry align-self-stretch">
          <a
            href="blog-single.html"
            className="block-20"
            style={{ backgroundImage: 'url("images/5.jpg")' }}
          ></a>
          <div className="text p-4 d-block">
            <div className="meta mb-3">
             
              <div>
                <a href="#">Admin</a>
              </div>
              <div>
                <a href="#" className="meta-chat">
                  <span className="icon-chat" /> 3
                </a>
              </div>
            </div>
            <h3 className="heading mt-3">
              <a href="#"> Boosting School Enrolment & Attendance </a>
            </h3>
            <p>
            Involving parents, guardians, and community leaders to promote education and boost school enrollment and attendance
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3 d-flex ">
        <div className="blog-entry align-self-stretch">
          <a
            href="blog-single.html"
            className="block-20"
            style={{ backgroundImage: 'url("images/3.jpg")' }}
          ></a>
          <div className="text p-4 d-block">
            <div className="meta mb-3">
            
              <div>
                <a href="#">Admin</a>
              </div>
              <div>
                <a href="#" className="meta-chat">
                  <span className="icon-chat" /> 3
                </a>
              </div>
            </div>
            <h3 className="heading mt-3">
              <a href="#"> Providing scholarships </a>
            </h3>
            <p>
            Providing scholarships, stipends, or financial assistance to disadvantaged students to help cover school fees, uniforms, books, and other educational expenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</section>





      <div className='m-[40px]'>
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
                    <h3 className="mb-4">Fund a child's Education</h3>
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
      </div>




      <Footer />
    </div>
  )
}

export default Education
