import React from "react";

const FeaturedPosts = () => {
    return (
        <section id="featuredPosts" className="w-full mx-auto bg-pattern-3-blur bg-center bg-cover bg-blend-multiply  mb-16 ">
            <div className="featured-wrapper w-[95%] mx-auto  ">
                <div className="tittle-wrap flex justify-center mt-32 items-center flex-col w-full">
                    <h3 className="text-4xl  lg:text-6xl text-favblue-100 font-bold " >Feat<span className="bg-purple-500/10 rounded-xl py-1 mx-1">ured</span> <span className="text-favblue-50 f-conveat">Posts</span> </h3>
                    <p className="px-4 lg:px-0 lg:text-xl text-center  mt-8 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br />  tempor incididunt ut labore et dolore.</p>
                </div>

                <div className="fea-item-wrap grid lg:grid-cols-2 gap-5 mt-16 w-[80%] mx-auto">
                    {/* item 1 */}
                    <div className="item flex fc-center  group ">
                        <div className="img-container overflow-hidden rounded-3xl ">
                            <img className="rounded-3xl group-hover:scale-110 transition-all delay-75 duration-500" src={process.env.PUBLIC_URL + '/images/postimg1.jpg'} alt="" />
                        </div>
                        {/* post details (date and texts) */}
                        <div className="post-details-wrap flex lg:w-[70%] items-center relative -mt-7 lg:-mt-16 ">
                            {/* data section */}
                            <div className="date-wrap fc-center  bg-favblue-50 h-max p-1  rounded-xl  absolute z-30 -ml-9  lg:-ml-12 ">
                                <p className="bg-white text-favblue-100 capitalize font-bold   lg:text-base px-1  lg:px-2 py-1 rounded-t-xl rounded-b-smw-20  lg:w-[5.5rem] text-center ">JANUARY</p>
                                <p className="text-white text-xl mt-1  font-bold text-center">21</p>
                            </div>
                            {/* text section */}
                            <div className="text-wrap fc-center   pl-14  lg:px-16 py-6  lg:py-8 z-10 rounded-4xl bg-pattern-2 bg-blend-multiply bg-center bg-cover overflow-hidden bg-purple-400/20 ">
                                <p className="  lg:text-lg font-semibold text-favblue-50 mb-2 ">By Berline Tokyo</p>
                                <a href="# " className="lg:text-xl text-favblue-100 font-bold hover:text-favblue-25 transition-all duration-300 ">Spring Which I Enjoy With For Effective Agile Team</a>
                                <div className="range-wrapper w-full h-[1px] bg-white mt-5">
                                    <div className="range w-[70%] bg-favblue-50 h-[3px]"></div>
                                </div>
                                <div className="realted-links-wrapper flex   mt-5">
                                    <a className="text-favblue-50 hover:text-favblue-100 transition-all duration-300 font-bold text-xs lg:text-base " href="#">Design , </a>
                                    <a className="text-favblue-50 hover:text-favblue-100 transition-all duration-300 font-bold text-xs lg:text-base " href="#">Technology , </a>
                                    <a className="text-favblue-50 hover:text-favblue-100 transition-all duration-300 font-bold text-xs lg:text-base " href="#">Events </a>

                                </div>
                            </div>

                        </div>
                    </div>

                    {/* item 2 */}
                    <div className="item flex fc-center group  ">
                        <div className="img-container overflow-hidden rounded-3xl ">
                            <img className="rounded-3xl group-hover:scale-110  transition-all delay-75 duration-500" src={process.env.PUBLIC_URL + '/images/postimg2.jpg'} alt="" />
                        </div>
                        {/* post details (date and texts) */}
                        <div className="post-details-wrap flex lg:w-[70%] items-center relative -mt-7 lg:-mt-16 ">
                            {/* data section */}
                            <div className="date-wrap fc-center  bg-favblue-50 h-max p-1  rounded-xl  absolute z-30 -ml-9  lg:-ml-12 ">
                                <p className="bg-white text-favblue-100 capitalize font-bold   lg:text-lg px-1  lg:px-2 py-1 rounded-t-xl rounded-b-sm w-20  lg:w-[5.5rem] text-center ">JUNE </p>
                                <p className="text-white text-xl mt-1  font-bold text-center">3</p>
                            </div>
                            {/* text section */}
                            <div className="text-wrap fc-center pl-14  lg:px-16 py-6  lg:py-8 z-10 rounded-4xl bg-pattern-2 bg-blend-multiply bg-center bg-cover overflow-hidden bg-purple-400/20 ">
                                <p className="  lg:text-lg font-semibold text-favblue-50 mb-2 ">By John Doe</p>
                                <a href="# " className="lg:text-xl text-favblue-100 font-bold hover:text-favblue-25 transition-all duration-300 ">But some of the current projects that make</a>
                                <div className="range-wrapper w-full h-[1px] bg-white mt-5">
                                    <div className="range w-[30%] bg-favblue-50 h-[3px]"></div>
                                </div>
                                <div className="realted-links-wrapper flex   mt-5">
                                    <a className="text-favblue-50 hover:text-favblue-100 transition-all duration-300 font-bold text-xs lg:text-base " href="#">Design , </a>
                                    <a className="text-favblue-50 hover:text-favblue-100 transition-all duration-300 font-bold text-xs lg:text-base " href="#">Technology , </a>
                                    <a className="text-favblue-50 hover:text-favblue-100 transition-all duration-300 font-bold text-xs lg:text-base " href="#">Events </a>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* end fea items wrapper */}

                <div className="works-desc text-center mt-16 ">
                    <p className="lg:text-xl text-gray-500">Want to see my professional work. <a href="#" className="text-lg lg:text-2xl text-favblue-50 hover:text-favblue-100 font-semibold underline underline-offset-8 decoration-favblue-50 hover:decoration-favblue-100 transition-all"> Click here to View More</a></p>
                </div>
            </div>

        </section>
    );
};
export default FeaturedPosts;
