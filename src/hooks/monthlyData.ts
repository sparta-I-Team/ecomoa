import { getUser } from "@/api/auth-actions";
import { MonthlyData } from "@/types/calculate";
import browserClient from "@/utlis/supabase/browserClient";

type SetUserType = (userId: string | null) => void; // setUser의 타입 정의

// 이번달 기준 내 최신 data
export const loadUserAndFetchData = async (
  setUser: SetUserType,
  // setThisYear: React.Dispatch<React.SetStateAction<number | null>>,
  // setThisMonth: React.Dispatch<React.SetStateAction<number | null>>,
  thisYear: number | null,
  thisMonth: number | null,
  setCurrentData: React.Dispatch<React.SetStateAction<MonthlyData | null>>
) => {
  // user값(user_id 비교용)
  const fetchedUser = await getUser();
  if (fetchedUser) {
    setUser(fetchedUser.id);

    const { data, error } = await browserClient
      .from("carbon_records")
      .select("*")
      .eq("user_id", fetchedUser.id)
      .eq("year", thisYear)
      .eq("month", thisMonth)
      .gte(
        "created_at",
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toISOString()
      )
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    // 가져온 데이터를 상태에 업데이트
    if (data && data.length > 0) {
      setCurrentData(data[0]); // 데이터가 있을 경우 업데이트
    } else {
      setCurrentData(null); // 데이터가 없으면 null로 설정
    }
  }
};

// 이번달 기준 전체 유저 data의 각 칼럼의 평균값
export const loadTotalUsersData = async (
  // setThisYear: React.Dispatch<React.SetStateAction<number | null>>,
  // setThisMonth: React.Dispatch<React.SetStateAction<number | null>>,
  thisYear: number | null,
  thisMonth: number | null,
  setTotalAvgData: React.Dispatch<React.SetStateAction<MonthlyData | null>>
) => {
  const { data, error } = await browserClient
    .from("carbon_records")
    .select("*")
    .eq("year", thisYear)
    .eq("month", thisMonth);

  if (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
  } else if (data.length > 0) {
    const avgData: MonthlyData = {
      water_usage: parseFloat(
        (
          data.reduce((acc, record) => acc + record.water_usage, 0) /
          data.length
        ).toFixed(2)
      ),
      water_co2: parseFloat(
        (
          data.reduce((acc, record) => acc + record.water_co2, 0) / data.length
        ).toFixed(2)
      ),
      gas_usage: parseFloat(
        (
          data.reduce((acc, record) => acc + record.gas_usage, 0) / data.length
        ).toFixed(2)
      ),
      gas_co2: parseFloat(
        (
          data.reduce((acc, record) => acc + record.gas_co2, 0) / data.length
        ).toFixed(2)
      ),
      electricity_usage: parseFloat(
        (
          data.reduce((acc, record) => acc + record.electricity_usage, 0) /
          data.length
        ).toFixed(2)
      ),
      electricity_co2: parseFloat(
        (
          data.reduce((acc, record) => acc + record.electricity_co2, 0) /
          data.length
        ).toFixed(2)
      ),
      waste_volume: parseFloat(
        (
          data.reduce((acc, record) => acc + record.waste_volume, 0) /
          data.length
        ).toFixed(2)
      ),
      waste_co2: parseFloat(
        (
          data.reduce((acc, record) => acc + record.waste_co2, 0) / data.length
        ).toFixed(2)
      ),
      carbon_emissions: parseFloat(
        (
          data.reduce((acc, record) => acc + record.carbon_emissions, 0) /
          data.length
        ).toFixed(2)
      ),
      car_usage: parseFloat(
        (
          data.reduce((acc, record) => acc + record.car_usage, 0) / data.length
        ).toFixed(2)
      ),
      car_co2: parseFloat(
        (
          data.reduce((acc, record) => acc + record.car_co2, 0) / data.length
        ).toFixed(2)
      )
    };

    setTotalAvgData(avgData);
  }
};
