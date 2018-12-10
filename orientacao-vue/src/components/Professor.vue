<template>
  <div>
    <div class="container">

      <Navbar></Navbar>
      <div class="">
        <div class="">
          <div class="col-md-10">
            <h4 class="mb-3">Cadastro de Professores</h4>
            <form
              @submit="checkValues"
              method="post" class="needs-validation" >
              <div class="row">
                <div class="col-md mb-3">
                  <label for="firstName">Nome</label>
                  <input v-model="inputNome" type="text" :class="(EinputNome)? 'is-invalid' : ''"  class="form-control" name="nome" id="nome" placeholder="" value="" aria-describedby="inputGroupPrepend3" required>
                  <div v-if="EinputNome" class="invalid-feedback">
                    Valid name is required.
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md mb-3">
                  <label for="departamento">Departamento</label>
                  <select v-model="inputDepartamento" :class="(EinputDepartamento)? 'is-invalid' : ''" class="custom-select d-block w-100" aria-describedby="inputGroupPrepend3" name="departamento" required>
                    <option value="Escolha">Escolha...</option>
                    <option value="DACIN">DACIN - Departamento Acadêmico de Ciências da Natureza</option>
                    <option value="DACHS">DACHS - Departamento Acadêmico de Ciências Humanas e Sociais</option>
                    <option value="DACOM">DACOM - Departamento Acadêmico de Computação</option>
                    <option value="DAELE">DAELE - Departamento Acadêmico de Elétrica</option>
                    <option value="DAMEC">DAMEC - Departamento Acadêmico de Mecânica</option>
                  </select>
                  <div v-if="EinputDepartamento" class="invalid-feedback">
                    Department is required.
                  </div>
                </div>
              </div>
              <button @click="checkValues" class="btn btn-primary btn-lg btn-block" type="submit">Salvar</button>
              <hr class="mb-4">
            </form>
            <div class="tabledata" >

              <table class="table">
                <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Departamento</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="professor in professores">
                  <td>{{ professor.nome }}</td>
                  <td>{{ professor.departamento }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Axios from "axios"
const axios = Axios.create({
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
})

export default {
  name: "Professor",
  data () {
    return {
      professores: [],
      inputNome: '',
      inputDepartamento: 'Escolha',
      EinputNome: false,
      EinputDepartamento: false
    }
  },
  components: {Navbar},
  created ( ){
    this.getProfessores()
  },
  methods: {
    checkValues(e) {
      e.preventDefault()
      if (!this.inputNome || this.inputNome === '') {
        this.EinputNome = true;
      } else if (this.inputDepartamento === 'Escolha') {
        this.EinputDepartamento = true;
      } else {
        this.EinputNome = false
        this.EinputDepartamento = false;

        this.cadastrar()
      }
    },
    cadastrar() {
      // e.preventDefault()
      let data = {nome: this.inputNome, departamento: this.inputDepartamento};
      axios.post(this.$hostname + '/professor', data)
        .then(res => {
          alert(res.data.sucesso)
          this.getProfessores()
        })
        .catch(function (error) {
          alert(error)
          console.log(error)
        })

    },
    getProfessores() {
      axios.get(this.$hostname + '/professor')
        .then(res => {
          // alert(res.data.profs)
          this.professores = res.data.profs
        })
        .catch(function (error) {
          // alert(error)
          console.log(error)
        })
    }
  }
}
</script>

<style >
  body {
    padding: 350px 0 0 0;
  }

</style>
