# Lab 6

## Objectif du TP

- Se familiariser à la livraison continue
- Déployer un projet sur une plateforme d'hébergements d'application web

## Pré-requis
- Avoir mis à jour son repertoire par rapport au dépot d'origine (`git pull upstream main`)
- Créer une nouvelle branche git `lab6` à partir de main
- Partir du pipeline TP6.yml présent dans le répertoire pipelines

> Penser à bien tester chaque étape du Lab en exécutant le pipeline. N'oubliez pas de faire des commits sur votre branche avec un nom de message de commit explicite à chaque étape. A la fin du TP penser à rebase afin d'avoir un historique clair.

## 1. Configuration d'un projet Vercel pour héberger l'application web

- Aller sur https://vercel.com/, créer un compte (Hobby)
- Dans la partie settings du compte :
  - récupérer l'ID utilisateur
  - créer un nouveau token (bien penser à le copier et à le noter quelque part)
- Installer la [CLI Vercel](https://vercel.com/docs/cli) en local `pnpm add -g vercel`
- Se connecter via la CLI
- Utiliser la commande `vercel project add` pour créer un nouveau projet
- Vérifier depuis le site de Vercel que le projet existe bien et récupérer son id (disponible dans Project ID de l'onglet settings du projet)

## 2. Modification du pipeline pour déployer le package sur Vercel

- Ajouter les variables d'environnement `VERCEL_TOKEN`, `VERCEL_ORG_ID` (correspond à l'id utilisateur), et `VERCEL_PROJECT_ID` sur le projet GitLab en utilisant les valeurs récupérées précédemment
- Créer un stage `deploy` avec un job manuel `deploy-prod` qui va déployer dans l'environnement de production du projet vercel. Lancer le pipeline et ce nouveau job et vérifier que l'application est bien accessible sur l'URL de production
- Ajouter au stage `deploy` un job `deploy-staging` qui va déployer le package créé par le stage `build` dans un environnement preview du projet vercel si le pipeline est déclenché par une merge request. Créer une merge request et vérifier que l'application est bien accessible sur une URL de preview
- Appliquer le blue-green deployment en faisant basculer votre précédemment déployement de staging en production dans l'interface Vercel (promote to production)

> Lire la [documentation](https://vercel.com/docs/concepts/deployments/environments) de Vercel pour bien comprendre les notions d'environement preview et d'environnement de production.

## 3. Pour aller plus loin

- Ajouter un nouveau stage `deploy-netlify` similaire au stage `deploy existant` mais qui s'occupe de déployer l'application sur la plateforme [Netlify](https://www.netlify.com/)
  - Il sera nécessaire de se créer un compte Netlify gratuit également
  - Le fonctionnement et les commandes sont très similaires à Vercel mais avec la [CLI Netlify](https://docs.netlify.com/cli/get-started/)