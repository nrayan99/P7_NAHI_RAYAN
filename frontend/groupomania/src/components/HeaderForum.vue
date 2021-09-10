<script>

export default {
  name: 'HeaderForum',
  methods:{ 
    disconnect(){
      localStorage.clear();
  }
  },
  data(){
      return {
          nickname : localStorage.nickname,
      }
  }
}
</script>

<template>
    <header class='mb-3'>
            <div class='container'>
                <nav class='navbar'>
                <router-link class='navbar-brand'  to="/forum"><img src='../assets/icon-left-font-monochrome-black.svg'  height="50"></router-link>
                <ul class='navbar-nav'>
                <li class='nav-item'><router-link class='nav-link' :to="{path:'/profiles:'+this.nickname}"><button class="btn btn-secondary"> Profil </button></router-link></li>
                <li class='nav-item'><router-link class='nav-link' to="/login"><button @click="disconnect" class="btn btn-secondary">Se déconnecter</button></router-link></li>
                </ul>
                </nav>
            </div>
    </header>
</template>

<style scoped lang='scss'>
    header
    {
    background-color: #ffd7d7;
    }
</style>