<script>

export default {
  name: 'HeaderLogin'
}
</script>

<template>
    <header class='mb-3'>
        <nav class="navbar navbar-expand-lg navbar-light ">
            <div class="container-fluid">
                <router-link class='navbar-brand d-none d-sm-block col-4'  to="/"><img alt="Logo Groupomania" src='../assets/icon-left-font-monochrome-black.svg' height="50"></router-link>
                <router-link class='navbar-brand d-block d-sm-none col-4 '  to="/"><img alt="Logo Groupomania" src='../assets/logo-black.png' height="50"></router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class='nav-link' to="/signup"><button class="btn btn-secondary"> S'inscrire </button></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class='nav-link' to="/login"><button class="btn btn-secondary">Se connecter</button></router-link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped lang='scss'>
header
{
    background-color: #ffd7d7;
}
</style>