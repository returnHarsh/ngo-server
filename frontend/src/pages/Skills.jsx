import React from 'react'
import Footer from "../comonents/footer";
import Nav from "../comonents/Nav"

const Skills = () => {
  return (
    <div>

        <Nav/>

        <section className="bg-success">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8 text-white">
              <h1 className="text-[80px]">Skills</h1>
              <p className="text-gray-200">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="col-md-4 ">
              <img className='scale-110' src="/images/skills-main.png" alt="About Hero" />
            </div>
          </div>
        </div>
      </section>

      {/* middle section */}

      <section className="ftco-section">
    <div className="container">
      <div className="row d-flex min-h-[420px]">
        <div className="col-md-6 d-flex ">
          <div
            className="img img-about align-self-stretch"
            style={{ backgroundImage: "url(images/skills-left.jpg)", width: "100%" }}
          />
        </div>
        <div className="col-md-6 pl-md-5 ">
          <h2 className="mb-4">Office Assistant</h2>
          <p>
          Offering skill development programs to equip youth with practical skills that can lead to employment opportunities.
          </p>
        </div>
      </div>
    </div>
  </section>

<div className='flex justify-center items-center mb-[50px]  overflow-hidden '>

<div className=' grid  grid-cols-4 w-[80%] gap-[20px] lg:max-h-[250px] '>
<div className=' flex-1 border border-black'>
<img className='object-cover w-full h-full'  src="/images/skills-1.jpg" alt="skills-1" />
</div>

<div className=' flex-1 border border-black'>
<img className='object-cover w-full h-full'  src="/images/skills-2.jpg" alt="skills-1" />
</div>

<div className=' flex-1 border border-black'>
<img className='object-cover w-full h-full'  src="/images/skills-3.jpg" alt="skills-1" />
</div>

<div className=' flex-1 border border-black'>
<img className='object-cover w-full h-full'  src="/images/skills-4.jpg" alt="skills-1" />
</div>
</div>

</div>


        <Footer/>
    </div>
  )
}

export default Skills
