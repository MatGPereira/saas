<script setup lang="ts">
import { RouterLink } from 'vue-router';

import googleIcon from '@/assets/google-ico.svg';
import githubIcon from '@/assets/github-ico.svg';
</script>

<template>
  <div class="c-auth__container">
    <div class="c-logo"></div>
    <h1>Faça login com</h1>
    <div class="c-auth__actions">
      <button type="button">
        <img
          :src="googleIcon"
          alt=""
          aria-hidden="true"
          class="c-icon"
        />
        Google
      </button>
      <button type="button">
        <img
          :src="githubIcon"
          alt=""
          aria-hidden="true"
          class="c-icon"
        />
        GitHub
      </button>
    </div>
    <div class="c-separator">
      <hr />
      <span>ou</span>
      <hr />
    </div>
    <form
      method="POST"
      class="c-auth__form"
    >
      <fieldset>
        <label for="email">E-mail</label>
        <input
          type="email"
          placeholder="email@example.com"
        />
      </fieldset>
      <fieldset>
        <label for="password">Senha</label>
        <input
          type="password"
          placeholder="*********"
        />
      </fieldset>
      <button type="submit">Entrar</button>
    </form>
    <RouterLink
      to=""
      class="link"
    >
      Esqueceu sua senha?
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/styles/tools/color' as *;

.c-auth__container {
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 16rem;
  row-gap: 1rem;
  width: 100%;
}

h1 {
  color: color(gray-600);
}

// TODO: esse classe será um componente futuramente
.c-logo {
  background-image: color(brand-gradient);
  border-radius: 50%;
  height: 4.5rem;
  width: 4.5rem;
  margin-bottom: .5rem;
}

.c-auth__actions {
  align-items: center;
  column-gap: 1rem;
  display: flex;
  width: 100%;

  button {
    background-color: color(gray-100);
    color: color(gray-950);
    border: none;
    border-radius: 4px;
    padding: .625rem;
    align-items: center;
    column-gap: .25rem;
    display: inline-flex;
    flex-grow: 1;
    justify-content: center;
    cursor: pointer;
  }
}

.c-icon {
  height: .75rem;
  width: .75rem;
}

.c-separator {
  display: flex;
  align-items: center;
  column-gap: .25rem;
  width: 100%;

  span {
    line-height: 0;
    margin-bottom: .25rem;
    color: color(gray-600);
  }

  hr {
    flex: 1;
  }
}

.c-auth__form {
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  width: 100%;

  fieldset {
    display: flex;
    flex-direction: column;
    row-gap: .5rem;
  }

  input {
    border-radius: 4px;
    border: none;
    background-color: color(gray-100);
    padding: .75rem 1rem;

    &::placeholder {
      color: color(gray-600);
    }
  }

  label {
    color: color(brand);

    &::after {
      content: '*';
      color: color(danger);
      margin-left: .25rem;
    }
  }

  button {
    padding: .625rem;
    background-image: color(brand-gradient);
    border: none;
    border-radius: 4px;
    color: color(gray-950);
  }
}

.link {
  width: 100%;
  text-align: left;
  color: color(brand);
  text-decoration: none;
}
</style>
