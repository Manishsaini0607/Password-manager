import contact from '../assets/contact-img.png'

export default function Contact() {
  return ( <section className="max-w-screen-2xl mx-auto min-h-[calc(100vh-56px)] pb-4  md:px-12 pt-20">
    <h2 className="text-2xl md:text-4xl font-bold  text-green-700 w-max mx-auto ">Contact Us</h2>

<div className="flex flex-col sm:flex-row items-center ">
   <div className="w-[90%]"><img src={contact} alt="contact image"  /></div>
   
<form  action="#" className=" w-[90%]   sm:px-0 mt-4">
<div className="relative z-0 w-full mb-5 group">
  <input type="text" name="floating_Name" id="floating_Name" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-[#62296B] focus:outline-none focus:ring-0 focus:border-[#62296B] peer" placeholder=" " required />
  <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#A42D5A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
</div>

<div className="relative z-0 w-full mb-5 group">
    <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-[#62296B] focus:outline-none focus:ring-0 focus:border-[#62296B] peer" placeholder=" " required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm  dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#A42D5A]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
</div>

<div className="relative z-0 w-full mb-5 group">
  <textarea name="floating_message" id="floating_message" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-[#62296B] focus:outline-none focus:ring-0 focus:border-[#62296B] peer h-32 resize-none" placeholder=" " required></textarea>
  <label htmlFor="floating_message" className="peer-focus:font-medium absolute text-sm  dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#A42D5A]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label>
</div>


<button type="submit" className="text-white bg-gradient-to-r  from-green-400 to-green-600 hover:from-green-600 hover:to-green-400 hover:scale-105 ease-in-out duration-300 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Send Message</button>
</form> 

</div>
  
  </section> 
  )
}
