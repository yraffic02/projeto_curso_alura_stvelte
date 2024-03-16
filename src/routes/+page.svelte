<script lang="ts">
  import Formulario from "../components/Form/Formulario.svelte";
import Titulo from "../components/Titulo/Titulo.svelte";
  import Usuario from "../components/Usuario/Usuario.svelte";
  import type { IUsuario } from "../interfaces/IUsuario";

    let user: IUsuario | null = null;

    function responseUser(e: CustomEvent<IUsuario | null>){
        user = e.detail;
    }
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<header>
    <Titulo />

    <div class="busca-usuario">
        <Formulario on:response={responseUser}/>
    </div>
</header>

<section>
	{#if user}
		<Usuario {user}/>
	{/if}
</section>

<style>
	header {    
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .busca-usuario {
        position: relative;
        width: 70%;
    }
</style>
