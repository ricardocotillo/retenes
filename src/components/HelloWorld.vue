<template>
    <b-container fluid>
      <b-row align-h="center">
        <b-col cols="8">
          <b-form inline>
            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
              <b-input v-model="codigo" placeholder="Código" />
            </b-input-group>

            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
              <b-input v-model="interior" placeholder="Interior" type="number" />
            </b-input-group>
            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
              <b-input v-model="exterior" placeholder="Exterior" type="number" />
            </b-input-group>
            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
              <b-input v-model="altura" placeholder="Altura" type="number" />
            </b-input-group>
            <b-button @click="getRetenes" variant="primary">Buscar</b-button>
          </b-form>
        </b-col>
      </b-row>
      <br><br>
      <b-row align-h="center">
        <b-col md="8">
          <b-table v-if="retenes.length > 0" responsive striped hover :fields="campos" :items="retenes"></b-table>
          <p v-if="noExiste">No se encontró ningún artículo con esas especificaciones</p>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import { buscar } from '../functions/buscar'

export default {
  data () {
    return {
      noExiste: false,
      codigo: '',
      altura: '',
      exterior: '',
      interior: '',
      retenes: [],
      campos: [
        'Articulo',
        "Marca",
        {
          key: "Diseno",
          label: "Diseño"
        },
        {
          key: 'Aplicacion',
          label: 'Aplicación'
        },
        'Interior',
        'Exterior',
        'Altura',
      ]
    }
  },
  watch: {
    codigo () {
      this.altura = ''
      this.exterior = ''
      this.interior = ''
    },
    altura () {
      this.codigo = ''
    },
    exterior () {
      this.codigo = ''
    },
    interior () {
      this.codigo = ''
    }
  },
  methods: {
    async getRetenes () {
      this.noExiste = false
      this.retenes = []
      let retenes = await buscar(this.codigo, this.altura, this.exterior, this.interior)
      if (retenes.length < 1) {
        this.noExiste = true
        return
      }
      retenes.forEach(ret => {
        if (ret["Altura"].length > 1) {
          ret["Altura"] = ret["Altura"][0] + " / " + ret["Altura"][1]
        }
        if (ret["Exterior"].length > 1) {
          ret["Exterior"] = ret["Exterior"][0] + " / " + ret["Exterior"][1]
        }
        if (ret["Interior"].length > 1) {
          ret["Interior"] = ret["Interior"][0] + " / " + ret["Interior"][1]
        }
        if (ret["Marca"] == undefined) {
          ret["Marca"] = "WB"
        }
        if (ret["ID"] == "C") {
          ret["Marca"] = "C"
        }
        if (ret["ID"] == "A") {
          ret["Marca"] = "ASH"
        }
        if (ret["ID"] == "D") {
          ret["Marca"] = "DWH"
        }
        if (ret["ID"] == "BR") {
          ret["Marca"] = "BR"
        }
        if (ret["ID"] == "NT") {
          ret["Marca"] = "NT"
        }
        if (ret["ID"] == "JT") {
          ret["Marca"] = "THO"
        }
      })
      this.retenes = retenes
    }, 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
