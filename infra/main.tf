provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project = title(var.project_name)
      Environment = title(var.environment)
      ManagedBy = "OpenTofu"
    }
  }
}

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
      source_arn = "${module.api_gateway.api_execution_arn}/*/*"
    }
  }

  tags = {
    Name = local.lambda.name
  }
}

# TODO: just use a function URL, it doesn't have to be so complicated
module "api_gateway" {
  source = "terraform-aws-modules/apigateway-v2/aws"

  name          = local.api_gw.name
  description   = local.api_gw.description
  protocol_type = local.api_gw.protocol_type

  cors_configuration = local.api_gw.cors_configuration

  create_domain_name = false

  stage_access_log_settings = local.api_gw.stage_access_log_settings

  routes = local.api_gw.routes

  tags = {
    Environment = "production"
    Purpose     = "lambda-integration"
  }
}

output "api_gw_url" {
  value = module.api_gateway.api_endpoint
}