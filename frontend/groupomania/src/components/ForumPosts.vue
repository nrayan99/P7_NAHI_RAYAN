<template>  
  <div class='forumPosts'>
    <div class='container '>
      <div v-for="item in postsList" :key="item.id" >
        <div v-if="item.masked==maskedView"> 
          <div v-if='this.currentPostUpdate!==item.id' class='postDisplayed card mb-5 mx-auto'>
            <img  v-if='item.imageUrl' :src="item.imageUrl" class="card-img-top" alt="Image d'article">
            <div class="card-body">
              <p class="card-text">{{item.post_text}}</p>
              <p class="card-text"><small class="text-muted">Publié par <router-link class="router-link" :to="{path:'/profiles:'+item.nickname}">{{item.nickname}}</router-link> </small></p>
            </div>
            <button v-if="this.nickname==item.nickname"  @click="delPost(item.id)" class="btn mb-1">Supprimer</button>
            <button v-if="this.admin==1 &&maskedView==0" @click='maskPost(item.id)' class="btn mb-1">Masquer</button>
            <button v-if="this.admin==1 &&maskedView==1" @click='unmaskPost(item.id)' class="btn mb-1">Démasquer</button>
            <button v-if="this.nickname==item.nickname || this.admin==1" @click='displayPostUpdate(item.id,item.imageUrl,item.post_text)' class="btn ">Modifier</button>
          </div>
          <div v-else class='postUpdate'>
            <div class='container d-flex mb-3 justify-content-center'>
              <label v-if="!this.updatePost.imageUrl" for="imageupdate" class="btn">Choisir une image</label>
              <input @change="uploadImage" id="imageupdate" type="file" accept="image/png, image/jpeg, image/jpg" >
              <div  v-if="this.updatePost.imageUrl" id="preview">
                  <button @click="delImg" id='delbtn'>X</button>
                  <img :src="this.updatePost.imageUrl"/>
              </div>
              <textarea v-model='updatePost.textarea' class="mx-3" placeholder="Quelque chose à partager ?"></textarea>
              <div class='d-flex flex-column'>
                <button class="btn mb-2" @click="postUpdating">MODIFIER</button>
                <button class="btn" @click="cancelUpdate" >ANNULER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 v-if="PostsLength==0">Aucun article disponible </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForumPosts',
  props:['postsList','nicknameprop','maskedView','PostsLength'],
  data (){
    return {
      nicknamep : this.nicknameprop,
      updatePost :{
        imageUrl: null,
        image : null,
        textarea:null,
        imageDeleted:0,
      },
      nickname:null,
      admin : null,
      currentPostUpdate : null,
    }
  },
  beforeMount(){ 
    this.$store.dispatch('setCurrentPostsLength');
    fetch('http://localhost:3000/api/users/getCurrentUser',{
        method :'GET',
        headers : {
          'Authorization' : 'Bearer '+ localStorage.getItem('token')
        }
      })
      .then(posts=> posts.json())
      .then(json=>{
        this.nickname= json[0].nickname
        this.admin= json[0].admin
      })
      .catch(err=>err);
    
    fetch('http://localhost:3000/api/posts/getAllPosts',{// Permet de recupérer tous les articles et de les stocker dans le store
      method :'GET',
      headers : {
        'Authorization' : 'Bearer '+ localStorage.getItem('token')
      }
    })
    .then(posts=> posts.json())
    .then(json=>{
      if (json.error)
      {
        this.$swal.fire({
          title :"Veuillez vous connecter",
          icon : 'warning',
        text:json.error});
        this.$router.push('login')
      }
      else
      {
        this.$store.dispatch('setCurrentPosts',json); 
      }
    })
    .catch(err=>err);
  },
  methods :{ 
    maskPost(postid) // Fonction permettant de masquer un article
    {
        fetch('http://localhost:3000/api/posts/maskPost/'+ postid, {
        method : "PUT",
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
        else
        {
          this.$store.dispatch('setCurrentPostsLength');
          this.$store.dispatch('setCurrentPostsByNickname',this.nicknamep);
          this.$store.dispatch('setCurrentPosts',json);
          this.$swal.fire({
            title :"L'article a bien été masqué",
            icon : 'success'});
        }        
      })
      .catch((error) => {error})
    },
    unmaskPost(postid) // Fonction permettant de démasquer un article
    {
        fetch('http://localhost:3000/api/posts/unmaskPost/'+ postid, {
        method : "PUT",
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
        else
        {
          this.$store.dispatch('setCurrentPostsLength');
          this.$store.dispatch('setCurrentPostsByNickname',this.nicknamep);
          this.$store.dispatch('setCurrentPosts',json);
          this.$swal.fire({
            title :"L'article a bien été démasqué",
            icon : 'success'});
          this.isEmptyVerify()
        }        
      })
      .catch((error) => {error})
    },
    // Permet d'annuler la modification d'un article
    cancelUpdate()
    {
      this.currentPostUpdate=null;
      this.updatePost.imageDeleted=0
    }
    ,
    //permet de supprimer un article
    delPost(postid)
    {
      fetch('http://localhost:3000/api/posts/deletePost/' + postid, {
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
        else
        {
          this.$store.dispatch('setCurrentPostsLength');
          this.$store.dispatch('setCurrentPostsByNickname',this.nicknamep);
          this.$store.dispatch('setCurrentPosts',json);
          this.$swal.fire({
          title :"L'article a bien été supprimé",
          icon : 'success'});
        }
        
      })
      .catch(err=>err);
    },
    //permet de voir les outils de modification sur l'article selectionné 
    displayPostUpdate(postid,imageUrl,post_text)
    {
      this.currentPostUpdate = postid;
      this.updatePost.imageUrl=imageUrl;
      this.updatePost.textarea=post_text;
    },
    //Permet de supprimer une image
    delImg()
    {
      this.updatePost.imageUrl=null;
      this.updatePost.image=null;
      this.updatePost.imageDeleted=1;
      document.getElementById('imageupdate').value='';
    },
    //Permet de charger les données de l'image upload
    uploadImage(e) 
    {
      const file = e.target.files[0]
      this.updatePost.image = file
      this.updatePost.imageUrl = URL.createObjectURL(file)
    },
    // Permet d'envoyer les informations de modifications d'un article
    postUpdating()
    { 
      const fd = new FormData()
      fd.append('image',this.updatePost.image);
      fd.append('post_text',this.updatePost.textarea);
      fd.append('imagedeleted',this.updatePost.imageDeleted) 
      this.updatePost.imageDeleted=0;
      this.updatePost.image=null;
      this.updatePost.imageUrl=null;
      document.getElementById('imageupdate').value='' 
      fetch('http://localhost:3000/api/posts/updatePost/'+ this.currentPostUpdate, {
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
        else
        {
          this.$store.dispatch('setCurrentPostsByNickname',this.nicknamep);
          this.$store.dispatch('setCurrentPosts',json);
          this.$swal.fire({
            title :"L'article a bien été modifié",
            icon : 'success'});
        }        
      })
      .catch((error) => {error;
      })
    this.currentPostUpdate=null
    }
  }
}
</script>

<style scoped lang='scss'>
.router-link
{
  color : navy;
}
#imageupdate
{
  visibility: hidden;
  width: 0%;
}
.btn
{
  background-color:#ffd7d7 ;
  display:inline;
  border-radius: 0px;
}
.card
{
  width: 70%;
  border-radius: 20px 20px 0px 0px;
  img
  {
    border-radius: 20px 20px 0px 0px;
    max-height: 300px;
    box-sizing: content-box;
  }
}
#image
{
  visibility: hidden;
  width: 0%;
}
textarea
{
  border-radius: 20px;
  width: 60%;
}

#preview
{
  position: relative;
  img
  {
    height:90px;
    width: 100%;
  }
  #delbtn
  {
    position: absolute;
  }
}
</style>