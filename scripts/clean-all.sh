echo "removing node modules"
rm -Rf packages/backend/node_modules
rm -Rf packages/frontend/node_modules
rm -Rf node_modules
sh ./scripts/clean.sh
