<script>
import HeaderForum from '../components/HeaderForum.vue';
import ForumPosts from '../components/ForumPosts.vue';
import CreatePosts from '../components/CreatePosts.vue'
export default {
  name: 'Forum',
  components : {
    HeaderForum,
    ForumPosts,
    CreatePosts
  }
  ,
  beforeCreate(){
    this.$store.dispatch('setCurrentPostsLength')
  },
}
</script>


<template>
  <div class='forum'>
    <HeaderForum/>
    <CreatePosts/>
    <ForumPosts :postsList='this.$store.state.Posts' :maskedView="0" :PostsLength="this.$store.state.notMaskedPostsLength"/> 
  </div>
</template>


<style scoped lang='scss'>

</style>