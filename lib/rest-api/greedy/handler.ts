import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 404,
    body: "Method/Path combination not found. Please check the documentation."
  };
};
