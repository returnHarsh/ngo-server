import React, { useEffect, useState } from 'react'
import axios from 'axios';
import UseStateHook from '../hooks/UseStateHook';
import PaginationFooter from './PaginationFooter';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { format, formatDistanceToNow } from 'date-fns';

const Cause = () => {

  const { data, dataLoading } = UseStateHook("http://localhost:8080/api/cause");
  const [page, setPage] = useState(1);

  return (
    <div>
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


                {data.causes?.map((cause, index) => {
                  return <>
                    <div className="item">
                      <div className="cause-entry">
                        <a href="#" className="img" style={{ backgroundImage: `url(${cause.img})` }}></a>
                        <div className="text p-3 p-md-4">
                          <h3><a href="#"> {cause.title} </a></h3>
                          <p> {cause.desc} </p>
                          <span className="donation-time mb-3 d-block">Last donation  {cause.createdAt ? formatDistanceToNow(cause.createdAt, { addSuffix: true }) : "1w"} </span>
                          <div className="progress custom-progress-success">
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "28%" }} aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <span className="fund-raised d-block">$12,000 raised of $30,000</span>
                        </div>
                      </div>
                    </div>
                  </>
                })}


              </OwlCarousel>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Cause
