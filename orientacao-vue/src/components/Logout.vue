<template>

</template>

<script>
import Axios from 'axios'
let axios = Axios.create({
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
})
export default {
  name: "Logout",
  created() {
    axios.get(this.$hostname + '/logout')
      .then(res => {
        // alert(res.data.profs)
        localStorage.setItem('logado', '')
        this.$router.push({path: '/'});
      })
  }
}
</script>

<style scoped>

</style>
