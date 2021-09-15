<script>

export default {
  name: 'UpdateProfile',
  beforeMount(){
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
    fetch('http://localhost:3000/api/users/getProfileImageByNickname/'+this.ProfileNickname,{ // Recupère la photo de profil de l'utilisateur
      method :'GET',
      headers : {
        'Authorization' : 'Bearer '+ localStorage.getItem('token'),
      }
    })
    .then(posts=> posts.json())
    .then(json=>{
      if (json.error ==='Requête non authentifiée')
      {
        this.$swal.fire({
          title :"Veuillez vous connecter",
          icon : 'warning',
        text:json.error});
        this.$router.push('login')
      }
      if(json.error)
      {
        this.$swal.fire({
          title :json.error,
          icon : 'error'});
        this.$router.push('forum')
      }
      this.profileImageUrl=json;
      this.item.imageUrl=json
    })
    .catch(err=>(err));
  },
  data (){
    return {
      isUpdating:{
        Profile:false,
        ProfilePicture:false,
        Password:false,
        delAccount:false,
      },
      item: {
      image : null,
      imageUrl: null,
      },
      nickname:null,
      profileImageUrl:null ,
      ProfileNickname: window.location.href.split('profiles:')[1],
    }
  },
  methods:{
    passwordValidation (value) { // Test regex sur le mot de passe
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ;
      return regex.test(value);
    },
    updateImage(e) { // permet de charger les données de l'image de profil modifié
      const file = e.target.files[0]
      this.item.image = file
      this.item.imageUrl = URL.createObjectURL(file)
    },
    uploadImage(){  // Permet d'envoyer l'image modifie au backend
      const fd = new FormData()
      fd.append('image',this.item.image);
      if (document.getElementById('image').value!="")
      {
        fetch('http://localhost:3000/api/users/UpdateProfilePicture/' + this.nickname, {
          method : "PUT",
          body :  fd,
          headers : {
              'Accept': 'application/json',
              'Authorization' : 'Bearer '+ localStorage.getItem('token'),
          }
        })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (json.error ==='Requête non authentifiée')
          {
            this.$swal.fire({
              title :"Veuillez vous connecter",
              icon : 'warning',
            text:json.error});
            this.$router.push('login')
          }
          else{
            this.item.image=null;
            this.item.imageUrl=json;
            this.profileImageUrl=json;
            this.isUpdating.ProfilePicture=!this.isUpdating.ProfilePicture;
            this.isUpdating.Profile=!this.isUpdating.Profile;
            this.$swal.fire({
              title :"Votre photo de profil a bien été modifié",
              icon : 'success'});
          }
          
        })
        .catch((error) => error)
      }
      else
      {
        this.$swal.fire({
          title :"Veuillez choisir une nouvelle image",
          icon : 'warning'});
      }
    },
    cancelUpdate(){ // Permet de revenir à l'etat initial des boutons de modifications
      this.isUpdating.ProfilePicture=false;
      this.isUpdating.Profile=false;
      this.isUpdating.Password=false;
      this.isUpdating.delAccount=false;
      this.item.imageUrl = this.profileImageUrl;
    },
    updatePassword(){ // Permet de modifier son mot de passe
      if (this.passwordValidation(this.newPassword))
      {
        const passwordUpdating = {
          currentPassword : this.currentPassword,
          newPassword : this.newPassword
        }
        fetch('http://localhost:3000/api/users/UpdatePassword/' + this.nickname, {
          method : "PUT",
          body :  JSON.stringify(passwordUpdating),
          headers : {
              'Accept': 'application/json',
              "Content-Type": "application/json",
              'Authorization' : 'Bearer '+ localStorage.getItem('token'),
          }
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
          if (json.error ==='Requête non authentifiée')
          {
          this.$swal.fire({
            title :"Veuillez vous connecter",
            icon : 'warning',
          text:json.error});
          this.$router.push('login')
          }
          if(json.error)
          {
            this.$swal.fire({
              title :"Mot de passe non modifié",
              icon : 'error',
              text:json.error});
          }
          else
          {
            this.$swal.fire({
              title :json.message,
              icon : 'success'});
            this.isUpdating.Password=false;
            this.isUpdating.Profile=false;
          }
        })
        .catch((error) => error);
        
        }
        else
        {
        this.$swal.fire({
          title :"Mot de passe non modifié",
          icon : 'error',
          text :"Votre mot de passe doit contenir : 1 majuscule,1 minuscule et 8 caracteres"});
        }
    },
    deleteAccount(){ // Permet de supprimer son compte
      fetch('http://localhost:3000/api/users/deleteAccount/' + this.nickname, {
        method: 'DELETE',
        headers : {'Authorization' : 'Bearer '+ localStorage.getItem('token')}
      })
      .then(res => res.json()) 
      .then(json => {
        if (json.error ==='Requête non authentifiée')
        {
        this.$swal.fire({
          title :"Veuillez vous connecter",
          icon : 'warning',
        text:json.error});
        this.$router.push('login')
        }
        if (json.error)
        {
        this.$swal.fire({
          title :"Votre compte n'a pas été supprimé",
          icon : 'danger',
        text:json.error});
        }
        else
        {
          this.$store.dispatch('setCurrentPosts',json.posts);
          this.$store.dispatch('setCurrentPostsByNickname',this.nickname);
          localStorage.clear();
          this.$router.push('login');
          this.$swal.fire({
            title :json.message,
            icon : 'success'});
        }
      })
     .catch(err=>err);
    }
  }
}
</script>

<template>
  <div id='updateprofile'>
    <img alt="Photo de profil" :src="this.profileImageUrl" v-if="isUpdating.ProfilePicture==false"/>
    
    <div v-if='isUpdating.ProfilePicture' id='updatingProfilePicture'>
      <label v-if="isUpdating.ProfilePicture==true" for="image" class="btn mb-2">Choisir une image</label>
      <input @change="updateImage" id="image" type="file" accept="image/png, image/jpeg, image/jpg" >
      <div id="preview">
        <img alt="Photo de profil" :src="this.item.imageUrl" class='mb-2' />
      </div>
      <button @click="uploadImage" class='btn btn-primary'>Envoyer</button>
      <button class='btn btn-danger mx-2' @click="cancelUpdate">Annuler</button>
    </div>
    
    
    <p id='userNickname'>{{this.ProfileNickname}}</p>
    <button v-if='this.ProfileNickname==this.nickname' @click='isUpdating.Profile=!isUpdating.Profile' class="btn btn-primary mb-2">Modifier votre profil</button>
    <div v-if='isUpdating.Profile==true' id='updatingprofile'>
      <button v-if='isUpdating.Password==false||isUpdating.delAccount' @click="isUpdating.ProfilePicture=!isUpdating.ProfilePicture" class='btn btn-primary '>Modifier votre photo de profil</button>
      <button v-if='isUpdating.ProfilePicture==false||isUpdating.delAccount' class='btn btn-primary mx-2' @click="isUpdating.Password=!isUpdating.Password">Modifier votre mot de passe</button>
      <button v-if='isUpdating.Password==false ||isUpdating.ProfilePicture==false' @click="isUpdating.delAccount=!isUpdating.delAccount" class='btn btn-danger'>Supprimer votre compte</button>
    </div>
    <div v-if="isUpdating.Password==true" id='updatingPassword' class="mt-2">
      <div class='mx-auto'>
        <label for="InputCurrentPassword">Entrez votre mot de passe actuel</label>
        <input v-model="currentPassword" type="password" class="form-control my-2" id="InputCurrentPassword" name ="InputCurrentPassword" placeholder="Mot de passe actuel">
      </div>
      <div class='mx-auto'>
        <label for="InputNewPassword">Entrez votre nouveau mot de passe</label>
        <input v-model="newPassword" type="password" class="form-control my-2" id="InputNewPassword" name ="InputNewPassword" placeholder="Nouveau mot de passe">
      </div>
      <button @click='updatePassword' class='btn btn-primary' >Modifier</button>
      <button class='btn btn-danger mx-2' @click="cancelUpdate">Annuler</button>
    </div>
    <div v-if="isUpdating.delAccount==true" class="mt-2">
      <h3>Êtes-vous sûr de vouloir supprimer votre compte ? (Cette action est irréversible !) </h3>
      <button @click="deleteAccount" class="btn btn-danger">Oui</button>
      <button @click="cancelUpdate" class='btn btn-primary mx-2'>Non</button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
#updatingPassword
{
  input
  {
    margin-left: auto;
    margin-right: auto;
    width: 30%;
  }
}
label
{
  background-color: #ffd7d7;
}
#updateprofile
{
  img
  {
    border : solid black 3px;
    width: 20%;
  }
}
#image
{
  visibility: hidden;
  width: 0%;
}
#userNickname
{
  font-weight: bold;
  font-size: 25px;
}
#preview
{
  position: relative;
  #delbtn
  {
      position: absolute;
  }
}
</style>