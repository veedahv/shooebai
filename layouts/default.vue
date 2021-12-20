<template>
  <div>
    <nav>
      <Navigation keep-alive></Navigation>
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
import { mapActions } from "vuex";
export default {
  components: {
    Footer, 
    Navigation },
  methods: {
    ...mapActions(["getProducts"]),
  },
  created() {
    this.getProducts();
  },
    }
</script>