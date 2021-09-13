import { createStore } from 'vuex'

export default createStore({
  state: {
    Posts : [],
    PostsByNickname:[],
  },
  mutations: {
    setCurrentPosts(state,posts){
      state.Posts = posts;
    },
    setCurrentPostsByNickname(state,posts)
    {
      state.PostsByNickname = posts;
    }
  },
  actions: {
    setCurrentPosts(context, posts){
      context.commit('setCurrentPosts',posts); 
    },
    setCurrentPostsByNickname(context,nickname){
      fetch('http://localhost:3000/api/posts/getPostsByNickname/'+nickname,{
        method :'GET',
        headers : {
          'Authorization' : 'Bearer '+ localStorage.getItem('token'),
        }
      })
      .then(posts=> posts.json())
      .then(json=>{
        if (json.error ==='Requête non authentifiée')
        {
          this.$swal.fire({
            title :"Veuillez vous connecter",
            icon : 'warning',
          text:json.error});
          this.$router.push('login')
        }
        if (json.error)
        {
          return json.error
        }
        context.commit('setCurrentPostsByNickname',json)
      })
      .catch(err=>(err));
    },
  },
  modules: {
  }
})
