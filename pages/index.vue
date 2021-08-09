<template>
  <div class="main">
    <h1 class="main__header">
      Weather <span style="color: var(--primary-color-600)">Forecast</span>
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
</template>

<script>
export default {
  data: () => ({
    cityName: '',
  }),
  methods: {
    submitForm() {
      if (!this.cityName) return
      this.$nuxt.$loading.start()
      this.$router.push({
        name: 'city-name',
        params: { name: this.cityName.trim().toLowerCase() },
      })
    },
    resetForm() {
      this.cityName = ''
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss">
.main {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
</style>
