<template>
  <div v-if="currentWeather">
    <CurrentWeather
      :main-temp="currentWeather.main.temp"
      :main-color="mainColor"
    >
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
    <SunsetSunrise
      :sunrise="currentWeather.sys.sunrise"
      :sunset="currentWeather.sys.sunset"
      :main-color="mainColor"
    >
      <template #sunrise>{{
        currentWeather.sys.sunrise | normalizeTime
      }}</template>
      <template #sunset>{{
        currentWeather.sys.sunset | normalizeTime
      }}</template>
    </SunsetSunrise>
    <!-- <template #sunrise>
        {{ currentWeather.sys.sunrise | normalizeDateTime }}
      </template>
      <template #sunset>
        {{ currentWeather.sys.sunset | normalizeDateTime }}
      </template> -->
    <!-- <pre v-if="data">
      {{ JSON.stringify(Object.keys(data.daily[0]), null, 2) }} 
      {{ data.daily[0].dt | normalizeDateTime }}
    </pre> -->
  </div>
</template>

<script>
import { blendHexColors } from '~/helpers/psbc'

export default {
  filters: {
    normalizeTemp(temp) {
      return typeof temp === 'number' ? `${temp.toFixed(1)}°C` : `21°C`
    },
    normalizeTime(time) {
      if (typeof time !== 'number') return '12:00'

      return Intl.DateTimeFormat('ua', {
        hourCycle: 'h23',
        timeStyle: 'short',
      }).format(new Date(time * 1000))
    },
    normalizeDateTime(time) {
      if (typeof time !== 'number') return '12:00'

      return Intl.DateTimeFormat('ua', {
        hourCycle: 'h23',
        hour12: false,
        timeStyle: 'short',
        dateStyle: 'short',
      }).format(new Date(time * 1000))
    },
  },
  async asyncData({ params, $axios, $config }) {
    const { name } = params
    if (!process.server) {
      const url = `city/${name}`
      history.pushState(null, null, url)
      location.pathname = url
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

    const cold = '#88FFF7'
    const warm = '#FA1E0E'

    const MIDDLE_TEMP = 19
    const shade = currentWeather.main.temp / (MIDDLE_TEMP * 2)

    const mainColor = blendHexColors(cold, warm, shade)

    return { name: currentWeather.name, data, currentWeather, mainColor }
  },
  data: () => ({
    primaryColor: '',
  }),
}
</script>

<style></style>
