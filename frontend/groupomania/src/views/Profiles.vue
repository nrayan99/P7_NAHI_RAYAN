<script>
import HeaderForum from '../components/HeaderForum.vue';
import ForumPosts from '../components/ForumPosts.vue';
import UpdateProfile from '../components/UpdateProfile.vue'
export default {
  name: 'Profiles',
  created(){
    fetch('http://localhost:3000/api/posts/getPostsByNickname/'+this.nickname,{ // Charge les posts de l'utilisateur dont le profil est visité
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
          icon : 'warning'});
        this.$router.push('login');
      }
      else
      {
        this.$store.state.PostsByNickname = json;
      }
    })
    .catch(err=>(err));
  },
  data (){
    return {
      nickname: window.location.href.split('profiles:')[1],
    }
  },
  components : {
    HeaderForum,ForumPosts,UpdateProfile
  },
  methods : {
  },
  watch:{
    $route(to, from){
      if((to.params.nickname&&from.params.nickname)&&(to.params.nickname !== from.params.nickname)){ // Permet d'actualiser en cas de click sur le bouton profil en étant sur le profil d'un autre utilisateur
        location.reload();
      } 
    }
  },
}

</script>


<template>
  <div class="profile">
    <HeaderForum />
    <UpdateProfile class='mb-3' />
    <h2>Articles : </h2>
    <h3 v-if="this.$store.state.PostsByNickname.length==0" > Aucun article publié</h3>
    <ForumPosts :nicknameprop='this.nickname' :postsList='this.$store.state.PostsByNickname '/> 
  </div>
</template>


<style scoped lang='scss'>
#userNickname
{
  font-weight: bold;
  font-size: 25px;
}
</style>