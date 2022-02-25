import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorNumber:'',
    worksNumber:'',
    theme: localStorage.getItem('wangwang-theme') || 'theme-light',
  },
  mutations: {
    changeTheme() {
      this.state.theme = this.state.theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
      localStorage.setItem('wangwang-theme', this.state.theme);
    },
    setFavorNumber(state,num){
      state.favorNumber = num;
    },
    setWorksNumber(state,num){
      state.worksNumber = num;
    },
    
  },
  actions: {},
  modules: {},
});
