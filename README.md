This sample project demonstrates a frustrating issue with SST/CDK. 

Unless you happen to have a `cdk.context.json` file on your machine when you run a `cdk build` / `cdk diff` / `cdk deploy`
then it will fail if your code relies on there being 3x Subnets as you will receive an array with
only 2 dummy values; `p-12345` and `p-67890`.

To read more about this please refer to the accompanying post: https://www.liam-reilly.info/blog/post/still-sst-ruggling

```typescript
// ID of a VPC that has 3x private subnets  
const vpcID = "vpc-???"
  
const vpc = Vpc.fromLookup(stack, "vpc-lookup", {  
  vpcId: vpcID  
})  
  
// With a CDK Context this will print out the Subnet IDs  
// for all 3 of my private subnets  
// Without a CDK Context this will print out 2x dummy Subnet IDs  
// then it will look up the real VPC and print out the 3x REAL Subnet IDs  
console.log(`Subnet 1 ID: ${vpc.privateSubnets[0].subnetId}`)  
console.log(`Subnet 2 ID: ${vpc.privateSubnets[1].subnetId}`)  
// If we include this line then we will get an error because  
// the privateSubnets array only contains 2 dummy values,  
// and we're trying to reference the third value that would  
// only be looked up later  
console.log(`Subnet 3 ID: ${vpc.privateSubnets[2].subnetId}`)
```

```shell
// The actual output will be
Subnet 1 ID: p-12345 // dummy placeholder
Subnet 2 ID: p-67890 // dummy placeholder
Subnet 1 ID: subnet-?????? // first real value
Subnet 2 ID: subnet-?????? // second real value
Subnet 3 ID: subnet-?????? // third real value
```