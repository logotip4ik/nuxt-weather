<template>
  <div>
    <CurrentWeather v-if="currentWeather" :main-temp="currentWeather.main.temp">
      <template #default>
        {{ currentWeather.main.temp | normalizeTemp }}
      </template>
      <template #place>
        {{ currentWeather.name }}
      </template>
      <template #desc>
        {{ currentWeather.weather[0].description }}
      </template>
      <template #min-max>
        {{ currentWeather.main.temp_min | normalizeTemp }}
        /
        {{ currentWeather.main.temp_max | normalizeTemp }}
      </template>
    </CurrentWeather>
    <!-- <template #sunrise>
        {{ currentWeather.sys.sunrise | normalizeDateTime }}
      </template>
      <template #sunset>
        {{ currentWeather.sys.sunset | normalizeDateTime }}
      </template> -->
    <pre>
      {{ JSON.stringify(currentWeather, null, 2) }}
    </pre>
  </div>
</template>

<script>
export default {
  filters: {
    normalizeTemp(temp) {
      return typeof temp === 'number' ? `${temp.toFixed(1)}°C` : `21°C`
    },
    normalizeDateTime(time) {
      if (typeof time !== 'number') return '12:00'

      return Intl.DateTimeFormat('ua', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(time))
    },
  },
  async asyncData({ params, $axios, $config }) {
    const { name } = params
    if (!process.server) {
      location.pathname = `city/${name}`
      return
    }

    const http = $axios.create({
      baseURL: $config.baseUrl,
      headers: {
        common: {
          'Cache-Control': `max-age: ${15 * 60 * 1000}`,
        },
      },
    })

    const currentWeather = await http.$get(
      `${$config.currentWeather}&q=${name}&appid=${$config.apiKey}`
    )
    const data = await http.$get(
      `${$config.oneCallWeather}&lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}&appid=${$config.apiKey}`
    )

    return { name: currentWeather.name, data, currentWeather }
  },
}
</script>

<style></style>
