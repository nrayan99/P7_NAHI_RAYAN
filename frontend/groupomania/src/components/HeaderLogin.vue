<script>

export default {
  name: 'HeaderLogin'
}
</script>

<template>
    <header class='mb-3'>
            <div class='container'>
                <nav class='navbar'>
                <router-link class='navbar-brand'  to="/"><img src='../assets/icon-left-font-monochrome-black.svg' height="50"></router-link>
                <ul class='navbar-nav'>
                <li class='nav-item'><router-link class='nav-link' to="/signup"><button class="btn-sign btn-outline-secondary"> S'inscrire </button></router-link></li>
                <li class='nav-item'><router-link class='nav-link' to="/login"><button class="btn-sign btn-outline-secondary">Connexion</button></router-link></li>
                </ul>
                </nav>
            </div>
    </header>
</template>

<style lang='scss'>
    header
    {
    background-color: #ffd7d7;
    }
</style>