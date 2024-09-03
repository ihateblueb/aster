cd packages/backend || exit
pnpm build
pnpm exec typeorm migration:generate ./src/migrations/"$1" -d ./built/utils/database.js
cd - || exit
