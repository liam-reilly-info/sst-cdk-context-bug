import { StackContext } from 'sst/constructs'
import { Vpc } from "aws-cdk-lib/aws-ec2"

export function VpcStack({ stack, app }: StackContext) {

  // ---------------------------- BACKGROUND ---------------------------- //
  // If you have no CDK Context file that contains VPC and Subnet Info
  // SST inserts 2x placeholder values into the privateSubnets
  // array for a Vpc object obtained via a Vpc.fromLookup()
  // This means our code breaks in situations where we expect
  // there to be more than 2 items in the array
  // to reproduce put your VPC ID in at the top and run
  // sst build
  // ensure that you have a cleared CDK Context first by running
  // cdk context --clear
  // ---------------------------- BACKGROUND ---------------------------- //


  // ID of a VPC that has 3x private subnets
  const vpcID = "vpc-0f65205ae42269a88" // DO NOT CHECK THIS IN

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

  // The actual output will be
  // Subnet 1 ID: p-12345 // dummy placeholder
  // Subnet 2 ID: p-67890 // dummy placeholder
  // Subnet 1 ID: subnet-?????? // first real value
  // Subnet 2 ID: subnet-?????? // second real value
  // Subnet 3 ID: subnet-?????? // third real value
}
