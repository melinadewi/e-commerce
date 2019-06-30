<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Products</router-link> |
      <router-link to="/user">Account</router-link> |
      <router-link to="/cart">Cart</router-link> |
    </div>
    <div id="maincontent">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#maincontent {
  margin: 50px 10%
}
</style>
