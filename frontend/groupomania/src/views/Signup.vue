<script>
import HeaderLogin from '../components/HeaderLogin.vue';
export default {
  name: 'Signup',
  components : {
    HeaderLogin
  },
  methods : 
  {
    
    postSignup(e){
      e.preventDefault();
      const signup = {
        nickname : this.nickname,
        email : this.email,
        password : this.password
      }
      fetch('http://localhost:3000/api/auth/signup', {

          method : "POST",
          body :  JSON.stringify(signup),
          headers : {
              'Accept': 'application/json',
              "Content-Type": "application/json",
          }
        })
        .then((response) => response.json())
        .then((json) => {
          alert(json.message)
          this.$router.push('login');
        })
        .catch((error) => {
          alert(error)
    })
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
          </div>
        </div>
        <div class="form-group row d-flex justify-content-center">
          <div class="col-8">
          <label for="InputEmail">Email</label>
          <input v-model='email' type="email" class="form-control" id="InputEmail" name ="InputEmail" placeholder="Email">
        </div>
        </div>
        <div class="form-group row d-flex justify-content-center">
          <div class="col-8">
          <label for="InputPassword">Mot de passe</label>
          <input v-model='password' type="password" class="form-control" id="InputPassword" name ="InputPassword" placeholder="Mot de passe">
        </div>
        </div>
        <button @click="postSignup" type="submit" class="btn btn-primary mt-3 mb-3">S'inscrire</button>
      </form>
      <p class="card-text"><small class="text-muted">Déjà membre ? <router-link  to="/login">Se connecter</router-link></small></p>
    </div>
  </div>
</template>


<style scoped lang='scss'>
 #signupmsg
 {
   font-weight: bold;
 }
.card-text
{
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