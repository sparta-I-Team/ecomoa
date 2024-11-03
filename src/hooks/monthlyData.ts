import { getUser } from "@/api/auth-actions";
import browserClient from "@/utlis/supabase/browserClient";

type SetUserType = (userId: string | null) => void; // setUser의 타입 정의

// 이번달 기준 내 최신 data
export const loadUserAndFetchData = async (
  setUser: SetUserType,
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

// 5달치 평균 배출량 fetch
interface MonthlyData {
  water_usage: number;
  water_co2: number;
  gas_usage: number;
  gas_co2: number;
  electricity_usage: number;
  electricity_co2: number;
  waste_volume: number;
  waste_co2: number;
  carbon_emissions: number;
  car_usage: number;
  car_co2: number;
  year: number;
  month: number;
}

export const loadRecentFiveMonthsEmissions = async (
  thisYear: number,
  thisMonth: number,
  monthsToFetch: number
) => {
  try {
    let startMonth = thisMonth - monthsToFetch + 1;
    let startYear = thisYear;

    while (startMonth <= 0) {
      startMonth = 12 + startMonth;
      startYear--;
    }

    const targetDates = [];
    for (let i = 0; i < 5; i++) {
      let targetMonth = startMonth + i;
      let targetYear = startYear;

      while (targetMonth > 12) {
        targetMonth = targetMonth - 12;
        targetYear++;
      }

      targetDates.push({ year: targetYear, month: targetMonth });
    }

    const { data, error } = await browserClient
      .from("carbon_records")
      .select("*")
      .or(
        targetDates
          .map((d) => `and(year.eq.${d.year},month.eq.${d.month})`)
          .join(",")
      );

    if (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      return null;
    }

    const groupedData = targetDates
      .map((date) => {
        const monthData = data.filter(
          (d) => d.year === date.year && d.month === date.month
        );

        if (monthData.length === 0) return null;

        const avgData: MonthlyData = {
          year: date.year,
          month: date.month,
          water_usage: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.water_usage, 0) /
              monthData.length
            ).toFixed(2)
          ),
          water_co2: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.water_co2, 0) /
              monthData.length
            ).toFixed(2)
          ),
          gas_usage: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.gas_usage, 0) /
              monthData.length
            ).toFixed(2)
          ),
          gas_co2: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.gas_co2, 0) /
              monthData.length
            ).toFixed(2)
          ),
          electricity_usage: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.electricity_usage, 0) /
              monthData.length
            ).toFixed(2)
          ),
          electricity_co2: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.electricity_co2, 0) /
              monthData.length
            ).toFixed(2)
          ),
          waste_volume: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.waste_volume, 0) /
              monthData.length
            ).toFixed(2)
          ),
          waste_co2: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.waste_co2, 0) /
              monthData.length
            ).toFixed(2)
          ),
          carbon_emissions: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.carbon_emissions, 0) /
              monthData.length
            ).toFixed(2)
          ),
          car_usage: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.car_usage, 0) /
              monthData.length
            ).toFixed(2)
          ),
          car_co2: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.car_co2, 0) /
              monthData.length
            ).toFixed(2)
          )
        };

        return avgData;
      })
      .filter((data): data is MonthlyData => data !== null);

    return groupedData;
  } catch (error) {
    console.error("데이터 로딩 중 오류 발생:", error);
    return null;
  }
};

// 내 5달치 데이터
export const loadMyRecentFiveMonthsEmissions = async (
  thisYear: number,
  thisMonth: number,
  monthsToFetch: number
) => {
  try {
    // user_id를 가져오기
    const fetchedUser = await getUser();
    if (!fetchedUser) {
      console.error("사용자를 가져오는 중 오류가 발생했습니다.");
      return null;
    }

    const user_id = fetchedUser.id;
    console.log(user_id);

    let startMonth = thisMonth - monthsToFetch + 1;
    let startYear = thisYear;

    while (startMonth <= 0) {
      startMonth = 12 + startMonth;
      startYear--;
    }

    const targetDates = [];
    for (let i = 0; i < 5; i++) {
      let targetMonth = startMonth + i;
      let targetYear = startYear;

      while (targetMonth > 12) {
        targetMonth = targetMonth - 12;
        targetYear++;
      }

      targetDates.push({ year: targetYear, month: targetMonth });
    }

    // user_id 조건 추가하여 데이터 조회
    const { data, error } = await browserClient
      .from("carbon_records")
      .select("*")
      .eq("user_id", user_id)
      .or(
        targetDates
          .map((d) => `and(year.eq.${d.year},month.eq.${d.month})`)
          .join(",")
      )
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      return null;
    }

    const groupedData = targetDates
      .map((date) => {
        const monthData = data.filter(
          (d) => d.year === date.year && d.month === date.month
        );

        if (monthData.length === 0) return null;

        const avgData: MonthlyData = {
          year: date.year,
          month: date.month,
          water_usage: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.water_usage, 0) /
              monthData.length
            ).toFixed(2)
          ),
          water_co2: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.water_co2, 0) /
              monthData.length
            ).toFixed(2)
          ),
          gas_usage: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.gas_usage, 0) /
              monthData.length
            ).toFixed(2)
          ),
          gas_co2: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.gas_co2, 0) /
              monthData.length
            ).toFixed(2)
          ),
          electricity_usage: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.electricity_usage, 0) /
              monthData.length
            ).toFixed(2)
          ),
          electricity_co2: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.electricity_co2, 0) /
              monthData.length
            ).toFixed(2)
          ),
          waste_volume: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.waste_volume, 0) /
              monthData.length
            ).toFixed(2)
          ),
          waste_co2: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.waste_co2, 0) /
              monthData.length
            ).toFixed(2)
          ),
          carbon_emissions: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.carbon_emissions, 0) /
              monthData.length
            ).toFixed(2)
          ),
          car_usage: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.car_usage, 0) /
              monthData.length
            ).toFixed(2)
          ),
          car_co2: Number(
            (
              monthData.reduce((acc, cur) => acc + cur.car_co2, 0) /
              monthData.length
            ).toFixed(2)
          )
        };

        return avgData;
      })
      .filter((data): data is MonthlyData => data !== null);

    return groupedData;
  } catch (error) {
    console.error("데이터 로딩 중 오류 발생:", error);
    return null;
  }
};
