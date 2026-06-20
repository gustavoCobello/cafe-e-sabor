# Sistema de Gestão de Estoque

Sistema web para controle de estoque desenvolvido como projeto de conclusao do 3 semestre do curso de **Desenvolvimento de Sistemas** com **Java**, utilizando Spring Boot.

---

## Sobre o Projeto

O Cafe Aroma e Sabor e uma cafeteria que necessitava de uma solucao digital para gerenciar seu almoxarifado. Este sistema permite cadastrar produtos, controlar quantidades, registrar movimentacoes de entrada e saida, e monitorar niveis de estoque com alertas visuais de produtos criticos ou proximos do vencimento.

O projeto foi construido do zero utilizando o ecossistema Spring, seguindo boas praticas de desenvolvimento web com arquitetura MVC, camada de servicos, acesso a dados com JPA e autenticacao via Spring Security.

---

## Funcionalidades

### Autenticacao e Controle de Acesso

- Login com autenticacao via Spring Security
- Usuario unico pre-configurado em memoria (admin / 123)
- Sessao protegida por token CSRF
- Logout com invalidacao de sessao

### Cadastro de Produtos (CRUD)

- **Listagem** de todos os produtos com busca por nome
- **Cadastro** de novos produtos com validacao de campos obrigatorios
- **Edicao** de produtos existentes
- **Exclusao** de produtos com confirmacao
- **Status visual** do estoque:
  - Verde (Ok) -- quantidade acima do minimo e dentro da validade
  - Amarelo (Atencao) -- quantidade igual ou abaixo do estoque minimo
  - Vermelho (Critico) -- quantidade zerada ou produto vencido

### Gestao de Estoque

- **Registro de movimentacoes** de entrada e saida
- **Atualizacao automatica** da quantidade do produto ao registrar movimentacao
- **Validacao** que impede saida maior que o estoque disponivel
- **Preenchimento automatico** da data atual e do nome do responsavel logado
- **Historico completo** de movimentacoes ordenado por data (decrescente)
- Tabela de produtos em estoque com status e ordenacao alfabetica

### Interface

- Layout responsivo e amigavel
- Navegacao por breadcrumbs
- Barra superior com nome do usuario logado e botao de sair
- Dashboard com acesso rapido as funcionalidades
- Mensagens de sucesso e erro nas operacoes
- Animacoes suaves e cursor personalizado

---

## Diagrama Entidade-Relacionamento

<!-- IMAGEM: Diagrama entidade-relacionamento gerado em der.html -->

O diagrama completo pode ser visualizado abrindo o arquivo `der.html` na raiz do projeto. Ele apresenta as tres entidades do sistema com seus campos, tipos, chaves primarias e estrangeiras, e os relacionamentos.

```
usuario (1) --- (N) movimentacao_estoque (N) --- (1) produto
```

### Entidades

| Entidade | Tabela | Descricao |
|---|---|---|
| Produto | `produto` | Itens do almoxarifado com nome, lote, quantidade, validade |
| MovimentacaoEstoque | `movimentacao_estoque` | Registro de entrada/saida vinculado a um produto e usuario |
| Usuario | `usuario` | Usuarios do sistema para autenticacao |

---

## Telas do Sistema

<!-- IMAGEM: Tela de login com formulario de autenticacao -->

<!-- IMAGEM: Dashboard / pagina principal com cards de navegacao -->

<!-- IMAGEM: Listagem de produtos com busca e tabela de status -->

<!-- IMAGEM: Formulario de cadastro/edicao de produto -->

<!-- IMAGEM: Pagina de gestao de estoque com formulario de movimentacao e historico -->

---

## Tecnologias Utilizadas

| Tecnologia | Versao |
|---|---|
| Java | 17 |
| Spring Boot | 3.2.5 |
| Spring Data JPA | - |
| Spring Security | - |
| Spring Web | - |
| Spring Validation | - |
| Thymeleaf | - |
| Thymeleaf Extras Spring Security 6 | - |
| MySQL | 8.x |
| H2 Database | - |
| Lombok | 1.18.46 |
| Maven | - |
| HTML5 / CSS3 / JavaScript | - |

---

## Estrutura do Projeto

```
CafeAromaESabor/
├── pom.xml
├── der.html
├── src/
│   ├── main/
│   │   ├── java/com/cafearomaesabor/
│   │   │   ├── CafeAromaESaborApplication.java
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── LoginController.java
│   │   │   │   ├── HomeController.java
│   │   │   │   ├── ProdutoController.java
│   │   │   │   └── EstoqueController.java
│   │   │   ├── model/
│   │   │   │   ├── Produto.java
│   │   │   │   ├── MovimentacaoEstoque.java
│   │   │   │   └── Usuario.java
│   │   │   ├── repository/
│   │   │   │   ├── ProdutoRepository.java
│   │   │   │   ├── MovimentacaoEstoqueRepository.java
│   │   │   │   └── UsuarioRepository.java
│   │   │   └── service/
│   │   │       ├── ProdutoService.java
│   │   │       └── EstoqueService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   ├── style.css
│   │       │   │   └── cursor.css
│   │       │   └── js/
│   │       │       ├── animacoes.js
│   │       │       └── cursor.js
│   │       └── templates/
│   │           ├── login.html
│   │           ├── home.html
│   │           ├── produto/
│   │           │   ├── listagem.html
│   │           │   └── form-inserir.html
│   │           └── estoque/
│   │               └── movimentacao.html
│   └── test/
│       └── java/com/cafearomaesabor/
│           └── CafeAromaESaborApplicationTests.java
└── target/
```

---

## Como Executar

### Pre-requisitos

- Java 17 ou superior
- Maven 3.8+
- Git

### Com profile de desenvolvimento (H2 em memoria)

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

O banco H2 sera criado automaticamente em memoria. O console H2 fica disponivel em `http://localhost:8080/h2-console`.

### Com profile de producao (MySQL)

1. Crie o banco de dados MySQL:
```sql
CREATE DATABASE cafe_aroma_e_sabor;
```

2. Configure as credenciais em `application.properties`:
```properties
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

3. Execute:
```bash
mvn spring-boot:run
```

### Acesso ao sistema

- URL: `http://localhost:8080`
- Login padrao: `admin`
- Senha padrao: `123`

---

## Autores

Projeto de conclusao do 3 semestre de Desenvolvimento de Sistemas.

- Gustavo Cobello
- Demais integrantes da equipe

---
