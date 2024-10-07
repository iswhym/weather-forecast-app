<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs"></Breadcrumbs>

    <p class="mb-4 md:text-lg">天気予報を確認したい都道府県を選択してください。</p>
    <ul class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <li
        v-for="(prefecture, prefectureKey) in prefectures"
        :key="prefectureKey"
        class="border-neutral-500 border-2 rounded bg-white shadow-md hover:shadow-xl ease-out duration-300"
      >
        <NuxtLink
          :to="{ path: '/weather/', query: { prefecture: prefectureKey } }"
          class="block w-full p-4 md:py-6 text-center text-xl font-bold"
          >{{ prefecture }}</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const prefectures: Record<string, string> = {
  Tokyo: '東京',
  Hyogo: '兵庫',
  Oita: '大分',
  Hokkaido: '北海道',
};

const breadcrumbs = [{ name: 'ホーム', path: '/' }];
</script>
