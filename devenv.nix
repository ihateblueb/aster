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
    ins.exec = "pnpm i";
    upd.exec = "pnpm update";

    start.exec = "pnpm dev";
    start-prod.exec = "pnpm start";

    build.exec = "pnpm build";
    build-be.exec = "pnpm build-be";
    build-fe.exec = "pnpm build-fe";

    test.exec = "pnpm test";
    migrate.exec = "pnpm migrate";
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
