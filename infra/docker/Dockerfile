FROM ghcr.io/opentofu/opentofu:minimal AS tofu

FROM node:lts-alpine

COPY --from=tofu /usr/local/bin/tofu /bin/tofu

RUN npm install --global corepack@latest
RUN corepack enable pnpm

# Verify installations
RUN node --version && \
    pnpm --version && \
    tofu version

RUN adduser --disabled-password --no-create-home --uid=1983 spacelift