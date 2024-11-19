# MVP ERP

## Objetivo do MVP

O objetivo deste MVP (Produto Mínimo Viável) é oferecer uma versão inicial 
funcional do ERP Multi Tenant, focada nas operações essenciais de **Usuários**, 
**Gerenciamento de Estoque**, **Financeiro** e **Produtos**. Cada módulo inclui 
funcionalidades e regras de negócio básicas para garantir uma experiência 
consistente e segura.

## Sumário

- [Módulos do MVP](#mvp-modules)
- [Funcionalidades e Regras de Negócio Essenciais](#essentials-functionalities-business-rules)
- [Fluxos Prioritários](#main-flows)
- [Escopo Futuro](#future-scope)

---

<a id="mvp-modules"></a>

## Módulos do MVP

1. [**Usuários**](#users)
	- [**Autenticação**](#authentication)
2. [**Gerenciamento de Estoque**](#stock-management)
3. [**Financeiro**](#financial)
4. [**Produtos**](#products)

---

<a id="essentials-functionalities-business-rules"></a>

## Funcionalidades e Regras de Negócio Essenciais

<a id="users"></a>

### 1. Usuários

Este módulo se dedica completamente ao gerenciamento de todas as ações em comum
que os usuários podem fazer no sistema independentemente de suas permissões
e autorizações

<a id="authentication"></a>

#### Autenticação

A autenticação é simplificada, mas com segurança suficiente para proteger o 
acesso ao sistema e permitir recuperação de senha.

##### Funcionalidades

###### **Login**
  - [ ] **Login via E-mail e Senha**: Autenticação básica com validação de credenciais.
  	- E-mail
  		- [ ] Deve ser validado que o e-mail esteja em um formato válido
  	- Senha
  		- [ ] A senha deve ser criptografada com um algoritmo sha256 com 8 rounds
  			de criptografia
  		- A senha deve seguir os seguintes requisitos mínimos:
  			- [ ] Deve possuir no mínimo 9 caracteres e no máximo 20 caracteres
  			- [ ] A entropia da senha deve ser de, no mínimo, 59 bits e no máximo
  				131 bits
  			- [ ] A senha deve conter pelo menos 1 caractere especial, uma letra
  				maiúscula, uma letra minúscula e um número
  			- [ ] O sistema deve ser capaz de gerar uma senha aleatória ao usuário
  				que siga sempre os padrões estabelecidos.
  			- [ ] O usuário deve poder escolher o tamanho da senha gerada automáticamente
  				e esta deve sempre ser tal que a entropia seja máxima
  - [ ] **Mensagem de Boas-vindas**: Enviada no primeiro login para novos usuários.
  	- [ ] A mensagem de e-mail deve conter:
  		- A logo do ERP
  		- Uma mensagem de boas-vindas (nesta mensagem, em algum momento, deve
  		conter o nome do usuário que recebeu o e-mail)
  		- Deve ser enviado nos anexos uma cópia dos termos de uso em PDF.
  - [ ] Deve ser possível realizar somente 5 requisições por hora.
  	- [ ] Após 3 tentativas falhas, o sistema irá avisar que a conta será
  		temporariamente bloqueada
  	- [ ] Após 5 tentativas, a conta será bloqueada e não deverá ser possível
  		logar no sistema com as mesmas credenciais por 1h.
 
###### **Cadastro**
  - [ ] **Cadastro de Usuários**: Usuários se registram com e-mail, senha e confirmação de senha.
  	- [ ] Um usuário cadastrado deve conter as seguintes informações:
  		- [ ] Nome* e sobrenome*
  			- Esses campos devem ser sempre normalizados seguindo as seguintes
  				regras:
  				- [ ] Sempre devem estar em `ALL_CASE`
  		- [ ] E-mail* e senha*
  			- O campo de e-mail deve conter a seguinte validação:
  				- [ ] O e-mail deve ser único dentro do sistema
  				- [ ] Deve ser validado que o e-mail esteja em um formato válido
  			- O campo de senha deve ser digitalmente assinado
  		- Username
  		- [ ] CPF
  			- Esse campo deve conter as seguintes validações:
  				- [ ] Deve estar formatado corretamento, ou seja, deve conter exatamente
  					11 caracteres
  				- [ ] Os dígitos verificadores devem ser válidos
  		- [ ] Telefone
  			- O telefone deve conter as seguintes validações:
  				- [ ] Deve conter um DDD válido
  				- [ ] O sistema deve alertar quando o DDD informado no número do 
  					telefone for diferente do DDD da região na qual o cliente está
  					fazendo o cadastro
  				- [ ] Deve conter no mínimo 10 e no máximo 11 caracteres
        - O usuário poderá cadastrar mais de um telefone caso seja necessário
  		- [ ] Endereço
  			- O endereço deve possuir os seguintes campos:
  				- [ ] Número*
  				- [ ] Rua*
  				- [ ] CEP*
  				- [ ] Cidade*
  				- [ ] Estado*
  				- [ ] Rua*
  				- [ ] Bairro*
  				- [ ] Coordenadas (Latitude* e Longitude*)
  			- [ ] Um usuário pode cadastrar mais de um endereço caso seja necessário
  			- O endereço deve conter as seguintes validações:
  				- [ ] Deve ser verificado que o endereço do usuário cadastrado
  					esteja na mesma região que a região na qual o DDD informado é válido,
  					mas o sistema não deve bloquear o cadastro, somente avisar.
  	- [ ] Enviar e-mail de confirmação de conta
  		- [ ] A conta deve ser confirmada em até 24h

###### **Recuperação de Senha**
  - [ ] **Envio de Token por E-mail**: Envia um token de recuperação para redefinição de senha.
  	- Devem ser validados os seguintes fatores:
  		- [ ] O e-mail deve possuir um formáto válido
  		- [ ] O e-mail deve existir e deve estar associado a um usuário cadastrado
  		- [ ] Somente usuário ativos poderão recuperar uma senha
  		- [ ] A recuperação de senha deve sempre retornar sucesso independentemente
  			das validações anteriores forem um sucesso ou não. Caso as validações
  			estejam corretas, o e-mail será enviado. Caso contrário, uma mensagem
  			de sucesso será lançada e nenhum e-mail será enviado
		- [ ] Deve ser possível realizar somente 5 requisições por hora.
  	- [ ] Após 3 tentativas falhas, o sistema irá avisar que a conta será
  		temporariamente bloqueada
  	- [ ] Após 5 tentativas, a conta será bloqueada e não deverá ser possível
  		logar no sistema com as mesmas credenciais por 1h.
  	- O token enviado deve conter as seguintes validações:
  		- [ ] Deve conter 20 caracteres
  		- [ ] Deve ser armazenado criptografado com 2 rounds e deve ser assinado
  			digitalmente
  - [ ] **Token Expira em 2h Horas**: Garantia de segurança e validade limitada.
  	- O processo de expiração deve conter as seguintes regras:
  		- [ ] Um token não pode ser utilizado mais de uma vez dentro do prazo
  		- [ ] Deve ser possível realizar somente 5 requisições por token.
	  	- [ ] Após 5 tentativas, o token será expirado e o processo de recuperação
	  		de senha deve ser feito novamente

---

<a id="stock-management"></a>

### 2. Gerenciamento de Estoque

O gerenciamento de estoque permite o registro de entradas e saídas de produtos e monitora o estoque mínimo para reposições.

#### Funcionalidades

- **Controle de Movimentações**
  - [ ] **Registro de Entradas e Saídas de Estoque**: Permite rastrear movimentações de produtos.
  - [ ] **Atribuição de Responsável pela Movimentação**: Cada registro de movimentação identifica o usuário responsável.

- **Monitoramento de Estoque Mínimo**
  - [ ] **Notificações Automáticas para Reposição**: Disparadas quando o estoque atinge o limite mínimo.

#### Regras de Negócio

1. **Estoque Mínimo**: Quando o estoque atinge o limite mínimo, o sistema dispara uma notificação de alerta para reposição.
2. **Autorização para Movimentações**: Apenas usuários autorizados podem registrar entradas e saídas de estoque.

---

<a id="financial"></a>

### 3. Financeiro

O módulo financeiro oferece o básico para gestão de clientes e fornecedores, além de um plano de contas simples para controle financeiro.

#### Funcionalidades

- **Cadastro de Clientes e Fornecedores**
  - [ ] **Cadastro Básico**: Informações de identificação, como nome, CNPJ/CPF, endereço e contato.
  - [ ] **Classificação de Cliente/Fornecedor**: Para definir se é cliente, fornecedor ou funcionário.

- **Plano de Contas**
  - [ ] **Plano Estruturado Hierarquicamente**: Definição de contas principais e subcontas.
  - [ ] **Contas Obrigatórias**: Algumas contas são obrigatórias para organização mínima do plano de contas.

#### Regras de Negócio

1. **Duplicidade de CNPJ/CPF**: Cada cliente ou fornecedor deve ter CNPJ/CPF único para evitar duplicidades.
2. **Estrutura do Plano de Contas**: Contas seguem uma hierarquia básica para garantir a organização mínima.

---

<a id="products"></a>

### 4. Produtos

O módulo de produtos permite o cadastro básico de produtos, com informações importantes para controle de estoque e preço.

#### Funcionalidades

- **Cadastro de Produtos**
  - [ ] **Código Único para Identificação**: Cada produto recebe um código de identificação único.
  - [ ] **Categoria e Subcategoria**: Produtos são classificados para melhor organização.
  - [ ] **Preço de Custo e Preço de Venda**: Informação básica para cálculo de margens e relatórios.

#### Regras de Negócio

1. **Código de Produto Único**: Cada produto deve ter um código exclusivo.
2. **Verificação de Categoria**: Produtos precisam ser classificados em categorias predefinidas.

---

<a id="main-flows"></a>

## Fluxos Prioritários

### 1. Autenticação

- **Login**
  1. Usuário insere e-mail e senha.
  2. Sistema autentica as credenciais e redireciona para o dashboard inicial.

- **Recuperação de Senha**
  1. Usuário solicita redefinição de senha.
  2. Sistema envia um token de recuperação por e-mail.
  3. Usuário insere o token e define uma nova senha.

### 2. Gerenciamento de Estoque

- **Registro de Entrada e Saída de Produtos**
  1. Usuário seleciona o produto, insere a quantidade e escolhe o tipo de movimentação (entrada ou saída).
  2. Sistema registra a movimentação e atualiza a quantidade de estoque.
  3. Caso o estoque atinja o limite mínimo, o sistema envia uma notificação.

### 3. Cadastro Financeiro

- **Cadastro de Cliente/Fornecedor**
  1. Usuário insere as informações básicas do cliente ou fornecedor.
  2. Sistema verifica duplicidade de CNPJ/CPF.
  3. Cadastro é confirmado e salvo.

### 4. Cadastro de Produtos

- **Cadastro Básico**
  1. Usuário preenche informações como código, categoria, preço de custo e preço de venda.
  2. Sistema verifica o código para evitar duplicidade.
  3. Produto é salvo e listado no módulo de produtos.

---

<a id="future-scope"></a>

## Escopo Futuro

Após validação do MVP, novas funcionalidades poderão ser incluídas para enriquecer o sistema:

1. **Autenticação Avançada**
   - Autenticação 2FA
   - Login por provedores externos (Google, GitHub)

2. **Gerenciamento Avançado de Estoque**
   - Controle de validade para produtos perecíveis
   - Procedimentos de inventário e relatórios avançados
   - Políticas de armazenamento com condições especiais (temperatura, segurança)

3. **Financeiro Completo**
   - Controle detalhado de fluxo de caixa e aprovações
   - Relatórios contábeis e gerenciais completos

4. **Gestão de Produtos Avançada**
   - Controle de versões e histórico de alterações
   - Atributos personalizáveis e integração com estoque e financeiro

---

Este MVP garante que as funcionalidades básicas para gestão de autenticação, estoque, finanças e produtos estejam operacionais, proporcionando uma base sólida para futuras expansões.

