<template>
  <div class="slider">
    <div v-for="(hourData, idx) in data" :key="idx" class="slider__item">
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
</template>

<script>
export default {
  filters: {
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

.slider {
  $size: 12ch;
  $gap: 2rem;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: $size;
  gap: math.div($gap, 2);
  padding-inline: $gap;
  padding-block-start: $gap * 2;
  padding-block-end: $gap;

  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x proximity;
  scroll-padding-inline-start: $gap;
  width: 100%;
  position: relative;
  scrollbar-width: none;

  &__item {
    --surface-color: hsla(0, 0%, 0%, 5%);

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
      right: $gap * 2;
      inline-size: $gap;
      block-size: 100%;
      inset-block-start: 0;
      inset-inline-end: $gap * 2;
    }

    @media (prefers-color-scheme: dark) {
      --surface-color: hsla(0, 0%, 0%, 15%);
    }
  }
}
</style>
