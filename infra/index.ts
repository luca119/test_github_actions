import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as web from "@pulumi/azure-native/web";

const resourceGroup = new resources.ResourceGroup("rg-vue2048-preprod");

const staticWebApp = new web.StaticSite("stapp-vue2048-preprod", {
    resourceGroupName: resourceGroup.name,
    sku: {
        name: "Free",
        tier: "Free"
    },
    repositoryUrl: "",
    tags: {
        Class: "EI8IT213"
    }
});

export const staticWebAppHostname = staticWebApp.defaultHostname;
export const staticWebAppDeployToken = pulumi.secret(web.listStaticSiteSecretsOutput({name: staticWebApp.name, resourceGroupName: resourceGroup.name}).properties["apiKey"]);