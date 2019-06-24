<template>
  <div>
    <form @submit="searchTesinas">
      <label for="select-estado">Estado</label>
      <select @change="searchTesinas" name="select-estado" id="select-estado" v-model="qryEstado">
        <option value='' selected="selected"></option>
        <option v-bind:key="estado.id" v-for="estado in estados" v-bind:value="estado.id">
          {{ estado.nombre }}
        </option>
      </select>

      <label for="text-alumno">Número de Alumno</label>
      <input type="text" name="text-alumno" id="text-alumno"
        v-model="qryAlumno" pattern="\d{1,5}\/\d"
        minlength="3" maxlength="7" size="7">
    </form>
  </div>
</template>

<script>
export default {
  name: "tesinas-search-bar",
  props: ["estados"],
  data() {
    return {
      qryEstado: undefined,
      qryAlumno: undefined
    }
  },
  methods: {
    searchTesinas(e) {
      e.preventDefault();
      this.$emit('filter-tesinas', this.qryEstado, this.qryAlumno);
    }
  }
}
</script>

<style scoped>
  form {
    align-items: baseline;
    display: grid;
    grid-column-gap: 0.5em;
    grid-template-columns: auto auto auto auto;
    justify-content: center;
    margin-bottom: 0.5em;
  }

  form * {
    font-size: 1.1em;
  }

  @media screen and (max-width: 600px) {
    form {
      grid-template-columns: auto 40%;
    }
  }
</style>
