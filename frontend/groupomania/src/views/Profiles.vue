<script>
import HeaderForum from '../components/HeaderForum.vue';
import ForumPosts from '../components/ForumPosts.vue';
import UpdateProfile from '../components/UpdateProfile.vue'
export default {
  name: 'Profiles',
  created(){
    this.$store.dispatch('setCurrentPostsByNickname', this.nickname)
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
    <ForumPosts :nicknameprop='this.nickname' :postsList='this.$store.state.PostsByNickname' :maskedView="0"/> 
  </div>
</template>


<style scoped lang='scss'>
#userNickname
{
  font-weight: bold;
  font-size: 25px;
}
</style>