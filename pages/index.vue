<template>
  <div class="main--wrapper">
    <div class="main">
      <h1 class="main__header">
        Weather <span style="color: var(--secondary-color-600)">Forecast</span>
      </h1>
      <form
        class="main__form"
        @submit.prevent="submitForm"
        @reset.prevent="resetForm"
      >
        <label for="city" class="main__form__label">Your city is</label>
        <input
          id="city"
          ref="input"
          v-model="cityName"
          type="text"
          class="main__form__input"
          autofocus="autofocus"
          autocomplete="off"
          @keypress.enter.prevent="submitForm"
        />
        <div class="main__form__actions">
          <button class="button" type="submit">Search</button>
          <button class="button button--outlined" type="reset">Reset</button>
        </div>
      </form>
    </div>
    <div class="toggle">
      <VueToggles
        name="toggle"
        height="30"
        width="60"
        checked-bg="var(--secondary-color-600)"
        :value="autoDetermin"
        @click="autoDetermin = !autoDetermin"
      ></VueToggles>
      <label for="toggle" class="toggle__label">
        Auto determine <br />
        the city
      </label>
    </div>
  </div>
</template>

<script>
import slugify from 'voca/slugify'

export default {
  async asyncData({ app, req, $axios, error, redirect }) {
    const autoDetermin = app.$cookies.get('__forecast_auto_determine') || false
    if (!process.server) return { autoDetermin }
    const headers = req && req.headers ? Object.assign({}, req.headers) : {}
    const xRealIp = headers['x-real-ip']
      ? headers['x-real-ip'].split(',')[0].trim()
      : null

    if (!xRealIp || !autoDetermin) return { autoDetermin }

    const city = await $axios
      .$get(`https://ipapi.co/${xRealIp}/city`)
      .catch((err) => error(err.message))

    if (city) return redirect(`/city/${slugify(city)}`)

    return { autoDetermin, city, xRealIp }
  },
  data: () => ({
    cityName: '',
  }),
  watch: {
    autoDetermin(val) {
      this.$cookies.set('__forecast_auto_determine', val, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
      })
    },
  },
  methods: {
    toggleAutoDetermine(val) {
      this.autoDetermin = val
    },
    submitForm() {
      if (!this.cityName) return
      this.$nuxt.$loading.start()
      this.$router.push({
        name: 'city-name',
        params: { name: slugify(this.cityName) },
      })
    },
    resetForm() {
      this.cityName = ''
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 98vw;
  max-width: 600px;
  text-align: center;
  padding: 2rem 1rem;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 0.25rem;
  // prettier-ignore
  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.006),
    0 6.7px 5.3px rgba(0, 0, 0, 0.008),
    0 12.5px 10px rgba(0, 0, 0, 0.01),
    0 22.3px 17.9px rgba(0, 0, 0, 0.012),
    0 41.8px 33.4px rgba(0, 0, 0, 0.014),
    0 100px 80px rgba(0, 0, 0, 0.02),
    inset 0 0 5px 0 rgba(0, 0, 0, .02)
  ;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  gap: 1.5rem;

  &--wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 100vh;
  }

  &__header {
    font-size: 2.5rem;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // gap: 0.75rem;

    width: 100%;

    &__label {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
    &__input {
      width: 100%;
      max-width: 400px;
      margin-bottom: 1rem;
      padding: 0.1rem 0.5rem;

      $color: 127.5;
      appearance: none;
      outline: none;
      border: none;
      border-bottom: 2px solid rgba($color, $color, $color, 0.25);
      border-radius: 0;
      background-color: rgba($color, $color, $color, 0.05);

      font: inherit;
      font-size: 1.1rem;
      color: currentColor;
      text-align: center;

      // prettier-ignore
      transition:
        background-color 0.3s ease-in-out,
        border-bottom-color 0.3s ease-in-out;

      &:hover,
      &:focus {
        transition: none;
        background-color: rgba($color, $color, $color, 0.15);
        border-bottom-color: rgba($color, $color, $color, 0.75);
      }
    }
    &__actions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
}
.toggle {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;

  position: fixed;
  top: 1rem;
  left: 1rem;

  &__label {
    color: whitesmoke;
    font: inherit;
    font-size: 0.8rem;

    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: rgba($color: #333, $alpha: 0.9);
  }
}
</style>
