import React from 'react';



const Education = () => {

    return (
        <section id='Education  '>
            <section className="bg-edu    bg-blend-multiply bg-purple-400/10  bg-cover  w-full lg:pb-44">
                <section className="education-wrapper w-[85%] mx-auto   flex fc-center">
                    {/* education tittle */}
                    <div className="edu-tittle w-full mt-20  flex flex-col items-center justify-center relative">
                        <h3 className='text-2xl lg:text-[3.5rem] font-bold text-favblue-100 ' >My Learn<span className='bg-white py-1  lg: rounded-2xl'>ing</span>  &  <span className='f-conveat text-favblue-50'>Education</span></h3>
                        <p className='text-base  lg:text-xl text-gray-500 mt-8  text-center' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, br  sed do eiusmod <br /> tempor incididunt ut labore et dolore.</p>
                    </div>

                    {/* education items */}
                    <div className="edu-item-wrap w-full mt-12 gap-8  grid lg:grid-cols-2">
                        {/* edu item */}
                        <div className="edu-item grid grid-cols-4 mb-8 relative group  bg-pattern-2 bg-center bg-cover rounded-[3rem] hover:bg-favblue-50   bg-blend-multiply  justify-start">
                            <div className="edu-item-right fc-center col-span-3 my-12 ml-8 ">
                                <h4 className=' text-xl lg:text-[1.75rem] flex items-center  text-favblue-100 font-bold group-hover:text-white transition duration-200 ease-in-out ' >
                                    <span className='w-4 h-4  flex relative mr-2 mt-2 '>
                                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                                        <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
                                    </span>  Harverd University</h4>
                                <h5 className=' text-lg  lg:text-2xl text-favblue-50 mt-4 f-conveat group-hover:text-white transition duration-200 ease-in-out ' >Harverd University</h5>
                                <p className='text-gray-500 text-lg  lg:text-lg mt-4 group-hover:text-white/70 transition duration-200 ease-in-out ' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>

                            <div className="edu-item-left -mt-4  flex items-center justify-center  w-[53%] ml-auto mr-8 rounded-2xl h-[110%] mb-20 bg-favblue-50    text-white delay-75   group-hover:text-favblue-50 group-hover:bg-white transition duration-200 ease-in-out ">
                                <p className='m-auto absolute  font-bold text-xl writting-mode ' >2021 - 2023</p>
                            </div>
                        </div>
                        {/* edu item */}
                        <div className="edu-item grid grid-cols-4 mb-8 relative group  bg-pattern-2 bg-center bg-cover rounded-[3rem] hover:bg-favblue-50   bg-blend-multiply  justify-start">
                            <div className="edu-item-right fc-center col-span-3 my-12 ml-8 ">
                                <h4 className=' text-xl lg:text-[1.75rem] flex items-center  text-favblue-100 font-bold group-hover:text-white transition duration-200 ease-in-out ' >
                                    <span className='w-4 h-4  flex relative mr-2 mt-2 '>
                                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                                        <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
                                    </span>  Honours of UI/UX</h4>
                                <h5 className=' text-lg  lg:text-2xl text-favblue-50 mt-4 f-conveat group-hover:text-white transition duration-200 ease-in-out ' >Cambridge University</h5>
                                <p className='text-gray-500 text-lg  lg:text-lg mt-4 group-hover:text-white/70 transition duration-200 ease-in-out ' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>

                            <div className="edu-item-left -mt-4  flex items-center justify-center  w-[53%] ml-auto mr-8 rounded-2xl h-[110%] mb-20 bg-favblue-50    text-white delay-75   group-hover:text-favblue-50 group-hover:bg-white transition duration-200 ease-in-out ">
                                <p className='m-auto absolute   font-bold text-xl writting-mode ' >2019 - 2022</p>
                            </div>
                        </div>
                        {/* edu item */}
                        <div className="edu-item grid grid-cols-4 mb-8 relative group  bg-pattern-2 bg-center bg-cover rounded-[3rem] hover:bg-favblue-50   bg-blend-multiply  justify-start">
                            <div className="edu-item-right fc-center col-span-3 my-12 ml-8 ">
                                <h4 className=' text-xl lg:text-[1.75rem] flex items-center  text-favblue-100 font-bold group-hover:text-white transition duration-200 ease-in-out ' >
                                    <span className='w-4 h-4  flex relative mr-2 mt-2 '>
                                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                                        <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
                                    </span>  Bachelor of Science</h4>
                                <h5 className=' text-lg  lg:text-2xl text-favblue-50 mt-4 f-conveat group-hover:text-white transition duration-200 ease-in-out ' >TM Primary School</h5>
                                <p className='text-gray-500 text-lg  lg:text-lg mt-4 group-hover:text-white/70 transition duration-200 ease-in-out ' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>

                            <div className="edu-item-left -mt-4  flex items-center justify-center  w-[53%] ml-auto mr-8 rounded-2xl h-[110%] mb-20 bg-favblue-50    text-white delay-75   group-hover:text-favblue-50 group-hover:bg-white transition duration-200 ease-in-out ">
                                <p className='m-auto absolute   font-bold text-xl writting-mode ' >2015 - 2020</p>
                            </div>
                        </div>
                        {/* edu item */}
                        <div className="edu-item grid grid-cols-4 mb-8 relative group  bg-pattern-2 bg-center bg-cover rounded-[3rem] hover:bg-favblue-50   bg-blend-multiply  justify-start">
                            <div className="edu-item-right fc-center col-span-3 my-12 ml-8 ">
                                <h4 className=' text-xl lg:text-[1.75rem] flex items-center  text-favblue-100 font-bold group-hover:text-white transition duration-200 ease-in-out ' >
                                    <span className='w-4 h-4  flex relative mr-2 mt-2 '>
                                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                                        <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
                                    </span>  School Certificate</h4>
                                <h5 className=' text-lg  lg:text-2xl text-favblue-50 mt-4 f-conveat group-hover:text-white transition duration-200 ease-in-out ' >TM Primary School</h5>
                                <p className='text-gray-500 text-lg  lg:text-lg mt-4 group-hover:text-white/70 transition duration-200 ease-in-out ' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>

                            <div className="edu-item-left -mt-4  flex items-center justify-center  w-[53%] ml-auto mr-8 rounded-2xl h-[110%] mb-20 bg-favblue-50    text-white delay-75   group-hover:text-favblue-50 group-hover:bg-white transition duration-200 ease-in-out ">
                                <p className='m-auto absolute   font-bold text-xl writting-mode ' >2015 - 2023</p>
                            </div>

                        </div>
                    </div>
                </section>
            </section>

        </section>
    );
};

export default Education;