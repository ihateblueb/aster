use clap::{Arg, Command, Subcommand};

fn main() {
    let matches = Command::new(env!("CARGO_PKG_NAME"))
        .version(env!("CARGO_PKG_VERSION"))
        .author(env!("CARGO_PKG_AUTHORS"))
        .about(env!("CARGO_PKG_DESCRIPTION"))
		.subcommands([
			Command::new("user")
        		.about("Manage users"),
			Command::new("note")
				.about("Manage notes"),
			Command::new("meta")
        		.about("Manage instance metadata"),
			Command::new("uploads")
				.about("Manage user uploaded content"),
		])
		.get_matches();

	println!("{:?}", matches);
}
