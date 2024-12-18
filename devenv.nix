{ pkgs, lib, config, inputs, ... }:

{
  name = "Aster";

  enterShell = ''
    echo ""
    echo "Entered Aster development environment"
    echo ""
  '';

  env.NODE_ENV = "development";

  languages.javascript.enable = true;
  languages.javascript.pnpm.enable = true;
  languages.typescript.enable = true;

  scripts = {
    up.exec = "devenv up";
    down.exec = "devenv down";

    ins.exec = "pnpm i";
    upd.exec = "pnpm update";

    start.exec = "pnpm start";
    dev.exec = "pnpm dev";

    build.exec = "pnpm build";
    buildBack.exec = "pnpm build-be";
    buildFront.exec = "pnpm build-fe";

    test.exec = "pnpm test";
    migrate.exec = "pnpm migrate";
    revert.exec = "pnpm revert";

    format.exec = "pnpm format";
    lint.exec = "pnpm lint-fix-be";

    clean.exec = "pnpm clean";
    cleanBack.exec = "pnpm clean-be";
    cleanFront.exec = "pnpm clean-fe";
    cleanAll.exec = "pnpm clean-all";

    generateMigration.exec = "./scripts/generate-migration.sh migration";

    pull.exec = "pnpm pull";
    cli.exec = "pnpm cli";
  };

  services = {
    postgres = {
      enable = true;
      package = pkgs.postgresql_17;
      
      initialDatabases = [{
			  name = "asdev";
			}];
      initialScript = ''
			  CREATE USER asdev WITH PASSWORD 'asdev';
			  ALTER USER asdev WITH SUPERUSER;
			  GRANT ALL ON DATABASE asdev TO asdev;
			'';

			listen_addresses = "127.0.0.1";
      port = 9976;
    };
    redis = {
      enable = true;

			bind = "127.0.0.1";
      port = 9977;
    };
  };

  # See full reference at https://devenv.sh/reference/options/
}
