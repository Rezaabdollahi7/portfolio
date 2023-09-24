import React from "react";

const UsersFeedback = () => {
    return (
        <section className="w-full bg-cover bg-blend-multiply bg-UsersFeedback  bg-center bg-blue-900  py-16 xl:px-12 ">
            <div className="fid-tittle w-[90%] mx-auto xl:w-full flex fc-center  ">
                <h4 className="text-4xl my-6 500px:text-5xl  xl:text-5xl font-bold text-white">Users <span className="f-conveat bg-slate-900 rounded-xl px-3  -mr-3">Feed</span> <span className="f-conveat">Back</span> </h4>
                <p className="xl:text-xl text-gray-400 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
            </div>

            <div className="feedWrap w-full flex justify-between items-center my-16 ">
                <button className="prevtbtn bg-favblue-50 font-bold text-white px-2 py-3  xl:px-4 xl:py-6 text-2xl rounded-lg ml-2  xl:rounded-2xl">{"<"}</button>

                <div className="message-wrap grid grid-col-1  lg:grid-cols-4 mx-2 xl:w-[50%] relative   bg-pattern-2 bg-cover bg-center  bg-blend-multiply bg-white py-16 items-center px-6  xl:px-8  rounded-4xl">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 190 150" class="h-[3.5rem] sm:h-[5.625rem] w-[3.5rem] sm:w-[6.875rem] text-accent2 opacity-5 left-[28%] top-[13%] absolute"><g><path d="M0.78,54.09c0.57-3.73,0.94-7.5,1.76-11.18C5.06,31.54,9.42,20.98,18.18,12.6C25.41,5.69,34.14,1.89,44.33,1.14 c20.57-1.53,38.91,11.53,44.25,29.73c7.29,24.86-10.18,49.49-36.03,52.42c-7.73,0.88-15.1-0.25-22.23-3.17 c-0.23-0.09-0.45-0.19-0.68-0.26c-0.11-0.03-0.24-0.01-0.35-0.01c-0.35,0.31-0.18,0.68-0.09,0.99 c3.25,11.56,7.85,22.49,15.84,31.84c3.49,4.08,7.42,7.7,12.52,9.91c1.74,0.75,3.55,1.2,5.49,1.26c2.3,0.06,3.64,1.05,4.29,3.2 c1.6,5.33,3.19,10.66,4.65,16.02c0.88,3.22-0.63,5.22-4.17,5.65c-6.58,0.81-12.93-0.18-19-2.67c-11.94-4.9-20.81-13.31-28.14-23.37 C10.31,108.46,4.21,92.6,1.54,75.46c-0.3-1.92-0.51-3.85-0.76-5.78C0.78,64.48,0.78,59.29,0.78,54.09z"></path><path d="M188.78,47.35c-0.97,4.76-2.13,9.46-4.55,13.77c-7.13,12.71-18.06,20.2-32.95,22.14c-7.64,1-14.98-0.18-22.05-3.06 c-0.28-0.11-0.57-0.22-0.86-0.31c-0.11-0.03-0.24-0.01-0.36-0.01c-0.35,0.31-0.15,0.67-0.07,0.98c3.47,12.65,8.7,24.46,18.01,34.23 c3.67,3.85,7.83,7.15,13.3,8.43c0.47,0.11,0.96,0.21,1.44,0.24c3.97,0.31,4.68,0.84,5.74,4.48c1.38,4.71,2.76,9.43,4.08,14.15 c1.14,4.06-0.41,6.01-4.75,6.4c-9.98,0.9-18.83-2.04-26.97-7.31c-10.23-6.61-17.84-15.54-24-25.69 c-7.53-12.42-12.48-25.77-14.47-40.03c-2.15-15.35-1.27-30.51,4.64-45.11c4.36-10.75,11.05-19.75,21.95-25.17 c18.27-9.08,40.73-4.09,53.19,11.69c4.62,5.85,7.49,12.41,8.44,19.72c0.04,0.29,0.15,0.57,0.23,0.85 C188.78,40.97,188.78,44.16,188.78,47.35z"></path></g></svg>
                   {/* image */}
                    <div className="img-container col-span-1 lg:flex lg:justify-center   xl:w-40 -ml-12 500px:-ml-0   xl:-ml-16  outline outline-favblue-50 p-2 rounded-3xl  ">
                        <img className="rounded-2xl   " src={process.env.PUBLIC_URL + '/images/comment1.jpg'} alt="" />
                    </div>
                    {/* text */}
                    <div className="message-text-wrap col-span-3 flex flex-col justify-start items-center lg:ml-6 ">
                        <p className="text-gray-500 mt-4 xl:mt-0 md:text-xl  xl:text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                        <div className="author flex flex-col xl:flex-row  justify-between items-center self-start mt-6">
                            <h6 className="text-lg  xl:text-2xl font-bold text-favblue-100">Paul master Manth</h6>
                            <span className="text-favblue-50 self-start  text-xl font-semibold xl:ml-4">Lawyer</span>
                        </div>

                        <img className="w-32  mt-6 self-center " src={process.env.PUBLIC_URL + '/images/star.png'} alt="" />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 190 150" class="h-[3.5rem] sm:h-[5.625rem] w-[3.5rem] sm:w-[6.875rem] text-accent2 opacity-5 right-[5%] top-[70%]  xl:right-[8%] rotate-180  xl:top-[50%] absolute"><g><path d="M0.78,54.09c0.57-3.73,0.94-7.5,1.76-11.18C5.06,31.54,9.42,20.98,18.18,12.6C25.41,5.69,34.14,1.89,44.33,1.14 c20.57-1.53,38.91,11.53,44.25,29.73c7.29,24.86-10.18,49.49-36.03,52.42c-7.73,0.88-15.1-0.25-22.23-3.17 c-0.23-0.09-0.45-0.19-0.68-0.26c-0.11-0.03-0.24-0.01-0.35-0.01c-0.35,0.31-0.18,0.68-0.09,0.99 c3.25,11.56,7.85,22.49,15.84,31.84c3.49,4.08,7.42,7.7,12.52,9.91c1.74,0.75,3.55,1.2,5.49,1.26c2.3,0.06,3.64,1.05,4.29,3.2 c1.6,5.33,3.19,10.66,4.65,16.02c0.88,3.22-0.63,5.22-4.17,5.65c-6.58,0.81-12.93-0.18-19-2.67c-11.94-4.9-20.81-13.31-28.14-23.37 C10.31,108.46,4.21,92.6,1.54,75.46c-0.3-1.92-0.51-3.85-0.76-5.78C0.78,64.48,0.78,59.29,0.78,54.09z"></path><path d="M188.78,47.35c-0.97,4.76-2.13,9.46-4.55,13.77c-7.13,12.71-18.06,20.2-32.95,22.14c-7.64,1-14.98-0.18-22.05-3.06 c-0.28-0.11-0.57-0.22-0.86-0.31c-0.11-0.03-0.24-0.01-0.36-0.01c-0.35,0.31-0.15,0.67-0.07,0.98c3.47,12.65,8.7,24.46,18.01,34.23 c3.67,3.85,7.83,7.15,13.3,8.43c0.47,0.11,0.96,0.21,1.44,0.24c3.97,0.31,4.68,0.84,5.74,4.48c1.38,4.71,2.76,9.43,4.08,14.15 c1.14,4.06-0.41,6.01-4.75,6.4c-9.98,0.9-18.83-2.04-26.97-7.31c-10.23-6.61-17.84-15.54-24-25.69 c-7.53-12.42-12.48-25.77-14.47-40.03c-2.15-15.35-1.27-30.51,4.64-45.11c4.36-10.75,11.05-19.75,21.95-25.17 c18.27-9.08,40.73-4.09,53.19,11.69c4.62,5.85,7.49,12.41,8.44,19.72c0.04,0.29,0.15,0.57,0.23,0.85 C188.78,40.97,188.78,44.16,188.78,47.35z"></path></g></svg>
                </div>

                <button className="nextbtn bg-favblue-50 font-bold text-white px-2 py-3  xl:px-4 xl:py-6 text-2xl rounded-lg mr-2  xl:rounded-2xl">{">"}</button>
            </div>
        </section>
    );
};
export default UsersFeedback;