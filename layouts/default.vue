<template>
  <div>
    <nav>
      <Navigation></Navigation>
    </nav>
    <Nuxt />
    <footer>
      <div>My footer</div>
    </footer>
  </div>
</template>

<script>
import Navigation from '../../components/Navigation'
export default {
  components: { Navigation },}
</script>