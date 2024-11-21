<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { Button, Icon, Input, Separator } from '@saas/ui-kit/components'

import googleIcon from '@/assets/google-ico.svg';
import githubIcon from '@/assets/github-ico.svg';
</script>

<template>
  <div class="c-auth__container">
    <div class="c-logo"></div>
    <h1>Faça login com</h1>
    <div class="c-auth__actions">
      <Button.Root>
        <Button.Base>
          <Icon.Base
            :src="googleIcon"
            :size="12"
          />
          Google
        </Button.Base>
      </Button.Root>
      <Button.Root>
        <Button.Base>
          <Icon.Base
            :src="githubIcon"
            :size="12"
          />
          GitHub
        </Button.Base>
      </Button.Root>
    </div>
    <Separator.Root class="c-separator">
      <Separator.Base />
      <span>ou</span>
      <Separator.Base />
    </Separator.Root>
    <form
      method="POST"
      class="c-auth__form"
    >
      <Input.Root>
        <Input.Label for="email">E-mail</Input.Label>
        <Input.Base
          type="email"
          placeholder="email@example.com"
          id="email"
          name="email"
          required
          aria-required="true"
        />
      </Input.Root>
      <Input.Root>
        <Input.Label for="password">Senha</Input.Label>
        <Input.Base
          type="password"
          placeholder="*********"
          id="password"
          name="password"
          required
          aria-required="true"
        />
      </Input.Root>
      <Button.Root>
        <Button.Base type="submit">Entrar</Button.Base>
      </Button.Root>
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
    cursor: pointer;
  }
}

.link {
  width: 100%;
  text-align: left;
  color: color(brand);
  text-decoration: none;
}
</style>
