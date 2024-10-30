import { getUser } from "@/api/auth-actions";
import { MonthlyData } from "@/types/calculate";
import browserClient from "@/utlis/supabase/browserClient";

type SetUserType = (userId: string | null) => void; // setUser의 타입 정의
type SetCurrentMonthlyType = (monthlyData: MonthlyData | null) => void;
type SetTotalCurrentMonthlyType = (monthlyData: MonthlyData | null) => void;

// 이번달 기준 내 최신 data
export const loadUserAndFetchData = async (
  setUser: SetUserType,
  setCurrentMonthly: SetCurrentMonthlyType
) => {
  // 유저 정보
  const fetchedUser = await getUser();
  if (fetchedUser) {
    setUser(fetchedUser.id);

    const { data, error } = await browserClient
      .from("carbon_records")
      .select("*")
      .eq("user_id", fetchedUser.id)
      .gte(
        "created_at",
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toISOString()
      ) // 이번 달의 첫날 이후의 데이터만 가져옴
      .order("created_at", { ascending: false }) // 최신 순으로 정렬
      .limit(1);

    if (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } else {
      setCurrentMonthly(data[0]);
      console.log(data[0]);
    }
  }
};

// 이번달 기준 전체 유저 data의 각 칼럼의 평균값
export const loadTotalUsersData = async (
  setTotalCurrentMonthly: SetTotalCurrentMonthlyType
) => {
  const { data, error } = await browserClient
    .from("carbon_records")
    .select("*")
    .gte(
      "created_at",
      new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
    );

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

    setTotalCurrentMonthly(avgData);
    console.log("Averages:", avgData);
  }
};
