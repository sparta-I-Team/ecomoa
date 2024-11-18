"use client";
import ReturnMypage from "@/app/mypage/components/ReturnMypage";
import { userStore } from "@/zustand/userStore";
import { Check } from "lucide-react";
import { ChangeEvent, useState } from "react";
import DeleteAccountButton from "../login/components/DeleteAccountButton";

// 선택 사유에 대한 텍스트 매핑
const reasonConfig = {
  "not-use": "사용을 잘 안하게 돼요",
  lessBenefit: "사용 혜택이 적어요",
  difficult: "사용이 어려워요",
  privacy: "개인정보 보호를 위해 삭제할 정보가 있어요",
  another: "다른 계정이 있어요",
  expectation: "기타"
};
type AccountDeletionReason =
  | "not-use"
  | "lessBenefit"
  | "difficult"
  | "privacy"
  | "another"
  | "expectation"
  | "";

const DeletePage = () => {
  const { user } = userStore();
  const [selectedReason, setSelectedReason] = useState<
    AccountDeletionReason | ""
  >("not-use");

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 선택된 이유가 이미 선택되어 있으면 선택 해제
    // console.log(value);
    if (selectedReason === value) {
      setSelectedReason(""); // 선택 해제
    } else {
      setSelectedReason(value as AccountDeletionReason); // 새로 선택
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FFF4] p-[0px_20px] md:pb-[180px]">
      <div className="w-[1200px] mx-auto">
        <ReturnMypage />
        <h1 className="text-[24px] md:text-[32px] font-[700] md:font-[500] leading-[33.6px] md:leading-[44.8px] tracking-[-0.24px] md:tracking-[-0.32px] mt-[36px] md:mt-[48px]">
          회원 탈퇴
        </h1>
        <p className="text-[#00691E] mt-[16px] md:mt-[24px] text-[16px] md:text-[20px] font-[500] leading-[24px] md:leading-[30px] tracking-[-0.16px] md:tracking-[-0.2px]">
          정말 탈퇴하시겠어요?
        </p>
        <section className="flex justify-start items-center w-[320px] md:w-[1200px] h-[571px] bg-white md:mx-auto mt-[32px] md:mt-[48px] rounded-[12px] border border-[#E8F3E8] shadow-[0px_0px_40px_0px_rgba(0,_0,_0,_0.02)]">
          <div className="flex flex-col gap-[24px] md:ml-[56px] ml-[24px]">
            <p className="test-[24px] font-[600] leading-[33.6px] tracking-[-0.24ppx]">
              떠나시는 이유가 있을까요?
            </p>
            {/* 첫 번째 라디오 버튼 */}
            <label className="flex justify-start items-center gap-[12px]">
              <input
                type="radio"
                name="reason"
                value="not-use" // 고유한 value
                checked={selectedReason === "not-use"}
                onChange={handleToggle}
                className="appearance-none w-0 h-0 absolute"
              />
              <div
                className={`w-[54px] h-[32px] border-2 border-gray-300 rounded-[32px] flex items-center justify-center cursor-pointer ${
                  selectedReason === "not-use"
                    ? "bg-[#00320F] text-white"
                    : "bg-transparent text-black"
                }`}
              >
                <Check
                  size={18}
                  className={`${
                    selectedReason === "not-use" ? "text-white" : "text-black"
                  }`}
                />
              </div>
              <span>사용을 잘 안하게 돼요</span>
            </label>

            {/* 두 번째 라디오 버튼 */}
            <label className="flex justify-start items-center gap-[12px]">
              <input
                type="radio"
                name="reason"
                value="lessBenefit" // 고유한 value
                checked={selectedReason === "lessBenefit"}
                onChange={handleToggle}
                className="appearance-none w-0 h-0 absolute"
              />
              <div
                className={`w-[54px] h-[32px] border-2 border-gray-300 rounded-[32px] flex items-center justify-center cursor-pointer ${
                  selectedReason === "lessBenefit"
                    ? "bg-[#00320F] text-white"
                    : "bg-transparent text-black"
                }`}
              >
                <Check
                  size={18}
                  className={`${
                    selectedReason === "lessBenefit"
                      ? "text-white"
                      : "text-black"
                  }`}
                />
              </div>
              <span>사용 혜택이 적어요</span>
            </label>

            {/* 세 번째 라디오 버튼 */}
            <label className="flex justify-start items-center gap-[12px]">
              <input
                type="radio"
                name="reason"
                value="difficult" // 고유한 value
                checked={selectedReason === "difficult"}
                onChange={handleToggle}
                className="appearance-none w-0 h-0 absolute"
              />
              <div
                className={`w-[54px] h-[32px] border-2 border-gray-300 rounded-[32px] flex items-center justify-center cursor-pointer ${
                  selectedReason === "difficult"
                    ? "bg-[#00320F] text-white"
                    : "bg-transparent text-black"
                }`}
              >
                <Check
                  size={18}
                  className={`${
                    selectedReason === "difficult" ? "text-white" : "text-black"
                  }`}
                />
              </div>
              <span>사용이 어려워요</span>
            </label>

            {/* 수정 네 번째 라디오 버튼 */}
            <label className="flex justify-start items-center gap-[12px]">
              <input
                type="radio"
                name="reason"
                value="privacy" // 고유한 value
                checked={selectedReason === "privacy"}
                onChange={handleToggle}
                className="appearance-none w-0 h-0 absolute"
              />
              <div
                className={`w-[54px] h-[32px] border-2 border-gray-300 rounded-[32px] flex items-center justify-center cursor-pointer ${
                  selectedReason === "privacy"
                    ? "bg-[#00320F] text-white"
                    : "bg-transparent text-black"
                }`}
              >
                <Check
                  size={18}
                  className={`${
                    selectedReason === "privacy" ? "text-white" : "text-black"
                  }`}
                />
              </div>
              <span className="leading-relaxed md:leading-normal">
                개인정보 보호를 위해 <br className="md:hidden" /> 삭제할 정보가
                있어요
              </span>
            </label>

            {/* 다섯 번째 라디오 버튼 */}
            <label className="flex justify-start items-center gap-[12px]">
              <input
                type="radio"
                name="reason"
                value="another" // 고유한 value
                checked={selectedReason === "another"}
                onChange={handleToggle}
                className="appearance-none w-0 h-0 absolute"
              />
              <div
                className={`w-[54px] h-[32px] border-2 border-gray-300 rounded-[32px] flex items-center justify-center cursor-pointer ${
                  selectedReason === "another"
                    ? "bg-[#00320F] text-white"
                    : "bg-transparent text-black"
                }`}
              >
                <Check
                  size={18}
                  className={`${
                    selectedReason === "another" ? "text-white" : "text-black"
                  }`}
                />
              </div>
              <span>다른 계정이 있어요</span>
            </label>

            {/* 기타 라디오 버튼 */}
            <label className="flex justify-start items-center gap-[12px] mb-[24px]">
              <input
                type="radio"
                name="reason"
                value="expectation" // 고유한 value
                checked={selectedReason === "expectation"}
                onChange={handleToggle}
                className="appearance-none w-0 h-0 absolute"
              />
              <div
                className={`w-[54px] h-[32px] border-2 border-gray-300 rounded-[32px] flex items-center justify-center cursor-pointer ${
                  selectedReason === "expectation"
                    ? "bg-[#00320F] text-white"
                    : "bg-transparent text-black"
                }`}
              >
                <Check
                  size={18}
                  className={`${
                    selectedReason === "expectation"
                      ? "text-white"
                      : "text-black"
                  }`}
                />
              </div>
              <span>기타</span>
            </label>
            <DeleteAccountButton
              userId={user.id}
              selectedReason={
                selectedReason ? reasonConfig[selectedReason] : ""
              }
              disabled={!selectedReason}
            />
          </div>
        </section>
        <div className="h-[80px] md:hidden"></div>
      </div>
    </div>
  );
};

export default DeletePage;
