<template>
  <div>
    <h1>Todas las categorias</h1>
    <b-button variant="primary" to="/AgregarCategoria">Agregar</b-button>

    <Table :items="categorias" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button @click="onEliminar(item)">Eliminar</b-button>
      </template>
    </Table>
    <notifications position = "bottom left"/>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";
export default {
  name: "Categoria",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "cateID", label: "Clave" },
        { key: "cateNombre", label: "Nombre" },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["categorias", "loading"]),
  },
  methods: {
    ...mapActions(["setCategorias", "eliminarCategoria"]),
    onEliminar(item) {
      console.log("Eliminar", item.item.cateID);
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar Categoria",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Aceptar",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.eliminarCategoria({
              id: item.item.cateID,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setCategorias(), 1000);
              },
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
  },
  mounted() {
    this.setCategorias();
  },
};
</script>