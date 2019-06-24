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
          <td v-for="key in columns" v-bind:key="key" v-bind:data-label="key">
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
    line-height: 1.25;
  }

  table {
    border: 2px solid #42b983;
    border-collapse: collapse;
    border-radius: 3px;
    background-color: #fff;
    margin: 0 auto;
    padding: 0;
  }

  table caption {
    font-size: 1.5em;
    margin: .5em 0 .75em;
  }

  table th {
    background-color: #42b983;
    color: rgba(255,255,255,0.66);
    font-size: .85em;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  table tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .35em;
  }

  td {
    background-color: #f9f9f9;
  }

  table th, table td {
    padding: .625em;
    text-align: center;
  }

  @media screen and (max-width: 600px) {
    table {
      border: 0;
      width: 90%;
    }

    table caption {
      font-size: 1.3em;
    }
    
    table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    
    table tr {
      border: 2px solid #42b983;
      display: block;
      margin-bottom: .625em;
    }
    
    table td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: .8em;
      text-align: right;
    }
    
    table td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
      min-width: 30%;
    }
    
    table td:last-child {
      border-bottom: 0;
    }
  }
</style>
