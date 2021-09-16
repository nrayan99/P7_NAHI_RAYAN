<script>
import HeaderLogin from '../components/HeaderLogin.vue';
export default {
  name: 'Signup',
  components : {
    HeaderLogin
  },
    beforeCreate(){
    localStorage.clear();
  },
  methods : 
  {
    textValidation(value) { // test regex sur le pseudo
    const regex = /^[A-Za-z][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
    return regex.test(value);
    },
    emailValidation(value) { // test regex sur l'email
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      return regex.test(value);
    },
    passwordValidation (value) { // test regex sur le mot de passe
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ;
      return regex.test(value);
    },
    postSignup(e){ // Permet de s'inscrire
      e.preventDefault();
      if(this.emailValidation(this.email) && this.passwordValidation(this.password) && this.textValidation(this.nickname))
      {
        const signup = {
        nickname : this.nickname.toUpperCase(),
        email : this.email,
        password : this.password
      }
      fetch('http://localhost:3000/api/users/signup', {
          method : "POST",
          body :  JSON.stringify(signup),
          headers : {
              'Accept': 'application/json',
              "Content-Type": "application/json",
          }
        })
        .then((response) => response.json())
        .then((json) => {
          if (json.error)
          {
            this.$swal.fire({
            title :"Inscription échouée",
            icon : 'error',
            text:json.error});
          }
          else
          {
            this.$swal.fire({
              title :json.message,
              icon : 'success'});
            this.$router.push('login');
          }
          
        })
        .catch((error) => error)
      }
      else
      {
        this.$swal.fire({
        title :"Inscription échoué",
        icon : 'error',
        html :"Votre email doit etre de la forme suivante :</br> example@example.ex </br> Votre mot de passe doit contenir : 1 chiffre, 1 majuscule,1 minuscule et au moins 8 caracteres </br>Votre pseudo ne doit pas contenir de caractères spéciaux"});
      }
    }
  }
}
</script>


<template>
  <div class="signup">
    <HeaderLogin />
    <span id='signupmsg'>Veuillez vous inscrire</span>
    <div class="card">
      <form>
        <div class="form-group row d-flex justify-content-center">
          <div class="col-8">
            <label for="InputNickname">Pseudo</label>
            <input v-model='nickname' type="text" class="form-control" id="InputNickname" name ="InputNickname" placeholder="Pseudo">
            <p><small>Ne doit pas contenir de caractères</small></p>
          </div>
        </div>
        <div class="form-group row d-flex justify-content-center">
          <div class="col-8">
            <label for="InputEmail">Email</label>
            <input v-model='email' type="email" class="form-control" id="InputEmail" name ="InputEmail" placeholder="Email">
            <p><small>Doit être de la forme suivante: example@example.ex  </small></p>
          </div>
        </div>
        <div class="form-group row d-flex justify-content-center">
          <div class="col-8">
            <label for="InputPassword">Mot de passe</label>
            <input v-model='password' type="password" class="form-control" id="InputPassword" name ="InputPassword" placeholder="Mot de passe">
            <p><small>Doit contenir : 1 chiffre, 1 majuscule,1 minuscule et au moins 8 caracteres</small></p>
          </div>
        </div>
        <button @click="postSignup" type="submit" class="btn btn-primary mt-3 mb-3">S'inscrire</button>
      </form>
      <p class="card-text"><small>Déjà membre ? <router-link class='router-link' to="/login">Se connecter</router-link></small></p>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.router-link
{
  color : navy;
}
#signupmsg
{
  font-weight: bold;
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
.card
{
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border-radius: 20px;
  background-color: #ffd7d7;
}
</style>