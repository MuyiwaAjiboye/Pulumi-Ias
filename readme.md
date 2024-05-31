# Pulumi with Cloudflare
---
Pulumi is used for Ias
 
Begin by dowloading the creating and account and downloading pulumi cli for yourparticular Operating system.Check the official Pulumi doc to see how to downloadfor your own OS

## Pulumi Cli
Pulumi has about 6 languages that you could use to write your infrastructure,I used Typescript in this particular project.

Now in the CLI to create a new project simple write 
- pulumi new typescript
You'll be asked to put the
- Name of the Project
- Then a stack(you can hit enter to choose 'dev' as the default or give it a name) 

## Stacks
In Pulumi, a stack is an isolated, independently configurable instance of a Pulumi program. Each stack has its own configuration settings, secrets, and resources. Stacks are useful for managing different environments (such as development, staging, and production) or different versions of your infrastructure

### Stack Operations

- Creating a Stack: You can create a new stack using pulumi stack init <stack-name>.
- Selecting a Stack: You can select a stack to work with using pulumi stack select <stack-name>.
- Configuring a Stack: You can configure a stack using pulumi config set <key> <value>.
- Deploying a Stack: You can deploy the resources defined in your stack using pulumi up.
- Destroying a Stack: You can destroy all resources in a stack using pulumi destroy.

After creating a stack

##Cloudflare Setting up
Pulumi has various packages you can integrate it with. For this project i used cloudflare.
First according to the documentation you have to install the package for cloudflare which is
- npm install @pulumi/cloudflare (This installation is dependent on the language you are using with pulumi, i am using typescript so i used node. Check the installation process if you're using another language)
You obviously have a cloudflare account so lets set the connection between pulumi and cloudflare

## Cloudflare Configuration
So go to your cloudflare account, select R2 at the sidebar and you should see R2 Api key just look. create the key and check the "Admin Read and Write", this is to give pulumi access to your R2 resources and can create, read, write, delete any R2 bucket, You only see the "key Token" once so copy it and keep it safe.
before You go back to Pulumi, in the r2 dashboard just look and you would see your Account ID, copy it and keep it safe.
head back to the terminal and connect the "API Token" with pulumi by

- pulumi config set cloudflare:apiToken XXXXX --secret(Secret is to Basically encrpt the key so it doesn't give the public your api key)

This would connect the api key to pulumi. You can confirm the connection by going to "Pulumi.stackName.config" you should see it

## Index.ts
Now we are done with that its time to create our first bucket in cloudflare. Enter the index.ts file and change the following
---
import * as pulumi from "@pulumi/pulumi";

import * as cloudflare from "@pulumi/cloudflare";

// Replace this with your actual Cloudflare account ID

const accountId = "your-cloudflare-account-id";

// Create an R2 bucket

const myBucket = new cloudflare.R2Bucket("my-bucket", {

    accountId: accountId,

    name: "infrastructure_bucket", // the name is important, it has to be all lowercase and have a "-"

});


// Export the bucket name

export const bucketName = myBucket.name;

---
 Save it and hit "pulumi up" this should successfully create a bucket in your cloudflare
 
PS: the cli is integrated to your pulumi dashboard and it shows every changes that you've made

---
# Helpful Links

- https://www.pulumi.com/registry/packages/cloudflare/installation-configuration/#installation
- https://www.pulumi.com/registry/packages/cloudflare/api-docs/r2bucket/



