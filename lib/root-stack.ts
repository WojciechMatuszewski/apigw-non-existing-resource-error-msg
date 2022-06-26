import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { HttpAPI } from "./http-api/http-api";
import { RestAPI } from "./rest-api/rest-api";

export class RootStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new RestAPI(this, "RestAPI");
    new HttpAPI(this, "HttpAPI");
  }
}
