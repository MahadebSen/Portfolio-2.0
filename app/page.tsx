"use client";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

//componebts
import { Socials } from "@/components/Socials";
import { Photo } from "@/components/Photo";
import { Stats } from "@/components/Stats";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  // handle resume download
  const downloadFile = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/download");
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "mahadeb-sen-resume.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Software Developer</span>

            <h1 className="h1 mb-6">
              Hello I&apos;m <br />{" "}
              <span className="text-accent">Mahadeb Sen</span>
            </h1>

            <p className="max-w-[500px] mb-9 text-white/80">
              I excel at crafting elegent digital experiences and I am
              proficient in verious programming languages and technologies.
            </p>

            {/* btn and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              {/* resume btn */}
              <Button
                onClick={() => downloadFile()}
                variant="outline"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="uppercase flex items-center gap-2">
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
                    <span>Downloading...</span>
                  </div>
                ) : (
                  <div className="uppercase flex items-center gap-2">
                    <span>Download Resume</span>
                    <FiDownload />
                  </div>
                )}
              </Button>

              {/* socials */}
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0 ">
            <Photo />
          </div>
        </div>
      </div>

      {/* stats */}
      <Stats />
    </section>
  );
}
