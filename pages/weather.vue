<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs"></Breadcrumbs>

    <h2 class="text-2xl font-bold mb-16">{{ japanesePrefName }}の天気予報</h2>

    <div v-if="groupedForecasts" class="space-y-12">
      <div v-for="(forecasts, date) in groupedForecasts" :key="date">
        <h3 class="mb-4 border-b border-solid border-slate-500 pb-2 text-xl">
          {{ date }}
        </h3>

        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <li v-for="forecast in forecasts" :key="forecast.dt" class="">
            <p class="mb-1 text-lg">
              {{ convertTime(forecast.dt) }}
            </p>
            <div class="flex items-center px-4 py-2 bg-white rounded-md">
              <div class="mr-4 border roudned w-[52px]">
                <img
                  :src="`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`"
                />
              </div>
              <p class="text-lg flex-1">
                {{ forecast.main.temp }}<span class="text-sm">&thinsp;℃</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { prefectures } from '~/utils/prefectures';
import { convertTime, groupForecastsByDate } from '~/utils/helpers';

// APIレスポンス型定義
interface ForecastResponse {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      icon: string;
    }[];
  }[];
}

const route = useRoute();
const nuxtApp = useNuxtApp();
const config = useRuntimeConfig();

const prefecture: Ref<string> = computed(
  () => <string>route.query.prefecture || 'Tokyo'
);

const japanesePrefName: Ref<string> = computed(
  () => prefectures[prefecture.value]
);

const breadcrumbs = [
  { name: 'ホーム', path: '/' },
  { name: `${japanesePrefName.value}の天気予報`, path: '/weather/' },
];

// データ取得
const { data, error } = await useAsyncData<ForecastResponse>(
  `weather_${prefecture.value}`,
  async () => {
    const response: ForecastResponse = await $fetch(
      `${config.public.weatherApiBase}/forecast`,
      {
        params: {
          q: prefecture.value,
          units: 'metric',
          lang: 'ja',
          APPID: config.public.openweathermapKey,
        },
      }
    );

    return response;
  },
  {
    // キャッシュ処理
    getCachedData: (key) =>
      nuxtApp.payload.data[key] || nuxtApp.static.data[key],
  }
);

const groupedForecasts: Ref<Record<string, any[]>> = computed(() => {
  return data.value ? groupForecastsByDate(data.value.list) : {};
});

const errorMessage: Ref<string> = computed(() => {
  if (error.value && error.value.statusCode >= 500) {
    return `${error.value.statusCode}エラー: サーバエラーが発生しました。`;
  } else if (error.value) {
    return `${error.value.statusCode}エラー: エラーが発生しました。`;
  } else {
    return '';
  }
});
</script>
