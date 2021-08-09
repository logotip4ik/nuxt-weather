<template>
  <div>
    {{ name }}
    <pre>
      {{ JSON.stringify(currentWeather, null, 2) }}
    </pre>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios, $config }) {
    const { name } = params

    const currentWeatherUrl = $config.currentWeather(
      params.name,
      $config.apiKey
    )
    const currentWeather = await $axios.$get(currentWeatherUrl)

    return { name, currentWeather }
  },
}
</script>

<style></style>
