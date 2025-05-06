import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Index from "./Index";

const Success = () => {
    useEffect(() => {
      // Show the toast when the component is rendered
      toast.success("Your payment was successful!");
    }, []);
  
    return (
      <>
        <ToastContainer />
        
        <Index />
      </>
    );
  };

export default Success;