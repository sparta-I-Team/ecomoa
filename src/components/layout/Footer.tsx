import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className=" w-full h-[120px] bg-[#D7E8D7] pt-[30px] pb-[30px] px-[57px]">
        <div
          className="flex flex-col md:flex-row min-w-[360px] md:max-w-[1200px] md:mx-auto md:justify-between md:items-center md:px-[30px]
        "
        >
          <div className="flex flex-col items-start space-y-4">
            <div className="flex flex-col">
              <Image
                src={"/images/logoHeader.svg"}
                alt="logo"
                width={108}
                height={18}
              />
            </div>
          </div>
          <div className="flex items-center py-4 gap-[10px]">
            <div className="text-[12px]">
              Copyright ecomoa. All Rights Reserved.
            </div>
            <Link
              href={"https://github.com/sparta-I-Team/ecomoa"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/images/githubLogo.svg"}
                alt="logo"
                width={20}
                height={20}
              />
            </Link>
            {/* <div>{`\u00A9 ${new Date().getFullYear()} ecomoa. All rights reserved.`}</div> */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
