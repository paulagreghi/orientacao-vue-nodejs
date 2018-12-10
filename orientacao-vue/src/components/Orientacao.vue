<template>
  <div class="container ">
    <Navbar></Navbar>
    <div class="col-md-12 mt-5 pt-5 row">
      <h4 class="">Cadastro de Orientações</h4>
      <form
        @submit="checkValues"
        method="post" class="needs-validation col-md-12" novalidate>
        <div class="row">
          <div class="col-md">
            <label for="name">Nome do Orientando</label>
            <input v-model="inputAluno" type="text" :class="(EinputAluno)? 'is-invalid' : ''" class="form-control" name="aluno" id="name" aria-describedby="inputGroupPrepend3" required>
            <div class="invalid-feedback" v-if="EinputAluno">
              Por favor, digite o nome do Orientando.
            </div>
          </div>
        </div>
        <div class="">
          <label for="titulo">Título do Projeto Homologado</label>
          <input v-model="inputTitulo" type="text"  :class="(EinputTitulo)? 'is-invalid' : ''"  class="form-control" name="titulo" id="titulo" aria-describedby="inputGroupPrepend3" placeholder="" required>
          <div class="invalid-feedback" v-if="EinputTitulo">
            Por favor digite o título do projeto.
          </div>
        </div>
        <div class="">
          <label for="professor">Professor</label>
          <select v-model="inputProfessor" :class="(EinputProfessor)? 'is-invalid' : ''"  class="custom-select d-block w-100" name="professor" id="professor" aria-describedby="inputGroupPrepend3" required>
            <option value="Escolha">Escolha...</option>
            <option  v-for="item in professores" :value="item._id">{{ item.nome }}</option>
          </select>
          <div class="invalid-feedback" v-if="EinputProfessor">
            Por favor, escolha um professor
          </div>
          <hr class="">
          <button @click="checkValues" class="btn btn-primary btn-lg btn-block" type="submit">Salvar</button>
        </div>
      </form>
    </div>
    <div class="col-md-12 tabledata">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Aluno</th>
          <th scope="col">Título</th>
          <th scope="col">Professor</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="orienta in orientacao">
            <td>{{ orienta.aluno  }}</td>
            <td>{{ orienta.titulo  }}</td>
            <td>{{ orienta.professor.nome }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Axios from "axios"
let axios = Axios.create({
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
})
export default {
  name: "Orientacao",
  data () {
    return {
      professores: [],
      orientacao: [],
      inputAluno: '',
      EinputAluno: false,
      inputTitulo: '',
      EinputTitulo: false,
      inputProfessor: 'Escolha',
      EinputProfessor: false,
    }
  },
  components: {Navbar},
  created ( ){
    this.getOrientadores()
  },
  methods: {
    checkValues(e) {
      e.preventDefault()
      if (!this.inputAluno || this.inputAluno === '') {
        this.EinputAluno = true;
      } else if (!this.inputTitulo || this.inputTitulo === '') {
        this.EinputTitulo = true;
      } else if (this.inputProfessor === 'Escolha') {
        this.EinputProfessor = true;
      } else {
        this.EinputAluno = false;
        this.EinputTitulo = false;
        this.EinputProfessor = false;

        this.cadastrar()
      }
    },
    cadastrar() {
      let data = {aluno: this.inputAluno, professor: this.inputProfessor, titulo: this.inputTitulo};
      axios.post(this.$hostname + '/orientacao', data)
        .then(res => {
          alert(res.data.sucesso)
          this.getOrientadores()
        })
        .catch(function (error) {
          alert(error)
          console.log(error)
        })

    },
    getOrientadores() {
      axios.get(this.$hostname + '/professor')
        .then(res => {
          // alert(res.data.profs)
          this.professores = res.data.profs
        })
        .catch(function (error) {
          // alert(error)
          console.log(error)
        })
      axios.get(this.$hostname + '/orientacao')
        .then(res => {
          // alert(res.data.profs)
          this.orientacao = res.data.orientacao
        })
        .catch(function (error) {
          // alert(error)
          console.log(error)
        })
    }
  }
}
</script>

<style>
  body {
  padding: 350px 0 0 0;
  }

</style>
