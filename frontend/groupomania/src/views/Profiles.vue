<script>
import HeaderForum from '../components/HeaderForum.vue';
import ForumPosts from '../components/ForumPosts.vue';
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
    .catch(err=> console.log (err));
  },
  data (){
    return {
        nickname: window.location.href.split('profiles:')[1],
        
    }
  },
  components : {
    HeaderForum,ForumPosts
  },
  methods : {
    }
  }
</script>


<template>
  <div class="profile">
    <HeaderForum />
    <img src="../assets/no-picture.jpg">
    <p id='userNickname'>{{this.nickname}}</p>
    <h2>Articles : </h2>
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