<template>
  <section class="section">
    <h3 class="section__heading"><slot></slot></h3>
    <div class="section__slider">
      <div
        v-for="(value, idx) in data"
        :key="idx"
        class="section__slider__item"
      >
        <img
          :src="`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`"
          :alt="`${value.weather[0].main} icon`"
          loading="lazy"
          class="section__slider__item__image"
        />
        <p class="section__slider__item__heading">
          {{ value.weather[0].main | toTitleCase }}
        </p>
        <span>
          {{ value.temp | normalizeTemp }} /
          {{ value.pop | normalizePercentage }}
        </span>
        <span>
          <span v-if="!displayDay">{{ value.dt | normalizeToTime }}</span>
          {{ normalizeToDate(value.dt) }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  filters: {
    toTitleCase(string) {
      return string
        .split('')
        .map((val, i) => (i === 0 ? val.toUpperCase() : val))
        .join('')
    },
    normalizePercentage(p) {
      const percentage = p * 100
      return `${percentage % 1 === 0 ? percentage : percentage.toFixed(1)}%`
    },
    normalizeTemp(temp) {
      // return `${temp.toFixed(1)}°C`
      return typeof temp === 'number'
        ? `${temp.toFixed(1)}°C`
        : `${temp.day.toFixed(1)}°C`
    },
    normalizeToTime(t) {
      return Intl.DateTimeFormat('ua', {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(t * 1000))
    },
  },
  props: {
    displayDay: { type: Boolean, required: false, default: false },
    data: { type: Array, required: true, default: () => [] },
  },
  methods: {
    normalizeToDate(milliseconds) {
      return Intl.DateTimeFormat('ua', {
        weekday: this.displayDay ? 'long' : 'short',
      })
        .format(new Date(milliseconds * 1000))
        .split('')
        .map((val, i) => (i === 0 ? val.toUpperCase() : val))
        .join('')
    },
  },
}
</script>

<style lang="scss" scoped>
@use "sass:math";

.section {
  padding-block: 10vh 0;

  &__heading {
    font-weight: 400;
    padding-inline: 5vw;
    padding-block: 0 5vh;
  }

  &__slider {
    $size: 13ch;
    $gap: 2.5rem;

    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: $size;
    gap: math.div($gap, 2);
    padding-inline: 5vw;

    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scroll-padding-inline-start: 5vw;
    width: 100%;
    position: relative;
    // Firefox
    scrollbar-width: none;

    // Chrome, Safari...
    &::-webkit-scrollbar {
      display: none;
    }

    &__item {
      --surface-color: hsla(0, 0%, 0%, 7%);

      scroll-snap-align: start;

      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      margin: 0;

      text-align: center;
      border-radius: 0.25rem;
      position: relative;
      user-select: none;
      padding: 0.5rem;
      cursor: pointer;
      background-color: var(--surface-color);
      // prettier-ignore
      box-shadow:
      0 0.1px 0.7px rgba(0, 0, 0, 0.004),
      0 0.2px 2.2px rgba(0, 0, 0, 0.006),
      0 1px 10px rgba(0, 0, 0, 0.01)
    ;

      transition: background-color 0.3s ease;

      // &:hover,
      // &:focus {
      //   background-color: hsl(0, 0%, 50%, 0.2);
      //   transition: none;
      // }

      &:last-child::after {
        content: '';
        position: absolute;
        width: $gap;
        height: 100%;
        left: $size;
        inline-size: $gap;
        block-size: 100%;
        inset-block-start: 0;
        inset-inline-end: $gap * 2;
      }

      &__image {
        width: 6ch;
        height: auto;
        display: block;
      }
      &__heading {
        padding-block-end: 0.5rem;
        font-size: 1.1rem;
      }

      @media (prefers-color-scheme: dark) {
        --surface-color: hsla(0, 0%, 0%, 11%);
      }
    }
  }
}
</style>
