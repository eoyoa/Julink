module "lambda_function" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = local.lambda.name
  handler = local.lambda.handler
  runtime = local.lambda.runtime

  create_package = false
  local_existing_package = local.lambda.archive_path

  # need this to add allowed triggers
  publish = true
  # cannot be in locals due to circular dependency
  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service    = "apigateway"
      source_arn = "${module.api_gateway.execution_arn}/*/*"
    }
  }

  tags = {
    Name = local.lambda.name
  }
}