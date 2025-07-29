locals {
  # Derive the short environment name
  environment_short = {
    development = "dev",
    production  = "prod",
  }[var.environment]

  # lambda settings
  lambda = {
    name = "${var.project_name}-${local.environment_short}-lambda"
    handler = "index.handler"
    runtime = "nodejs22.x"
    archive_path = "${path.module}/backend.zip"
  }

  # api gw settings
  api_gw = {
    name = "${var.project_name}-${local.environment_short}-api_gw"
    description = "The HTTP API for the Julink lambda"
    protocol_type = "HTTP"

    cors_configuration = {
      allow_headers = ["content-type"]
      allow_methods = ["POST"]
      allow_origins = var.environment == "development" ? [
        "https://julink.juliank.im",
        "http://localhost:5173"
      ] : ["https://julink.juliank.im"]
    }

    stage_access_log_settings = {
      create_log_group            = true
      log_group_retention_in_days = 7
      format = jsonencode({
        requestId    = "$context.requestId"
        requestTime  = "$context.requestTime"
        status       = "$context.status"
        error        = "$context.error.message"
        integration  = {
          error = "$context.integration.error"
        }
      })
    }

    routes = {
      "POST /" = {
        integration = {
          uri                    = module.lambda_function.lambda_function_arn
          payload_format_version = "2.0"
          timeout_milliseconds   = 30000
        }
      }
    }
  }
}