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
}
</script>


<template>
  <div class='forum'>
    <HeaderForum/>
    <CreatePosts/>
    <ForumPosts :postsList='this.$store.state.Posts'/> 
  </div>
</template>


<style scoped lang='scss'>

</style>