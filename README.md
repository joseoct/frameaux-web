<p align="center">
  <img src="https://i.imgur.com/pdGuGwr.png" alt="Frameaux_logo" />
</p>

<p align="center">
Meu trabalho de conclusão de curso para obter o diploma de bacharel em ciência da computação: <strong>Aplicativo para auxiliar o aprendizado de tecnologias multiplataforma(ReactNative, Flutter, Ionic) para o desenvolvimento de dispositivos móveis</strong> utilizando a metodologia de repetição espaçada e inspirado no aplicativo Duolingo.
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

#### (Administrador | Criador de conteúdo) Login
![FrameAuxLogin](https://i.imgur.com/UtPXXUG.gif)

Cada página, de modo a ilustrar, possui marcações vermelhas que tenham
relação com o número da requisição feita para o backend segundo [quadro de rotas do backend](https://github.com/joseoct/frameaux-backend#rotas-do-backend).
As páginas também estão cortadas a fim de otimizar o espaço de leitura.

#### (Administrador) Página Dashboard
<img src="https://i.imgur.com/QYhfF0o.png" alt="dashboard" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
GET | 1. `/dashboard` | Administrador | Retorna número de tecnologias, criadores de conteúdo e estudantes

#### (Administrador) Página de listagem de criadores de conteúdo
<img src="https://i.imgur.com/hgIWBN4.png" alt="content_creator_list" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
GET | 3. `/content-creators` | Administrador | Lista criadores de conteúdo e tecnologias em que foram alocados.

#### (Administrador) Página de criação de criadores de conteúdo
<img src="https://i.imgur.com/XIrMKfq.png" alt="content_creator_list" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
POST | 2. `/content-creators` | Administrador | Cria um criador de conteúdo

#### (Administrador) Página de listagem de tecnologias e seus responsáveis
<img src="https://i.imgur.com/hnaEqpc.png" alt="content_creator_list" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
DELETE | 9. `/technologies/:technology_id` | Administrador | Exclui a tecnologia e desfaz a relação com todos os usuários alocados a ela

#### (Administrador) Página de criação de uma tecnologia
<img src="https://i.imgur.com/Ie4tFEc.png" alt="content_creator_list" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
GET | 3. `/content-creators` | Administrador | Lista criadores de conteúdo e tecnologias em que foram alocados.
POST | 7. `/content-creators-technologies` | Administrador | Cria uma tecnologia e aloca criadores de conteúdo à tecnologia criadaGET8. /content-creators-technologiesAdministradorLista todas as tecnologias e seus criadores de conteúdo responsáveis

#### (Criador de conteúdo) Página de listagem das tecnologias responsáveis
<img src="https://i.imgur.com/78nIUxN.png" alt="content_creator_list" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
GET | 10. `/user/technologies` | Criador de conteúdo(somente na aplicação web), estudante(somente na aplicação móvel) | Lista todas as tecnologias que fazem relação com o usuário

#### (Criador de conteúdo) Página de gerenciamento de tópicos de uma tecnologia
<img src="https://i.imgur.com/qudlbDf.png" alt="content_creator_list" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
POST | 11. `/technologies/:technology_id` | Criador de conteúdo | Cria um tópico que faz relação à tecnologia informada na rota
GET | 12. `/technologies/:technology_id/topics` | Criador de conteúdo(somente na aplicação web), estudante(somente na aplicação móvel) | Lista todos os tópicos que fazem relação à tecnologia informada na rota
PUT | 13. `/topics/:topic_id` | Criador de conteúdo | Atualiza o tópico informado na rota
DELETE | 14. `/topics/:topic_id` | Criador de conteúdo | Deleta o tópico informado na rota

#### (Criador de conteúdo) Página de níveis de um tópico
<img src="https://i.imgur.com/cVzV1zq.png" alt="content_creator_list" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
GET | 15. `/technologies/topics/:topic_id/levels` | Criador de conteúdo | Lista todos os níveis que fazem relação ao tópico informado na rota, incluindo a listagem de todos os exercícios por nível
DELETE | 18. `/exercises/:exercise_id` | Criador de conteúdo | Deleta o exercício informado na rota

#### (Criador de conteúdo) Página de criação de exercício de alternativa
<img src="https://i.imgur.com/K4dPyhl.png" alt="content_creator_list" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
POST | 16. `/technologies/topics/levels/`<br>`:level_id/alternative-exercise` | Criador de conteúdo | Cria um exercício de alternativas que faz relação ao nível informado na rota

#### (Criador de conteúdo) Página de criação de exercício de sequência
<img src="https://i.imgur.com/n7TeqDa.png" alt="content_creator_list" />

Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
POST | 17. `/technologies/topics/levels/`<br>`:level_id/sequency-exercise` | Criador de conteúdo | Cria um exercício de sequência que faz relação ao nível informado na rota

[Link](https://drive.google.com/file/d/1wNvaCHskW_Ky1QivsNj1tYBnb6Hm9ljS/view) para conferir o trabalho completo.
