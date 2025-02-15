"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

interface HandleChangeEvent {
  target: {
    name: string;
    value: string;
  };
}

const services = [
  {
    value: "full-stack",
    label: "Full-stack development",
  },
  {
    value: "frontend",
    label: "Frontend development",
  },
  {
    value: "backend",
    label: "Backend development",
  },
  {
    value: "python",
    label: "Python development",
  },
];

const ContactForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramValue = searchParams.get("service") ?? "";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: paramValue,
    message: "",
  });

  // Toast notification
  const handleToast = (message: string, isError: boolean) => {
    isError
      ? toast.error(message, {
          className: "success-background",
          autoClose: 3000,
          position: "bottom-right",
          theme: "dark",
          progressClassName: "toast-progress-bar",
        })
      : toast.success(message, {
          className: "success-background",
          autoClose: 3000,
          position: "bottom-right",
          theme: "dark",
          progressClassName: "toast-progress-bar",
        });
  };

  // Remove the 'service' parameter from the URL
  const removeServiceParam = () => {
    if (paramValue) {
      const params = new URLSearchParams(searchParams.toString()); // Clone the search params
      params.delete("service"); // Remove the 'service' parameter

      router.replace(`/contact?${params.toString()}`); // Update the URL ( replaced url /contact?"")
    }
  };

  // Handle form input changes
  const handleChange = (e: HandleChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}
  const handleSubmit = async (e: HandleSubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLoading(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        handleToast("Message sent successfully!", false);
      } else {
        setLoading(false);
        handleToast("Failed to send message. Please try again.", true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      handleToast("An error occurred. Please try again.", true);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
          handleSubmit(e);
        }}
      >
        <h3 className="text-4xl text-accent">Let&apos;s work togather</h3>

        <p className="text-white/60 ">
          Ready to bring your web projects to life with optimized performance.
          Let&apos;s collaborate to create innovative solutions using modern
          technologies.
        </p>

        {/* inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            required={true}
            value={formData.firstName}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "firstName",
                  value: e.target.value,
                },
              })
            }
            onClick={removeServiceParam}
            type="firstname"
            name="firstName"
            placeholder="First name"
          />
          <Input
            required={true}
            value={formData.lastName}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "lastName",
                  value: e.target.value,
                },
              })
            }
            onClick={removeServiceParam}
            type="lastname"
            name="lastName"
            placeholder="Last name"
          />
          <Input
            required={true}
            value={formData.email}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "email",
                  value: e.target.value,
                },
              })
            }
            onClick={removeServiceParam}
            type="email"
            name="email"
            placeholder="Email"
          />
          <Input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "phone",
                  value: e.target.value,
                },
              })
            }
            onClick={removeServiceParam}
            placeholder="Phone number"
          />
        </div>

        {/* select */}
        <Select
          value={formData.service}
          defaultValue={
            services.some((service) => service.value === paramValue)
              ? paramValue
              : ""
          }
          onValueChange={(value) => {
            removeServiceParam();
            handleChange({
              target: {
                name: "service",
                value: value,
              },
            });
          }}
        >
          <SelectTrigger
            className={`w-full ${
              services.some((service) => service.value === paramValue)
                ? "border-accent"
                : ""
            }`}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a service</SelectLabel>
              {services.map((item, index) => {
                return (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* textarea */}
        <Textarea
          className="h-[200px]"
          value={formData.message}
          onChange={(e) =>
            handleChange({
              target: {
                name: "message",
                value: e.target.value,
              },
            })
          }
          onClick={removeServiceParam}
          placeholder="Type your message here."
          name="message"
        />

        {/* btn */}
        <Button size="md" className="max-w-40" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                aria-hidden="true"
                className="w-6 h-6 animate-spin text-accent-hover fill-black"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <p>Sending...</p>
            </div>
          ) : (
            "Send message"
          )}
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
