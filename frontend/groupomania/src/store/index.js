import { createStore } from 'vuex'

export default createStore({
  state: {
    Posts : [],
    PostsByNickname:[],
    MaskedPostsLength : null,
    notMaskedPostsLength:null,
  },
  mutations: {
    setCurrentPosts(state,posts){
      state.Posts = posts;
    },
    setCurrentPostsByNickname(state,posts)
    {
      state.PostsByNickname = posts;
    },
    setCurrentMaskedPostsLength(state,MaskedPosts)
    {
      state.MaskedPostsLength=MaskedPosts;
      
    },
    setCurrentnotMaskedPostsLength(state,notMaskedPosts)
    {
      state.notMaskedPostsLength=notMaskedPosts;
    }

  },
  actions: {
    setCurrentPosts(context, posts){
      context.commit('setCurrentPosts',posts); 
    },
    setCurrentPostsByNickname(context,nickname){ // Récupère les articles d'un utilisateur
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
    setCurrentPostsLength(context)
    { // Recupère la longueur de la listes des articles masqués et des articles non masqués
      fetch('http://localhost:3000/api/posts/PostsLength',{
        method :'GET',
        headers : {
          'Authorization' : 'Bearer '+ localStorage.getItem('token')
        }
      })
      .then(posts=> posts.json())
      .then(json=>{
        context.commit('setCurrentMaskedPostsLength',json.MaskedPosts)
        context.commit('setCurrentnotMaskedPostsLength',json.notMaskedPosts)
      })
      .catch(err=>err);
    },
  },
  modules: {
  }
})
