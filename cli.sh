if [[ $1 == "help" ]]; then
	echo "command line tool to interact with aster's database"
	echo "arguments in [] are required, see docs/db.md for column names"
	echo ""
	echo "help          show help for this tool"
	echo "create        create row in table"
	echo "  note            [author id, content]"
	echo "  user            [username]"
	echo "  token           [user]"
	echo "update        update row in a table"
	echo "  note            [id]"
	echo "  user            [id]"
	echo "  token           [id]"
	echo "  meta            "
elif [[ $1 == "create" ]]; then
	if [[ $2 == "note" ]]; then
		echo "create note"
	elif [[ $2 == "user" ]]; then
		echo "create user"
	elif [[ $2 == "token" ]]; then
		echo "create token"
	else
		echo "unknown argument. see $0 help for arguments."
	fi
elif [[ $1 == "update" ]]; then
	if [[ $2 == "note" ]]; then
		echo "update note"
	elif [[ $2 == "user" ]]; then
		echo "update user"
	elif [[ $2 == "token" ]]; then
		echo "update token"
	elif [[ $2 == "meta" ]]; then
		echo "update meta"
	else
		echo "unknown argument. see $0 help for arguments."
	fi
else
	echo "unknown command. see $0 help for commands."
fi
