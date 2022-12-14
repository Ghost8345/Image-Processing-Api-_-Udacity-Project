# Image Processing API Project

## Overview
This project Can View, Resize Images, and clear stored pictures folder.  

## Table of Contents

- [Getting Started](#getting-started)
	- [Tools Required](#tools-required)
	- [Installation](#installation)
- [Features](#features)
- [How to Use](#How-to-Use)

## Getting Started


### Tools Required

[Node js](https://nodejs.org/en/download/) is required for this project.

### Installation

* To Download all Dependencies Use:
 > `npm install`
* To Build Project Use:
> `npm run build`
* To Run Jasmine tests Use:
> `npm run test`
* To start server Use:
> `npm run start`
* To Run prettier and lint scripts USE:
> `npm run prettier` `npm run lint`
## Features

* Viewing Local Images in images/original folder by specifing relevant request queries
* Resize Images and save it to images/resized if not found then it's created. Multiple extensions are available (PNG, JPG, JPEG) also caching is a feature to reduce resources: If an image is resized to a specific width and height then it will be stored if same query was made then the stored image will be sent.
* Clear you resized images folder.
 
## How to Use

* To get started, follow installation: download dependencies, build project, and start server.
* To see a brief guid visit: `localhost:3000`
* To view Images visit: `localhost:3000/api/view?filename=PlaceHolderText` you can insert any image file name in place of Place Holder Text but it must be found in images/original folder and use the extension in the response query. Correct Example: `localhost:3000/api/view?filename=fjord.jpg`
* To resize Images visit : `localhost:3000/api/resize?filename=PlaceHolderText&width=PlaceHolderNumber&height=PlaceHolderNumber` same as view images you must use a valid image with valid extension and Place Holder Numbers must be positive numbers. Correct Example: `localhost:3000/api/resize?filename=tunnel.jpeg&width=1000&height=750`. Subsequent requests of the same file and dimensions will be ignored and the stored resized image will be served. 
* To clear resized Images folder visit : `localhost:3000/api/clear`
