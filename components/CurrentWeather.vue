<template>
  <section class="section">
    <div class="section__bg" :style="{ backgroundImage }"></div>
    <header class="section__header">
      <h2 class="section__header__place"><slot name="place"></slot></h2>
      <h1 class="section__header__temp"><slot></slot></h1>
      <h3 class="section__header__desc"><slot name="desc"></slot></h3>
      <h4 class="section__header__min-max"><slot name="min-max"></slot></h4>
    </header>
    <span
      ref="currentTime"
      class="section__current-time"
      @click="$nuxt.refresh"
    >
      {{ currentTime }}
    </span>
    <transition name="fade">
      <span
        v-if="showTooltip"
        ref="currentTimeTooltip"
        class="section__current-time-tooltip"
        @click="hideTooltip"
      >
        Click on time,<br />to refresh the data
      </span>
    </transition>
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
    showTooltip: false,
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
    setTimeout(() => {
      this.showTooltip = !localStorage.getItem('__showed_tooltip')
    }, 400)

    this.currentTime = Intl.DateTimeFormat('ua', {
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date())
    setInterval(() => {
      const newCurrentTime = Intl.DateTimeFormat('ua', {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date())
      if (newCurrentTime !== this.currentTime) this.currentTime = newCurrentTime
    }, 10)
  },
  methods: {
    hideTooltip() {
      localStorage.setItem('__showed_tooltip', true)
      this.showTooltip = false
    },
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
    position: fixed;
    top: 8%;
    right: 6vw;

    font-size: 1.1rem;
    color: var(--font-light);
    border: none;
    border-radius: 0.25rem;
    padding: 0.25rem 0.75rem;
    background-color: hsla(0, 0%, 50%, 35%);
    backdrop-filter: blur(0.2rem);
    cursor: pointer;

    // prettier-ignore
    box-shadow:
      0 2.8px 2.2px rgba(0, 0, 0, 0.02),
      0 6.7px 5.3px rgba(0, 0, 0, 0.028),
      0 12.5px 10px rgba(0, 0, 0, 0.035),
      0 22.3px 17.9px rgba(0, 0, 0, 0.042),
      0 41.8px 33.4px rgba(0, 0, 0, 0.05),
      0 100px 80px rgba(0, 0, 0, 0.07)
    ;
  }
  &__current-time-tooltip {
    position: fixed;
    top: calc(8% + 40px);
    right: 6vw;

    text-align: right;
    width: max-content;
    font-size: 0.8rem;
    color: white;
    background-color: hsla(0, 0%, 30%, 80%);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;

    // prettier-ignore
    box-shadow:
      0 2.8px 2.2px rgba(0, 0, 0, 0.02),
      0 6.7px 5.3px rgba(0, 0, 0, 0.028),
      0 12.5px 10px rgba(0, 0, 0, 0.035),
      0 22.3px 17.9px rgba(0, 0, 0, 0.042),
      0 41.8px 33.4px rgba(0, 0, 0, 0.05),
      0 100px 80px rgba(0, 0, 0, 0.07)
    ;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
