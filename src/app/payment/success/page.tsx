"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import {
  confirmPayment,
  downloadBook,
} from "@/services/payment.service";


export default function PaymentSuccessPage() {

  const searchParams = useSearchParams();

  const bookId =
    searchParams.get("book");


  const [loading,setLoading] =
    useState(true);



  useEffect(()=>{

    if(!bookId) return;


    const savePayment = async()=>{

      try{

        await confirmPayment(bookId);

      }
      catch{

        toast.error(
          "Payment confirmation failed"
        );

      }
      finally{

        setLoading(false);

      }

    };


    savePayment();


  },[bookId]);



  const handleDownload = async()=>{

    try{

      const res =
        await downloadBook(bookId!);


      if(res.success){

        window.open(
          res.pdfUrl,
          "_blank"
        );

      }


    }
    catch{

      toast.error(
        "Download failed"
      );

    }

  };



  if(loading){

    return (
      <div className="py-20 text-center">
        Confirming payment...
      </div>
    );

  }



  return (

    <div className="mx-auto max-w-xl py-20 text-center">


      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful
      </h1>


      <p className="mt-4 text-gray-600">
        Thank you for purchasing this book.
      </p>



      <button
        onClick={handleDownload}
        className="
        mt-8 rounded-lg
        bg-blue-600 px-6 py-3
        text-white
        "
      >
        Download PDF
      </button>


    </div>

  );

}