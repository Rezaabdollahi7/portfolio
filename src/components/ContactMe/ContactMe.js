import React from "react";

const ContactMe = () => {
    return (
        <section id="contact" className="w-full my-48  fc-center bg-contact bg-center bg-cover bg-blend-multiply">
            <div className="contact-form-wrap lg:w-[80%] lg:py-16   mx-auto fc-center  bg-contact-2 bg-center bg-cover rounded-6xl ">
                <h5 className="text-6xl text-white font-bold w-full text-center " >Contact <span className="f-conveat">Me</span></h5>
                <p className="text-lg mt-4  text-gray-400 w-full text-center ">Your email address will not be published. Required fields are marked *</p>

                <div className="grid-wrap grid gap-10 lg:grid-cols-2 px-16">
                    <form action="Post" className="flex flex-col col-span-1 relative">
                        <label className="text-white text-lg font-bold  mt-6 mb-1" htmlFor="nameInput">Your Name</label>
                        <input className="bg-transparent border-2 border-gray-400 rounded-xl py-3 text-2xl  pl-3 text-white focus-visible:outline-2 focus-visible:outline-yellow-300 f-conveat  " type="text" name="" id="nameInput" />

                        <label className="text-white text-lg font-bold  mt-6 mb-1" htmlFor="emailInput">Your Email</label>
                        <input className="bg-transparent border-2 border-gray-400 rounded-xl py-3 text-2xl  pl-3 text-white focus-visible:outline-2 focus-visible:outline-yellow-300 f-conveat  " type="email" name="" id="emailInput" />

                        <label className="text-white text-lg font-bold  mt-6 mb-1" htmlFor="messageInput">Write a Message</label>
                        <textarea className="bg-transparent border-2 border-gray-400 rounded-xl py-3 text-2xl  pl-3 text-white focus-visible:outline-2 focus-visible:outline-yellow-300 f-conveat  resize-none  " name="" id="messageInput" cols="30" rows="10"></textarea>

                        <button type="submit" className="bg-white z-10 absolute right-0 bottom-0 text-favblue-50 text-xl font-bold tracking-wide f-conveat py-4 px-6 rounded-tl-xl rounded-br-xl hover:bg-favblue-100 hover:text-white transition-all duration-300 delay-75 ">Send Message</button>

                    </form>

                    <div className="img-wrap relative">
        
                        <img className='rounded-full lg:w-[25rem] h-[25rem] mt-[26%] ' src={process.env.PUBLIC_URL + '/images/my-pic.png'} alt="prof-img" />
                        
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactMe;