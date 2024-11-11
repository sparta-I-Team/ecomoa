"use client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ServiceIntro = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/challenge");
  };
  return (
    <>
      <Head>
        <title>에코모아 - 탄소 절감을 위한 챌린지</title>
        <meta
          name="description"
          content="매일 간단한 탄소 절감 챌린지로 에코모아를 키워보세요. 환경을 위한 작은 실천이 큰 변화를 만듭니다."
        />
        <meta name="keywords" content="탄소 절감, 에코모아, 환경 챌린지" />
      </Head>

      {/* section 1 */}
      <section className="h-[1022px]">
        <div className="font-wanted max-w-[1200px] mx-auto flex flex-col justify-center items-center ">
          <h1 className="w-[466px] text-center text-[40px] font-[700] leading-[56px] tracking-[-0.4px] mt-[96px]">
            탄소를 절감하며
            <br /> 에코모아를 키워주세요
          </h1>
          <h2 className="text-[#525660] test-[20px] font-[500] leading-[30px] tracking-[-0.2px] mt-[28px]">
            매일매일 간단한 탄소절감 챌린지를 수행하며 에코모아를 키워요!
          </h2>
          <div className="w-[1200px] h-[500px] rounded-[40px] bg-[#EDEEF0] mt-[60px]">
            <Image
              src={"/service/main.png"}
              alt="에코모아 서비스 화면"
              width={1200}
              height={500}
              style={{ width: "1200px", height: "500px" }}
            />
          </div>
          <button
            onClick={handleClick}
            className="font-[600] w-[392px] h-[60px] rounded-[40px] p-[24px_16px] flex flex-col items-center justify-center gap-[10px] bg-[#0D9C36] text-[#FFF] mt-[40px]"
          >
            에코모아 시작하기
          </button>
        </div>
      </section>

      {/* section 2 */}
      <section className="font-wanted h-[1300px] bg-[#F2F9F2] flex items-center">
        <div className="w-[1200px] h-[980px] grid grid-cols-2 mx-auto">
          {/* 첫 번째 내용 */}
          <div className="flex flex-col justify-center items-start gap-[24px]">
            <p className="text-[#00691E] text-[20px] font-[600] leading-[30px] tracking-[-0.2px]">
              탄소 절감 어렵지 않아요
            </p>
            <h1 className="text-[#000301] text-[32px] font-[700] leading-[44.8px] tracking-[-0.32px]">
              데일리 에코모아 <span className="text-[#0D9C36]">챌린지</span>로
              <br /> 쉽게 탄소 절감에 참여할 수 있어요
            </h1>
          </div>
          {/* 두 번째 내용 */}
          <div className="flex flex-col justify-center items-center">
            <div className="w-[608px] flex flex-wrap items-center justify-center gap-[16px]">
              <Image
                src={"/service/chal1.png"}
                alt="탄소 절감 챌린지"
                width={192}
                height={192}
              />
              <Image
                src={"/service/chal2.png"}
                alt="탄소 절감 챌린지"
                width={192}
                height={192}
              />
              <Image
                src={"/service/chal3.png"}
                alt="탄소 절감 챌린지"
                width={192}
                height={192}
              />
              <Image
                src={"/service/chal4.png"}
                alt="탄소 절감 챌린지"
                width={192}
                height={192}
              />
              <Image
                src={"/service/chal5.png"}
                alt="탄소 절감 챌린지"
                width={192}
                height={192}
              />
              <Image
                src={"/service/chal6.png"}
                alt="탄소 절감 챌린지"
                width={192}
                height={192}
              />
            </div>
          </div>
          {/* 세 번째 내용 */}
          <div className="flex flex-col justify-center items-center">
            <Image
              src={"/service/treeBack.png"}
              alt="에코모아 캐릭터"
              width={600}
              height={400}
              className="rounded-[40px]"
            />
          </div>
          {/* 네 번째 내용 */}
          <div className="w-[600px] flex flex-col justify-center items-start ml-[100px] gap-[24px]">
            <Image
              src={"/service/stamp.png"}
              alt="에코모아 챌린지 스탬프"
              width={48}
              height={48}
            />
            <p className="text-[#00691E] text-[20px] font-[600] leading-[30px] tracking-[-0.2px]">
              챌린지를 성공하면 포인트를 드려요
            </p>
            <h1 className="text-[#000301] text-[32px] font-[700] leading-[44.8px] tracking-[-0.32px]">
              데일리 챌린지 포인트를 모아서
              <br /> 당신의 모아 캐릭터를
              <span className="text-[#0D9C36]">쑥쑥</span> 키워주세요
            </h1>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section className="h-[835px]">
        <div className="font-wanted max-w-[1200px] mx-auto flex flex-col justify-center items-center ">
          <p className="text-[#00691E] text-[20px] font-[600] leading-[30px] tracking-[-0.2px] mt-[140px]">
            모아 캐릭터를 소개합니다
          </p>
          <h1 className="text-center text-[#000301] text-[32px] font-[700] leading-[44.8px] tracking-[-0.32px] mt-[24px]">
            탄소 절감으로 모은 포인트로 캐릭터를 키울 수 있어요
            <br />
            <span className="text-[#0D9C36]">씨앗모아</span>부터
            <span className="text-[#0D9C36]"> 클로바모아</span>까지 함께
            성장해나가요
          </h1>
          <div className="flex gap-[32px] mt-[132px]">
            <div className="flex flex-col items-center justify-center">
              <p className="mb-[23px] text-[#000301] text-[20px] font-[700] leading-[38px]">
                LV.1 씨앗모아
              </p>
              <Image
                src={"/service/yellow.png"}
                alt="씨앗모아"
                width={280}
                height={276}
                className="rounded-[28px]"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="mb-[23px] text-[#000301] text-[20px] font-[700] leading-[38px]">
                LV.2 새싹모아
              </p>
              <Image
                src={"/service/pink.png"}
                alt="새싹모아"
                width={280}
                height={276}
                className="rounded-[28px]"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="mb-[23px] text-[#000301] text-[20px] font-[700] leading-[38px]">
                LV.3 트리모아
              </p>
              <Image
                src={"/service/green.png"}
                alt="트리모아"
                width={280}
                height={276}
                className="rounded-[28px]"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="mb-[23px] text-[#000301] text-[20px] font-[700] leading-[38px]">
                LV.4 클로바모아
              </p>
              <Image
                src={"/service/blue.png"}
                alt="클로바모아"
                width={280}
                height={276}
                className="rounded-[28px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section className="h-[799px] bg-[rgba(94,133,253,0.10)]">
        <div className="font-wanted max-w-[1200px] mx-auto flex flex-col justify-center items-start ">
          <p className="text-[#5E85FD] text-[20px] font-[600] leading-[30px] tracking-[-0.2px] mt-[140px]">
            챌린지에 도전해 보세요
          </p>
          <h1 className="text-center text-[40px] font-[700] leading-[56px] tracking-[-0.4px] mt-[24px]">
            데일리 탄소 절감 챌린지 이렇게 참여해요
          </h1>
          <div className="w-[1200px] flex justify-center items-center gap-[15px]">
            <div>
              <p className="mx-auto mt-[100px] text-[20px] font-[500] leading-[30px] text-[#525660] mb-[24px]">
                <span className="text-[#5E85FD] font-[600]">STEP 1 </span>챌린지
                항목들을 선택해요
              </p>
              <Image
                src={"/service/challenge1.png"}
                alt="챌린지"
                width={380}
                height={320}
                style={{ width: "380px", height: "320px" }}
              />
            </div>
            <div>
              <p className="mt-[100px] text-[20px] font-[500] leading-[30px] text-[#525660] mb-[24px]">
                <span className="text-[#5E85FD] font-[600]">STEP 2 </span>
                챌린지를 간단하게 인증해요
              </p>
              <Image
                src={"/service/challenge2.png"}
                alt="챌린지 인증"
                width={380}
                height={320}
                style={{ width: "380px", height: "320px" }}
              />
            </div>
            <div>
              <p className="font-wanted mt-[100px] text-[18px] font-[500] leading-[30px] text-[#525660] mb-[24px]">
                <span className="text-[#5E85FD] font-[600]">STEP 3 </span>
                포인트를 모아 모아서 캐릭터를 키워요
              </p>
              <Image
                src={"/service/challenge3.png"}
                alt="챌린지 포인트 시스템"
                width={461}
                height={320}
                style={{ width: "461px", height: "320px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* section 5 */}
      <section className="h-[886px]">
        <div className="font-wanted max-w-[1200px] mx-auto flex flex-col justify-center items-center">
          <p className="text-center text-[#00691E] text-[20px] font-[600] leading-[30px] tracking-[-0.2px] mt-[140px]">
            탄소 계산기로 관리하는 나의 탄소 배출량
          </p>
          <h1 className="text-[#000301] text-center text-[40px] font-[700] leading-[56px] tracking-[-0.4px] mt-[24px]">
            탄소 계산기로 매월 탄소 배출량을 정확히 관리해요
          </h1>
        </div>
        <div className="w-[1200px] h-[680px] grid grid-cols-2 mx-auto mt-[100px] gap-[32px]">
          {/* 차트 1 */}
          <div>
            <div className="border border-[#D5D7DD] w-[584px] h-[400px] p-[97px_160px_57px_160px] rounded-[40px]">
              <Image
                src={"/service/chart1.png"}
                alt="탄소 배출량 비교"
                width={584}
                height={400}
              />
            </div>
            <p className="font-wanted text-center mt-[31px] text-[#525660] text-[20px] font-[500] leading-[30px]">
              “헉 지난달보다 2kg 더 배출했네, 다음달에는 더 줄여야겠어!”
            </p>
          </div>
          {/* 차트 2 */}
          <div>
            <div className="flex justify-center items-center border border-[#D5D7DD] rounded-[40px]">
              <Image
                src={"/service/chart2.png"}
                alt="탄소 배출량 비교"
                width={584}
                height={400}
                className="p-[121px_64px]"
              />
            </div>
            <p className="font-wanted text-center mt-[31px] text-[#525660] text-[20px] font-[500] leading-[30px]">
              “와 나는 탄소 배출량이 적은 편이구나! 매우 뿌듯하네”
            </p>
          </div>
        </div>
      </section>

      {/* section 6 */}
      <section className="font-wanted h-[680px] bg-[#F2F9F2]">
        <div className="w-[1200px] h-[680px] grid grid-cols-2 mx-auto">
          <div className="flex flex-col items-start justify-center gap-[24px]">
            <p className="text-[#00691E] text-[20px] font-[600] leading-[30px] tracking-[-0.2px] ">
              친환경 가게 찾기 Map
            </p>
            <h1 className="text-[#000301] text-[32px] font-[700] leading-[44.8px] tracking-[-0.32px]">
              내 주변 친환경 가게를 방문하고
              <br />
              친환경 소비를 경험해 보세요!
            </h1>
          </div>
          <div className="w-[584px] h-[400px] bg-[#FFF] my-auto rounded-[40px]"></div>
        </div>
      </section>

      {/* section 7*/}
      <section className="font-wanted h-[680px]">
        <div className="w-[1200px] h-[680px] grid grid-cols-2 mx-auto">
          <div className="w-[584px] h-[400px] bg-[#FFF] my-auto rounded-[40px]">
            <Image
              src={"/service/community.png"}
              alt="탄소 절감 커뮤니티"
              width={584}
              height={400}
              className="rounded-[40px]"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-[24px] ml-[100px]">
            <h1 className="text-[#00691E] text-[20px] font-[600] leading-[30px] tracking-[-0.2px] ">
              탄소 절감 커뮤니티
            </h1>
            <p className="text-[#000301] text-[32px] font-[700] leading-[44.8px] tracking-[-0.32px]">
              서로의 경험을 나누고 응원해요
              <br /> 꿀팁도 공유하며 더 똑똑한
              <br />
              탄소 절감 라이프를 경험해요
            </p>
          </div>
        </div>
      </section>

      {/* section 8*/}
      <section className="font-wanted h-[680px] bg-[rgba(255,125,111,0.10)]">
        <div className="w-[1200px] h-[680px] grid grid-cols-2 mx-auto">
          <div className="flex flex-col items-start justify-center gap-[24px]">
            <h1 className="text-[#FF7D6F] text-[20px] font-[600] leading-[30px] tracking-[-0.2px] ">
              아나바다 시장
            </h1>
            <p className="text-[#000301] text-[32px] font-[700] leading-[44.8px] tracking-[-0.32px]">
              필요한 물건은 중고로 구매해서
              <br />
              자원도 아끼고, 돈도 절약해요!
            </p>
          </div>
          <div className="w-[584px] h-[400px] bg-[#FFF] my-auto rounded-[40px]">
            <Image
              src={"/service/anabada.png"}
              alt="아나바다 시장"
              width={584}
              height={400}
              className="rounded-[40px]"
            />
          </div>
        </div>
      </section>

      {/* section 9 */}
      <section className="h-[799px]">
        <div className="font-wanted max-w-[1200px] mx-auto flex flex-col justify-center items-center ">
          <p className="text-center text-[40px] font-[700] leading-[56px] tracking-[-0.4px] mt-[140px]">
            에코모아와 함께
            <br />
            탄소 절감에 참여해 주세요!
          </p>
          <h1 className="text-[#525660] text-[20px] font-[500] leading-[38px] tracking-[-0.2px] mt-[28px]">
            모아들과 지속가능한 미래를 꿈꿔요
          </h1>
          <div className="w-[1200px] h-[500px] rounded-[40px] bg-[#CBF5CB] mt-[74px] mb-[176px]">
            <Image
              src={"/service/main2.png"}
              alt="에코모아 서비스 화면"
              width={1200}
              height={500}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceIntro;
