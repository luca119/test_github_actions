# Lab 9

## Objectif du TP

- Découvrir le fonctionnement, la syntaxe et les spécifités des GitHub Actions
- Réaliser un pipeline de CI/CD sur GitHub
- Réviser les notions 

## Pré-requis

- Un compte GitHub (le créer si besoin sur https://github.com/)
- Extension vscode GitHub Actions installée
- Ressources Azure du Lab 8 (environnement QA et Prod) crées
- Répertoire mis à jour par rapport au dépot d'origine (`git pull upstream main`)

## Mise en place du répertoire sur GitHub

1. Créer un nouveau répertoire sur GitHub (sans rien dedans, ni gitignore, ni licence)

2. Ajouter un remote à votre répertoire git local

```pwsh
git remote add github https://github.com/{username}/vue2048.git
git push github main
```
3. Renseigner le fichier suivant : https://docs.google.com/spreadsheets/d/1hnvnViPkLpmge56wiDubPkWEwhmXELrpibjUtg4b47Y/edit?usp=sharing

## Déroulé du TP

### Les essentiels :
- A chaque commit sur main
	- l'application est "build"
	- le package généré est stocké sous la forme d'un artifact
- A chaque Pull Request
	- l'application est "build"
  	- les différentes analyses statiques (linter et typage statique) et les tests unitaires sont exécutés
- Le pipeline doit pouvoir être lancé manuellement.
- Déploiement
	- Le pipeline doit déployer l'application sur les 2 environnements (QA et PROD).
	- Le déploiement doit donc se faire depuis une exécution manuelle.

### Les petits plus :
- Si le package est issu de la branche principale alors sa durée de rétention doit être d'une semaine, sinon de 24h.
- Pour chaque exécution manuelle, il doit y avoir un paramètre permettant d'indiquer si l'on souhaite ou non lancer les analyses statiques, ainsi que les tests. 
- Le pipeline doit être lancé automatiquement toutes les semaines le lundi à 8h.
- Le pipeline ne doit être exécuté si les fichiers mis à jour sont contenus dans le dossier /docs

### Pour aller plus loin : 
- Pour chaque Pull request, si un label est placé sur celle-ci, on souhaite qu'un job créé via l'azure CLI un nouvel environnement temporaire et déploie le package dessus. Le lien de l'environnement doit ensuite être posté en commentaire de la PR. Une fois que la PR est completed, l'environnement doit être détruit.
- Si un tag est push sur le repository, alors déployer cette version dans tous les environnements et créer une [release GitHub](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases).
