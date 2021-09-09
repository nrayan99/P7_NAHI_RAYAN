<template>  
  <div class='forumPosts'>
    <div v-for="item in Posts" :key="item.imageUrl" class="card">
      <img  class="card-img-top" alt="Card image cap">
      <div class="card-body">
        <p class="card-text"></p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ForumPosts',
  data() { return {
    Posts : {}
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
        console.log(json[0]);
        this.Posts = json;
      }
    })
    .catch(err=>err);
  },
  methods : {

  }
} 
</script>

<style scoped>

</style>