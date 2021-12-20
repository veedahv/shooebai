<template>
  <div>
      <div class="flex min-h-screen items-stretch">
          <div class="w-2/12 sm:w-1/12 lg:w-1/5 xl:w-2/12 flex-auto">
          <AdminNav></AdminNav>
          </div>
          <div class="w-10/12 sm:w-11/12 lg:w-4/5 xl:w-10/12 flex-auto">
          <div class="">
    <nav>
      <Navigation keep-alive></Navigation>
    </nav>
    <main>
      <Nuxt keep-alive />
    </main>
    </div>
          </div>
      </div>
    <!-- <footer>
      <Footer></Footer>
    </footer> -->
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav'
// import Footer from '../components/footer'
import Navigation from '../components/Navigation'
export default {
  components: {
    AdminNav,
    // Footer, 
    Navigation 
    },}
</script>