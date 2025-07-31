locals {
  # Derive the short environment name
  environment_short = {
    development = "dev",
    production  = "prod",
  }[var.env]

  resource_prefix = "${var.project_name}-${local.environment_short}"

  # lambda settings
  lambda = {
    name = "${local.resource_prefix}-lambda"
    handler = "index.handler"
    runtime = "nodejs22.x"
    archive_path = "${path.module}/backend.zip"
  }

  # api gw settings
  api_gw = {
    name = "${local.resource_prefix}-api_gw"
  }

  # api gw usage plan settings
  api_gw_usage_plan = {
    name = "${local.resource_prefix}-usage_plan"

    limit = 1000000
    period = "MONTH"

    rate_limit = 20
    burst_limit = 50
  }

  api_keys = {
    julink-frontend-key = {
      name = "julink-frontend-key"
      enabled = true
    }
  }
}