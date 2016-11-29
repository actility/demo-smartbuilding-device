# Smartcity demo based on Raspberry PI

## Raspberry PI installation steps:




sudo nano /home/pi/launcher
-> add lines below:
 #!/bin/bash
cd /home/pi/tpdx-demo-smartcity
node server.js

mkdir tpdx-demo-smartcity
-> copy project files in this folder

cd tpdx-demo-smartcity && npm install

now reboot the RPI and enjoy !