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
      console.log(this.state.PostsByNickname);
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
        context.commit('setCurrentPostsByNickname',json)
      
          
      })
      .catch(err=> console.log (err));
    },
  },
  modules: {
  }
})
