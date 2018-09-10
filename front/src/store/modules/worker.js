import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    items: [],
    editWorker: {}
  },
  getters: {
    items(state) {
      return state.items;
    },
    editWorker(state) {
      return state.editWorker;
    },

  },
  mutations: {
    clearItems(state) {
      state.items = [];
    },
    loadItems(state, data) {
      state.items = data;
    },
    saveItems(state, data) {
      state.items = data;
    },
    editWorker(state, data) {
      state.editWorker = data;
    }
  },
  actions: {
    loadItems(store) {
      store.commit('clearItems');

      Vue.http.get('Worker/select')
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            store.commit('loadItems', data.result);
          }
        });
    },
    loadeditWorker(store, id) {
      store.commit('clearItems');

      Vue.http.post('Worker/get', {
          id: id
        })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            store.commit('loadItems', data.result);
          }
        });
    },
    newWorker(store, data) {
      Vue.http.post('Worker/add', data)
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            store.dispatch('loadItems');
          }
        });
    },
    saveItems(store, data) {
      store.commit('saveItems', data);
    },
    getWorker(store,data){
        Vue.http.post('Worker/get', data)
          .then(response => response.json())
          .then(data => {
            if (data.result) {
              store.dispatch('editWorker',data.result[0]);
            }
          });
    },
    editWorker(store, data) {
        store.commit('editWorker', data);
    },
    deleteWorker(store,data){
        Vue.http.post('Worker/delete', data)
          .then(response =>  store.dispatch('loadItems'));
    },
  }
};