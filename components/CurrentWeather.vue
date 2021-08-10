<template>
  <section class="section">
    <div class="section__bg" :style="{ backgroundImage }"></div>
    <header class="section__header">
      <h2 class="section__header__place"><slot name="place"></slot></h2>
      <h1 class="section__header__temp"><slot></slot></h1>
      <h3 class="section__header__desc"><slot name="desc"></slot></h3>
      <h4 class="section__header__min-max"><slot name="min-max"></slot></h4>
    </header>
  </section>
</template>

<script>
import { blendHexColors } from '~/helpers/psbc'

export default {
  props: {
    mainTemp: { type: Number, required: true, default: 21 },
  },
  data: () => ({
    cold: '#88FFF7',
    warm: '#FA1E0E',
  }),
  computed: {
    backgroundImage() {
      const MIDDLE_TEMP = 19
      const shade = this.mainTemp / (MIDDLE_TEMP * 2)

      const mainColor = blendHexColors(this.cold, this.warm, shade)

      const topColor = `${mainColor}90` //
      const midColor = `${mainColor}70` // Last two digits is alpha
      const botColor = `${mainColor}00` //

      return `linear-gradient(to bottom, ${topColor}, ${midColor}, ${botColor})`
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  padding: 15vh 5vw 0;
  position: relative;
  z-index: 1;

  &__bg {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70vh;
    z-index: -1;
  }

  &__header {
    * {
      font-weight: 300;
    }
    &__place {
      font-size: 2rem;
      letter-spacing: 0.5px;
      line-height: 1;
    }
    &__temp {
      font-size: 4.5rem;
      font-size: clamp(2.5rem, 25vw, 6rem);
      font-weight: 300;
      line-height: 0.85;
      letter-spacing: 1px;
      // margin-bottom: 0.25rem;
    }
    &__desc {
      line-height: 1.25;
      font-size: 1.85rem;
    }
  }
}
</style>
