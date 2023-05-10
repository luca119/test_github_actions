# Lab 11

## Objectifs du TP

- Mettre en place un pipeline de CI/CD comprenant le déploiement de l'infrastructure et de l'application

## Pré-requis

- Récupérer le contenu du fichier lab11.yml et le mettre dans votre pipeline GitHub Actions
- [Créer une app registration](https://www.pulumi.com/registry/packages/azure-native/installation-configuration/#create-your-service-principal-and-get-your-tokens) pour que le pipeline puisse s'authentifier à Azure et provisionner des ressources sur la souscription Azure : 
  - Exécuter la commande Azure CLI suivante : `az ad sp create-for-rbac --name pulumiCICD --role contributor --scopes /subscriptions/{subscription-id` en remplaçant {subscription-id} par votre id de souscription (`az account show --query id`)
  - **Noter quelque part le retour de la commande, cela sera utile plus tard**
- Répertoire mis à jour par rapport au dépôt d'origine (`git pull upstream main`)

## Création d'un job de déploiement de l'infrastructure dans le pipeline de CI/CD

Le code d'infrastructure est présent dans le dossier infra et utilise le runtime NodeJS.
Pour exécuter les commandes Pulumi, on utilisera la [GitHub Action Pulumi](https://github.com/pulumi/actions)

1. Supprimer le deployment token des secrets du projet et commenter le job deploy-app
2. Dans le dossier infra, mettre à jour le fichier `Pulumi.yaml` avec votre nom de projet (par exemple `an-cb-vue-2048`) et renommer le fichier `Pulumi.dev-an.yaml` avec votre nom de stack (`Pulumi.dev.yaml`)

> Le code d'infrastructure fait lors du précédent lab peut également être réutilisé à la place de celui de la correction présent dans le répertoire.

3. Ajouter dans les secrets du projet les variables d'environnements nécessaires:
- ARM_CLIENT_ID avec pour valeur l'AppId de l'app registration précédemment créée
- ARM_CLIENT_SECRET avec pour valeur le password de l'app registration précédemment créée
- ARM_TENANT_ID avec pour valeur le tenant de l'app registration précédemment créée
- ARM_SUBSCRIPTION_ID avec pour valeur l'id de la souscription Azure
- PULUMI_ACCESS_TOKEN avec pour valeur un access token généré depuis app.pulumi.com (en haut à droite, personnal access tokens)

4. Ajouter un job deploy-infra qui installe les dépendances de l'infra, et utilise l'action Pulumi pour déployer l'infrastructure. Les secrets seront passés en variables d'environnement à l'action pulumi.

5. Exécuter le pipeline et vérifier que la stack a bien été déployée.

## Intégration du déploiement de de l'infrastructure avec le déploiement applicatif

Le but de cette partie est de récupérer le deployment token de l'Azure Static Web App précédemment crée et d'utiliser ce token pour déployer l'application sur l'Azure Static Web App.
Il serait possible de décommenter le job deploy-app, y ajouter une step qui exécute la commande pulumi output pour récupérer le deployment token mais les outputs de la stack sont déjà disponibles dans une variable que l'on peut utiliser directement dans le job. C'est ce que l'on va faire en faisant tout (déploiement applicatif et infra) dans le même job.

1. Renommer le job deploy-infra en deploy

2. Ajouter les étapes de deploy-app dans le job deploy en utilisant `steps.pulumi.outputs.staticWebAppDeployToken` à la place du secret dans l'action de déploiement de la static web app

3. Exécuter le pipeline et vérifier que tout se déploie bien correctement.


de l'Azure Static Web App précédemment créée, utiliser ce token dans l'action de déploiement de l'Azure Static Web App.

7. Exécuter le pipeline et vérifier que l'application est bien déployée sur l'Azure Static Web App. 