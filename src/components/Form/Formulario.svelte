<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { IUsuario } from "../../interfaces/IUsuario";
  import { getRepos, getUser } from "../../func/requests";
  import type { IRepositorio } from "../../interfaces/IRepositorio";
  import Button from "../Button/Button.svelte";

    const dispatch = createEventDispatcher<{response: IUsuario | null}>()
    let valueInput = '';
    let status: null | number;

    async function aoSubmeter(){
        const res = await getUser(valueInput);
        const resRepo = await getRepos(valueInput)
        
        if(res.ok && resRepo.ok){
            const resJson = await res.json()
            const resJsonRepos = await resRepo.json()
            
            const repos = resJsonRepos.map((i: any)=> {
                return {
                    nome: i.name,
                    url: i.url
                } as IRepositorio;
            })

            dispatch('response', {
                avatar_url: resJson.avatar_url,
                login: resJson.login,
                perfil_url: resJson.html_url,
                nome: resJson.name,
                repos_publicos: resJson.public_repos,
                seguidores: resJson.followers,
                repositorios_recentes: repos
            })
            status = 200;
        } else {
            status = res.status;
            dispatch("response", null)
        }
    }
</script>

<form on:submit|preventDefault={aoSubmeter}>
    <input 
        type="text" 
        class="input" 
        class:error-input={status === 404 }
        bind:value={valueInput}
        placeholder="Digite o usuário"
    />
    {#if status === 404}
    <span class="erro">Usuario não encontrado!</span>
    {/if}
    <div class="botao-container">
        <Button>
            Buscar
        </Button>
    </div>
</form>


<style>
    .input {
        padding: 15px 25px;
        width: calc(100% - 8.75rem);
        font-size: 1rem;
        border-radius: 8px;
        border: 1px solid #2e80fa;
        box-shadow: 0px 17px 52px rgba(222, 231, 247, 0.4);
        outline: 0;
    }

    .error-input{
        border: 1px solid #ff003e;
    }

    .input::placeholder {
        font-family: "Roboto";
        font-style: italic;
        font-weight: 300;
        font-size: 19.5px;
        line-height: 26px;
        color: #6e8cba;
    }

    .botao-container {
        position: absolute;
        width: 9.625rem;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
    }

     .erro {
        position: absolute;
        bottom: -25px;
        left: 0;
        font-style: italic;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        z-index: -1;
        color: #ff003e;
    }
</style>