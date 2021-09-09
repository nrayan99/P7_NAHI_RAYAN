<template>  
  <div class='forumPosts'>
    <div class='container '>
    <div v-for="item in this.$store.state.Posts" :key="item.imageUrl" class="card mb-5 mx-auto">
      <img v-if='item.imageUrl' :src="item.imageUrl" class="card-img-top" alt="Card image cap">
      <div class="card-body">
        <p class="card-text">{{item.post_text}}</p>
        <p class="card-text"><small class="text-muted">Publié par <router-link  :to="{path:'/profiles:'+item.nickname}">{{item.nickname}}</router-link> </small></p>
      </div>
      <button v-if="this.nickname==item.nickname" @click="delPost(item.id)" class="btn mb-1">Supprimer</button>
      <button v-if="this.nickname==item.nickname" class="btn ">Modifier</button>
    </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ForumPosts',
  data (){
    return {
      nickname : localStorage.nickname
    }
      
    
  },
  beforeMount(){
    fetch('http://localhost:3000/api/posts/getAllPosts',{
      method :'GET',
       headers : {
              'Authorization' : 'Bearer '+ localStorage.getItem('token'),
          }
    })
    .then(posts=> posts.json())
    .then(json=>{
      if (json.error ==='Requête non authentifiée')
      {
        alert('Veuillez vous connecter');
        this.$router.push('login');
      }
      else
      {
        this.$store.dispatch('setCurrentPosts',json);
      }
    })
    .catch(err=>err);
  },
  methods : {
    delPost(postid)
    {
      fetch('http://localhost:3000/api/posts/deletePost/' + postid, {
      method: 'DELETE',
      headers : {'Authorization' : 'Bearer '+ localStorage.getItem('token')}
      })
      .then(res => res.json()) // or res.json()
      .then(json => {
        console.log(json);
        this.$store.dispatch('setCurrentPosts',json);
      })
      .catch(err=>err);
    }
  }
} 
</script>

<style scoped lang='scss'>
  .btn
  {
    background-color:#ffd7d7 ;
    display:inline;
    border-radius: 0px;
  }
  .card
  {
    
    width: 70%;
    border-radius: 20 20 0 0;
    img
    {
      border-radius: 20px 20px 0px 0px;
      max-height: 300px;
      box-sizing: content-box;
    }
  }
</style>