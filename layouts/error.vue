<template>
  <div class="w-full">
    <div class="w-full flex items-center justify-center text-center">
      <div class="py-28">
        <i class="fas fa-exclamation-circle text-red-500 text-7xl my-4"></i>
        <h1 class="text-6xl font-bold my-2">Oops...</h1>
        <h2 class="text-2xl font-semibold my-2" v-if="error.statusCode === 404">Page not found</h2>
        <h2 class="text-2xl font-semibold my-2" v-else>An error occurred</h2>
        <NuxtLink class="underline text-xl font-medium my-4" to="/">Go To Home Page</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};
</script>

<style scoped>
.fa-exclamation-circle {
  font-size: 130px;
}
</style>