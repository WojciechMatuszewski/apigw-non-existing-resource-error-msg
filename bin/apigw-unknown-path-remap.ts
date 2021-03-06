import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { RootStack } from "../lib/root-stack";

const app = new cdk.App();
new RootStack(app, "RootStack", {
  synthesizer: new cdk.DefaultStackSynthesizer({ qualifier: "remap" })
});
