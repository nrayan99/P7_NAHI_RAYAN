<script>

export default {
  name: 'HeaderForum',
    data(){
      return {
        nickname : null,
      }
    }, 
    beforeMount()
    {
    fetch('http://localhost:3000/api/users/getCurrentUser',{
        method :'GET',
        headers : {
        'Authorization' : 'Bearer '+ localStorage.getItem('token')
        }
    })
    .then(posts=> posts.json())
    .then(json=>{
        this.nickname= json[0].nickname
    })
    .catch(err=>err);
    },
    methods:{
    disconnect(){
        localStorage.clear();
    },
  },

  
}
</script>

<template>
    <header class='mb-3'>
        <div class='container'>
            <nav class='navbar row'>
                <router-link class='navbar-brand d-none d-sm-block col-4'  to="/forum"><img alt="Logo Groupomania" src='../assets/icon-left-font-monochrome-black.svg' height="50"></router-link>
                <router-link class='navbar-brand d-block d-sm-none col-4 '  to="/forum"><img alt="Logo Groupomania" src='../assets/logo-black.png' height="50"></router-link>
                <ul class='navbar-nav col-6 col-sm-4'>
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