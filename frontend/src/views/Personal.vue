<template>
  <div>
    <h1>Todo el Personal</h1>
    <b-button variant="primary" to="/AgregarPersona">Agregar</b-button>

    <Table :items="personas" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button class="me-1" @click="onEditar(item)">Editar</b-button>
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
  name: "Personal",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "personaID", label: "Clave" },
        { key: "personaNom", label: "Nombre" },
        { key: "personaApe", label: "Apellido" },
        {
          key: "personaTel",
          label: "Teléfono",
          formatter: (value) => {
            return value || "Sin datos";
          },
        },
        {
          key: "personaDir",
          label: "Dirección",
          formatter: (value) => {
            return value || "Sin datos";
          },
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["personas", "loading"]),
  },
  methods: {
    ...mapActions(["setPersonas", "eliminarPersona"]),
    onEditar(item) {
      console.log("Editar", item.item.personaID);
      this.$router.push({
        name: "EditarPersona",
        params: {
          id: item.item.personaID,
        },
      });
    },
    onEliminar(item) {
      console.log("Eliminar", item.item.personaID);
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar Persona",
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
            this.eliminarPersona({
              id: item.item.personaID,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setPersonas(), 1000);
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
    this.setPersonas();
  },
};
</script>