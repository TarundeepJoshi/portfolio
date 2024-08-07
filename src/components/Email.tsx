"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { TextArea } from "./ui/textArea";
import { cn } from "@/utils/cn";

export const Email = () => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const serviceId = "service_ghi5isl";
  const templateId = "template_iodmomn";
  const publicKey = "yNLBs24r_qLVbflur";

  const validateForm = () => {
    let isValid = true;
    let errors = { name: "", email: "", message: "" };

    if (!nameRef.current?.value) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!emailRef.current?.value) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!messageRef.current?.value) {
      errors.message = "Message is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const templateParams = {
      from_name: nameRef.current?.value,
      from_email: emailRef.current?.value,
      to_name: "Tarundeep Joshi",
      message: messageRef.current?.value,
    };
    console.log(templateParams);

    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      (response) => {
        console.log("SUCCESS!", response);
        alert("Form Submitted SuccessFully!");

        nameRef.current && (nameRef.current.value = ""); // Set value to empty string or whatever value you need
        emailRef.current && (emailRef.current.value = "");
        messageRef.current && (messageRef.current.value = "");
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
  };

  return (
    <form className="my-8" onSubmit={sendEmail}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="firstname">Name</Label>
          <Input id="firstname" placeholder="Tyler" type="text" ref={nameRef} />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </LabelInputContainer>
      </div>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="projectmayhem@fc.com"
          type="email"
          ref={emailRef}
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="message">Message</Label>
        <TextArea id="message" placeholder="Enter text..." ref={messageRef} />
        {errors.message && (
          <span className="text-red-500">{errors.message}</span>
        )}
      </LabelInputContainer>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        Submit
        <BottomGradient />
      </button>
    </form>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
