import React, { useEffect, useState } from 'react'
import axios from "axios";
import UseStateHook from '../hooks/UseStateHook';
import PaginationFooter from './PaginationFooter';
import Footer from './footer';

const Events = () => {

  const{data , dataLoading} = UseStateHook("http://localhost:8080/api/events");
  const[page , setPage] = useState(1);


  return (
    <>

    {!dataLoading && data.events.length > 0 && <>
      <div>
         <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section  text-center">
              <h2 className="mb-4">Our Latest Events</h2>
            </div>
          </div>
          <div className="row">
              {data.events.map(event=>{
                return <>
                <div className="col-md-4 d-flex ">
                <div className="blog-entry align-self-stretch">
                <a href="blog-single.html" className="block-20" style={{backgroundImage: `url(${event.img})`}}>
                </a>
                <div className="text p-4 d-block">
                    <div className="meta mb-3">
                    <div><a href="#">{event.eventDate.month}. {event.eventDate.day}, {event.eventDate.year}</a></div>
                    <div><a href="#">Admin</a></div>
                    <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                  </div>
                  <h3 className="heading mb-4"><a href="#"> {event.title} </a></h3>
                  <p className="time-loc"><span className="mr-2"><i className="icon-clock-o"></i> {event.startTime.timeValHour} : {event.startTime.timeValMinute}{event.startTime.period} - {event.endTime.timeValHour} : {event.endTime.timeValMinute}{event.endTime.period} </span> <span><i className="icon-map-o"></i> Venue Main Campus</span></p>
                  <p> {event.desc} </p>
                  <p><a href="event.html">Join Event <i className="ion-ios-arrow-forward"></i></a></p>
                </div>
              </div>
            </div>
                </>
              })}
          </div>
        </div>
      </section>

      <PaginationFooter  data={data.events} page={page} setPage={setPage} />
      
    </div>
    </>}

    </>
  )
}

export default Events
