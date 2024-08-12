terraform {
  cloud {
    organization = "Julink"

    workspaces {
      name = "dev"
    }
  }

  required_providers {
    aws = {
      source = "hashicorp/aws",
      version = "~> 5.61"
    }
  }

  required_version = "~> 1.9"
}

provider "aws" {
  region = "us-east-1"
}