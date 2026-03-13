#!/bin/sh
set -e

# Inject runtime environment variables into the built React app
# This allows REACT_APP_* variables to be set at container start time
if [ -d /usr/share/nginx/html ]; then
  ENV_JS="/usr/share/nginx/html/env-config.js"
  echo "window._env_ = {" > "$ENV_JS"

  for var in $(env | grep '^REACT_APP_' | cut -d= -f1); do
    value=$(eval echo "\$$var")
    echo "  \"$var\": \"$value\"," >> "$ENV_JS"
  done

  echo "};" >> "$ENV_JS"
fi

exec nginx -g "daemon off;"
