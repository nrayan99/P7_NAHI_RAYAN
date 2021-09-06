<script>
import HeaderLogin from '../components/HeaderLogin.vue';

export default {
  name: 'Login',
  components : {
    HeaderLogin
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
