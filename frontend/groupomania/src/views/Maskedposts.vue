<template>
  <div id='Maskedposts'>
    <HeaderForum/>
    <h3 class='mb-5'>Bienvenue dans votre espace de modération</h3>
    <ForumPosts id="posts" :postsList='this.$store.state.Posts' :maskedView="1" :PostsLength="this.$store.state.MaskedPostsLength"/>
  </div>

</template>

<script>
import HeaderForum from '../components/HeaderForum.vue';
import ForumPosts from '../components/ForumPosts.vue';
export default {
  name: 'Maskedposts',
  beforeCreate(){
    
    this.$store.dispatch('setCurrentPostsLength');
      fetch('http://localhost:3000/api/users/getCurrentUser',{
      method :'GET',
      headers : {
        'Authorization' : 'Bearer '+ localStorage.getItem('token')
      }
    })
    .then(posts=> posts.json())
    .then(json=>{
      if (json[0].admin!==1)
      {
        this.$swal.fire({
          title :"Vous n'avez pas les droits nécessaires",
          icon : 'warning'});
        this.$router.push('forum');
      }

    })
    .catch(err=>err);
  },
  components : {
    HeaderForum,ForumPosts
  },
}
</script>