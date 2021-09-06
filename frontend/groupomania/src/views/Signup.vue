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
        nickname : document.getElementById('InputNickname').value,
        email : document.getElementById('InputEmail').value,
        password : document.getElementById('InputPassword').value,
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
          console.log(json)
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
    <div class="card">
      <form>
        <div class="form-group row d-flex justify-content-center">
          <div class="col-8">
            <label for="InputNickname">Pseudo</label>
            <input type="text" class="form-control" id="InputNickname" name ="InputNickname" placeholder="Pseudo">
          </div>
        </div>
        <div class="form-group row d-flex justify-content-center">
          <div class="col-8">
          <label for="InputEmail">Email</label>
          <input type="email" class="form-control" id="InputEmail" name ="InputEmail" placeholder="Email">
        </div>
        </div>
        <div class="form-group row d-flex justify-content-center">
          <div class="col-8">
          <label for="InputPassword">Mot de passe</label>
          <input type="password" class="form-control" id="InputPassword" name ="InputPassword" placeholder="Mot de passe">
        </div>
        </div>
        <button @click="postSignup" type="submit" class="btn btn-primary mt-3 mb-3">S'inscrire</button>
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