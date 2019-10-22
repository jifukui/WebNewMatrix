<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
  window.console.log=function(params) {
    return ;
  }
export default {
    name: "App",
    
};
</script>

<style>
#app {
    font-family: "Arial";
}
</style>
