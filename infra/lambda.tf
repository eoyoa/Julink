resource "aws_lambda_function" "julink_backend" {
  function_name = "JulinkBackend"

  filename = "backend/index.zip"

  runtime = "nodejs20.x"
  handler = "index.handler"

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "backend" {
  name = "/aws/lambda/${aws_lambda_function.julink_backend.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}