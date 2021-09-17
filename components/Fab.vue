<template>
  <NuxtLink ref="fab" class="fab" to="/">
    <slot></slot>
  </NuxtLink>
</template>

<script>
const MAX_SCROLLED_PIXELS = 65

export default {
  mounted() {
    window.addEventListener('scroll', this.listener)
  },
  methods: {
    listener(ev) {
      const opacity =
        window.scrollY < MAX_SCROLLED_PIXELS
          ? Math.abs(window.scrollY / MAX_SCROLLED_PIXELS - 1)
          : 0

      this.$el.style.opacity = opacity.toFixed(3)
      if (opacity === 0) this.$el.style.pointerEvents = 'none'
      else this.$el.style.pointerEvents = 'all'
    },
  },
}
</script>

<style lang="scss">
.fab {
  --size: 45px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 5.5%;
  left: 5vw;

  width: var(--size);
  height: var(--size);
  appearance: none;
  outline: none;
  color: #ddd;
  background-color: hsla(0, 0%, 50%, 35%);
  backdrop-filter: blur(0.2rem);
  border: none;
  border-radius: 0.25rem;

  transition: background-color 0.4s ease;
  text-decoration: none;
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

  &:focus,
  &:hover {
    background-color: hsla(0, 0%, 45%, 35%);
    transition: none;
  }

  & > svg {
    height: 50%;
    width: auto;

    fill: currentColor;
  }
}
</style>
