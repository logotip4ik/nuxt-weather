<template>
  <section class="section">
    <div class="section__bg" :style="{ backgroundImage }"></div>
    <header class="section__header">
      <h2 class="section__header__place"><slot name="place"></slot></h2>
      <h1 class="section__header__temp"><slot></slot></h1>
      <h3 class="section__header__desc"><slot name="desc"></slot></h3>
      <h4 class="section__header__min-max"><slot name="min-max"></slot></h4>
    </header>
    <span class="section__current-time">{{ currentTime }}</span>
  </section>
</template>

<script>
export default {
  props: {
    mainTemp: { type: Number, required: true, default: 21 },
    mainColor: { type: String, required: true, default: '' },
  },
  data: () => ({
    currentTime: '',
  }),
  computed: {
    backgroundImage() {
      const topColor = `${this.mainColor}90` //
      const midColor = `${this.mainColor}70` // Last two digits is alpha
      const botColor = `${this.mainColor}00` //

      return `linear-gradient(to bottom, ${topColor}, ${midColor}, ${botColor})`
    },
  },
  mounted() {
    this.currentTime = Intl.DateTimeFormat('ua', {
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date())
    setInterval(() => {
      this.currentTime = Intl.DateTimeFormat('ua', {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date())
    }, 50)
  },
}
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  padding: 15vh 5vw 15vh;
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
  &__current-time {
    position: absolute;
    top: 10%;
    right: 5vw;
    transform: transalte(-50%, -50%);
    background-color: hsla(0, 0%, 50%, 50%);
    color: var(--font-light);
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
  }
}
</style>
