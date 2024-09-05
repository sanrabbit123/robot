#!/bin/bash
cd /home/ubuntu/robot;git reset --hard ccbcde5d711dd0f99594b2892d61f6cd9fe7b2ca;git pull;node /home/ubuntu/robot/robot.js infoObj;cd /home/ubuntu/robot;git pull;pm2 kill;pm2 start /home/ubuntu/robot/.office.config.js;systemctl restart robot-cron;systemctl restart robot-trans;systemctl restart nginx;pm2 monit;
