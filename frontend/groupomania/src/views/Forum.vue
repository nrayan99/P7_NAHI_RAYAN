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
        <ForumPosts/> 
    </div>
</template>