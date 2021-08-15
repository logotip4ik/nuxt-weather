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
    <ForecastList :data="data.hourly">Hourly Forecast:</ForecastList>
    <ForecastList :data="data.daily.slice(1, -1)" display-day>
      Daily Forecast:
    </ForecastList>
    <Footer :main-color="mainColor"></Footer>
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

    const http = await $axios.create({
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
  head() {
    if (!this.currentWeather) return { title: 'Forecast' }
    const description = this.currentWeather.weather[0].description
    const temp = `${this.currentWeather.main.temp.toFixed(1)}°C`
    const { pop } = this.data.daily[0]
    const { icon } = this.data.daily[0].weather[0]

    let message = 'Go ahead, and discover world around you!'
    if (pop > 0.25 && pop < 0.5)
      message =
        'Go ahead, but be aware, it could posibly rain a bit ¯\\_(ツ)_/¯'
    if (pop > 0.5 && pop < 0.75)
      message =
        'Try to stay at home, becouse it will rain, posibly, idk ¯\\_(ツ)_/¯'
    if (pop > 0.75)
      message =
        'Stay at home or find a shelter, becouse i have no doubt it will rain'

    return {
      title: `${this.name} - Forecast`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Currently in "${
            this.name
          }": ${description} - ${temp}, chance of precipitation: ${
            pop * 100
          }%. ${message}`,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: `Currently in "${
            this.name
          }": ${description} - ${temp}, chance of precipitation: ${
            pop * 100
          }%. ${message}`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: `${this.name} - Forecast`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
          content: `https://openweathermap.org/img/wn/${icon}@4x.png`,
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: `${this.name} - Forecast`,
        },
      ],
    }
  },
}
</script>

<style></style>
