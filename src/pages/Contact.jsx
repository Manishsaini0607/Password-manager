import contactImg from '../assets/contact-img.png';

export default function Contact() {
  return (
    <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 px-6 lg:px-12 pt-24 pb-16">
      {/* heading */}
      <div className="col-span-full text-center space-y-2">
        <h2 className="text-4xl font-extrabold text-emerald-600">Contact Us</h2>
        <p className="text-slate-600 max-w-xl mx-auto">
          Have questions or want to collaborate? Drop us a message — we’ll get back to you soon.
        </p>
      </div>

      {/* illustration */}
      <div className="flex justify-center lg:justify-end items-center">
        <img
          src={contactImg}
          alt="Contact illustration"
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full drop-shadow-md"
        />
      </div>

      {/* form */}
      <form
        action="#"
        className="bg-white/60 backdrop-blur-sm shadow-lg rounded-2xl p-8 space-y-8 border border-slate-200"
      >
        {/* Name */}
        <FloatingInput id="name" label="Your Name" type="text" />

        {/* Email */}
        <FloatingInput id="email" label="Email Address" type="email" />

        {/* Message */}
        <FloatingTextarea id="message" label="Your Message" />

        {/* button */}
        <button
          type="submit"
          className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 
                     px-10 py-3 text-white font-semibold shadow-lg
                     transition-transform hover:scale-105 hover:shadow-xl
                     focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}

/* -------- small reusable inputs -------- */

function FloatingInput({ id, label, type }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder=" "
        required
        className="peer w-full rounded-lg border border-slate-300 bg-white/70 px-3 pt-5 pb-2 text-sm
                   shadow-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-2.5 text-slate-500 text-sm
                   transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-slate-400
                   peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-emerald-600 peer-focus:text-xs"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ id, label }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        rows="4"
        placeholder=" "
        required
        className="peer w-full resize-none rounded-lg border border-slate-300 bg-white/70 px-3 pt-5 pb-2 text-sm
                   shadow-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-2.5 text-slate-500 text-sm
                   transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-slate-400
                   peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-emerald-600 peer-focus:text-xs"
      >
        {label}
      </label>
    </div>
  );
}
