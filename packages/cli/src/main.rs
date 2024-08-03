use clap::{Arg, Command};

fn main() {
    let matches = Command::new(env!("CARGO_PKG_NAME"))
        .version(env!("CARGO_PKG_VERSION"))
        .author(env!("CARGO_PKG_AUTHORS"))
        .about(env!("CARGO_PKG_DESCRIPTION"))
		.subcommands([
			Command::new("user")
        		.about("Manage users")
				.subcommands([
					Command::new("create")
						.about("Create a new user"),
					Command::new("edit")
						.about("Edit an existing user"),
					Command::new("delete")
						.about("Delete an existing user"),
				]),
			Command::new("note")
				.about("Manage notes")
				.subcommands([
					Command::new("create")
						.about("Create a new note"),
					Command::new("edit")
						.about("Edit an existing note"),
					Command::new("delete")
						.about("Delete an existing note"),
				]),
			Command::new("instance")
				.about("Manage instances")
				.subcommands([
					Command::new("edit")
						.about("Edit an instance"),
					Command::new("delete")
						.about("Delete an instance"),
					Command::new("purge")
						.about("Delete an instance and purge all of the users and notes from it"),
					Command::new("block")
						.about("Block an instance"),
					Command::new("silence")
						.about("Silence an instance"),
				]),
			Command::new("meta")
        		.about("Manage instance metadata")
				.subcommands([
					Command::new("edit")
						.about("Modify value of instance metadata"),
					Command::new("reset")
						.about("Reset instance metadata to original state"),
				]),
			Command::new("drive")
				.about("Manage user uploaded content")
				.subcommands([
					Command::new("create")
						.about("Create a new drive file"),
					Command::new("edit")
						.about("Edit an existing drive file"),
					Command::new("delete")
						.about("Delete an existing drive file"),
				]),
		])
		.get_matches();

	println!("{:?}", matches);
}
