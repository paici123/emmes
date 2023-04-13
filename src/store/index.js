import { createStore } from 'vuex'
import router from '@/router'

export default createStore({
  state: {},
  mutations: {},
  actions: {
    // 安全退出
    logout() {
      window.sessionStorage.clear();
      localStorage.clear()
      router.replace('/login')
    }
  },
  modules: {},
});

