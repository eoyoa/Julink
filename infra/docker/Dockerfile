FROM ghcr.io/opentofu/opentofu:minimal AS tofu

FROM node:lts-alpine

COPY --from=tofu /usr/local/bin/tofu /bin/tofu

# Install pnpm
RUN npm install --global corepack@latest
RUN corepack enable pnpm

# Install zip
RUN apk add --no-cache zip

# Install git
RUN apk add --no-cache git

# Verify installations
RUN node --version && \
    pnpm --version && \
    tofu version

RUN adduser --disabled-password --no-create-home --uid=1983 spacelift