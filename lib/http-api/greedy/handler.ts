import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  return {
    statusCode: 404,
    body: "Method/Path combination not found. Please check the documentation."
  };
};
