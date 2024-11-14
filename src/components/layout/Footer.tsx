import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="relative w-full h-[245px] bg-[#F2F9F2] ">
        <div className="flex flex-col w-[1200px] mx-auto py-[40px]">
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-[16px] font-bold">React Team 11</h2>
            <div className="flex flex-col">
              <h3 className="font-semibold">ecomoa</h3>
              <ul className="flex flex-row mt-2 gap-4">
                <li className="w-[66px]">장종호</li>
                <li className="w-[66px]">노용철</li>
                <li className="w-[66px]">유재희</li>
                <li className="w-[66px]">장수인</li>
              </ul>
              <ul className="flex flex-row mt-2 gap-4">
                <li className="w-[66px]">이지솔</li>
                <li className="w-[66px]">나영은</li>
              </ul>
            </div>
          </div>
          <div className="absolute bottom-[40px] flex justify-between items-center border-t border-gray-300 py-4">
            <div>문의: contact@ecomoa.com</div>
            <div>{`\u00A9 ${new Date().getFullYear()} ecomoa. All rights reserved.`}</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
