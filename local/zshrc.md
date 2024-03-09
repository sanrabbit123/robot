vim ~/.zshrc
alias update='curl -X POST -d "{\"type\": \"apply\"}" http://127.0.0.1:8000/gitPush'