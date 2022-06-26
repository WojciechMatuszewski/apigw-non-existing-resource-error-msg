# APIGW & non-existing API routes

[Read this blog post](https://dev.to/wojciechmatuszewski/better-error-messages-for-non-existing-api-resources-with-amazon-api-gateway-50pb)

## Deployment

1. `npm run bootstrap`

2. `npm run deploy`

## Learnings

### Rest API

- By default, the REST flavor of the APIGW returns _403_ status code with a message of _Forbidden_.

  - The error message is both misleading and not helpful.

- Initially, I have tried to override the response on a given method/path level. I'm not sure why.

  - If you use the `proxy` integration, APIGW will **ignore** what you specified in the `integrationResponses` array.

- Use the [`Gateway responses`](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-gatewayResponse-definition.html)

- Of course, I forgot that I can not access random properties from the `$context` variable in APIGW mapping templates.

  - I've written about this – [read my blog post here](https://dev.to/aws-builders/curious-case-of-aws-mapping-template-built-in-variables-1og1).

- **Changing things in the REST APIGW console requires the manual deployment of the API. There is NO AUTO-DEPLOY feature**.

  - Of course, I forgot about this and wasted some time...

- You **cannot use the full power of the VTL language in the `Gateway responses` templates**.

  - I've tried to construct a conditional statement, but instead of resolved code, the response I got was my code with substituted `$context` variables.

  - This behavior matches the one described in [this excellent blog post](https://www.alexdebrie.com/posts/api-gateway-elements/#key-takeaways-from-gateway-responses).

  - It does suck that I cannot use conditional statements here. If that were the case, I would be able to generate a nice message to the end-user.

- An alternative to the `Gateway responses` is a **catch-all route with an `ANY` method**.

  - According to my tests, the APIGW routing first tries to match existing routes and then to failover to the "greedy" ones. Makes total sense.

  - Might be expensive if treated differently than other "production" paths and methods. In my mind, you should also apply throttling and such on this handler.

### HTTP API

- No way to define mappings. You have to use an external service – like AWS Lambda functions.
