import { SSTConfig } from "sst";
import { BucketStack } from "./stacks/bucket-stack"

export default {
  config(_input) {
    return {
      name: "sst-cdk-context-bug",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(BucketStack);
  }
} satisfies SSTConfig;
