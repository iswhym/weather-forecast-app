// 時間変換関数
export const convertTime = (dt: number) => {
  const date = new Date(dt * 1000);
  return date.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 日付ごとに天気予報をグルーピングする関数
export const groupForecastsByDate = (forecasts: any[]): Record<string, any[]> => {
  const groupedForecasts: Record<string, any[]> = {};

  for (const forecast of forecasts) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    });

    if (!groupedForecasts[date]) {
      groupedForecasts[date] = [];
    }

    groupedForecasts[date].push(forecast);
  }

  return groupedForecasts;
};
