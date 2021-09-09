<script>
export default {
  name: 'CreatePosts',
  data () {
      return {
          textarea:null,
           item:{
          //...
          image : null,
          imageUrl: null,
        }
      }
     
  },
  methods : {
        submitPost(e){
          e.preventDefault();
          const fd = new FormData()
          fd.append('image',this.item.image);
          fd.append('userId',localStorage.getItem('userId'));
          fd.append('post_text',this.textarea)         
          fetch('http://localhost:3000/api/posts/createPost', {
          method : "POST",
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
            this.$store.dispatch('setCurrentPosts',json);
            this.item.imageUrl=null;
            this.item.image=null;
            this.textarea=null;
        })
        .catch((error) => {
            console.log(error);
        })
        },
        uploadImage(e) {
            const file = e.target.files[0]
            this.item.image = file
            this.item.imageUrl = URL.createObjectURL(file)
        },
        delImg()
        {
            this.item.imageUrl=null;
            this.item.image=null;
        }
    }
}

</script>

<template>
    <div class='createPosts'>
        <div class='container d-flex mb-3 justify-content-center'>
            <label v-if="!item.imageUrl" for="image" class="btn">Choisir une image</label>
            <input @change="uploadImage" id="image" type="file" accept="image/png, image/jpeg, image/jpg" >
            <div id="preview">
                <button v-if="item.imageUrl" @click="delImg" id='delbtn'>X</button>
                <img v-if="item.imageUrl" :src="item.imageUrl" />
            </div>
            <textarea v-model='textarea' class="mx-3" placeholder="Quelque chose à partager ?"></textarea>
            <button class="btn" @click="submitPost" >ENVOYER</button>
        </div>
    </div>
</template>

<style scoped lang='scss'>
    #image
    {
        visibility: hidden;
        width: 0%;
    }
    textarea{
        border-radius: 20px;
    }
    .btn
    {
        border-radius: 20px;
        background-color: #ffd7d7;
        width: 10%;
        font-weight: bold;
        
    }
    textarea
    {
        width: 50%;
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