<template>
  <div id="app">
    <stickr-nav></stickr-nav>
    <div class="stickr-body">
      <router-view/>
    </div>
    <stickr-footer></stickr-footer>
  </div>
</template>

<script>
import NavigationComponent from '@/components/navigation'
import FooterComponent from '@/components/footer'
import store from '@/store'

export default {
  components : {
    'stickr-nav' : NavigationComponent,
    'stickr-footer' : FooterComponent
  },
  created() {
    store.dispatch('load')
    console.log("API", process.env.VUE_APP_API_URL)
  }
}
</script>


<style lang="scss">
@import '/sass/main';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  @include display-flex();
  flex-flow: column;
  min-height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.stickr-body {
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
</style>
