// Haversine 공식을 사용하여 두 지점 간의 거리를 계산
export const calculateDistance = (
  lat1: number, // 시작점 위도
  lon1: number, // 시작점 경도
  lat2: number, // 도착점 위도
  lon2: number // 도착점 경도
): number => {
  const R = 6371; // 지구의 반경 (km)

  // 위도/경도를 라디안으로 변환
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const latDiff = ((lat2 - lat1) * Math.PI) / 180;
  const lonDiff = ((lon2 - lon1) * Math.PI) / 180;

  // Haversine 공식
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(lonDiff / 2) *
      Math.sin(lonDiff / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 최종 거리 (km)
  return R * c;
};
