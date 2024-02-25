# Use the Node.js image for the local
FROM node:20 AS local

# Set the working directory. If it doesn't exists, it'll be created
WORKDIR /app/frontend

# Install ionic as a global dependency
RUN npm install -g ionic

# Copy the file `package.json` from current folder
# inside our image in the folder `/app`
COPY ./frontend/package.json /app/frontend/package.json

# Install the dependencies
RUN npm install

# Copy all files from current folder
# inside our image in the folder `/app`
COPY . /app

# Command
ENTRYPOINT ionic serve --external


# ------------------------------------------------------------------
# ------------------------------------------------------------------
# ------------------------------------------------------------------

