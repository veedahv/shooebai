<template>
  <div>
    <nav>
      <Navigation></Navigation>
    </nav>
    <main>
      <Nuxt keep-alive />
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Footer from '../components/footer'
import Navigation from '../components/Navigation'
export default {
  components: {
    Footer, Navigation },}
</script>