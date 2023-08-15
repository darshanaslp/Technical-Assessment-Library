<!-- <template>
  <router-view/>
</template> -->

 <template>
 <div id="app">
    <Header />
    <div class="container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Header from '@/views/Header.vue';
import Footer from '@/views/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script> 