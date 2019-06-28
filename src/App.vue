<template>
  <div id="app">
    <Header />
    <SearchBar v-bind:estados="estados"
      v-on:filter-tesinas="updateTesinas" />
    <TesinasGrid v-bind:estados="estados" v-bind:tesinas="tesinas" />
  </div>
</template>

<script>
import Header      from './components/Header.vue'
import SearchBar   from './components/SearchBar.vue'
import TesinasGrid from './components/TesinasGrid.vue'

import axios from 'axios'

const BASE_URL = 'https://grupo51.proyecto2018.linti.unlp.edu.ar/scripts/tesinas.php'
//const BASE_URL = 'http://localhost:1025/scripts/tesinas.php'

export default {
  name: 'app',
  components: {
    Header,
    SearchBar,
    TesinasGrid
  },
  data() {
    return {
      estados: [],
      tesinas: []
    }
  },
  created() {
    this.updateTesinas();
    axios.get(BASE_URL + '/estados')
      .then(res => this.estados = res.data)
      .catch(err => console.log(err));
  },
  methods: {
    updateTesinas(qryEstado, qryAlumno) {
      const url = BASE_URL + '/tesinas'
        + (qryAlumno ? `/alumno/${qryAlumno.replace('/','-')}`: "");
      axios.get(url)
        .then(res => {
          this.tesinas = (qryEstado 
            ? res.data.filter(x => x.estado === qryEstado)
            : res.data)
        })
        .catch(err => console.log(err));
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
