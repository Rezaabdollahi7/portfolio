import React, { useState } from 'react';
import SkillItem from './skillItems';



const Work_skill = () => {
    return (
        <section className="skil-all-wrapper w-full bg-skill rounded-bl-7xl ">
            <section className="work-skill-wrap  mx-auto grid xl:grid-cols-2 gap-5">
                {/* left side */}
                <section className='left-side col-span-1 bg-blend-multiply bg-pattern-2 bg-stone-800   -mt-24 mb-16 rounded-tr-6xl rounded-br-6xl px-8  lg:px-16'>
                    <h3 className=' text-4xl md:text-5xl md:mt-28  lg:text-5xl text-white font-bold w-full mt-24'> My Work &<span className='f-conveat'> Experience</span></h3>
                    <p className='lg:text-xl text-gray-300 mt-4 '>Transforming Ideas into Engaging User Interfaces, Delivering Excellence in Every Line of Code</p>

                    <div className="work-exp-item-wrapper grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1  sm:gap-7 sm:mt-12  ">
                        {/* item 1 */}
                        <div className="exp-item flex items-center justify-between my-12  xl:mt-16 xl:mb-0 rounded-5xl xl:p-12 ">
                            <span className="number  bg-blue-700  flex justify-center items-center   opacity-40 p-4  lg:p-7 lg:px-9 rounded-2xl text-white rotate-45">
                                <span className=' w-full h-full top-1/2 left-1/2 text-3xl font-bold -rotate-45 ' >3</span>
                            </span>
                            <div className="item-text ml-4  lg:ml-2  ">
                                <p className='text-lg text-gray-200 font-light '>2021 - 2014</p>
                                <h5 className='uppercase lg:text-xl  xl:text-3xl text-white mt-4 font-bold '> ui/ux creative design </h5>
                                <p className='mt-4  lg:text-lg xl:text-xl font-semibold text-favblue-50 ' >Incident Software House</p>
                            </div>
                            <button className='p-2  lg:p-3 rounded-lg bg-white font-bold text-favblue-50 flex items-center justify-center  text-2xl'>+</button>
                        </div>
                        {/* item 2 */}
                        <div className="exp-item flex items-center justify-between  lg:mt-8 bg-favblue-50 bg-blend-multiply bg-pattern-2 bg-center bg-cover  rounded-5xl px-8  lg:p-12 ">
                            <span className="number  bg-blue-300  flex justify-center items-center   opacity-40 p-4 lg:p-7 lg:px-9 rounded-2xl text-white rotate-45">
                                <span className=' w-full h-full top-1/2 left-1/2 text-3xl font-bold -rotate-45 ' >1</span>
                            </span>
                            <div className="item-text ml-4 my-4  lg:ml-4  ">
                                <p className='text-lg text-white font-light '>2011 - 2014</p>
                                <h5 className='uppercase lg:text-xl  xl:text-3xl text-white mt-4 font-bold '> ui/ux creative design </h5>
                                <p className='mt-4 text-white  lg:text-lg xl:text-xl font-semibold ' >Incident Software House</p>
                                <p className='text-gray-300/60 mt-8 text-lg hidden '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat dignissimos accusamus, soluta dolores fugiat ducimus necessitatibus adipisci cum quos. Hic?</p>
                            </div>
                            <button className='p-2  lg:p-3 rounded-lg bg-white font-bold text-favblue-50 flex items-center justify-center  text-2xl'>+</button>
                        </div>

                        {/* item 3 */}
                        <div className="exp-item flex items-center justify-between my-12  xl:mt-16 xl:mb-0 rounded-5xl xl:p-12 ">
                            <span className="number  bg-blue-700  flex justify-center items-center   opacity-40 p-4  lg:p-7 lg:px-9 rounded-2xl text-white rotate-45">
                                <span className=' w-full h-full top-1/2 left-1/2 text-3xl font-bold -rotate-45 ' >2</span>
                            </span>
                            <div className="item-text ml-4  lg:ml-2  ">
                                <p className='text-lg text-gray-200 font-light '>2021 - 2014</p>
                                <h5 className='uppercase lg:text-xl  xl:text-3xl text-white mt-4 font-bold '> ui/ux creative design </h5>
                                <p className='mt-4  lg:text-lg xl:text-xl font-semibold text-favblue-50 ' >Incident Software House</p>
                            </div>
                            <button className='p-2  lg:p-3 rounded-lg bg-white font-bold text-favblue-50 flex items-center justify-center  text-2xl'>+</button>
                        </div>

                        {/* item 4 */}
                        <div className="exp-item flex items-center justify-between mb-12  lg:mt-8 xl:mt-1 bg-favblue-50 bg-blend-multiply bg-pattern-2 bg-center bg-cover  rounded-5xl px-8  lg:p-12 ">
                            <span className="number  bg-blue-300  flex justify-center items-center   opacity-40 p-4 lg:p-7 lg:px-9 rounded-2xl text-white rotate-45">
                                <span className=' w-full h-full top-1/2 left-1/2 text-3xl font-bold -rotate-45 ' >4</span>
                            </span>
                            <div className="item-text ml-4 my-4  lg:ml-4  ">
                                <p className='text-lg text-white font-light '>2011 - 2014</p>
                                <h5 className='uppercase lg:text-xl  xl:text-3xl text-white mt-4 font-bold '> ui/ux creative design </h5>
                                <p className='mt-4 text-white  lg:text-lg xl:text-xl font-semibold ' >Incident Software House</p>
                                <p className='text-gray-300/60 mt-8 text-lg hidden '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat dignissimos accusamus, soluta dolores fugiat ducimus necessitatibus adipisci cum quos. Hic?</p>
                            </div>
                            <button className='p-2  lg:p-3 rounded-lg bg-white font-bold text-favblue-50 flex items-center justify-center  text-2xl'>+</button>
                        </div>

                    </div>


                </section>
                
                {/* right side */}
                <section className="rigt-side col-span-1 mb-8  mt-4 sm:mb-12  lg:mb-8  xl:mt-32   mx-auto  w-[90%] ">
                    <h3 className=' text-3xl sm:text-4xl sm:text-center  lg:text-5xl text-white font-bold w-full'> My Skill &<span className='f-conveat'> Advantage</span></h3>
                    <p className='sm:text-lg  lg:text-xl text-gray-300 mt-4 '>Crafting Seamless User Experiences, Pixel-Perfect Design, and Code Mastery for Modern Web.</p>

                    <section className="skill-item-wrapper w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2  lg:mb-8   mt-8 gap-7 " >

                        {/* item */}
                        <div className="skill-item bg-pattern-2 bg-center bg-cover rounded-7xl border-6 border-gray-200 p-10  ">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" class="h-10 w-10 outline outline-gray-300 outline-offset-8  rounded-lg "><g><g><path fill="#F6DE1E" d="M0.05,176.52c0-51.01,0-102.03,0-153.04c1.09-0.35,1.06-1.41,1.33-2.21C4.82,10.85,11.88,4.21,22.32,1.04 c0.7-0.21,1.62-0.03,1.94-0.99c50.49,0,100.99,0,151.48,0c0.24,0.78,0.95,0.73,1.55,0.9c11.27,3.23,18.51,10.49,21.75,21.75 c0.17,0.6,0.13,1.31,0.91,1.55c0,50.75,0,101.51,0,152.26c-1.09,0.34-1.06,1.41-1.33,2.21c-3.51,10.56-10.67,17.26-21.32,20.31 c-0.6,0.17-1.31,0.13-1.56,0.91c-50.75,0-101.51,0-152.26,0c-0.26-0.94-1.14-0.99-1.84-1.21c-10.29-3.3-17.07-10.08-20.38-20.37 C1.03,177.67,0.99,176.78,0.05,176.52z M144.85,172.63c3.16,0.12,6.25-0.27,9.32-0.85c11.85-2.24,19.74-9.48,21.83-20 c2.37-11.88-1.82-21.77-12.12-28.56c-4.8-3.16-10.03-5.46-15.3-7.68c-3.47-1.46-7.01-2.81-10.02-5.15c-3.12-2.43-4.14-5.65-3-9.37 c1.12-3.67,3.96-5.34,7.63-5.65c4.82-0.4,8.81,1.33,11.29,5.48c1.52,2.55,2.71,2.28,4.74,0.77c2.71-2.01,5.56-3.87,8.51-5.5 c2.45-1.36,2.93-2.49,1.21-5.02c-6.88-10.14-16.8-12.97-28.25-12.03c-11.75,0.96-20.42,8-23.11,18.38 c-2.91,11.23,1.14,21.97,10.82,28.7c3.43,2.39,7.19,4.15,10.99,5.86c4.14,1.87,8.36,3.61,12.35,5.76 c4.87,2.62,6.75,6.3,5.87,10.37c-0.83,3.86-4.44,6.7-9.54,7.39c-8.38,1.14-15.15-1.62-19.91-8.66c-1.33-1.97-2.28-2.2-4.24-0.92 c-3.26,2.12-6.63,4.14-10.15,5.79c-2.93,1.37-2.54,2.76-1.06,4.96C120.43,168.13,131.68,172.3,144.85,172.63z M101.18,114.8 c0-10.54-0.09-21.07,0.06-31.61c0.04-2.91-0.48-4.25-3.78-3.97c-3.74,0.32-7.56,0.31-11.3,0c-3.24-0.27-3.82,0.98-3.8,3.93 c0.12,19.64,0.08,39.28,0.04,58.92c0,2.2-0.07,4.44-0.43,6.61c-0.7,4.22-3.09,6.29-7.26,6.95c-6.22,0.99-10.24-1.99-12.97-7.14 c-1.11-2.09-2.14-2.35-4.16-1.09c-3.08,1.92-6.3,3.67-9.61,5.15c-2.72,1.21-2.92,2.38-1.39,4.91 c7.04,11.63,21.2,16.75,36.31,12.79c9.11-2.38,14.83-8.18,17.18-17.32c0.91-3.56,1.1-7.19,1.11-10.84 C101.2,133.01,101.18,123.9,101.18,114.8z"></path><path fill="#030300" d="M144.85,172.63c-13.17-0.33-24.42-4.5-32.13-15.93c-1.48-2.2-1.87-3.59,1.06-4.96 c3.52-1.64,6.89-3.67,10.15-5.79c1.97-1.28,2.91-1.05,4.24,0.92c4.76,7.04,11.53,9.8,19.91,8.66c5.1-0.69,8.71-3.53,9.54-7.39 c0.88-4.08-1.01-7.75-5.87-10.37c-3.99-2.15-8.21-3.89-12.35-5.76c-3.79-1.71-7.55-3.48-10.99-5.86 c-9.68-6.73-13.74-17.46-10.82-28.7c2.69-10.38,11.36-17.42,23.11-18.38c11.45-0.94,21.37,1.88,28.25,12.03 c1.72,2.53,1.23,3.67-1.21,5.02c-2.95,1.63-5.8,3.49-8.51,5.5c-2.04,1.51-3.22,1.78-4.74-0.77c-2.48-4.14-6.47-5.88-11.29-5.48 c-3.68,0.31-6.52,1.98-7.63,5.65c-1.14,3.72-0.12,6.94,3,9.37c3.01,2.34,6.55,3.69,10.02,5.15c5.27,2.22,10.5,4.52,15.3,7.68 c10.3,6.79,14.49,16.68,12.12,28.56c-2.09,10.52-9.98,17.77-21.83,20C151.1,172.37,148.01,172.76,144.85,172.63z"></path><path fill="#030300" d="M101.18,114.8c0,9.1,0.01,18.21-0.01,27.31c-0.01,3.64-0.2,7.27-1.11,10.84 c-2.35,9.14-8.07,14.94-17.18,17.32c-15.11,3.95-29.27-1.16-36.31-12.79c-1.53-2.53-1.33-3.7,1.39-4.91 c3.31-1.48,6.53-3.23,9.61-5.15c2.03-1.26,3.05-1,4.16,1.09c2.74,5.15,6.76,8.13,12.97,7.14c4.17-0.66,6.56-2.73,7.26-6.95 c0.36-2.17,0.43-4.4,0.43-6.61c0.03-19.64,0.08-39.28-0.04-58.92c-0.02-2.95,0.57-4.2,3.8-3.93c3.75,0.31,7.56,0.32,11.3,0 c3.3-0.28,3.82,1.06,3.78,3.97C101.09,93.72,101.18,104.26,101.18,114.8z"></path></g></g></svg>
                            <h5 className='text-2xl text-favblue-100 font-bold mt-6'>JavaScript</h5>
                            <p className='mt-5 text-lg text-gray-400'>JavaScript empowers the web with dynamic functionality, making it a digital world-shaper.</p>
                            <div className="range-wrapper flex items-center  w-full h-2 rounded-md mt-8 bg-gray-500">
                                <div className="range-blue w-[60%] bg-favblue-50 h-2 rounded-md"></div>
                                <span className='bg-favblue-50 py-4 px-3 rounded-lg  z-10 h-4 flex items-center text-white'>72%</span>
                            </div>
                        </div>
                        {/* item */}
                        <div className="skill-item bg-pattern-2 bg-center bg-cover rounded-7xl border-6 border-gray-200 p-10  ">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" class="h-10 w-10 outline outline-gray-300 outline-offset-8  rounded-lg"><g><path fill="#F06529" d="M0.07,16.47c0-0.65,0-1.3,0-1.95c0.68-0.38,0.54-1.13,0.7-1.71c1.52-5.32,4.87-8.99,9.85-11.3 c1.27-0.59,2.78-0.49,3.9-1.44c0.65,0,1.3,0,1.95,0c0.76,0.5,1.63,0.39,2.47,0.39c54.07,0,108.14,0,162.21,0 c0.84,0,1.7,0.1,2.47-0.39c0.52,0,1.04,0,1.56,0c0.23,0.57,0.76,0.36,1.17,0.45c7.09,1.59,12.59,7.36,13.3,13.95 c-0.01,0.91-0.02,1.82-0.02,2.73c0,54.97,0,109.93,0,164.9c0,1.42,0.01,2.84,0.01,4.25c-0.95,4.42-3.29,7.92-6.92,10.59 c-2.04,1.51-4.51,2.05-6.76,3.07c-57.41,0-114.81,0-172.22,0c-0.17-0.54-0.71-0.53-1.1-0.65c-6.23-1.93-10.19-6.03-11.96-12.3 c-0.11-0.39-0.02-0.95-0.6-1.11c0-0.78,0-1.56,0-2.34c0.49-0.76,0.39-1.63,0.39-2.47c0-54.07,0-108.14,0-162.21 C0.46,18.09,0.56,17.23,0.07,16.47z M100.03,62.64c-14.64,0-29.28,0.02-43.92-0.03c-1.45,0-1.94,0.3-1.72,1.86 c0.38,2.77,0.51,5.57,0.77,8.35c1.28,13.91,2.59,27.82,3.86,41.73c1.15,12.63,2.28,25.25,3.36,37.89c0.11,1.33,0.57,1.86,1.89,2.15 c10.73,2.33,21.43,4.77,32.16,7.13c1.44,0.32,2.85,1.03,4.38,0.69c11.73-2.61,23.45-5.26,35.19-7.82c1.26-0.27,1.68-0.8,1.79-2.03 c1.57-17.61,3.18-35.22,4.79-52.83c1.06-11.71,2.1-23.43,3.21-35.14c0.15-1.57-0.26-1.98-1.83-1.97 C129.31,62.67,114.67,62.64,100.03,62.64z M111.2,43.22c-0.53-0.8-1.11-1.45-1.42-2.2c-1.21-2.98-3.37-3.87-6.46-3.5 c-1.4,0.17-1.71,0.57-1.68,1.85c0.07,3.64,0.03,7.29,0.03,10.93c0,4.2,0,4.15,4.23,4.14c1.36,0,1.81-0.41,1.78-1.77 c-0.04-1.82-0.22-3.67,0.22-5.93c0.73,1.19,1.21,2.02,1.73,2.81c0.55,0.83,0.88,1.82,1.81,2.6c0.59-0.98,1.04-1.84,1.59-2.63 c0.55-0.79,0.75-1.87,1.93-2.44c0,1.18,0,2.15,0,3.12c0,4.33,0,4.28,4.35,4.24c1.33-0.01,1.65-0.48,1.63-1.7 c-0.05-3.97-0.02-7.94-0.02-11.91c0-3.26-0.01-3.11-3.33-3.31c-1.99-0.12-3.12,0.56-4,2.27C112.99,40.98,112.32,42.19,111.2,43.22z  M62.57,46.15c0,1.62,0,3.25,0,4.87c0,3.4,0,3.4,3.38,3.4c2.56,0,2.54,0,2.56-2.48c0.04-3.2-0.51-2.85,3.1-2.95 c1.38-0.04,1.77,0.44,1.77,1.78c0,3.66,0.06,3.66,3.69,3.65c0.13,0,0.26-0.02,0.39,0c1.41,0.22,1.92-0.28,1.89-1.8 c-0.1-4.41-0.1-8.83,0-13.25c0.04-1.51-0.47-1.84-1.88-1.82c-3.98,0.05-4.01-0.01-4.09,3.86c-0.02,1.12-0.27,1.74-1.52,1.6 c-0.64-0.07-1.3-0.06-1.95,0c-1.15,0.11-1.39-0.45-1.42-1.49c-0.12-4.01-0.15-4-4.2-3.93c-0.13,0-0.26,0.01-0.39,0 c-1.03-0.12-1.36,0.36-1.35,1.35C62.6,41.34,62.57,43.75,62.57,46.15z M91.24,37.59c-2.01,0-4.03,0.09-6.04-0.03 c-1.49-0.09-1.88,0.44-1.86,1.87c0.05,3.54-0.02,3.6,3.51,3.65c1.24,0.02,1.55,0.46,1.5,1.6c-0.08,1.95-0.02,3.9-0.02,5.84 c0,4.17,0,4.14,4.24,3.92c1.03-0.05,1.34-0.41,1.32-1.39c-0.04-2.73,0.05-5.46-0.04-8.18c-0.04-1.31,0.27-1.82,1.7-1.8 c3.29,0.05,3.29-0.03,3.28-3.41c0-0.26-0.03-0.52,0-0.78c0.14-1.07-0.4-1.33-1.37-1.31C95.4,37.62,93.32,37.59,91.24,37.59z  M130.61,54.42c1.04,0,2.08,0,3.12,0c4.23,0,4.2,0,3.87-4.31c-0.07-0.92-0.38-1.25-1.29-1.22c-1.69,0.04-3.38-0.07-5.06,0.04 c-1.33,0.09-1.67-0.43-1.6-1.66c0.09-1.75,0.02-3.51,0.02-5.26c0-4.74,0-4.7-4.69-4.44c-1.05,0.06-1.32,0.46-1.31,1.41 c0.03,4.68,0.04,9.35-0.01,14.03c-0.01,1.13,0.43,1.47,1.5,1.43C126.97,54.37,128.79,54.42,130.61,54.42z"></path><path fill="#F0662B" d="M199.64,186.35c0-1.42-0.01-2.84-0.01-4.25c0-54.97,0-109.93,0-164.9c0-0.91,0.01-1.82,0.02-2.73 c0.13,0,0.25,0.02,0.37,0.05c0,57.28,0,114.55,0,171.83C199.89,186.34,199.76,186.35,199.64,186.35z"></path><path fill="#F0662B" d="M183.61,0.07c-0.76,0.5-1.63,0.39-2.47,0.39c-54.07,0-108.14,0-162.21,0c-0.84,0-1.7,0.1-2.47-0.39 C72.18,0.07,127.9,0.07,183.61,0.07z"></path><path fill="#F0662B" d="M0.07,16.47c0.5,0.76,0.39,1.63,0.39,2.47c0,54.07,0,108.14,0,162.21c0,0.84,0.1,1.7-0.39,2.47 C0.07,127.9,0.07,72.18,0.07,16.47z"></path><path fill="#F0662B" d="M100.09,79.33c9.04,0,18.09,0.05,27.13-0.04c1.74-0.02,1.9,0.63,1.63,2.04c-0.53,2.74-1.16,5.48-1.39,8.25 c-0.17,1.97-1.03,2.23-2.73,2.22c-12.82-0.06-25.64-0.03-38.45-0.03c-0.46,0-0.91,0.03-1.37-0.01c-1.13-0.09-1.54,0.27-1.18,1.45 c0.49,1.62,0.97,3.25,1.23,4.92c0.24,1.53,0.91,1.96,2.44,1.95c11.19-0.07,22.38-0.04,33.57-0.04c4,0,4.01,0,3.58,3.91 c-1.14,10.41-2.3,20.81-3.4,31.22c-0.17,1.63-0.71,2.58-2.42,3.22c-5.66,2.09-11.24,4.42-16.83,6.72c-1.22,0.5-2.27,0.57-3.53,0.05 c-5.83-2.4-11.68-4.74-17.56-7.02c-1.12-0.43-1.62-1.09-1.84-2.21c-0.85-4.47-1.7-8.94-2.67-13.39c-0.31-1.41,0.13-1.67,1.41-1.64 c2.8,0.07,5.6,0.06,8.39,0c1.11-0.02,1.57,0.38,1.86,1.48c0.6,2.31,0.42,5.17,2.05,6.76c1.55,1.52,4.26,1.77,6.33,2.85 c2.58,1.35,4.97,1.38,7.53-0.03c1.41-0.78,2.95-1.4,4.51-1.82c1.72-0.46,2.32-1.45,2.5-3.14c0.46-4.39,1.03-8.77,1.64-13.14 c0.24-1.71-0.88-1.38-1.8-1.38c-11-0.01-21.99-0.07-32.99,0.05c-2.1,0.02-2.72-0.61-2.95-2.64c-1.09-9.55-2.33-19.08-3.56-28.61 c-0.19-1.46,0.11-2.01,1.76-2C82,79.37,91.04,79.33,100.09,79.33z"></path></g></svg>
                            <h5 className='text-2xl text-favblue-100 font-bold mt-6'>HTML/CSS3</h5>
                            <p className='mt-5 text-lg text-gray-400'>HTML and CSS: Molding Web's Visual Symphony, Seamlessly Blending Structure and Style.</p>
                            <div className="range-wrapper flex items-center  w-full h-2 rounded-md mt-8 bg-gray-500">
                                <div className="range-blue w-3/4 bg-favblue-50 h-2 rounded-md"></div>
                                <span className='bg-favblue-50 py-4 px-3 rounded-lg  z-10 h-4 flex items-center text-white'>95%</span>
                            </div>
                        </div>
                        {/* item */}
                        <div className="skill-item bg-pattern-2 bg-center bg-cover rounded-7xl border-6 border-gray-200 p-10  ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96px" height="96px" class="h-10 w-10 outline outline-gray-300 outline-offset-8  rounded-lg" ><linearGradient id="iOmQfjoCC4Hw6zVwRjSDha" x1="21.861" x2="25.703" y1="8.237" y2="36.552" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00c1e0" /><stop offset="1" stop-color="#009bb8" /></linearGradient><path fill="url(#iOmQfjoCC4Hw6zVwRjSDha)" d="M24,9.604c-5.589,0-9.347,2.439-11.276,7.318c-0.2,0.505,0.417,0.92,0.816,0.551 c2.035-1.882,4.322-2.505,6.86-1.871c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24 c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551c-2.035,1.882-4.322,2.506-6.86,1.872 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-5.589,0-9.348,2.44-11.276,7.319 c-0.2,0.505,0.417,0.92,0.816,0.551c2.035-1.882,4.322-2.506,6.86-1.871c1.825,0.457,3.13,1.781,4.575,3.246 c2.353,2.388,5.077,5.152,11.025,5.152c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551 c-2.035,1.882-4.322,2.506-6.86,1.871c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24L12,24z" /></svg>
                            <h5 className='text-2xl text-favblue-100 font-bold mt-6'>Tailwind</h5>
                            <p className='mt-5 text-lg text-gray-400'>Empowering Developers with Intuitive, Efficient, and Beautifully Customizable Web Design</p>
                            <div className="range-wrapper flex items-center  w-full h-2 rounded-md mt-8 bg-gray-500">
                                <div className="range-blue w-[67%] bg-favblue-50 h-2 rounded-md"></div>
                                <span className='bg-favblue-50 py-4 px-3 rounded-lg  z-10 h-4 flex items-center text-white'>80%</span>
                            </div>
                        </div>
                        {/* item */}
                        <div className="skill-item bg-pattern-2 bg-center bg-cover rounded-7xl border-6 border-gray-200 p-10  ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96px" height="96px" class="h-10 w-10 outline outline-gray-300 outline-offset-8  rounded-lg" baseProfile="basic"><path fill="#6c19ff" d="M6.391,10.671c-0.085-2.448,1.822-4.706,4.401-4.706h26.42c2.578,0,4.486,2.258,4.401,4.706 c-0.082,2.352,0.024,5.398,0.791,7.882c0.769,2.492,2.066,4.067,4.19,4.269v2.295c-2.124,0.202-3.421,1.777-4.19,4.269 c-0.767,2.484-0.873,5.53-0.791,7.882c0.085,2.448-1.822,4.706-4.401,4.706h-26.42c-2.578,0-4.486-2.258-4.4-4.706 c0.082-2.352-0.025-5.398-0.791-7.882c-0.769-2.492-2.069-4.067-4.194-4.269v-2.295c2.124-0.202,3.425-1.777,4.194-4.269 C6.367,16.07,6.473,13.023,6.391,10.671z" /><linearGradient id="Is-EGaxKcc0Cic9QMqyzGa" x1="17.846" x2="27.078" y1="-147.541" y2="-163.153" gradientTransform="matrix(1 0 0 -1 0 -132)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" /><stop offset="1" stop-color="#f1e5fc" /></linearGradient><path fill="url(#Is-EGaxKcc0Cic9QMqyzGa)" d="M25.042,34.016c4.366,0,6.997-2.138,6.997-5.664c0-2.665-1.877-4.595-4.665-4.9v-0.111 c2.048-0.333,3.655-2.235,3.655-4.359c0-3.026-2.389-4.997-6.03-4.997h-8.192v20.031H25.042z M19.994,16.525h4.238 c2.304,0,3.612,1.027,3.612,2.887c0,1.985-1.522,3.096-4.281,3.096h-3.57V16.525z M19.994,31.475v-6.594h4.21 c3.015,0,4.579,1.11,4.579,3.276c0,2.165-1.522,3.318-4.394,3.318H19.994z" /></svg>
                            <h5 className='text-2xl text-favblue-100 font-bold mt-6'>Bootstrap</h5>
                            <p className='mt-5 text-lg text-gray-400'>Empowering Web Designers with Versatile, Responsive, and Stylish Front-End Framework.</p>
                            <div className="range-wrapper flex items-center  w-full h-2 rounded-md mt-8 bg-gray-500">
                                <div className="range-blue w-[70%] bg-favblue-50 h-2 rounded-md"></div>
                                <span className='bg-favblue-50 py-4 px-3 rounded-lg  z-10 h-4 flex items-center text-white'>85%</span>
                            </div>
                        </div>

                        {/* item */}
                        <div className="skill-item bg-pattern-2 bg-center bg-cover rounded-7xl border-6 border-gray-200 p-10  ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96px" height="96px" class="h-10 w-10 outline outline-gray-300 outline-offset-8  rounded-lg "><path fill="#80deea" d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16 c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z" /><path fill="#80deea" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5 c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4 c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9 c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z" /><path fill="#80deea" d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19 c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2 c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z" /><circle cx="24" cy="24" r="4" fill="#80deea" /></svg>
                            <h5 className='text-2xl text-favblue-100 font-bold mt-6'>React</h5>
                            <p className='mt-5 text-lg text-gray-400'>Unleashing Dynamic, Interactive, and Exceptional User Experiences in Modern Web Development.</p>
                            <div className="range-wrapper flex items-center  w-full h-2 rounded-md mt-8 bg-gray-500">
                                <div className="range-blue w-[20%] bg-favblue-50 h-2 rounded-md"></div>
                                <span className='bg-favblue-50 py-4 px-3 rounded-lg  z-10 h-4 flex items-center text-white'>20%</span>
                            </div>
                        </div>

                        {/* item */}
                        <div className="skill-item bg-pattern-2 bg-center bg-cover rounded-7xl border-6 border-gray-200 p-10  ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96px" height="96px" class="h-10 w-10 outline outline-gray-300 outline-offset-8  rounded-lg" ><path fill="#f06292" d="M39.867,25.956c-1.538,0.008-2.87,0.377-3.986,0.928c-0.408-0.815-0.822-1.532-0.891-2.065 c-0.081-0.622-0.175-0.994-0.077-1.735c0.098-0.741,0.527-1.791,0.521-1.87c-0.006-0.079-0.096-0.456-0.983-0.463 c-0.887-0.006-1.646,0.171-1.735,0.405c-0.089,0.234-0.26,0.761-0.366,1.311c-0.155,0.804-1.771,3.673-2.688,5.173 c-0.3-0.586-0.555-1.102-0.608-1.51c-0.081-0.622-0.175-0.994-0.077-1.735c0.098-0.741,0.527-1.791,0.521-1.87 c-0.006-0.079-0.096-0.456-0.983-0.463c-0.887-0.006-1.646,0.171-1.735,0.405c-0.089,0.234-0.185,0.781-0.366,1.311 c-0.182,0.529-2.329,5.314-2.892,6.555c-0.287,0.632-0.536,1.14-0.712,1.486c-0.001-0.001-0.001-0.002-0.001-0.002 s-0.011,0.023-0.029,0.062c-0.151,0.295-0.24,0.458-0.24,0.458s0.001,0.002,0.003,0.006c-0.12,0.217-0.248,0.418-0.311,0.418 c-0.044,0-0.133-0.577,0.019-1.369c0.32-1.66,1.087-4.248,1.08-4.338c-0.004-0.046,0.143-0.497-0.501-0.733 c-0.626-0.229-0.849,0.153-0.906,0.154c-0.055,0.001-0.096,0.135-0.096,0.135s0.697-2.911-1.33-2.911 c-1.268,0-3.024,1.387-3.889,2.644c-0.546,0.298-1.715,0.936-2.954,1.617c-0.476,0.262-0.962,0.529-1.423,0.783 c-0.031-0.035-0.063-0.069-0.095-0.104c-2.459-2.623-7.003-4.478-6.811-8.005c0.07-1.282,0.516-4.658,8.733-8.752 c6.731-3.354,12.12-2.431,13.051-0.386c1.33,2.923-2.88,8.354-9.87,9.138c-2.663,0.299-4.066-0.734-4.415-1.118 c-0.367-0.405-0.422-0.423-0.559-0.347c-0.223,0.124-0.082,0.481,0,0.694c0.209,0.543,1.065,1.506,2.525,1.986 c1.285,0.422,4.412,0.653,8.193-0.81c4.236-1.638,7.543-6.196,6.571-10.005c-0.988-3.874-7.412-5.148-13.492-2.988 C12.44,9.332,8.523,11.35,5.706,13.984c-3.349,3.132-3.883,5.859-3.663,6.998c0.782,4.048,6.361,6.684,8.595,8.637 c-0.11,0.061-0.214,0.118-0.308,0.17c-1.12,0.554-5.373,2.78-6.437,5.131c-1.207,2.667,0.192,4.581,1.118,4.839 c2.869,0.798,5.813-0.638,7.396-2.998c1.582-2.359,1.389-5.432,0.663-6.834c-0.009-0.017-0.019-0.034-0.028-0.052 c0.289-0.171,0.584-0.345,0.876-0.517c0.57-0.335,1.13-0.647,1.615-0.911c-0.272,0.744-0.471,1.637-0.574,2.926 c-0.122,1.514,0.499,3.471,1.311,4.241c0.358,0.339,0.788,0.347,1.06,0.347c0.945,0,1.376-0.786,1.851-1.716 c0.582-1.14,1.099-2.468,1.099-2.468s-0.648,3.586,1.118,3.586c0.644,0,1.291-0.835,1.58-1.26c0.001,0.005,0.001,0.007,0.001,0.007 s0.017-0.028,0.05-0.083c0.067-0.102,0.105-0.167,0.105-0.167s0.001-0.007,0.003-0.019c0.259-0.449,0.833-1.473,1.693-3.162 c1.112-2.182,2.178-4.916,2.178-4.916s0.099,0.668,0.424,1.774c0.191,0.65,0.597,1.369,0.918,2.059 c-0.258,0.358-0.416,0.563-0.416,0.563s0.001,0.004,0.004,0.011c-0.206,0.274-0.437,0.569-0.679,0.857 c-0.878,1.045-1.923,2.239-2.063,2.583c-0.165,0.406-0.126,0.704,0.193,0.945c0.233,0.175,0.647,0.203,1.08,0.174 c0.789-0.053,1.343-0.249,1.617-0.368c0.427-0.151,0.924-0.388,1.39-0.731c0.861-0.633,1.38-1.538,1.33-2.738 c-0.028-0.661-0.238-1.316-0.505-1.934c0.078-0.112,0.156-0.226,0.235-0.34c1.357-1.984,2.41-4.164,2.41-4.164 s0.099,0.668,0.424,1.774c0.164,0.559,0.489,1.17,0.781,1.768c-1.276,1.037-2.067,2.242-2.342,3.032 c-0.508,1.462-0.11,2.124,0.636,2.275c0.338,0.068,0.816-0.087,1.175-0.239c0.447-0.148,0.984-0.395,1.486-0.764 c0.861-0.633,1.689-1.519,1.639-2.718c-0.023-0.546-0.171-1.088-0.372-1.608c1.082-0.451,2.482-0.701,4.266-0.493 c3.827,0.447,4.577,2.836,4.434,3.836c-0.144,1-0.946,1.55-1.215,1.716c-0.268,0.166-0.35,0.224-0.328,0.347 c0.033,0.179,0.157,0.173,0.386,0.134c0.315-0.053,2.009-0.813,2.082-2.659C46.089,28.509,43.844,25.935,39.867,25.956z M10.37,35.9 c-1.268,1.383-3.038,1.905-3.798,1.465c-0.82-0.475-0.495-2.511,1.06-3.979c0.948-0.894,2.172-1.718,2.984-2.225 c0.185-0.111,0.456-0.274,0.786-0.472c0.055-0.031,0.086-0.048,0.086-0.048l-0.001-0.002c0.064-0.038,0.129-0.077,0.196-0.118 C12.25,32.61,11.701,34.449,10.37,35.9z M19.605,29.623c-0.441,1.076-1.365,3.83-1.928,3.682c-0.483-0.127-0.777-2.22-0.096-4.28 c0.342-1.037,1.074-2.276,1.504-2.757c0.692-0.774,1.454-1.027,1.639-0.713C20.959,25.955,19.882,28.948,19.605,29.623z M27.234,33.263c-0.187,0.098-0.359,0.159-0.438,0.112c-0.059-0.035,0.077-0.164,0.077-0.164s0.954-1.027,1.33-1.494 c0.219-0.272,0.472-0.595,0.748-0.955c0.002,0.036,0.003,0.072,0.003,0.107C28.952,32.099,27.764,32.929,27.234,33.263z M33.111,31.923c-0.14-0.099-0.116-0.42,0.343-1.421c0.18-0.393,0.592-1.054,1.306-1.686c0.083,0.26,0.133,0.509,0.132,0.741 C34.883,31.105,33.779,31.683,33.111,31.923z" /></svg>
                            <h5 className='text-2xl text-favblue-100 font-bold mt-6'>Sass</h5>
                            <p className='mt-5 text-lg text-gray-400'>Elevating Stylesheets with Simplified Syntax, Enhanced Productivity, and Dynamic CSS Development.</p>
                            <div className="range-wrapper flex items-center  w-full h-2 rounded-md mt-8 bg-gray-500">
                                <div className="range-blue w-[40%] bg-favblue-50 h-2 rounded-md"></div>
                                <span className='bg-favblue-50 py-4 px-3 rounded-lg  z-10 h-4 flex items-center text-white'>50%</span>
                            </div>
                        </div>

                    </section>
                </section>
            </section>
        </section>
    );
};
export default Work_skill;