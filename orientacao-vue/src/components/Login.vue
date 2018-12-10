<template>
  <div>
    <form
      @submit="checkForm"
      class="form-signin" method="POST" accept-charset="utf-8">
      <div class="text-center mb-4">
        <img src="/images/ninja.png" alt="">
        <h1 class="h3 mb-3 font-weight-normal"></h1>
      </div>

      <div class="form-label-group">
        <input v-model="inputUsuario" id="textNome" name="login" class="form-control" placeholder="Nome de usuário" required="" autofocus="" type="text">
        <label for="textNome">Usuario</label>
      </div>
      <div class="form-label-group">
        <input v-model="inputSenha" id="inputPassword" name="password" class="form-control" placeholder="Senha" required="" type="password">
        <label for="inputPassword">Senha</label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import Axios from 'axios'
let axios = Axios.create({
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
})
export default {
  name: "Login",
  data () {
    return {
      inputUsuario: '',
      inputSenha: ''
    }
  },
  methods: {
    checkForm (e) {
      e.preventDefault()
      this.login()
    },
    login() {
      let data = {login: this.inputUsuario, password: this.inputSenha};
      axios.post(this.$hostname + '/login', data)
        .then(res => {
          // alert(res.data.sucesso)
          localStorage.setItem('logado', res.data.sucesso)
          this.$router.push( '/professor' );
        })
        .catch(function (error) {
          alert(error)
            console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
