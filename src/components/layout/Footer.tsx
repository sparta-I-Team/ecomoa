import React from "react";

const Footer = () => {
  return (
    <>
      <div className="relative w-full h-[245px]  bg-red-200 ">
        <div className="flex flex-col w-[1200px] mx-auto py-[40px]">
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-[16px] font-bold">React Team 11</h2>
            <div className="flex flex-col">
              <h3 className="font-semibold">ecomoa</h3>
              <ul className="flex flex-row mt-2 gap-4">
                <li className="w-[66px]">개발자1</li>
                <li className="w-[66px]">개발자1</li>
                <li className="w-[66px]">개발자1</li>
                <li className="w-[66px]">개발자1</li>
              </ul>
              <ul className="flex flex-row mt-2 gap-4">
                <li className="w-[66px]">디자이너1</li>
                <li className="w-[66px]">디자이너2</li>
              </ul>
            </div>
          </div>
          <div className="absolute bottom-[40px] flex justify-between items-center border-t border-gray-300 py-4">
            <div>문의: contact@ecomoa.com</div>
            <div>{`\u00A9 ${new Date().getFullYear()} ecomoa. All rights reserved.`}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
