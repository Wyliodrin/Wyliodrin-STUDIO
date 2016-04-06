# Wyliodrin STUDIO

[![Join the chat at https://gitter.im/Wyliodrin/WyliodrinSTUDIO](https://badges.gitter.im/Wyliodrin/WyliodrinSTUDIO.svg)](https://gitter.im/Wyliodrin/WyliodrinSTUDIO?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/Wyliodrin/WyliodrinSTUDIO.svg?branch=master)](https://travis-ci.org/Wyliodrin/WyliodrinSTUDIO)
[![Dependency Status](https://gemnasium.com/Wyliodrin/WyliodrinSTUDIO.svg)](https://gemnasium.com/Wyliodrin/WyliodrinSTUDIO)

Wyliodrin STUDIO is a Chrome based IDE for software and hardware development for IoT and Embedded Linux systems.

![Wyliodrin](https://raw.githubusercontent.com/Wyliodrin/WyliodrinSTUDIO/master/extra/wyliodrin.png)

* Connect to devices using TCP/IP or serial port
* Develop software and firmware for IoT in several programming languages
* Shell access to the device
* Import and export Wyliodrin STUDIO projects
* Visual dashboard for displaying sensor data
* Display the hardware schematics
* Manage packages for Python and Javascript
* Task manager for managing the device
* Network connection manager for the device  (Ethernet and WiFi)
* Interactive electronics documentation (resistor color code)
* Example projects and firmware
* Wyliodrin API documentation in C/C++, Python and Javascript

## Supported devices:
* UDOO Neo 
* Raspberry Pi and Arduino 
* BeagleBone Black 
* Arduino Yun

## Supported languages
* Visual Programming (translates to Python)
* Javascript
* Python
* Shell Script (bash)

## Install
You may find Wyliodrin STUDIO on the [Chrome Store](https://goo.gl/Sgj9HB)

![Wyliodrin](https://raw.githubusercontent.com/Wyliodrin/WyliodrinSTUDIO/master/extra/wyliodrin_studio_qr.png)

## Device

The device needs to run
* [wyliodrin-app-server](https://www.github.com/wyliodrin/wyliodrin-app-server)
* [wyliodrin-server](https://www.github.com/wyliodrin/wyliodrin-server)
* [libwyliodrin](https://www.github.com/wyliodrin/libwyliodrin)

You may download device images that have them installed from Wyliodrin.

* UDOO Neo [Download Image](http://www.wyliodrin.com/images/beta/udooneo)
* Raspberry Pi and Arduino [Download Image](http://www.wyliodrin.com/images/beta/raspberrypi)
* BeagleBone Black [Download Image](http://www.wyliodrin.com/images/beta/beagleboneblack)
* Arduino Yun

## Build

You will need 

* [NodeJS](http://www.nodejs.org) version 4 or higher.
* [bower](http://bower.io/)
* [grunt](http://gruntjs.com/)

You may build Wyliodrin STUDIO yourself

    git clone https://www.github.com/Wyliodrin/WyliodrinSTUDIO
    cd WyliodrinSTUDIO
    npm install
    bower install
    patch node_modules/highcharts-ng/dist/highcharts-ng.js patches/highcharts-ng.patch
    grunt

### Install grunt and bower

    sudo npm install -g grunt-cli bower

The build is in the *build* folder

### Parameters

* DEBUG_WYLIODRIN='wyliodrin.*' - enable debug messages (this will have a performance impact)
* MIXPANEL_WYLIODRIN='' - mixpanel token for anonymous statistics sending

## Authors

Wyliodrin STUDIO is a product of [Wyliodrin](http://www.wyliodrin.com)

* [Alexandru Radovici](https://www.github.com/alexandruradovici) - Maintainer
* [Ioana Culic](https://www.github.com/ioanaculic) - Developer
* [Ovidiu Stoica](https://www.github.com/oviska) - UX / UI

Contributions

* [Razvan Serban](https://www.github.com/serban-razvan) - Developer
* [Paula Margarit](https://www.github.com/paula-elena) - Developer
* [Daniel Dosaru](https://www.github.com/dosarudaniel) - Developer
* [Mihai Popescu](https://www.github.com/mhpopescu) - Developer

Wyliodrin is a trademark of Wyliodrin SRL. All rights reservered.

## License

This software is available under several licenses, depending of the use.

Non-commercial & educational - GPLv3
Please contact us at office@wyliodrin.com for a commercial license.

