<p align="center">
  <a href="https://unform.dev">
    <img src="https://i.imgur.com/pdGuGwr.png" alt="Frameaux_logo" />
  </a>
</p>

<p align="center">Plataforma para auxiliar o aprendizado de tecnologias multiplataforma para o desenvolvimento de dispositivos móveis.
</p>

## Frontend
A  interface web conta  com  funcionalidades  para  que  administradores e criadores de conteúdo realizem suas funções.

**Administradores** possuem como funções cadastrar e visualizar criadores de
conteúdo; cadastrar, visualizar, editar e remover tecnologias. Para cadastrar uma
nova tecnologia, o administrador deve, anteriormente, ter cadastrado criadores de
conteúdo. Ao cadastrar a tecnologia, o administrador deve alocar quais são os
criadores de conteúdo responsáveis por aquela tecnologia.

**Criadores de conteúdo** desempenham funções relacionadas à tecnologia a
qual foi alocada pelo administrador, e são responsáveis pela construção da trilha de
conteúdos. Atuam no papel de gerenciar os tópicos, níveis e exercícios de
uma tecnologia. 

![FrameAuxLogin](https://i.imgur.com/UtPXXUG.gif)

Cada página, de modo a ilustrar, possui marcações vermelhas que tenham
relação com o número da requisição feita para o backend segundo [quadro de rotas do backend](https://github.com/joseoct/frameaux-backend#rotas-do-backend).
As páginas também estão cortadas a fim de otimizar o espaço de leitura.

#### (Administrador) Página Dashboard
<img src="https://i.imgur.com/QYhfF0o.png" alt="Frameaux_logo" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
GET | 1. `/dashboard` | Administrador | Retorna número de tecnologias, criadores de conteúdo e estudantes
