command="node /Users/baechang-gyu/uragen/homeRobot/robot/robot.js"

if [ $# -eq 0 ]; then
  $command
fi

if [ $# -eq 1 ]; then
  $command" "$1
fi

if [ $# -eq 2 ]; then
  $command" "$1" "$2
fi

if [ $# -eq 3 ]; then
  $command" "$1" "$2" "$3
fi

if [ $# -eq 4 ]; then
  $command" "$1" "$2" "$3" "$4
fi

if [ $# -eq 5 ]; then
  $command" "$1" "$2" "$3" "$4" "$5
fi

if [ $# -eq 6 ]; then
  $command" "$1" "$2" "$3" "$4" "$5" "$6
fi

if [ $# -eq 7 ]; then
  $command" "$1" "$2" "$3" "$4" "$5" "$6" "$7
fi

if [ $# -eq 8 ]; then
  $command" "$1" "$2" "$3" "$4" "$5" "$6" "$7" "$8
fi

if [ $# -eq 9 ]; then
  $command" "$1" "$2" "$3" "$4" "$5" "$6" "$7" "$8" "$9
fi
