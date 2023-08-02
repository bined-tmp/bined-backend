###############################
# BUILD FOR LOCAL DEVELOPMENT
###############################

FROM node:lts-slim As development

# Install procps package
RUN apt-get update && apt-get install -y procps

# Create backend directory
WORKDIR /backend

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node  package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && npm i; \
  fi

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

########################
# BUILD FOR PRODUCTION
########################

FROM node:lts As build

WORKDIR /backend

COPY --chown=node:node  package.json package-lock.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /backend/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN npm ci --only=production && npm cache clean --force

# Use the node user from the image (instead of the root user)
USER node

##############
# PRODUCTION
##############

FROM node:lts-slim As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /backend/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/backend/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
