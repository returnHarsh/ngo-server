import React from "react";
import Nav from "./Nav";
import Footer from "./footer";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Events from "./Events";
import Blogs from "./Blogs";
import Gallery from "./Gallery";


const Front=()=>{
    return(
        <>
        <Nav/>
<div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
        <ol className="carousel-indicators">
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" className="active"></li>
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
            <div className="carousel-item active">
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img className="img-fluid" src="./assets/img/191286_1.jpg" alt=""/>
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left align-self-center">
                                <h1 className="h1 text-success"><b>PHRMS</b> </h1>
                                <h3 className="h2"></h3>
                                <p>"The Voluntary Organizations (VOs)/ Non-Governmental Organizations (NGOs) etc. play active role in the development of the nation by supplementing the efforts of the Government. NGO DARPAN is maintained by NITI Aayog to enable Non-Government Organizations (NGOs), Not for Profit Organizations (NPOs), Voluntary Organizations (VOs), Civil Society Organizations (CSOs), Not for Profit Companies, Charity Organizations, registered societies, Trusts, etc. to sign up on NGO Darpan portal. 
                              
                                    <a rel="sponsored" className="text-success" href="https://unsplash.com/"
                                        target="_blank">Unsplash</a> and
                                    <a rel="sponsored" className="text-success" href="https://icons8.com/"
                                        target="_blank">Icons 8</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img className="img-fluid" src="./assets/img/ph_9993_35119.jpg" alt=""/>
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left">
                                <h1 className="h1">Proident occaecat</h1>
                                <h3 className="h2">Aliquip ex ea commodo consequat</h3>
                                <p>
                                    You are permitted to use this Zay CSS template for your commercial websites.
                                    You are <strong>not permitted</strong> to re-distribute the template ZIP file in any
                                    kind of template collection websites.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img className="img-fluid" src="./assets/img/oar2.jpg" alt=""/>
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left">
                                <h1 className="h1">Repr in voluptate</h1>
                                <h3 className="h2">Ullamco laboris nisi ut </h3>
                                <p>
                                    We bring you 100% free CSS templates for your websites.
                                    If you wish to support TemplateMo, please make a small contribution via PayPal or
                                    tell your friends about our website. Thank you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel"
            role="button" data-bs-slide="prev">
            <i className="fas fa-chevron-left"></i>
        </a>
        <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel"
            role="button" data-bs-slide="next">
            <i className="fas fa-chevron-right"></i>
        </a>
    </div>
      
    
     
      
  
  
      <section className="ftco-section bg-light">
          <div className="container-fluid">
              <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-5 heading-section  text-center">
              <h2 className="mb-4">Our Causes</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </div>
              <div className="row">
                  <div className="col-md-12 ">
                  <OwlCarousel className='carousel-cause ' loop margin={5} nav>
                      
                      
                          <div className="item">
                              <div className="cause-entry">
                                  <a href="#" className="img" style={{backgroundImage: "url(images/3.jpg)"}}></a>
                                  <div className="text p-3 p-md-4">
                                      <h3><a href="#">Clean water for the urban area</a></h3>
                                      <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
                                      <span className="donation-time mb-3 d-block">Last donation 1w ago</span>
                          <div className="progress custom-progress-success">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "28%"}} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <span className="fund-raised d-block">$12,000 raised of $30,000</span>
                                  </div>
                              </div>
                          </div>
                          <div className="item">
                              <div className="cause-entry">
                                  <a href="#" className="img" style={{backgroundImage: "url(images/4.jpg)"}}></a>
                                  <div className="text p-3 p-md-4">
                                      <h3><a href="#">Clean water for the urban area</a></h3>
                                      <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
                                      <span className="donation-time mb-3 d-block">Last donation 1w ago</span>
                          <div className="progress custom-progress-success">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "28%"}} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <span className="fund-raised d-block">$12,000 raised of $30,000</span>
                                  </div>
                              </div>
                          </div>
                          <div className="item">
                              <div className="cause-entry">
                                  <a href="#" className="img" style={{backgroundImage: "url(images/5.jpg)"}}></a>
                                  <div className="text p-3 p-md-4">
                                      <h3><a href="#">Clean water for the urban area</a></h3>
                                      <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
                                      <span className="donation-time mb-3 d-block">Last donation 1w ago</span>
                          <div className="progress custom-progress-success">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "28%"}} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <span className="fund-raised d-block">$12,000 raised of $30,000</span>
                                  </div>
                              </div>
                          </div>
                          <div className="item">
                              <div className="cause-entry">
                                  <a href="#" className="img" style={{backgroundImage: "url(images/7.jpg)"}}></a>
                                  <div className="text p-3 p-md-4">
                                      <h3><a href="#">Clean water for the urban area</a></h3>
                                      <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
                                      <span className="donation-time mb-3 d-block">Last donation 1w ago</span>
                          <div className="progress custom-progress-success">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "28%" }}aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <span className="fund-raised d-block">$12,000 raised of $30,000</span>
                                  </div>
                              </div>
                          </div>
                          <div className="item">
                              <div className="cause-entry">
                                  <a href="#" className="img" style={{backgroundImage: "url(images/cause-5.jpg)"}}></a>
                                  <div className="text p-3 p-md-4">
                                      <h3><a href="#">Clean water for the urban area</a></h3>
                                      <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
                                      <span className="donation-time mb-3 d-block">Last donation 1w ago</span>
                          <div className="progress custom-progress-success">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "28%"}} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <span className="fund-raised d-block">$12,000 raised of $30,000</span>
                                  </div>
                              </div>
                          </div>
                          <div className="item">
                              <div className="cause-entry">
                                  <a href="#" className="img" style={{backgroundImage: "url(images/cause-6.jpg)"}}></a>
                                  <div className="text p-3 p-md-4">
                                      <h3><a href="#">Clean water for the urban area</a></h3>
                                      <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
                                      <span className="donation-time mb-3 d-block">Last donation 1w ago</span>
                          <div className="progress custom-progress-success">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "28%"}} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <span className="fund-raised d-block">$12,000 raised of $30,000</span>
                                  </div>
                              </div>
                          </div>
                      
                      </OwlCarousel>
                  </div>
              </div>
          </div>
          
      </section>
      
  
      <section className="ftco-section">
        <div className="container">
            <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section  text-center">
              <h2 className="mb-4">Latest Donations</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </div>
          <div className="row">
              <div className="col-lg-4 d-flex mb-sm-4 ">
                  <div className="staff">
                      <div className="d-flex mb-4">
                          <div className="img" style={{backgroundImage: "url(images/person_1.jpg)"}}></div>
                          <div className="info ml-4">
                              <h3><a href="teacher-single.html">Ivan Jacobson</a></h3>
                              <span className="position">Donated Just now</span>
                              <div className="text">
                                  <p>Donated <span>$300</span> for <a href="#">Children Needs Food</a></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-lg-4 d-flex mb-sm-4 ">
                  <div className="staff">
                      <div className="d-flex mb-4">
                          <div className="img" style={{backgroundImage: "url(images/person_2.jpg)"}}></div>
                          <div className="info ml-4">
                              <h3><a href="teacher-single.html">Ivan Jacobson</a></h3>
                              <span className="position">Donated Just now</span>
                              <div className="text">
                                  <p>Donated <span>$150</span> for <a href="#">Children Needs Food</a></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-lg-4 d-flex mb-sm-4 ">
                  <div className="staff">
                      <div className="d-flex mb-4">
                          <div className="img" style={{backgroundImage:" url(images/person_3.jpg)"}}></div>
                          <div className="info ml-4">
                              <h3><a href="teacher-single.html">Ivan Jacobson</a></h3>
                              <span className="position">Donated Just now</span>
                              <div className="text">
                                  <p>Donated <span>$250</span> for <a href="#">Children Needs Food</a></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>
  
    <>
  {/* Hello world */}
 <Gallery/>
</>

  
      <Blogs/>
  
   <Events/>
          
          <section className="ftco-section-3 img" style={{backgroundImage: "url(images/bg_3.jpg)"}}>
          <div className="overlay"></div>
          <div className="container">
              <div className="row d-md-flex">
              <div className="col-md-6 d-flex ">
                  <div className="img img-2 align-self-stretch" style={{backgroundImage: "url(images/bg_4.jpg)"}}></div>
              </div>
              <div className="col-md-6 volunteer pl-md-5 ">
                  <h3 className="mb-3">Be a volunteer</h3>
                  <form action="#" className="volunter-form">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Name"/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Email"/>
              </div>
              <div className="form-group">
                <textarea name="" id="" cols="30" rows="3" className="form-control" placeholder="Message"></textarea>
              </div>
              <div className="form-group">
                <input type="submit" value="Send Message" className="btn btn-white py-3 px-5"/>
              </div>
            </form>
              </div>    			
              </div>
          </div>
      </section>

<Footer/>







</>







    )
}
export default Front;