<template>
  <section class="section">
    <h3 class="section__heading">Hourly Forecast:</h3>
    <div class="section__slider">
      <div
        v-for="(hourData, idx) in data"
        :key="idx"
        class="section__slider__item"
      >
        <img
          :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
          :alt="`${hourData.weather[0].main} icon`"
          loading="lazy"
          class="section__slider__item__image"
        />
        <p class="section__slider__item__heading">
          {{ hourData.weather[0].main | toTitleCase }}
        </p>
        <span>
          {{ hourData.temp | normalizeTemp }} /
          {{ hourData.pop | normalizePercentage }}
        </span>
        <span
          >{{ hourData.dt | normalizeToTime }}
          {{ hourData.dt | normalizeToDate }}
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
    normalizePercentage(percentage) {
      return `${percentage % 1 === 0 ? percentage : percentage.toFixed(1)}%`
    },
    normalizeTemp(temp) {
      return `${temp.toFixed(1)}°C`
    },
    normalizeToDate(t) {
      return Intl.DateTimeFormat('ua', { weekday: 'short' })
        .format(new Date())
        .split('')
        .map((val, i) => (i === 0 ? val.toUpperCase() : val))
        .join('')
    },
    normalizeToTime(t) {
      return Intl.DateTimeFormat('ua', {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(t * 1000))
    },
  },
  props: { data: { type: Array, required: true, default: () => [] } },
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
    $size: 12ch;
    $gap: 2rem;

    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: $size;
    gap: math.div($gap, 2);
    padding-inline: $gap;

    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scroll-padding-inline-start: $gap;
    width: 100%;
    position: relative;
    scrollbar-width: none;

    &__item {
      --surface-color: hsla(0, 0%, 0%, 7%);

      scroll-snap-align: start;

      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      margin: 0;
      // outline: 1px solid red;

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
