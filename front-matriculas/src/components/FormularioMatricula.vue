<template>
  <div class="form-container">
    <h2>Matrícula em Cursos On-line</h2>

    <div v-if="mensagemSucesso" class="alert success">{{ mensagemSucesso }}</div>
    <div v-if="mensagemErro" class="alert error">{{ mensagemErro }}</div>

    <form @submit.prevent="enviarMatricula">
      <div class="form-group">
        <label for="nome">Nome Completo</label>
        <input type="text" id="nome" v-model="formulario.nome" required />
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="formulario.email" required />
      </div>

      <div class="form-group">
        <label for="curso">Selecione um Curso</label>
        <select id="curso" v-model="formulario.cursoId" required>
          <option value="" disabled>Escolha uma opção...</option>
          <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
            {{ curso.nome }}
          </option>
        </select>
        <small v-if="carregando">Buscando cursos no servidor...</small>
      </div>

      <button type="submit" :disabled="enviando || carregando">
        {{ enviando ? 'Processando...' : 'Realizar Matrícula' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Definição das estruturas de dados (Estado)
const cursos = ref([]);
const carregando = ref(true);
const enviando = ref(false);
const mensagemSucesso = ref('');
const mensagemErro = ref('');

const formulario = ref({
  nome: '',
  email: '',
  cursoId: ''
});

// Consumindo a rota GET da sua API ao carregar a página
onMounted(async () => {
  try {
    const resposta = await fetch('http://localhost:3000/cursos');
    if (!resposta.ok) throw new Error('Falha na comunicação com a API.');
    cursos.value = await resposta.json();
  } catch (erro) {
    mensagemErro.value = 'Erro ao buscar cursos. Verifique se o backend está rodando.';
  } finally {
    carregando.value = false;
  }
});

// Enviando os dados para a rota POST da sua API
const enviarMatricula = async () => {
  mensagemSucesso.value = '';
  mensagemErro.value = '';
  enviando.value = true;

  try {
    const resposta = await fetch('http://localhost:3000/matricula', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario.value)
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.erro || 'Erro ao processar matrícula.');
    }

    mensagemSucesso.value = dados.mensagem;
    formulario.value = { nome: '', email: '', cursoId: '' };

  } catch (erro) {
    mensagemErro.value = erro.message;
  } finally {
    enviando.value = false;
  }
};
</script>

<style scoped>
/* Estilos básicos para a interface */
.form-container {
  max-width: 400px; margin: 2rem auto; padding: 2rem;
  background: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}
.form-group { margin-bottom: 1rem; display: flex; flex-direction: column; }
label { font-weight: bold; margin-bottom: 0.5rem; }
input, select { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
button { 
  width: 100%; padding: 0.75rem; background: #007bff; color: white; 
  border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem;
}
button:disabled { background: #ccc; cursor: not-allowed; }
.alert { padding: 0.75rem; margin-bottom: 1rem; border-radius: 4px; }
.success { background: #d4edda; color: #155724; }
.error { background: #f8d7da; color: #721c24; }
</style>