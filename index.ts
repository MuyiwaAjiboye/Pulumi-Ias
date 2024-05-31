import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare"

const accountId = "397aa5be29784b2d8b1ecc57b19184b2";

//create a new bucket
const newBucket = new cloudflare.R2Bucket("my-bucket",{
	accountId: accountId,
	name: "infrastructure-bucket",//name has to be lowercase for cloudflare

});

//Export bucket name
export const bucketName = newBucket.name;

