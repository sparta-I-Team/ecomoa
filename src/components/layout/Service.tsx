import Image from "next/image";
import React from "react";

const Service = () => {
  return (
    <div className="">
      {/* 메인 이미지 */}
      <section className="mb-[280px] mx-auto flex justify-center">
        <Image
          src={"/service/frame1.png"}
          width={1800}
          height={800}
          alt="main"
          className="w-[1800px]"
        />
      </section>

      {/* 로고 */}
      <section className=" flex flex-col items-center justify-center gap-[80px] mb-[280px]">
        <Image
          src={"/service/main-logo.png"}
          width={327}
          height={63.33}
          alt="logo"
          className="mx-auto"
        />
        <p className="text-center text-[#000] font-wanted text-[24px] font-[500] leading-[36px] tracking-[-0.72px]">
          에코모아는 환경을 생각하는 우리의 일상 속 작은 노력들이 모여
          시작되었습니다.
          <br /> 더 나은 미래를 꿈꾸고,
          <span className="font-[700]"> 모아들과 지속 가능한 발걸음</span>
          을 함께 하세요!
          <br />
        </p>
      </section>

      {/* 캐릭터 소개 */}
      <section className="w-full mb-[1800px] md:w-[1780px] md:mb-0 h-[739px] flex flex-col items-center mx-auto">
        <div>
          <div className="w-[720px] space-y-[40px] mb-[80px] mx-auto">
            <p className="font-wanted  text-[48px] font-[500] text-center leading-[72px] tracking-[-1.44px]">
              <span className="text-[#5BCA11] font-[800] ">MOA 캐릭터</span>
              들을 소개합니다
            </p>
            <p className="text-[#525660] font-pretendard text-[20px] font-[400] leading-[30px] tracking-[-0.6px] text-center">
              챌린지 인증하고 모인 포인트를 차곡차곡 쌓이면 캐릭터가 레벨 UP!
              <br />
              씨앗 모아부터 클로버 모아까지 같이 성장해나가요.
            </p>
          </div>
          <div className="flex flex-col gap-5 md:flex-row justify-center items-center mx-auto">
            <Image
              src={"/service/card1.png"}
              width={430}
              height={525}
              alt="character1"
              className="mx-auto"
            />
            <Image
              src={"/service/card2.png"}
              width={430}
              height={525}
              alt="character2"
              className="mx-auto"
            />
            <Image
              src={"/service/card3.png"}
              width={430}
              height={525}
              alt="character3"
              className="mx-auto"
            />
            <Image
              src={"/service/card4.png"}
              width={430}
              height={525}
              alt="character4"
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-[280px]">
        <p className="w-full font-wanted text-center font-[500] text-[48px] leading-[7d2px] tracking-[-0.72px]">
          당신의
          <span className="text-[#5BCA11] font-wanted text-[48px] font-[800] leading-[72px]">
            MOA
          </span>
          를 레벨업으로 성장시키자!
        </p>
        <p className="text-[#525660] font-pretendard text-[20px] font-[400] leading-[30px] tracking-[-0.6px] text-center">
          챌린지 인증하고 모인 포인트를 차곡차곡 쌓이면 캐릭터가 레벨 UP!
          <br />
          씨앗 모아부터 클로바 모아까지 같이 성장해나가요.
        </p>
      </section>
      <section className="mt-[80px] w-[748px] text-center mx-auto">
        <Image
          src={"/service/frame2.png"}
          width={1032}
          height={670}
          alt="character1"
        />
      </section>
      <section className="text-center mx-auto mt-[280px]">
        <Image
          src={"/service/frame3.png"}
          width={938}
          height={632}
          alt="character1"
          className="mx-auto"
        />
      </section>
      <section>
        <Image
          src={"/service/frame4.png"}
          width={801}
          height={685}
          alt="character1"
          className="mx-auto mt-[277px]"
        />
      </section>

      {/* 서비스 소개 */}
      <section className="relative w-[1800px] h-[2056px] flex-none rounded-[80px] bg-gradient-to-b from-[#EAFCDE] to-transparent mt-[280px]">
        <p className="pt-[80px] font-wanted text-center text-[#5BCA11] text-[36px] font-semibold leading-[54px] tracking-[-1.08px]">
          Our Service
        </p>
        <div className=" ml-[360px]">
          <div className="font-wanted">
            <p className="text-[48px] font-[600] leading-[72px] mt-[175px]">
              데일리 탄소 절감 챌린지
            </p>
            <p className="text-[#525660] text-[20px] leading-[30px] mt-[40px]">
              챌린지 인증하고 모인 포인트를 차곡차곡 쌓이면 캐릭터가 레벨 UP!
              <br />
              씨앗 모아부터 클로바 모아까지 같이 성장해나가요.
            </p>
          </div>
          <div className=" flex gap-[30px] mt-[89px]">
            <Image
              src={"/service/step1.png"}
              width={380}
              height={500}
              alt="step1"
            />
            <Image
              src={"/service/step2.png"}
              width={380}
              height={500}
              alt="step2"
            />
            <Image
              src={"/service/step3.png"}
              width={380}
              height={500}
              alt="step3"
            />
          </div>
          <p className="bg-[#C3C3C3] w-[820px] h-[390px] mt-[194px]">캘린더</p>
          {/* 탄소 계산기 */}
          <p className="font-wanted text-[48px] font-[600] leading-[72px] mt-[133px]">
            탄소 계산기
          </p>
          <p className="text-[#525660] font-wanted text-[20px] font-normal leading-[30px] mt-[40px]">
            월별 에너지 사용량을 입력하고 나의 탄소 배출량을 계산해요.
            <br />
            데이터를 통해 나의 실천이 환경에 얼마나 영향을 주는지 알 수 있어요.
          </p>
          {/* cal 이미지 */}
          <div className="mt-[81px] flex flex-wrap gap-[26px]">
            <Image
              src={"/service/cal1.png"}
              width={382}
              height={235}
              alt="그래프를 통한 배출량 확인"
            />
            <Image
              src={"/service/cal2.png"}
              width={382}
              height={235}
              alt="그래프를 통한 배출량 확인"
            />
            <Image
              src={"/service/cal3.png"}
              width={382}
              height={235}
              alt="그래프를 통한 배출량 확인"
            />
            <Image
              src={"/service/cal4.png"}
              width={382}
              height={235}
              alt="그래프를 통한 배출량 확인"
            />
            <Image
              src={"/service/cal5.png"}
              width={382}
              height={235}
              alt="그래프를 통한 배출량 확인"
            />
            <Image
              src={"/service/cal6.png"}
              width={382}
              height={235}
              alt="그래프를 통한 배출량 확인"
            />
          </div>
          {/* 친환경 가게 찾기 지도 */}
          <div>
            <p className="font-wanted text-[48px] font-[600] leading-[72px] mt-[542px]">
              친환경 가게 찾기 지도
            </p>
            <p className="text-[#525660] font-wanted text-[20px] font-normal leading-[30px] mt-[40px]">
              내 주변 가까이 있는 친환경 가게를 찾아보세요.
              <br />
              텀블러 할인, 제로웨이스트 가게들의 다양한 친환경 혜택을 놓치지
              마세요!
            </p>
            <Image
              src={"/service/map.png"}
              width={380}
              height={380}
              alt="친환경 맵 소개"
              className="mt-[49px]"
            />
          </div>
          {/* 커뮤니티 */}
          <div>
            <p className="font-wanted text-[48px] font-[600] leading-[72px] mt-[329px]">
              커뮤니티
            </p>
            <p className="text-[#525660] font-wanted text-[20px] font-normal leading-[30px] mt-[40px]">
              챌린지 인증 게시판, 자유게시판, 아나바다 시장에서 사용자들과
              경험과 아이디어를 나누며
              <br /> 친환경 라이프를 더욱 풍부하게 만들어 봐요!
            </p>
            <Image
              src={"/service/community.png"}
              width={1200}
              height={420}
              alt="커뮤니티 소개"
              className="mt-[89px] pb-[297px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
