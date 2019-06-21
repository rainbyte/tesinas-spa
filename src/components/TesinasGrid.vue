<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="key in columns" v-bind:key="key">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tesina in tesinas" v-bind:key="tesina.id">
          <td v-for="key in columns" v-bind:key="key">
            {{ tesinaToCell(tesina, key) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "tesinas-grid",
  props: ["estados", "tesinas"],
  data() {
    return {
      columns: ["titulo", "director", "codirector", "alumnos", "estado"]
    }
  },
  methods: {
    tesinaToCell(tesina, key) {
      switch (key) {
        case "alumnos": {
          const alumnos = tesina[key].length ? tesina[key] : ["-"];
          return (alumnos
            .map(
              alumno => alumno.nombre + " " + alumno.apellido)
            .reduce(
              (acum, fullname) => acum + "; " + fullname));
        }
        case "codirector": {
          return (tesina[key] ? tesina[key] : "-");
        }
        case "estado": {
          const estado = this.estados.find(e => e.id === tesina[key]);
          return (estado 
            ? estado.nombre + (tesina['nota'] ? `; Nota: ${tesina['nota']}` : "")
            : "-");
        }
        default: {
          return tesina[key];
        }
      }
    }
  }
}
</script>

<style scoped>
  body {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 14px;
    color: #444;
  }

  table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
  }

  th {
    background-color: #42b983;
    color: rgba(255,255,255,0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  th:first-letter {
    text-transform: capitalize;
  }

  td {
    background-color: #f9f9f9;
  }

  th, td {
    min-width: 120px;
    padding: 10px 20px;
  }

  th.active {
    color: #fff;
  }

  th.active .arrow {
    opacity: 1;
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
</style>
