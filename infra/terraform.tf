terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws",
      version = "~> 6.5",
    }
  }

  required_version = "~> 1.6"
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project = title(var.project_name)
      Environment = title(var.env)
      ManagedBy = "OpenTofu"
    }
  }
}