<template>
<div>
  <nav>
    <router-link :to='{path: "/entropy"}'><a>ENTROPY</a></router-link>
    <router-link :to='{path: "/village"}'><a>VILLAGE</a></router-link>
    <router-link :to='{path: "/voices"}'><a>VOICES</a></router-link>
  </nav>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  setup() {
  },
}
</script>

<style>
*{
  margin: 0;
}

#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
}

nav a {
  font-size: 1.2em;
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
