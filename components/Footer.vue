<template>
  <footer class="footer" :style="{ backgroundColor: mainColor }">
    <h4 class="footer__heading">NUXT_FORECAST<br /><span>©2021</span></h4>
    <div class="footer__info">
      <h5 class="footer__info__heading">Developed with:</h5>
      <ul class="footer__info__links">
        <li>
          <a
            href="https://openweathermap.org/api"
            class="footer__info__links__item"
            target="_blank"
            >OpenWeatherApi</a
          >
        </li>
        <li>
          <a
            href="https://bogdankostyuk.xyz"
            class="footer__info__links__item"
            target="_blank"
            >BogdanKostyuk</a
          >
        </li>
        <li>
          <a
            href="https://github.com/logotip4ik/nuxt-weather"
            class="footer__info__links__item"
            target="_blank"
            >Source Code</a
          >
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  props: { mainColor: { type: String, required: true, default: '' } },
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  margin-top: 10vh;
  padding: 7vh 5vw;

  display: flex;
  justify-content: space-around;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2.5rem;

  &__heading {
    font-weight: 400;
    line-height: 0.9;

    span {
      font-size: 2rem;
      letter-spacing: 10px;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &__heading {
      font-weight: 400;
      margin-bottom: 0.5rem;
    }

    &__links {
      list-style-type: none;
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: inherit;
      gap: 0.25rem;

      &__item {
        color: currentColor;
        font-size: 0.9rem;
        text-decoration: none;

        &:hover,
        &:focus {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 378px) {
    justify-content: center;
    &__info {
      align-items: center;
    }
  }
}
</style>
