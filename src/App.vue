<template>
  <div class="container">
    <div class="d-flex flex-row row mx-md-n5">
      <button
        id="btn-new"
        @click="onNew"
        style="margin: 10px;"
        type="button"
        class="btn btn-primary col py-3 px-md-5 border"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@mdo"
      >
        Novo Registro
      </button>

      <!-- Button busca -->
      <div class="d-inline p-2 col py-3 px-md-5 border">
        <input class="col-md-6" type="text" id="buscar" v-model="busca" />
      </div>
    </div>

    <!-- Modal New or Edit -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="titulo-dialog" class="modal-title">
              {{ title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Fechar"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputNome">Nome</label>
                  <input
                    v-model="nome"
                    type="text"
                    class="form-control"
                    id="inputNome"
                    placeholder="Nome"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Sobrenome</label>
                  <input
                    v-model="sobrenome"
                    type="text"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Sobrenome"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputAddress">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="inputAddress"
                    placeholder="email@email.com"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputFone">Telefone</label>
                  <input
                    v-model="telefone"
                    type="text"
                    v-mask="'(##)#####-####'"
                    class="form-control"
                    id="inputFone"
                    placeholder="(XX)XXXXX-XXXX"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="form-check">
                  <input
                    v-model="pessoaJuridca"
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    Pessoa Juridica
                  </label>
                </div>

                <div class="form-group" v-if="pessoaJuridca">
                  <label for="inputCNPJ">CNPJ</label>
                  <input
                    v-model="numDoc"
                    type="text"
                    v-mask="'##.###.###/0001-##'"
                    placeholder="XX.XXX.XXX/0001-XX"
                    class="form-control"
                    id="inputCNPJ"
                  />
                </div>

                <div class="form-group" v-else>
                  <label for="inputCpf">CPF</label>
                  <input
                    v-model="numDoc"
                    type="text"
                    v-mask="'###.###.###-##'"
                    placeholder="XXX.XXX.XXX-XX"
                    class="form-control"
                    id="inputCpf"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              @click="limpar"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              id="btn-salvar"
              type="button"
              @click="onSalvar"
              class="btn btn-primary"
              data-dismiss="modal"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <table id="tabela" class="table table-hover">
      <thead class="thead-light table-bordered">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome Completo</th>
          <th scope="col">E-Mail</th>
          <th scope="col">Telefone</th>
          <th scope="col">CPF / CNPJ</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pessoa in tableInfosFiltro" :key="pessoa.id">
          <th scope="row">{{ pessoa.id + 1 }}</th>
          <td>{{ pessoa.nomeCompleto }}</td>
          <td>{{ pessoa.email }}</td>
          <td>{{ pessoa.telefone }}</td>
          <td>{{ pessoa.numDoc }}</td>
          <td>
            <button
              type="button"
              @click="onEdit(pessoa)"
              style="margin: 10px;"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Editar
            </button>
            <button
              type="button"
              @click="onRemover(pessoa)"
              class="btn btn-danger"
              data-toggle="modal"
              data-target="#remover"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      id: 0,
      nome: "",
      sobrenome: "",
      nomeCompleto: "",
      email: "",
      telefone: "",
      pessoaJuridca: false,
      numDoc: "",
      pessoa: {},
      title: "Cadastrar Pessoa",
      edit: false,
      excluido: false,
      busca: "",
      dados: [],
    };
  },
  watch: {
    nome: function(val) {
      this.nomeCompleto = val + " " + this.sobrenome;
    },
    sobrenome: function(val) {
      this.nomeCompleto = this.nome + " " + val;
    },
  },
  computed: {
    idPessoas() {
      let id = this.dados.length;
      return id;
    },
    tableInfosFiltro() {
      if (this.busca == "") return this.dados;
      if (this.busca) {
        const result = this.dados.filter((c) =>
          c.nome.toLocaleUpperCase().includes(this.busca.toLocaleUpperCase(0))
        );
        return result;
      } else {
        return this.dados;
      }
    },
  },
  methods: {
    onNew() {
      this.edit = false;
      document.getElementById("btn-salvar").innerHTML = "Cadastrar";
      document.getElementById("titulo-dialog").innerText = "Cadastrar Pessoas";
    },
    onEdit(pessoa) {
      this.edit = true;
      console.log("Editar", this.edit);
      document.getElementById("btn-salvar").innerHTML = "Atualizar";
      document.getElementById("titulo-dialog").innerText = "Editar Pessoa";
      this.id = pessoa.id;
      this.nome = pessoa.nome;
      this.sobrenome = pessoa.sobrenome;
      this.nomeCompleto = pessoa.nomeCompleto;
      this.email = pessoa.email;
      this.telefone = pessoa.telefone;
      this.numDoc = pessoa.numDoc;
      this.pessoa = pessoa;
    },
    onRemover(pessoa) {
      this.excluido = false;
      let index = this.dados.indexOf(pessoa);
      this.dados.splice(index, 1);
      this.limpar();
    },
    onBusca() {
      alert("Buscar: " + this.busca);
    },
    onSalvar() {
      if (this.edit) {
        let index = this.dados.indexOf(this.pessoa);
        this.edit = false;
        this.dados[index] = {
          id: this.id,
          nome: this.nome,
          sobrenome: this.sobrenome,
          nomeCompleto: this.nomeCompleto,
          email: this.email,
          telefone: this.telefone,
          pessoaJuridca: this.pessoaJuridca,
          numDoc: this.numDoc,
        };
      } else {
        if (this.pessoaJuridca) {
          this.dados.push({
            id: this.idPessoas,
            nome: this.nome,
            sobrenome: this.sobrenome,
            nomeCompleto: this.nomeCompleto,
            email: this.email,
            telefone: this.telefone,
            pessoaJuridca: this.pessoaJuridca,
            numDoc: this.numDoc,
          });
          console.log(this.dados);
        } else {
          this.dados.push({
            id: this.idPessoas,
            nome: this.nome,
            sobrenome: this.sobrenome,
            nomeCompleto: this.nomeCompleto,
            email: this.email,
            telefone: this.telefone,
            pessoaJuridca: this.pessoaJuridca,
            numDoc: this.numDoc,
          });
        }
      }
      this.limpar();
    },
    limpar() {
      this.id = "";
      this.nome = "";
      this.sobrenome = "";
      this.nomeCompleto = "";
      this.email = "";
      this.telefone = "";
      this.pessoaJuridca = false;
      this.numDoc = "";
    },
  },
};
</script>

<style></style>
