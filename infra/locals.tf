locals {
  # Derive the short environment name
  environment_short = {
    development = "dev",
    production  = "prod",
  }[var.environment]
  lambda_name = "${var.project_name}-${local.environment_short}-lambda"
  handler = "index.handler"
  runtime = "nodejs22.x"
  archive_path = "${path.module}/backend.zip"
}