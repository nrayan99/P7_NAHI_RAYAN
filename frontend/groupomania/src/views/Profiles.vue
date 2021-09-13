<script>
import HeaderForum from '../components/HeaderForum.vue';
import ForumPosts from '../components/ForumPosts.vue';
import UpdateProfile from '../components/UpdateProfile.vue'
export default {
  name: 'Profiles',
  created(){
    fetch('http://localhost:3000/api/posts/getPostsByNickname/'+this.nickname,{
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
  }
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