<template>
  <div>
    <h1>Editar Persona</h1>
    <b-form @submit.prevent="guardarPersona()">
      <Input
        v-model="persona.personaNom"
        id="personaNom"
        titulo="Nombre"
        placeholder="Ingrese el nombre"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mb-2"
      />
      <Input
        v-model="persona.personaApe"
        id="personaApe"
        titulo="Apellido"
        placeholder="Ingrese el Apellido"
        :maxlength="80"
        :error="erroresValidacion && !validacionApellido"
        mensajeError="Es necesario ingresar el nombre"
        class="mb-2"
      />
      <Input
        v-model="persona.personaTel"
        id="personaTel"
        titulo="Telefono"
        :maxlength="10"
        placeholder="Ingrese el telefono"
        :error="erroresValidacion && !validacionTelefono"
        mensajeError="El telefeno debe contener 10 digitos"
        class="mb-2"
      />
      <Input
        v-model="persona.personaDir"
        id="personaDir"
        titulo="Dirección"
        :maxlength="150"
        placeholder="Ingrese la dirección"
      />
      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from "vuex";
import Input from "../components/Input";

export default {
  name: "Agregar",
  components: {
    Input,
  },
  data() {
    return {
      persona: {
        personaID: "",
        personaNom: "",
        personaApe: "",
        personaDir: "",
        personaTel: "",
      },
      erroresValidacion: false,
    };
  },
  computed: {
    validacionNombre() {
      return (
        this.persona.personaNom !== undefined && this.persona.personaNom.trim() !== ""
      );
    },
    validacionApellido() {
      return (
        this.persona.personaApe !== undefined && this.persona.personaApe.trim() !== ""
      );
    },
    validacionTelefono() {
      return (
        this.persona.personaTel == undefined || this.persona.personaTel.trim() == "" || this.persona.personaTel.length == 10
      );
    }
  },
  methods: {
    ...mapActions(["obtenerPersona","editarPersona"]),
    guardarPersona() {
      if (this.validacionNombre && this.validacionTelefono && this.validacionApellido) {
        this.erroresValidacion = false;
        //Guardar
        this.editarPersona({
          id: this.$route.params.id,
          params: this.persona,
          onComplete: (response) => {
           
           console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                name: 'Personal'
            })
            
          },
          onError: (error) => {
            console.log(error.response.data.mensaje);
            this.$notify({
              type: 'error', 
              title: error.response.data.mensaje,
            });
          }, 
        }); 
      } else {
        this.erroresValidacion = true;
      }
    }
},
created() {
    this.obtenerPersona({
        id: this.$route.params.id,
        onComplete: (response) => {
            Vue.set(this, 'persona', response.data.data)
        }
    })
}
}
</script>

<style>
</style>