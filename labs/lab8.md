# Lab 8

## Objectif du TP

- Se familiariser avec l'Azure CLI
- Déployer un projet sur une Azure Static Web App depuis un pipeline GitLab
- Gérer plusieurs environnements depuis un pipeline de CI/CD

## Pré-requis

- Avoir créé son compte Azure avec son adresse étudiante et un compte Microsoft
- Avoir mis à jour son repertoire par rapport au dépot d'origine (`git pull upstream main`)

## 1. Création d'un second environnement

Pour créer et gérer des ressources Azure, nous avons vu la dernière fois que l'on pouvait utiliser le portail Azure. Aujourd'hui nous allons utiliser l'[Azure CLI](https://learn.microsoft.com/en-us/cli/azure/what-is-azure-cli). C'est un outil en ligne de commande qui permet également de gérer toutes ses ressouces via du code, et donc de potentiellement créer des scripts.

- Parcourir la documentation sur le sujet, et installer la CLI
- S'authentifier via la commande `az login` en suivant les instructions
> Pour vérifier que tout s'est bien passé, vérifier que la commande `az account show --output table` retourne bien souscription.

- Créer en ligne de commande les ressources nécessaires pour l'environnement de QA en reprenant un nommage similaire à celui utilisé pour celui de production
  - Un groupe de ressources
  - Une Azure Static Web App (en se reportant à la [documentation](https://learn.microsoft.com/fr-fr/cli/azure/staticwebapp?view=azure-cli-latest))

## 2. Déploiement de l'application vue-2048 depuis un pipeline de CD

- Repartir du contenu du fichier lab8.yml (dans le dossier pipelines) pour initialiser le pipeline qui se chargera du déploiement sur les environnements
- Créer un stage pour la QA et un stage pour la production
- Implémenter les jobs qui vont déployer le projet en QA et en production en utilisant la SWA CLI
- Vérifier que le pipeline fonctionne bien et déploie l'application sur les 2 Azure Static Web App (QA et Production)

> Consulter la [documentation](https://azure.github.io/static-web-apps-cli/) de la SWA CLI pour voir comment gérer l'authentification à Azure depuis un pipeline de CI/CD

## 3. Gérer les environnements

- Consulter la [documentation](https://docs.gitlab.com/ee/ci/environments/) sur les environnements dans GitLab et ajouter des environnements dans le pipeline
- Relancer le pipeline et s'assurer que les déploiements apparaissent bien dans la fenêtre des environnements
- Utiliser le mécanisme des [approbations](https://docs.gitlab.com/ee/ci/environments/deployment_approvals.html) pour n'autoriser le déploiement en production que si quelqu'un le valide
- Modifier un élément visible du code de l'application (par exemple la couleur du fond ou un des titres) et redéployer l'application en QA et production en s'assurant qu'une approbation est bien demandée pour la production
- Faire un rollback de l'application en production via l'interface des environnements

## 4. Pour aller plus loin

- Utiliser les mécanismes GitLab vus dans les TP précédents pour factoriser le script qui est identique pour le déploiement de la QA et de la production (modulo le nom de l'Azure Static Web App)
