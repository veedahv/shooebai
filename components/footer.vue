<template>
  <div class="bg-tertiary text-white">
    <div class="container py-5 px-4 mx-auto">
      <div>My footer</div>
      <div class="flex flex-wrap justify-between items-center">
        <!-- <div class="py-2 w-full md:w-2/4 lg:w-1/4"> -->
        <div class="py-2 w-full sm:w-2/4 lg:w-1/4">
          <nuxt-link to="/">Sho_oebai</nuxt-link>
          <p class="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus veniam nemo natus libero vero dolor incidunt doloribus
            repellat quidem. Repellat eligendi rerum itaque perspiciatis?
            Consectetur omnis nostrum sit libero. Dolor.
          </p>
          <p class="tel">
            <a href="tel:+">45765458</a>
          </p>
          <p class="mail">
            <a href="mailto:">axfjhhk</a>
          </p>
        </div>
        <!-- <div class="py-2 w-full md:w-2/5 lg:w-1/5"> -->
        <div class="py-2 w-1/2 sm:w-2/5 lg:w-1/5">
          <ul>
            <li class="foot-link">
              <nuxt-link to="/">ball</nuxt-link>
            </li>
            <li class="foot-link">
              <nuxt-link to="/Admin">Admin</nuxt-link> |
            </li>
          </ul>
          <!-- <button @click="signOut" v-if="isLoggedIn">logout</button> -->
          <!-- <button @click="signIn" v-else>login</button> -->
        </div>
        <!-- <div class="py-2 w-full md:w-2/5 lg:w-1/5"> -->
        <div class="py-2 w-1/2 sm:w-2/5 lg:w-1/5">
          <nuxt-link to="/">ball</nuxt-link> |
          <nuxt-link to="/Admin">Admin</nuxt-link> |
          <!-- <button @click="signOut" v-if="isLoggedIn">logout</button> -->
          <!-- <button @click="signIn" v-else>login</button> -->
        </div>
        <!-- <div class="py-2 w-full md:w-2/4 lg:w-1/4">3</div> -->
        <div class="py-2 w-full sm:w-2/4 lg:w-1/4">3</div>
      </div>
    </div>
  </div>
</template>