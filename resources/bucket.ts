import pulumi from "@pulumi/pulumi";

// Time to Automate
// Pulumi components 
// we are gonna collect a series of resource from pulumi and group it to a componet
// we gonna create our own component and taking pulumi component and making it my own

//Trying to standardized simple interface so creating an interface and creating its own type. And it would be our own dsl(Domain Specific Language)

type MyiBucketArgs = {
	Name: string;
	Product: string; 	
}



//creating the above type so developers never have to touch the below code

const accountId = "397aa5be29784b2d8b1ecc57b19184b2";

class MyiBucket extends pulumi.ComponentResource {
	
    constructor(args: MyiBucketArgs, opts: pulumi.CustomResourceOptions) {
	    const name = '${args.Product}-${args.Name}'

        super("pkg:index:MyiBucket", name, {}, opts);

	const bucket = new cloudflare.R2Bucket("bucket",{
        accountId: accountId,
        name: "my-bucket",//name has to be lowercase for cloudflare

	});

    }
}

