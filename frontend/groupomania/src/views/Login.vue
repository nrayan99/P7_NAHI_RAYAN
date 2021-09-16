<script>
import HeaderLogin from '../components/HeaderLogin.vue';
export default {
  name: 'Login',
  components : {
    HeaderLogin,
  },
  methods: {
    emailValidation(value) { // test regex sur l'email
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
    return regex.test(value);
    },
    postLogin(e){ // Permet de se connecter
      e.preventDefault();
      if (this.emailValidation(this.email))
      {
          const login = {
          email : this.email,
          password : this.password
          }
          fetch('http://localhost:3000/api/users/login', { 
              method : "POST",
              body :  JSON.stringify(login),
              headers : {
                'Accept': 'application/json',
                "Content-Type": "application/json",
              }
            })
            .then((response) => response.json())
            .then((json) => {
              if ( !json.error)
              {
                localStorage.setItem('token', json.token);
                this.$router.push('forum');  
              }
              else
              {
                this.$swal.fire({
                title :"Connexion échouée",
                icon : 'error',
                text:json.error});
              }
            })
            .catch((error) => error)
      }
      else
      {
        this.$swal.fire({
        title :"Utilisateur incorrect",
        icon : 'error'});
      }

    }
  },
  beforeCreate(){
    localStorage.clear();
  }
}
</script>

<template>
  
   <div class="login">
    <HeaderLogin />
    <span id='loginmsg'>Veuillez vous connecter</span>
    <div class="card">
      <form>
        <div class="form-group row d-flex justify-content-center">
          <div class="col-8">
            <label for="InputEmail">Email</label>
            <input v-model='email' type="email" class="form-control mb-3" id="InputEmail" name ="InputEmail" placeholder="Email">
          </div>
        </div>
        <div class="form-group row d-flex justify-content-center">
          <div class="col-8">
            <label for="InputPassword">Mot de passe</label>
            <input v-model='password' type="password" class="form-control" id="InputPassword" name ="InputPassword" placeholder="Mot de passe">
          </div>
        </div>
        <button @click="postLogin" type="submit" class="btn btn-primary mt-3 mb-3">Se connecter</button>
      </form>
      <p class="card-text"><small>Pas de compte ? <router-link class="router-link" to="/signup">S'inscrire</router-link></small></p>
    </div>
  </div>

</template>

<style scoped lang='scss'>
.router-link
{
  color : navy;
}
label
{
  font-weight: bold;
}
.card-text
{
  font-weight: bold;
  display: inline;
}
#loginmsg
{
  font-weight: bold;
}
.card
{
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border-radius: 20px;
  background-color: #ffd7d7;
}
</style>
