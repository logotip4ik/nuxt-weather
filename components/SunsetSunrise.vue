<template>
  <div class="main">
    <span class="main__sunrise"><slot name="sunrise"></slot></span>
    <div class="main__line" :style="{ backgroundColor }">
      <span
        class="main__line__current"
        :style="{ backgroundColor, left: sunPosition }"
      ></span>
    </div>
    <span class="main__sunset"><slot name="sunset"></slot></span>
  </div>
</template>

<script>
import { blendHexColors } from '~/helpers/psbc'

export default {
  props: {
    sunset: { type: Number, required: true, default: 0 },
    sunrise: { type: Number, required: true, default: 0 },
    mainColor: { type: String, required: true, default: '' },
  },
  data: () => ({
    sunPosition: 0,
  }),
  computed: {
    backgroundColor() {
      if (process.server) return blendHexColors(this.mainColor, '#ffffff', 0.5)

      const prefersDarkTheme = window.matchMedia('prefers-dark-theme').matches
      return blendHexColors(
        this.mainColor,
        '#ffffff',
        prefersDarkTheme ? 0.25 : 0.5
      )
    },
  },
  mounted() {
    this.sunPosition = this.getSunPosition()
    //                 s     m = 1m
    const interval = 1000 * 60
    setInterval(() => {
      this.sunPosition = this.getSunPosition()
    }, interval)
  },
  methods: {
    getSunPosition() {
      const now = Date.now()
      // Delta between sunset and sunrise
      const deltaA = (this.sunset - this.sunrise) * 1000
      // Delta between current time and sunrise
      const deltaB = now - this.sunrise * 1000
      const left = deltaB / deltaA
      const leftNormalized = left < 0 ? 0 : left > 1 ? 1 : left
      const leftFormated = `${leftNormalized * 100}%`
      return leftFormated
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 5vh 5vw 0;
  margin: 0 auto;
  width: 95vw;
  // max-width: 900px;
  // outline: 1px solid red;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  &__line {
    width: 85%;
    height: 7px;
    border-radius: 0.25rem;
    background-color: #ff8700;
    position: relative;

    &__current {
      position: absolute;
      top: 50%;
      left: 77%;
      transform: translate(-50%, -50%);

      $size: 15px;
      width: $size;
      height: $size;
      border-radius: 50%;
      border: 2px solid white;

      &::after {
        content: 'current';
        position: absolute;
        top: 110%;
        left: 50%;
        transform: translate(-50%, 0);

        font-size: 0.8rem;
      }
    }
  }

  &__sunrise,
  &__sunset {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 85%;
      left: 52%;
      transform: translate(-50%, 0);

      font-size: 0.8rem;
    }
  }
  &__sunrise::after {
    content: 'sunrise';
  }
  &__sunset::after {
    content: 'sunset';
  }
}
</style>
