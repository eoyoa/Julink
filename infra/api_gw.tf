module "api_gateway_account_settings" {
  source = "cloudposse/api-gateway/aws//modules/account-settings"
  context = module.this.context
}

# TODO: i don't like cloudposse's context thing,
#  maybe make api gateway w/o module
module "api_gateway" {
  source = "cloudposse/api-gateway/aws"

  name = local.api_gw.name
  stage_name = local.environment_short

  openapi_config = yamldecode(templatefile("${path.module}/api.yaml", {
    aws_region = var.aws_region
    lambda_function_arn = module.lambda_function.lambda_function_arn
    cors_origin        = var.env == "development" ? "'*'" : "'https://julink.juliank.im'"
  }))

  tags = {
    Name = local.api_gw.name
  }

  depends_on = [module.api_gateway_account_settings]
}

resource "aws_api_gateway_api_key" "julink_key" {
  name    = local.api_keys.julink-frontend-key.name
  enabled = local.api_keys.julink-frontend-key.enabled
}

resource "aws_api_gateway_usage_plan" "julink_plan" {
  name = local.api_gw_usage_plan.name

  api_stages {
    api_id = module.api_gateway.id
    stage = local.environment_short
  }

  quota_settings {
    limit  = local.api_gw_usage_plan.limit
    period = local.api_gw_usage_plan.period
  }

  throttle_settings {
    rate_limit  = local.api_gw_usage_plan.rate_limit
    burst_limit = local.api_gw_usage_plan.burst_limit
  }

  depends_on = [module.api_gateway]
}

resource "aws_api_gateway_usage_plan_key" "julink_key_association" {
  key_id        = aws_api_gateway_api_key.julink_key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.julink_plan.id
}

output "api_gw_url" {
  value = module.api_gateway.invoke_url
}

output "api_key" {
  value     = aws_api_gateway_api_key.julink_key.value
  sensitive = true
}
