import * as aws_apigatewayv2_alpha from "@aws-cdk/aws-apigatewayv2-alpha";
import * as aws_apigatewayv2_integrations_alpha from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { aws_lambda_nodejs, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";

export class HttpAPI extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const httpAPI = new aws_apigatewayv2_alpha.HttpApi(this, "HttpAPI", {
      /**
       * Configuration...
       */
    });

    const greedyPathHandler = new aws_lambda_nodejs.NodejsFunction(
      this,
      "GreedyPathHandler",
      {
        entry: join(__dirname, "./greedy/handler.ts")
      }
    );

    httpAPI.addRoutes({
      integration:
        new aws_apigatewayv2_integrations_alpha.HttpLambdaIntegration(
          "GreedyPathIntegration",
          greedyPathHandler
        ),
      path: "/{proxy+}",
      methods: [aws_apigatewayv2_alpha.HttpMethod.ANY]
    });

    const greetPathHandler = new aws_lambda_nodejs.NodejsFunction(
      this,
      "GreetPathHandler",
      {
        entry: join(__dirname, "./greeter/handler.ts")
      }
    );

    httpAPI.addRoutes({
      integration:
        new aws_apigatewayv2_integrations_alpha.HttpLambdaIntegration(
          "GreetPathIntegration",
          greetPathHandler
        ),
      path: "/greet",
      methods: [aws_apigatewayv2_alpha.HttpMethod.GET]
    });

    new CfnOutput(this, "RestAPIurl", {
      value: httpAPI.url ?? ""
    });
  }
}
