<template>
  <div>
    <h1>Editar Ticket</h1>
    <b-form @submit.prevent="guardarTicket" v-if="show">
      <b-form-group id="input-group-1" label="Nombre:" label-for="ticketNom">
        <b-form-input
          id="ticketNom"
          v-model="ticket.ticketNom"
          placeholder="Ingresar un nombre"
          :maxlength="50"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Descripcion:"
        label-for="ticketDescrip"
      >
        <b-form-input
          id="ticketDescrip"
          v-model="ticket.ticketDescrip"
          placeholder="Escribir una Descripcion"
          :maxlength="100"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Prioridad:"
        label-for="ticketPrioridad"
      >
        <b-form-select
          id="ticketPrioridad"
          v-model="ticket.ticketPrioridad"
          :options="prioridad"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-select v-model="ticket.personaID" class="mb-3">
        <template #first>
          <b-form-select-option :value="null" disabled
            >-- Elige un trabajador --</b-form-select-option
          >
        </template>
        <b-form-select-option
          v-for="p in personas"
          :key="p.personaID"
          :value="p.personaID"
          >{{ p.personaNom }} {{ p.personaApe }}</b-form-select-option
        >
      </b-form-select>
      <br />

      <b-form-select v-model="ticket.cateID" class="mb-3">
        <template #first>
          <b-form-select-option :value="null" disabled
            >-- Elige una categoria --</b-form-select-option
          >
        </template>
        <b-form-select-option
          v-for="c in categorias"
          :key="c.cateID"
          :value="c.cateID"
          >{{ c.cateNombre }}</b-form-select-option
        >
      </b-form-select>
      <br />

      <b-button type="submit" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      ticket: {
        ticketNom: "",
        ticketDescrip: "",
        ticketPrioridad: "",
        personaID: "",
        cateID: "",
        ticketEsta: ""
      },
      erroresValidacion: false,
      prioridad: [
        { text: "Seleccione prioridad", value: null },
          { text: 'BAJA', value: '1' },
          { text: 'MEDIA', value: '2' },
          { text: 'ALTA', value: '3' }
      ],
      show: true,
    };
  },
  computed: {
    ...mapState(["categorias","personas"]),
    validacionNombre() {
      return (
        this.ticket.ticketNom !== undefined &&
        this.ticket.ticketNom.trim() !== ""
      );
    },
    validacionPrioridad() {
      return (
        this.ticket.ticketPrioridad !== undefined &&
        this.ticket.ticketPrioridad.trim() !== null
      );
    },
  },
  methods: {
    ...mapActions(["obtenerTicket","editarTicket","setPersonas","setCategorias"]),
    guardarTicket() {
      if (this.validacionNombre && this.validacionPrioridad) {
        this.erroresValidacion = false;
        //Guardar
        this.editarTicket({
          id: this.$route.params.id,
          params: this.ticket,
          onComplete: (response) => {
           
           console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                name: 'Tickets'
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
    this.setPersonas(),
    this.setCategorias(),
    this.obtenerTicket({
        id: this.$route.params.id,
        onComplete: (response) => {
            Vue.set(this, 'ticket', response.data.data)
        }
    })
}
}
</script>

<style>
</style>