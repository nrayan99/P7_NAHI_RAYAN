<script>
export default {
  name: 'CreatePosts',
  data () {
      return {
           item:{
          //...
          image : null,
          imageUrl: null
        }
      }
     
  },
  methods : {
        submitPost(e){
          e.preventDefault();
          let formData= new FormData()
          formData.append('file',JSON.stringify(this.item.image));
          const post = {
              userId : localStorage.getItem('userId'),
              file : formData,
              post_text : this.textarea
          }
          console.log(JSON.stringify(post.file));
          fetch('http://localhost:3000/api/posts/createPost', {

          method : "POST",
          body :  JSON.stringify(post),
          headers : {
              'Accept': 'application/json',
              "Content-Type": "application/json",
          }
        })
        .then((response) => response.json())
        .then((json) => {
            return json; 
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
        <div class='container d-flex '>

            <label v-if="!item.imageUrl" for="image" class="btn">Choisir une image</label>
            <input @change="uploadImage" id="image" type="file" accept="image/png, image/jpeg, image/jpg" >
            <div id="preview">
                <button v-if="item.imageUrl" @click="delImg" id='delbtn'>X</button>
                <img v-if="item.imageUrl" :src="item.imageUrl" />
            </div>

            <textarea v-model='textarea' placeholder="Quelque chose à partager ?"></textarea>

            <button @click="submitPost" >ENVOYER</button>
        </div>
    </div>
</template>

<style scoped lang='scss'>
    #image
    {
        visibility: hidden;
        width: 0%;
    }
    .btn
    {
        background-color: #ffd7d7;
        width: 10%;
        
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