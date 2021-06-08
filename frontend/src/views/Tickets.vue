<template>
  <div>
    <h1>Todos los tickets</h1>
    <b-button variant="primary" to="/AgregarTicket">Agregar</b-button>

    <Table :items="tickets" :fields="campos" :busy="loading">
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
  name: "Tickets",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "ticketID", label: "Clave" },
        { key: "ticketNom", label: "Nombre" },
        { key: "ticketDescrip", 
        label: "Descripcion" ,
        formatter: (value) => {
            return value || "Sin datos";
          }
        },
        {
          key: "ticketPrioridad",
          label: "Prioridad",
        },
        {
          key: "personaID",
          label: "Persona",
        },
        {
          key: "cateID",
          label: "Categoria"
        },
        {
          key: "ticketEsta",
          label: "Estatus",
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["tickets", "loading"]),
  },
  methods: {
    ...mapActions(["setTickets", "eliminarTicket"]),
    onEditar(item) {
      console.log("Editar", item.item.ticketID);
      this.$router.push({
        name: "EditarTicket",
        params: {
          id: item.item.ticketID,
        },
      });
    },
    onEliminar(item) {
      console.log("Eliminar", item.item.ticketID);
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar ticket",
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
            this.eliminarTicket({
              id: item.item.ticketID,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setTickets(), 1000);
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
    this.setTickets();
  },
};
</script>