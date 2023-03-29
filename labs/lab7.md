# Lab 7

## Objectif du TP

- Découvrir le cloud Azure
- Se familiariser avec les Azure Static Web Apps
- Créer une Azure Static Web App et déployer le projet dessus

## Pré-requis

- Avoir créé son compte Azure avec son adresse étudiante et un compte Microsoft

## 0. Vérification de la souscription

- En se connectant sur Azure (https://portal.azure.com) avec le compte qui a servi à créer son compte Azure, vérifier que dans `Subscription` apparait bien une souscription `Azure for Students`
- Prendre en note l'ID de la souscription
- Dans la suite du TP on associera toujours les ressources à créer avec cette souscription

## 1. Création d'une Azure Static Web App

Une [Azure Static Web App](https://learn.microsoft.com/en-us/azure/static-web-apps/overview) est un service dans Azure qui va permettre d'héberger un site statique (ensemble de fichiers HTML, CSS, JavaScript) dans le cloud Azure. C'est un service similaire à ce que proposent d'autres plateformes comme Vercel ou Netlify, mais qui a l'avantage d'être bien intégré avec tous les autres services Azure.

- Créer un groupe de ressources qui va contenir les différentes ressources du projet pour un environnement (ici juste l'Azure Static Web App). Le groupe de ressources sera nommé `rg-vue2048-prod`, positionné sur la région `France Central` et aura un tag `Class` avec comme valeur `EI8IT213`.
- Dans le groupe de ressources nouvellement créé, regarder les ressources qu'il est possible de créer et créer une ressource du type Azure Static Web App avec les informations suivantes (vérifier la [documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/overview) pour voir à quoi correspond chaque paramètre):
    - Nom : `stapp-vue2048-prod`
    - Plan d'hébergement : `Free`
    - Localisation : `West Europe`
    - Source de déploiement : `Other`
    - `Class` avec comme valeur `EI8IT213`
- Vérifier que la ressource Azure Static Web App a bien été créée

## 2. Déploiement d'une application sur Azure Static Web App

Pour déployer l'application, nous allons utiliser la [Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/) aka SWA CLI.

- Installer la SWA CLI : `pnpm install -g @azure/static-web-apps-cli` (ou avec npm ou yarn si besoin)
- Builder l'application `vue 2048` avec la commande build du package.json
- Déployer l'application sur l'Azure Static Web App précédemment créée avec la commande `swa deploy`
    - S'aider de la [documentation](https://azure.github.io/static-web-apps-cli/docs/use/deploy#52-deploy-a-front-end-app-without-an-api) en ligne et en ligne de commande
    - Il faudra spécifier le chemin où se trouve le package à déployer ainsi que le nom de l'Azure Static Web App sur laquelle la déployer
    - Lors de l'exécution de la commande la CLI demandera de s'authentifier au compte Azure sur lequel se retrouve la ressource où l'on veut déployer l'application
- Se rendre sur le site sur lequel est déployé le projet et vérifier que le déploiement s'est bien passé
- Par défaut l'application a été déployée sur un environnement `preview`, redéployer l'application sur l'environnement de production
- Aller sur dans l'onglet "Environnements" de la page de la Static Web App dans Azure pour visualiser les 2 environnements (`preview` et `Production`)
