provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project = title(var.project_name)
      Environment = title(var.environment)
      ManagedBy = "Terraform"
    }
  }
}

module "lambda_function" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = local.lambda_name
  handler = local.handler
  runtime = local.runtime

  create_package = false
  local_existing_package = local.archive_path

  tags = {
    Name = local.lambda_name
  }
}