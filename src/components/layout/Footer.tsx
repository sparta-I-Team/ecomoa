import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="w-full min-w-[360px] h-[120px] bg-[#D7E8D7] pt-[30px] pb-[30px] px-[20px]">
        <div className="flex flex-col items-start md:flex-row md:max-w-[1200px] md:justify-between md:items-center md:mx-auto">
          <div className="">
            <Image
              src={"/images/logoHeader.svg"}
              alt="logo"
              width={108}
              height={18}
            />
          </div>
          <div className="w-full md:max-w-[360px] flex md:justify-end items-center py-4 gap-[10px]">
            <div className="text-[12px] md:text-[14px] text-center md:text-left">
              Copyright ecomoa. All Rights Reserved.
            </div>
            <Link
              href={"https://github.com/sparta-I-Team/ecomoa"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/images/githubLogo.svg"}
                alt="GitHub logo"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
