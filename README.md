# SmartBuilding LoRaWAN Demo based on Raspberry PI

This demo consists in a NodeJS application which can be deployed on a Raspberry PI, in order to show the uplink and downlink capabilities of a LoRaWAN network (long-range, up to 15km).

In order to get started:

- prepare your RPI with a SD card flashed with the latest rasbian image (tested with 2016-09-23-raspbian-jessie.img)

- boot into your RPI and type:
cd /home/pi && git clone https://github.com/actility/demo-smartbuilding-device && chmod +x demo-smartbuilding-device/install.sh && ./demo-smartbuilding-device/install.sh

- required software will be automatically installed and configured, then your RPI will reboot

- enjoy ! you can now simulate temperature reporting with the RPI application, and check the sent uplink frames with your LoRaWAN network monitoring tools (such as the ones provided by Actility ;) ); you can also send downlink frames to your device, which will be displayed in the screen of the RPI application
