"use client";

import axiosInstance from "@/lib/axios";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);


      const res = await axiosInstance.post(
        "/contact",
        formData
      );


      if(res.data.success){

        toast.success(
          "Message sent successfully"
        );

        setFormData({
          name:"",
          email:"",
          subject:"",
          message:"",
        });

      }


    } catch(error:any){

      toast.error(
        error.response?.data?.message ||
        "Failed to send message"
      );

    } finally {

      setLoading(false);

    }

  };




  return (
    <main className="min-h-screen bg-[#261311] px-5 py-20 text-white lg:px-8">



      <section className="mx-auto max-w-4xl text-center">

        <span className="rounded-full border border-[#C3955B]/40 bg-[#C3955B]/10 px-5 py-2 text-sm font-semibold text-[#C3955B]">
          Contact BookAbode
        </span>


        <h1 className="mt-8 text-5xl font-extrabold lg:text-6xl">

          Let's
          <span className="text-[#C3955B]">
            {" "}Connect
          </span>

        </h1>


        <p className="mt-5 text-lg text-white/70">
          Have questions about books, orders, or your account?
          Our team is always ready to help you.
        </p>

      </section>



     <section className="mx-auto mt-16 grid max-w-7xl gap-8 lg:grid-cols-3">


  <div className="space-y-5">

    <ContactCard
      icon={<Mail size={22}/>}
      title="Email"
      text="support@bookabode.com"
    />

    <ContactCard
      icon={<Phone size={22}/>}
      title="Phone"
      text="+880 1234-567890"
    />

    <ContactCard
      icon={<MapPin size={22}/>}
      title="Location"
      text="Dhaka, Bangladesh"
    />

    <ContactCard
      icon={<Clock size={22}/>}
      title="Working Hours"
      text="24/7 Customer Support"
    />

  </div>


  <div className="rounded-3xl border border-[#C3955B]/20 bg-white/5 p-6 shadow-xl backdrop-blur-xl md:p-8 lg:col-span-2">


    <h2 className="text-2xl font-bold text-white md:text-3xl">
      Send Us A Message
    </h2>


    <p className="mt-2 text-sm text-white/60 md:text-base">
      Fill out the form and we will get back to you soon.
    </p>



    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5"
    >


      <div className="grid gap-5 md:grid-cols-2">


        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="
          w-full rounded-xl
          border border-white/10
          bg-white/10
          px-5 py-3
          text-white
          placeholder:text-white/40
          outline-none
          transition
          focus:border-[#C3955B]
          focus:ring-1
          focus:ring-[#C3955B]
          "
        />


        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="
          w-full rounded-xl
          border border-white/10
          bg-white/10
          px-5 py-3
          text-white
          placeholder:text-white/40
          outline-none
          transition
          focus:border-[#C3955B]
          focus:ring-1
          focus:ring-[#C3955B]
          "
        />


      </div>



      <input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="
        w-full rounded-xl
        border border-white/10
        bg-white/10
        px-5 py-3
        text-white
        placeholder:text-white/40
        outline-none
        transition
        focus:border-[#C3955B]
        focus:ring-1
        focus:ring-[#C3955B]
        "
      />



      <textarea
        name="message"
        rows={5}
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        className="
        w-full resize-none
        rounded-xl
        border border-white/10
        bg-white/10
        px-5 py-3
        text-white
        placeholder:text-white/40
        outline-none
        transition
        focus:border-[#C3955B]
        focus:ring-1
        focus:ring-[#C3955B]
        "
      />



      <button
        disabled={loading}
        className="
        flex w-full
        items-center justify-center gap-2
        rounded-xl
        bg-[#C3955B]
        py-4
        font-bold
        text-[#261311]
        transition
        hover:-translate-y-1
        hover:bg-[#D1A66B]
        hover:shadow-lg
        disabled:cursor-not-allowed
        disabled:opacity-60
        "
      >

        <Send size={18}/>

        {loading
          ? "Sending..."
          : "Send Message"
        }

      </button>


    </form>


  </div>


</section>



    </main>
  );
}





function ContactCard({
  icon,
  title,
  text,
}:{
  icon:React.ReactNode;
  title:string;
  text:string;
}){

return (

<div className="
flex items-center gap-4
rounded-2xl
border border-[#C3955B]/20
bg-white/5
p-5
backdrop-blur-xl
transition
hover:-translate-y-1
hover:border-[#C3955B]/50
">

<div className="
flex h-12 w-12
items-center justify-center
rounded-xl
bg-[#C3955B]/20
text-[#C3955B]
">
{icon}
</div>


<div>
<h3 className="font-bold text-white">
{title}
</h3>

<p className="mt-1 text-sm text-white/60">
{text}
</p>

</div>

</div>

);

}