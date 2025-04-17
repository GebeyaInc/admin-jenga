
# Use the official Node.js image as a base
FROM node:22.11.0 AS builder

# Set the working directory
WORKDIR /app

ARG N8N_WEBHOOK_URL
ARG SUPABASE_URL
ARG SUPABASE_PUBLISHABLE_KEY
ARG SUPABASE_PROJECT_ID

ENV N8N_WEBHOOK_URL=${N8N_WEBHOOK_URL}
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_PUBLISHABLE_KEY=${SUPABASE_PUBLISHABLE_KEY}
ENV SUPABASE_PROJECT_ID=${SUPABASE_PROJECT_ID}


# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

RUN echo "VITE_SUPABASE_URL=${SUPABASE_URL}" > .env
RUN echo "VITE_SUPABASE_ANON_KEY=${SUPABASE_PUBLISHABLE_KEY}" >> .env

# value ${SUPABASE_URL} is  SUPABASE_URL = "https://ivndgetmkcwapmttsbqa.supabase.co"
# RUN sed -i "s/N8N_WEBHOOK_URL/${N8N_WEBHOOK_URL}/g" src/utils/webhookUtils.ts
RUN sed -i "s|\(SUPABASE_URL = .*\)\(.\)|SUPABASE_URL = "${SUPABASE_URL}"\2|g" src/integrations/supabase/client.ts

# value ${SUPABASE_PUBLISHABLE_KEY} is  SUPABASE_PUBLISHABLE_KEY = "NWD55D_pTuf7Ddk_8mZJBtsZg7dsPaVVVJ5e8wpZzMY"
RUN sed -i "s|\(SUPABASE_PUBLISHABLE_KEY = .*\)\(.\)|SUPABASE_PUBLISHABLE_KEY = "${SUPABASE_PUBLISHABLE_KEY}"\2|g" src/integrations/supabase/client.ts

# value ${SUPABASE_PROJECT_ID} is  project_id = "ivndgetmkcwapmttsbqa"
RUN sed -i "s|project_id.*|project_id = "${SUPABASE_PROJECT_ID}"|g" supabase/config.toml

# Build the application
RUN npm run build

FROM nginx:1.26 AS runner
# add nginx docker layer to copy the dist folder to the nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# copy the default.conf file to the nginx conf folder
COPY default.conf /etc/nginx/conf.d/default.conf   

# copy the nginx.conf file to the nginx conf folder
COPY nginx.conf /etc/nginx/nginx.conf

# Command to run the application
CMD ["nginx", "-g", "daemon off;"]