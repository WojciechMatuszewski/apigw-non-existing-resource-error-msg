import { aws_apigateway, aws_lambda_nodejs, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";

export class RestAPI extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const restAPI = new aws_apigateway.RestApi(this, "RestAPI", {
      /**
       * Configuration...
       */
    });

    // restAPI.root.addResource("{proxy+}").addMethod(
    //   "ANY",
    //   new aws_apigateway.MockIntegration({
    //     passthroughBehavior: aws_apigateway.PassthroughBehavior.NEVER,
    //     requestTemplates: {
    //       "application/json": `{"statusCode": 404}`
    //     },
    //     integrationResponses: [
    //       {
    //         statusCode: "404",
    //         responseTemplates: {
    //           "application/json": `"Method/Path combination not found. Please check the documentation."`
    //         }
    //       }
    //     ]
    //   }),
    //   {
    //     methodResponses: [{ statusCode: "404" }]
    //   }
    // );

    const greedyPathHandler = new aws_lambda_nodejs.NodejsFunction(
      this,
      "GreedyPathHandler",
      {
        entry: join(__dirname, "./greedy/handler.ts")
      }
    );
    restAPI.root
      .addResource("{proxy+}")
      .addMethod(
        "ANY",
        new aws_apigateway.LambdaIntegration(greedyPathHandler)
      );

    const greetPathHandler = new aws_lambda_nodejs.NodejsFunction(
      this,
      "GreetPathHandler",
      {
        entry: join(__dirname, "./greeter/handler.ts")
      }
    );
    restAPI.root
      .addResource("greet")
      .addMethod("GET", new aws_apigateway.LambdaIntegration(greetPathHandler));

    new CfnOutput(this, "RestAPIurl", {
      value: restAPI.urlForPath("/greet") ?? ""
    });
  }
}
