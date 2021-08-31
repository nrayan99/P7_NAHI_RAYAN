<template>
  <div id="app">
		<nav>
			<Signup />
			<a href="/about">À propos</a>
			<a href="/contact">Contact</a>
		</nav>
		<p>Bienvenue sur notre page d'<Signup /></p>
	</div>
</template>

<script>
import Signup from './components/Signup.vue'

export default {
  name: 'App',
  components: {
    Signup
  }
}
</script>

<style lang="scss">

</style>
