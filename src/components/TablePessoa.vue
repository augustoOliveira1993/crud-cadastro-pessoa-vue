<template>
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
        <tr v-for="pessoa in dados" :key="pessoa.id">
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
</template>

<script>
export default {
    props: {
        dados: {
            type: Array,
            required: true
        }
    },
    methods: {
        onRemover(pessoa) {
            this.$emit('removePessoa', pessoa)
        },
        onEdit(pessoa) {
            this.$emit('editaPessoa', pessoa)
        }
    }
}
</script>

<style>

</style>