variable "aws_region" {
  description = "The AWS region to deploy resources into."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "The name of the project. Used for resource naming and tagging."
  type = string
  default = "julink"
}

variable "environment" {
  description = "The deployment environment (e.g., development, production, staging)."
  type        = string
  default     = "production"
  validation {
    condition     = contains(["development", "production"], var.environment)
    error_message = "The environment variable must be one of: development, production."
  }
}