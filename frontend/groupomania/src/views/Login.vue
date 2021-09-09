<script>
import HeaderLogin from '../components/HeaderLogin.vue';
export default {
  name: 'Login',
  components : {
    HeaderLogin,
  },
  data() {
    return {
      item :{
      userId : null
    }
    }
  },

  methods: {
    postLogin(e){
      e.preventDefault();
      const login = {
        email : this.email,
        password : this.password
      }
      fetch('http://localhost:3000/api/auth/login', {

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
              localStorage.setItem('userId', json.userId);
              localStorage.setItem('token', json.token);
              localStorage.setItem('nickname',json.nickname)
              this.$router.push('forum');
            
          }
          
        })
        .catch((error) => {
            console.log(error);
        })
    }
  }
}
</script>

<template>
  
   <div class="login">
    <HeaderLogin />
    <div class="card">
      <form>
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
        <button @click="postLogin" type="submit" class="btn btn-primary mt-3 mb-3">Se connecter</button>
      </form>
    </div>
  </div>

</template>

<style scoped lang='scss'>
 .card
  {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    border-radius: 20px;
    background-color: #ffd7d7;
  }
</style>
