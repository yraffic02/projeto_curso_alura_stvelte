<script lang="ts">
  import type { IUsuario } from "../../interfaces/IUsuario";
  import BarraSuperior from "../BarraSuperior/BarraSuperior.svelte";

  export let user: IUsuario;

  $: isRepos = Boolean(user.repositorios_recentes.length)
</script>


<div class="card-usuario">
    <BarraSuperior />
    <div class="usuario">
        <div class="foto-container">
            <a href={user.perfil_url} target="_blank" rel="noopener">
                <div 
                    class="foto-usuario"
                    style:background-image='url({user.avatar_url})'
                ></div>
            </a>
        </div>
        <div class="detalhes-usuario">
            <div class="info">
                Nome: <span>{user.nome}</span>
            </div>
            <div class="info">
                Usuário: <span>{user.login}</span>
            </div>
            <div class="info">
                Seguidores: <span>{user.seguidores}</span>
            </div>
            <div class="info">
                Repositórios: <span>{user.repos_publicos}</span>
            </div>

			<div class="repositorios">
				<h2 class="titulo">Repositórios recentes</h2>
				{#if  isRepos}
					<ul>
						{#each user.repositorios_recentes as repo}
							<li>
								<a 
									href={repo.url}
									target="_blank"
									rel="noopener"
									class="repositorio"
								>
									{repo.nome}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
        </div>
    </div>
</div>

<style>
    .card-usuario {
		margin-top: 65px;
	}

	.usuario {
		padding: 28px 0;
		background: rgba(255, 255, 255, 0.5);
		box-shadow: -12px 37px 45px rgba(133, 127, 201, 0.18);
		border-radius: 0px 0px 13px 13px;

		display: flex;
		justify-content: center;
	}

	.foto-container {
		margin-right: 81px;
	}

	.foto-usuario {
		width: 12.75rem;
		height: 12.75rem;
		border: 4.56px solid #2e80fa;
		border-radius: 50%;
		background-size: cover;
		background-image: url('https://github.com/yraffic02.png');
	}

	.detalhes-usuario {
		margin-right: 55px;
	}

	.detalhes-usuario > .info {
		font-weight: 600;
		font-size: 20px;
		line-height: 31px;
		color: #395278;
	}

	.detalhes-usuario > .info > span {
		color: #6781a8;
		font-weight: normal;
	}

	.repositorios > .titulo {
		font-size: 20px;
		line-height: 31px;
		font-weight: 600;
		color: #395278;
	}

	.repositorio {
		font-size: 20px;
		line-height: 31px;
		color: #6781a8;
		transition: color 0.2s;
	}
</style>