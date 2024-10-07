<template>
  <nav aria-label="breadcrumb" class="mb-6 text-sm text-slate-500">
    <ul class="flex space-x-2">
      <li
        v-for="(breadcrumb, i) in breadcrumbs"
        :key="i"
        class="breadcrumb-item"
      >
        <span v-if="i === breadcrumbs.length - 1">{{ breadcrumb.name }}</span>
        <NuxtLink v-else :to="breadcrumb.path">
          {{ breadcrumb.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface Breadcrumb {
  name: string;
  path: string;
}

const props = defineProps<{ breadcrumbs: Breadcrumb[] }>();
</script>

<style lang="scss" scoped>
.breadcrumb-item {
  &:not(:first-child) {
    position: relative;
    padding-left: 1rem;

    &::before {
      content: '/';
      display: inline-block;
      position: absolute;
      left: 1px;
    }
  }
}
</style>
