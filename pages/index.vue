<template>
  <div>Hello world</div>
</template>

<script>
export default {
  asyncData({ $config }) {
    console.log($config)
  },
}
</script>
