import React, { useState } from 'react';




const AboutMe = () => {

    return (
        <section className='w-full bg-aboutMe rounded-3xl mt-[25%]  lg:mt-[6.5%] lg:pt-16 lg:pb-16  '>
            <main id='aboutMain'  className='w-[95%]   lg:w-[85%] p-[3%]  mx-auto gap-32 mt-4   flex flex-col lg:flex-row  items-start justify-center lg:rounded-3xl '>
                <div className="prof-container prof-img bg-center bg-cover rounded-6xl  lg:w-1/2 mt-12">
                    <img className='rounded-2xl ' src={process.env.PUBLIC_URL + '/images/my-pic4.png'} alt="prof-img" />
                    
                </div>

                <div className="prof-text-wrapper lg:w-1/2 -mt-12  lg:mt-12">
                    <p className='f-conveat text-2xl  lg:text-3xl text-white'>Hello, I Am</p>
                    <h1 className='mt-4 lg:mt-8 text-[2.5rem]  lg:text-[4rem] font-bold uppercase text-white'>Reza <span className='text-blue-700 font-semibold '>Abdollahi</span> </h1>
                    <h3 className='mt-4 text-2xl relative font-semibold text-white  ' ><span className='text-favblue-50 ' style={{ verticalAlign: "8px" }} >_______</span>  Front end Developer</h3>
                    <ul className='mt-8 mb-8 lg:mb-0'>
                        <li className='flex group bg-transparent hover:bg-gray-500/10 lg:p-2 rounded-xl  items-center mt-4  lg:mt-2 transition-all duration-100 cursor-pointer justify-between  ' ><span className=' text-xl text-white  lg:text-2xl font-bold uppercase lg:w-1/2 select-none cursor-pointer group-hover:text-gray-500 transition duration-300 lg:ml-1 ' >  Age:</span> <span className='text-purple-700  group-hover:text-purple-500 lg:text-xl lg:group-hover:font-semibold' >  22 </span> </li>
                        <li className='flex group bg-transparent hover:bg-gray-500/10 lg:p-2 rounded-xl  items-center mt-4  lg:mt-2 transition-all duration-100 cursor-pointer justify-between  ' ><span className=' text-xl text-white  lg:text-2xl font-bold uppercase lg:w-1/2 select-none cursor-pointer group-hover:text-gray-500 transition duration-300 lg:ml-1 ' >  Phone:</span> <span className='text-purple-700  group-hover:text-purple-500 lg:text-xl lg:group-hover:font-semibold' >  +98 921 981 1980 </span> </li>
                        <li className='flex group bg-transparent hover:bg-gray-500/10 lg:p-2 rounded-xl  items-center mt-4  lg:mt-2 transition-all duration-100 cursor-pointer justify-between  ' ><span className=' text-xl text-white  lg:text-2xl font-bold uppercase lg:w-1/2 select-none cursor-pointer group-hover:text-gray-500 transition duration-300 lg:ml-1 ' >  Email:</span> <span className='text-purple-700  group-hover:text-purple-500 lg:text-xl lg:group-hover:font-semibold' >  Srezaabdollahi7@gmail.com </span> </li>
                        <li className='flex group bg-transparent hover:bg-gray-500/10 lg:p-2 rounded-xl  items-center mt-4  lg:mt-2 transition-all duration-100 cursor-pointer justify-between  ' ><span className=' text-xl text-white  lg:text-2xl font-bold uppercase lg:w-1/2 select-none cursor-pointer group-hover:text-gray-500 transition duration-300 lg:ml-1 ' >  Address:</span> <span className='text-purple-700  group-hover:text-purple-500 lg:text-xl lg:group-hover:font-semibold' >  37, New York, United State </span> </li>
                        <li className='flex group bg-transparent hover:bg-gray-500/10 lg:p-2 rounded-xl  items-center mt-4  lg:mt-2 transition-all duration-100 cursor-pointer justify-between  ' ><span className=' text-xl text-white  lg:text-2xl font-bold uppercase lg:w-1/2 select-none cursor-pointer group-hover:text-gray-500 transition duration-300 lg:ml-1 ' >  Freelancer:</span> <span className='text-purple-700  group-hover:text-purple-500 lg:text-xl lg:group-hover:font-semibold' >  Available </span> </li>
                       
                    </ul>
                </div>
            </main>
        </section>

    );
};

export default AboutMe;