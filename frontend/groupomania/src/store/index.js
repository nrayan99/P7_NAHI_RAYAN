import { createStore } from 'vuex'

export default createStore({
  state: {
    Posts : [],
  },
  mutations: {
    setCurrentPosts(state,posts){
      state.Posts = posts;
    },
   
  },
  actions: {
    setCurrentPosts(context, posts){
      context.commit('setCurrentPosts',posts); 
    },
  },
  modules: {
  }
})
