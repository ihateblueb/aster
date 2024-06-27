HASH=$(git rev-parse --short HEAD)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
MESSAGE=$(git show-branch --no-name HEAD)

A=$(tput setaf 147 bold)
R=$(tput sgr0)
G=$(tput setaf 295)
H=$(tput setaf 149)

echo ""
echo "$A            _____ _______ ______ _____  "
echo "     /\\    / ____|__   __|  ____|  __ \\ "
echo "    /  \\  | (___    | |  | |__  | |__) |"
echo "   / /\\ \\  \\___ \\   | |  |  __| |  _  / "
echo "  / ____ \\ ____) |  | |  | |____| | \\ \\ "
echo " /_/    \\_\\_____/   |_|  |______|_|  \\_\\"
echo "$R"
echo "on $H$BRANCH$G@$H$HASH$R: $MESSAGE"
echo ""
