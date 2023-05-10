# Lab 5

## Objectif du TP

Approfondir l'utilisation des pipelines d'intégration :
- Optimiser le code yaml des pipelines 
- Mettre en place une pseudo stratégie de tests

> A la fin du TP penser à rebase afin d'avoir un historique clair.

## Pré-requis
- Créer une nouvelle branche git `lab5`
- Partir du pipeline TP5.yml présent sur moodle

> Penser à bien tester chaque étape du Lab en exécutant le pipeline. N'oubliez pas de faire des commits sur votre branche avec un nom de message de commit explicite à chaque étape.

## 1. Optimisation du code - utilisation de templates

- Créer un fichier `quality-template.yml` dans le dossier `/pipelines/templates`. 
- Y ajouter les deux jobs de check de typage statique et de lint.
- Utiliser l'instruction `include` pour les ajouter dans le fichier `gitlab-ci.yml`.
- Créer un [job caché](https://docs.gitlab.com/ee/ci/jobs/#hide-jobs) dans le template et l'utiliser dans les deux jobs pour qu'ils ne soient déclenchés que dans le cas d'une exécution manuelle.

## 2. Implémentation d'un test
- A la racine de votre répertoire, créer un dossier `tests`. Y ajouter un fichier `hello-world.spec.ts`.
- Ecrire un premier test pour vérifier le framework fonctionne correctement, et reconnait bien nos tests
    - Pour cela, nous allons utiliser [vitest](https://vitest.dev/) à notre projet. Le package est déjà présent dans les dépendances.
    - Créer une première suite de tests appelée `Hello world` et y placer une première assertion basique : 
    ```ts
    import { describe, expect, test } from 'vitest'

    describe('Hello world', () => {
        test('should be ok', () => {
            expect(1).toEqual(1);
        })
    })
    ```
    - Vérifier que la suite et le test sont bien reconnus par la CLI en lançant la commande `pnpm test`


## 3. Test - Exécution des test dans la pipeline

- Créer un fichier `tests-template.yml` dans le dossier `/pipelines/templates`. 
- Ajouter dans ce template un premier job un test permettant de lancer tous les test présents dans le projet. Vérifier que le pipeline s'exécute sans erreur
- Ajouter une instruction pour qu'un rapport de test soit publié sous la forme d'un artifact : 
    - Dans un premier temps, ajuster le script `test` dans le package.json afin de lui demander de produire un rapport au format JUnit (voir documentation de la CLI de Vitest)
    - Ensuite, publier ce rapport dans un artifact spécifique que gitlab va pouvoir reconnaître (voir documentation de gitlab ci sur les rapport JUnit)
    - Vérifier sur l'onglet "Tests" de votre pipeline que le rapport est disponible.


## 4. Test - implémentation d'une nouvelle fonctionnalité en TDD
On cherche à implémenter la fonctionnalité suivante : lorsque le score est supérieur ou égal à 128, il est affiché en orange.

> Le score est affiché par la ligne 15 du composant GameControls.vue. 

Pour cela on commence par créer le test qui va vérifier que la fonctionnalité est bien implémentée : 
- on créé un nouveau fichier `GameControls.spec.ts` contenant le nouveau test.
- on écrit le test en se basant sur l'exemple précédent (voir Tile.spec.ts)
- on vérifie que la pipeline échoue bien pour ce test

On implémente la fonctionnalité : 
- on veut ajouter une nouvelle balise qui remplacera celle existante dans le cas où le score serait supérieur à 128
- on pourra utiliser pour cela la directive `v-if` (voir la doc de Vue pour plus d'information)
- la couleur à utiliser sera 'text-orange-500'

On push la fonctionnalité sur le repertoire et on vérifie que le pipeline passe bien au vert.

Indications :
1. on utilisera la méthode `mount` de la lib [vue-test-utils](https://test-utils.vuejs.org/) pour tester notre composant GameControls.
2. on pourra ajouter un attribut `data-test=score` dans le composant GameControls.vue afin de pouvoir sélectionner la balise HTML souhaitée.
