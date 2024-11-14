"use client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie, { useLottie } from "lottie-react";
import lottieJson1 from "../../../public/service/Graphic1.json";
import lottieJson2 from "../../../public/service/Graphic2.json";
import lottieJson4 from "../../../public/service/Graphic4.json";
import lottieJson5 from "../../../public/service/Graphic5.json";
import lottieJson10 from "../../../public/service/Graphic10.json";

const ServiceIntro = () => {
  const lastSectionRef = useRef(null); // 마지막 섹션을 위한 ref
  const [isLastSectionVisible, setIsLastSectionVisible] = useState(false); // 마지막 섹션 노출 여부
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  const getButtonStyle = () => {
    const baseStyle =
      "z-10 border-none font-[600] w-[392px] h-[60px] rounded-[40px] p-[24px_16px] gap-[10px] bg-[#0D9C36] text-[#FFF] hover:bg-[#00691E] transition-colors duration-200";

    if (isLastSectionVisible) {
      return `${baseStyle}`;
    }
    // 스크롤 중에는 fixed top-[80%]로 고정
    return `${baseStyle} fixed top-[80%]`;
  };

  // AOS 세팅
  useEffect(() => {
    AOS.init({
      // duration: 1000,
      once: true
    });
    return () => {
      // AOS 인스턴스를 종료하여 메모리 누수 방지
      AOS.refresh();
    };
  }, []);

  // 로티
  const lottieRef5 = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { View } = useLottie({
    animationData: lottieJson2,
    loop: false
    // autoplay: false
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLastSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1 // 10% 이상 보이면 감지
      }
    );

    if (lastSectionRef.current) {
      observer.observe(lastSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.9 // 섹션이 90% 이상 보일 때 isVisible이 true로 설정됨
      }
    );

    if (lottieRef5.current) {
      observer.observe(lottieRef5.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // isVisible이 true일 때만 애니메이션 자동 재생
      handleLottieAnimation();
    }
  }, [isVisible]);

  const handleLottieAnimation = () => {
    // 이 부분에서 play()를 직접 사용하지 않고 isVisible 상태로만 제어
    if (isVisible) {
      // Lottie 애니메이션을 상태로 재생시키기
      setIsVisible(false); // 한 번 실행 후 false로 돌려서 반복 실행 방지
    }
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
        <div className="font-wanted font-[500] max-w-[1200px] mx-auto flex flex-col justify-center items-center">
          <h1 className="w-[466px] text-center text-[40px] font-[700] leading-[56px] tracking-[-0.4px] mt-[96px]">
            탄소를 절감해서
            <br /> 에코모아를 키워주세요
          </h1>
          <h2 className="text-[#525660] test-[20px] font-[500] leading-[30px] tracking-[-0.2px] mt-[28px]">
            매일매일 간단한 탄소절감 챌린지를 수행하며 에코모아를 키워요!
          </h2>
          <div className="w-[1200px] h-[500px] rounded-[40px] bg-[#EDEEF0] mt-[60px]">
            <div className="rounded-[40px] overflow-hidden">
              <Lottie
                animationData={lottieJson1}
                loop={true}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="font-wanted h-[1300px] bg-[#F2F9F2] flex items-center">
        <div className="w-[1200px] my-auto h-[980px] grid grid-cols-2 mx-auto place-content-center">
          {/* 첫 번째 내용 */}
          <div
            data-aos="fade-in"
            data-aos-offset="400" //  500px 만큼 스크롤을 내려야 애니메이션 시작
            data-aos-easing="ease-in-out"
            data-aos-duration="1500"
            className="flex flex-col justify-center items-start gap-[24px]"
          >
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
            <div
              data-aos="fade-up"
              data-aos-offset="500"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
              className="w-[608px] flex flex-wrap items-center justify-center gap-[16px]"
            >
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
          <div
            data-aos="fade-up"
            data-aos-offset="400"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            className="relative flex flex-col justify-center items-center"
          >
            <div className="rounded-[40px] overflow-hidden">
              <Lottie
                animationData={lottieJson5}
                loop={true}
                className="w-full h-full"
              />
            </div>
          </div>
          {/* 네 번째 내용 */}
          <div
            data-aos="fade-in"
            data-aos-offset="400"
            data-aos-easing="ease-in-out"
            data-aos-duration="1500"
            className="w-[600px] flex flex-col justify-center items-start ml-[100px] gap-[24px]"
          >
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
              <span className="text-[#0D9C36]"> 쑥쑥</span> 키워주세요
            </h1>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section className="h-[835px]">
        <div className="font-wanted max-w-[1200px] mx-auto flex flex-col justify-center items-center ">
          <div
            className="text-center"
            data-aos="fade-in"
            data-aos-offset="400"
            data-aos-easing="ease-in-out"
            data-aos-duration="1500"
          >
            <p className="text-[#00691E] text-[20px] font-[600] leading-[30px] tracking-[-0.2px] mt-[105px]">
              모아 캐릭터를 소개합니다
            </p>
            <h1 className="text-center text-[#000301] text-[32px] font-[700] leading-[44.8px] tracking-[-0.32px] mt-[24px]">
              탄소 절감으로 모은 포인트로 캐릭터를 키울 수 있어요
              <br />
              <span className="text-[#0D9C36]">씨앗모아</span>부터
              <span className="text-[#0D9C36]"> 클로바모아</span>까지 함께
              성장해나가요
            </h1>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="400" //  500px 만큼 스크롤을 내려야 애니메이션 시작
            data-aos-easing="ease-in-out"
            data-aos-duration="1500"
            className="flex items-center justify-center gap-[32px] mt-[132px]"
          >
            <div className="flex flex-col items-center justify-center">
              <p className="mb-[23px] text-[#000301] text-[20px] font-[700] leading-[38px]">
                LV.1 씨앗모아
              </p>
              <div className="w-[276px] h-[280px] border border-[#D5D7DD] rounded-[28px]">
                <Image
                  src={"/service/seedBrown.png"}
                  alt="씨앗모아"
                  width={280}
                  height={276}
                  className="rounded-t-[28px]"
                />
                <p className="h-[76px] flex justify-center items-center text-[#525660] font-wanted text-[16px] font-[600] leading-[24px]">
                  가능성을 품고 있는 작은 씨앗
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="mb-[23px] text-[#000301] text-[20px] font-[700] leading-[38px]">
                LV.2 새싹모아
              </p>
              <div className="w-[276px] h-[280px] border border-[#D5D7DD] rounded-[28px]">
                <Image
                  src={"/service/pink.png"}
                  alt="씨앗모아"
                  width={280}
                  height={276}
                  className="rounded-t-[28px]"
                />
                <p className="h-[76px] flex justify-center items-center text-[#525660] font-wanted text-[16px] font-[600] leading-[24px]">
                  성장의 시작으로 돋아난 새싹
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="mb-[23px] text-[#000301] text-[20px] font-[700] leading-[38px]">
                LV.3 트리모아
              </p>
              <div className="w-[276px] h-[280px] border border-[#D5D7DD] rounded-[28px]">
                <Image
                  src={"/service/green.png"}
                  alt="씨앗모아"
                  width={280}
                  height={276}
                  className="rounded-t-[28px]"
                />
                <p className="h-[76px] flex justify-center items-center text-[#525660] font-wanted text-[16px] font-[600] leading-[24px]">
                  생명을 지키는 강인한 나무
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="mb-[23px] text-[#000301] text-[20px] font-[700] leading-[38px]">
                LV.4 클로바모아
              </p>
              <div className="w-[276px] h-[280px] border border-[#D5D7DD] rounded-[28px]">
                <Image
                  src={"/service/blue.png"}
                  alt="씨앗모아"
                  width={280}
                  height={276}
                  className="rounded-t-[28px]"
                />
                <p className="h-[76px] flex justify-center items-center text-[#525660] font-wanted text-[16px] font-[600] leading-[24px]">
                  결실을 맺은 행운의 네잎클로버
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section className="h-[799px] bg-[rgba(94,133,253,0.10)]">
        <div className="font-wanted max-w-[1200px] mx-auto flex flex-col justify-center items-start ">
          <div
            data-aos="fade-in"
            data-aos-offset="400"
            data-aos-easing="ease-in-out"
            data-aos-duration="1500"
          >
            <p className="text-[#5E85FD] text-[20px] font-[600] leading-[30px] tracking-[-0.2px] mt-[105px]">
              챌린지를 실천해보세요
            </p>
            <h1 className="text-center text-[40px] font-[700] leading-[56px] tracking-[-0.4px] mt-[24px]">
              데일리 탄소 절감 챌린지 이렇게 참여해요
            </h1>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="400"
            data-aos-easing="ease-in-out"
            data-aos-duration="1500"
            className="w-[1200px] flex justify-center items-center gap-[15px]"
          >
            <div>
              <p className="mx-auto mt-[100px] text-[20px] font-[500] leading-[30px] text-[#525660] mb-[24px]">
                <span className="text-[#5E85FD] font-[600]">STEP 1 </span>챌린지
                항목들을 선택해요
              </p>
              <Image
                src={"/service/step1.png"}
                alt="챌린지"
                width={380}
                height={320}
                className="rounded-[40px]"
                style={{ width: "380px", height: "320px" }}
              />
            </div>
            <div>
              <p className="mt-[100px] text-[20px] font-[500] leading-[30px] text-[#525660] mb-[24px]">
                <span className="text-[#5E85FD] font-[600]">STEP 2 </span>
                챌린지를 간단하게 인증해요
              </p>
              <Image
                src={"/service/step2.png"}
                alt="챌린지 인증"
                width={380}
                height={320}
                className="rounded-[40px]"
                style={{ width: "380px", height: "320px" }}
              />
            </div>
            <div>
              <p className="font-wanted mt-[100px] text-[18px] font-[500] leading-[30px] text-[#525660] mb-[24px]">
                <span className="text-[#5E85FD] font-[600]">STEP 3 </span>
                포인트를 모아서 모아 캐릭터를 키워요
              </p>
              <div className="relative">
                <Image
                  src={"/service/step.png"}
                  alt="챌린지 포인트 시스템"
                  width={380}
                  height={320}
                  className="rounded-[40px]"
                />
                <Image
                  data-aos="fade-down"
                  data-aos-offset="400"
                  data-aos-easing="ease-in-out"
                  data-aos-duration="1500"
                  src={"/service/step-point.png"}
                  alt="챌린지 포인트 시스템"
                  width={180}
                  height={72}
                  className="absolute -right-[60px] -top-[10px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 5 */}
      <section className="h-[886px]">
        <div
          data-aos="fade-in"
          data-aos-offset="400"
          data-aos-easing="ease-in-out"
          data-aos-duration="1500"
          className="font-wanted max-w-[1200px] mx-auto flex flex-col justify-center items-center"
        >
          <p className="text-center text-[#00691E] text-[20px] font-[600] leading-[30px] tracking-[-0.2px] mt-[110px]">
            탄소 계산기로 관리하는 나의 탄소 배출량
          </p>
          <h1 className="text-[#000301] text-center text-[40px] font-[700] leading-[56px] tracking-[-0.4px] mt-[24px]">
            탄소 계산기로 매월 탄소 배출량을 정확히 관리해요
          </h1>
        </div>
        <div
          data-aos="fade-up"
          data-aos-offset="400"
          data-aos-easing="ease-in-out"
          data-aos-duration="1500"
          className="w-[1200px] h-[680px] grid grid-cols-2 mx-auto mt-[100px] gap-[32px]"
        >
          {/* 차트 1 */}
          <div>
            <div className="border border-[#D5D7DD] w-[584px] h-[400px] p-[40px] rounded-[40px]">
              {/* <Image
                src={"/service/chart1.png"}
                alt="탄소 배출량 비교"
                width={584}
                height={400}
              /> */}
              <div className="rounded-[40px] overflow-hidden w-full h-full">
                <Lottie
                  animationData={lottieJson4}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
            </div>
            <p className="font-wanted text-center mt-[31px] text-[#525660] text-[20px] font-[500] leading-[30px]">
              “헉 지난달보다 2kg 더 배출했네, 다음달에는 더 줄여야겠어!”
            </p>
          </div>
          {/* 차트 2 */}
          <div>
            <div className="flex justify-center items-center border border-[#D5D7DD] rounded-[40px]">
              {/* <Image
                src={"/service/chart2.png"}
                alt="탄소 배출량 비교"
                width={584}
                height={400}
                className="p-[121px_64px]"
              /> */}

              <div className="rounded-[40px] overflow-hidden">
                <Lottie
                  animationData={lottieJson10}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
            </div>
            <p className="font-wanted text-center mt-[31px] text-[#525660] text-[20px] font-[500] leading-[30px]">
              “와 나는 탄소 배출량이 적은 편이구나! 매우 뿌듯하네”
            </p>
          </div>
        </div>
      </section>

      {/* section 6 */}
      <section className="font-wanted h-[680px] bg-[#F2F9F2]">
        <div
          data-aos="fade-in"
          data-aos-offset="500"
          data-aos-easing="ease-in-out"
          data-aos-duration="1500"
          className="w-[1200px] h-[680px] grid grid-cols-2 mx-auto"
        >
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
          <div
            data-aos="fade-up"
            data-aos-offset="500"
            data-aos-easing="ease-in-out"
            data-aos-duration="1500"
            className="w-[584px] h-[400px] bg-[#FFF] my-auto rounded-[40px]"
          >
            <Image
              src={"/service/map.png"}
              alt="탄소 절감 커뮤니티"
              width={951}
              height={535}
              className="rounded-[40px]"
            />
          </div>
        </div>
      </section>

      {/* section 7*/}
      <section className="font-wanted h-[680px]">
        <div
          data-aos="fade-in"
          data-aos-offset="400"
          data-aos-easing="ease-in-out"
          data-aos-duration="1500"
          className="w-[1200px] h-[680px] grid grid-cols-2 mx-auto"
        >
          <div
            data-aos="fade-up"
            data-aos-offset="500"
            data-aos-easing="ease-in-out"
            data-aos-duration="1500"
            className="w-[584px] h-[400px] bg-[#FFF] my-auto rounded-[40px]"
          >
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
        <div
          data-aos="fade-in"
          data-aos-offset="400"
          data-aos-easing="ease-in-out"
          data-aos-duration="1500"
          className="w-[1200px] h-[680px] grid grid-cols-2 mx-auto"
        >
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
          <div
            data-aos="fade-up"
            data-aos-offset="500"
            data-aos-easing="ease-in-out"
            data-aos-duration="1500"
            className="w-[584px] h-[400px] bg-[#FFF] my-auto rounded-[40px]"
          >
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
      <section ref={lastSectionRef}>
        <div className="font-wanted max-w-[1200px] mx-auto flex flex-col justify-center items-center relative">
          <div
            data-aos="fade-in"
            data-aos-offset="400"
            data-aos-easing="ease-in-out"
            data-aos-duration="1500"
            className="text-center"
          >
            <p className="text-center text-[40px] font-[700] leading-[56px] tracking-[-0.4px] mt-[140px]">
              에코모아와 함께
              <br />
              탄소 절감에 참여해 주세요!
            </p>
            <h1 className="text-[#525660] text-[20px] font-[500] leading-[38px] tracking-[-0.2px] mt-[28px]">
              모아들과 지속가능한 미래를 꿈꿔요
            </h1>
          </div>
          <div className="w-[1200px] h-[500px] rounded-[40px] bg-[#CBF5CB] mt-[74px] mb-[40px]">
            <div className="rounded-[40px] overflow-hidden">
              <div
                className="rounded-[40px] overflow-hidden"
                data-aos="fade-left"
                data-aos-once="true"
                data-aos-duration="1000"
                ref={lottieRef5}
              >
                {View}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-[134px]">
            <button
              onClick={handleClick}
              className={getButtonStyle()} // getButtonStyle 함수 적용
            >
              에코모아 시작하기
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceIntro;
