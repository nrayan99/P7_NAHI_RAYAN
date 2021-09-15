<script>
export default {
    name: 'CreatePosts',
    data () {
        return {
            textarea:'',
            item: {
                image : null,
                imageUrl: null,
            }
        }     
    },
    methods : {
        //Fonction permettant d'envoyer un post au backend
        submitPost(){
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
                    this.$store.dispatch('setCurrentPosts',json);
                    this.item.image=null;
                    this.item.imageUrl=null;
                    this.textarea='';
                    document.getElementById('image').value='';  
                    this.$swal.fire({
                        title :"Votre article a bien été crée",
                        icon : 'success'});
                }
               
            })
            .catch((error) => error)
        },
        // Fonction permettant de stocker les données de l'image upload
        uploadImage(e) {
            const file = e.target.files[0]
            this.item.image = file
            this.item.imageUrl = URL.createObjectURL(file)
        },
        //Fonction permettant de supprimer les données de l'image upload lors de la suppression de cette dernière
        delImg()
        {
            this.item.imageUrl=null;
            this.item.image=null;
            document.getElementById('image').value='';
        }
    }
}

</script>

<template>
    <div class='createPosts'>
        <div class='container d-flex flex-column mb-3 align-items-center' id='createPosts'>
            <label v-if="!item.imageUrl" for="image" class="btn btn-primary">Choisir une image</label>
            <input @change="uploadImage" id="image" type="file" accept="image/png, image/jpeg, image/jpg" >
            <div  v-if="item.imageUrl" id="preview">
                <button @click="delImg" id='delbtn'>X</button>
                <img alt="Image d'article" :src="item.imageUrl" />
            </div>
            <textarea v-model='textarea' class="mx-3 my-3" placeholder="Quelque chose à partager ?"></textarea>
            <button class="btn btn-primary" @click="submitPost" >ENVOYER</button>
        </div>
    </div>
</template>

<style scoped lang='scss'>
#createPosts
{
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 20px;
    width: 50%;
    background-color: #ffd7d7 ;
}
#image
{
    visibility: hidden;
    width: 0%;
    height: 0px;
}
textarea{
    border-radius: 20px;
    width: 90%;
}
.btn
{
    border-radius: 20px;
    @media ( max-width: 991px)
    {
        width: 100%;
    }
    
    font-weight: bold;
    word-wrap: break-word;
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