<template>
  <div>
    <h1>Agregar Categoria</h1>
    <b-form @submit.prevent="guardarCategoria()">
      <Input
        v-model="categoria.cateNombre"
        id="cateNombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mb-2"
      />
      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Input from "../components/Input";
export default {
  name: "AgregarCategoria",
  components: {
    Input,
  },
  data() {
    return {
      categoria: {
        cateNombre: ""
      },
      erroresValidacion: false,
    };
  },
  computed: {
    validacionNombre() {
      return (
        this.categoria.cateNombre !== undefined && this.categoria.cateNombre.trim() !== ""
      );
    }
  },
  methods: {
    ...mapActions(["crearCategoria"]),
    guardarCategoria() {
      if (this.validacionNombre) {
        this.erroresValidacion = false;
        //Guardar
        this.crearCategoria({
          params: this.categoria,
          onComplete: (response) => {
            console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                name: 'Categorias'
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
    },
  },
};
</script>

<style>

</style>