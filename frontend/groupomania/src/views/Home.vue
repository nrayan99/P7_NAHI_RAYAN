<script>
import HeaderLogin from '../components/HeaderLogin.vue';

export default {
  name: 'Home',
  components : {
    HeaderLogin
  }
  ,
    beforeCreate(){
    localStorage.clear();
  },
  methods :{
  },
}
</script>


<template>
  <div class="headerLogin">
    <HeaderLogin/>
    <h1 class="mb-3"><strong> Bienvenue sur le reseau social de Groupomania !</strong> </h1>
    <h3>Pas de compte ? Rejoignez nous dès aujourd'hui</h3>
    <router-link class='nav-link' to="/signup"><button class='btn btn-primary mx-2 mb-5 col-2'>S'inscrire</button></router-link>
    <h3>Déjà membre ? Content de vous revoir</h3>
    <router-link class='nav-link' to="/login"><button class='btn btn-primary col-2'>Se connecter</button></router-link>
  </div>
</template>

<style scoped lang="scss">
.btn
{
    @media ( max-width: 991px)
    {
        width: 100%;
    }
}
</style>