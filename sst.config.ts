import { SSTConfig } from "sst";
import { VpcStack } from "./stacks/vpc-stack"

export default {
  config(_input) {
    return {
      name: "sst-cdk-context-bug",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(VpcStack);
  }
} satisfies SSTConfig;
