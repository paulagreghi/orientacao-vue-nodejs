<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /*body {*/
    /*padding: 450px 0 0 0;*/
  /*}*/
  .tabledata {
    overflow-x: auto; height:450px;
  }
</style>
