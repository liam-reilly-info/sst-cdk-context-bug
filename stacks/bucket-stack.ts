import { Bucket, StackContext } from 'sst/constructs'

export function BucketStack({ stack, app }: StackContext) {
  const bucket = new Bucket(stack, 'demo-bucket', {
    name: `liams-very-serious-demo-bucket`,
  })

  stack.addOutputs({
    BucketArn: bucket.bucketArn,
    BucketName: bucket.bucketName,
  })

  return {
    bucket,
  }
}
