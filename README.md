# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.gazetanewsguarulhos.com.br/inteli-anuncia-patrocinio-do-w7m-gaming/"><img src="https://www.gazetanewsguarulhos.com.br/wp-content/uploads/2021/11/Inteli-2-1024x569-1-696x387.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Gerenciador e Alocador de Capacity

## Grupo 3: YamaTech

<p align="center">
<a href= "https://adalove.inteli.edu.br/#"><img src="https://adalove.inteli.edu.br/newada-img/groups/c1503ec9-20d3-4fb7-b4cd-3afd12f57c37.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

## Integrantes: 
- <a href="https://www.linkedin.com/in/alysson-cordeiro-0684a8236/">Alysson Cordeiro</a>
- <a href="https://www.linkedin.com/in/arthur-reis-575532241/">Arthur Reis</a>
- <a href="https://www.linkedin.com/in/felipe-sampaio-silva">Felipe Sampaio</a> 
- <a href="https://www.linkedin.com/in/kathlyn-diwan-0a0189232/">Kathlyn Diwan</a> 
- <a href="https://www.linkedin.com/in/leandro-custodio/">Leandro Custódio</a>
- <a href="https://www.linkedin.com/in/marcos-florencio-ds/">Marcos Florencio</a> 
- <a href="https://www.linkedin.com/in/sarah-ribeiro-361130195/">Sarah Ribeiro</a>

## 📝 Descrição

O propósito do sistema Web é realizar a alocação de funcionários em projetos da Yamaha e apresentar uma análise geral da situação de desenvolvimento em cada projeto. O site será utilizado por um gestor de projetos para cadastro de projetos, funcionários e consulta de dados nos dashboards. Também, há a possibilidade de selecionar distribuições personalizadas ao cadastrar um projeto com um modelo de distribuição pré-definido, sem necessidade de alocação manual. 

<p align="center">
<a href= "https://adalove.inteli.edu.br/#"><img src="https://adalove.inteli.edu.br/newada-img/groups/c1503ec9-20d3-4fb7-b4cd-3afd12f57c37.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

## 📁 Estrutura de pastas

```
Alunos inteli (remover essa observação do readme.md após leitura e execução):

Supondo que você é da Turma 4 e Projeto 5, substitua:

T(NUMERO_DA_TURMA)_G(NUMERO_DO_GRUPO)_V(VERSÃO)_Web_application_document.pdf
por
T3_G3_V01_Web_application_document.pdf

Faça o mesmo para a documentação em formato DOCX.
```

<ul> 📁 Projeto3 </ul> <br>
  <ul> 📁 controlers </ul> <br> 
     <ul> &emsp;| dashboard.js<br> </ul>
     <ul> &emsp;| employees.js<br> </ul>
     <ul> &emsp;| projects.js<br> </ul>
    
     
  |--> 📁 data <br>
    &emsp;| main.db<br>
 
  |--> 📁 documentos <br>
    &emsp;| testes_funcionalidades.pdf<br>
    &emsp;| wad.pdf <br>
    
  |--> 📁 node modules<br>
  
  |--> 📁 routes <br>
    &emsp;| dashboard.js<br>
    &emsp;| employees.js<br>
    &emsp;| projects.js<br>
    
  |--> 📁 src<br>
  
  | readme.md<br>
  | license.txt<br>
  
  
  &emsp;| T(NUMERO_DA_TURMA)_G(NUMERO_DO_GRUPO)_V(VERSÃO)_Web_application_document.docx<br>
|--> imagens<br>
|--> src<br>
  &emsp;|--> Backend<br>
  &emsp;|--> Frontend<br>
| readme.md<br>
| license.txt

Dentre os arquivos presentes na raiz do projeto, definem-se:

- <b>readme.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto. Há também uma pasta denominada <b>outros</b> onde estão presentes aqueles documentos complementares ao <b>web application document</b>.

- <b>imagens</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema (existem duas subpastas <b>backend</b> e <b>frontend</b> que contêm, respectivamente, o código do servidor e o código da página web).

## 💻 Configuração para desenvolvimento

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1.  Baixar e instalar o node.js:  [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2. Clone o repositório em questão.
3.  No modo administrador, abra o "prompt de comando" ou o "terminal" e, após,  abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```
5. Agora você pode acessar a aplicação através do link http://localhost:1234/
6. O servidor está online.


```
Alunos inteli (remover essa observação do readme.md após leitura e execução):

1. Certifique-se que há um arquivo "package.json" na pasta backend do projeto.

2. Dentro deste arquivo, encontre a propriedade "scripts", e adicione um atributo de nome "start"
com o valor "node <CAMINHO_DO_ARQUIVO_DO_SERVIDOR>." Atenção: "<CAMINHO_DO_ARQUIVO_DO_SERVIDOR>" 
deve ser substituído pelo caminho para o arquivo principal da aplicação, utilizado para subir o
servidor. Por exemplo, se o arquivo utilizado para subir o servidor é "app.js", o atributo start
deve possuir o valor "node app.js".

3. No arquivo utilizado para subir a aplicação, defina a porta padrão de execução para "1234".
````

## 🗃 Histórico de lançamentos

* 0.2.1 - 25/01/2022
    * Atualização de documentos (código do módulo permanece inalterado).
* 0.2.0 - 15/01/2022
    * Remove `setDefaultXYZ()`
    * Adiciona `init()`
* 0.1.1 - 11/01/2022
    * Crash quando chama `baz()`
* 0.1.0 - 10/01/2022
    * O primeiro lançamento adequado
    * Renomeia `foo()` para `bar()`
* 0.0.1 - 01/01/2022
    * Trabalho em andamento

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Spidus/Teste_Final_1">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">Inteli, Nome do integrante 1, Nome do integrante 2, Nome do integrante 3, Nome do integrante 4, Nome do integrante 5, Nome do integrante 6, Nome do integrante 7</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>

## 🎓 Referências

Aqui estão as referências usadas no projeto:

1. <https://creativecommons.org/share-your-work/>
