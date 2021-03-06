import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personas: [],
    persona: {},
    categorias: [],
    tickets: [],
    ticket: {},
    loading: false
  },
  mutations: {
    SET_PERSONAS(state, personas) {
      state.personas = personas;
    },
    SET_PERSONA(state, persona) {
      state.persona = persona;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    SET_TICKETS(state, tickets) {
      state.tickets = tickets;
    },
    SET_TICKET(state, ticket) {
      state.ticket = ticket;
    },
  },
  actions: {
    setPersonas({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/Personal/')
      .then( response => {
        commit('SET_PERSONAS', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    crearPersona({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Personal/', params)
      .then(onComplete)
      .catch(onError)
    },
    obtenerPersona({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/Personal/${id}`)
      .then( response => {
        commit('SET_PERSONA', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    editarPersona({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/Personal/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarPersona({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Personal/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    setCategorias({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/Categorias/')
      .then( response => {
        commit('SET_CATEGORIAS', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    crearCategoria({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Categorias/', params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarCategoria({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Categorias/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    setTickets({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/Tickets/')
      .then( response => {
        commit('SET_TICKETS', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    crearTicket({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Tickets/', params)
      .then(onComplete)
      .catch(onError)
    },
    obtenerTicket({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/Tickets/${id}`)
      .then( response => {
        commit('SET_TICKETS', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    editarTicket({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/Tickets/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarTicket({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Tickets/${id}`)
      .then(onComplete)
      .catch(onError)
    }
  },
  modules: {
  }
})
