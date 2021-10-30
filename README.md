# Unsplash Collection Downloader

<div align="center">
    <img width="450px" src="assets\splashDL-logo_logo_white.svg">
 
[![GitHub license](https://img.shields.io/github/license/themisterpaps/splashDL?logoColor=red)](https://github.com/themisterpaps/splashdl/blob/master/LICENSE)
![GitHub language count](https://img.shields.io/github/languages/count/themisterpaps/splashdl)
 </div>

A node.js cli interface app to download a whole photo colletion on unsplash, just using a collection_id that you can find in the url of the collection on [Unsplash.com](http://unsplash.com); 

## Setup
**Requeriments**
> You need at least node v4.0

**Install dependencies**

```bash
$ npm install
```
```bash
$ Yarn add
```
**Configure env**
- Please First go to [Unsplash Developers](https://unsplash.com/documentation), to get the api api token(client_id);
- Change the constant `unsplash_token` with you api token(clent_id);
- You are done!!!👌

## How to use
- Open Bash/cmd and run:
```bash
  $ node app.js
```
- Go to unsplash and search something (e.g `portait`, `cars`, `car`)
- Then open the collection tab and chose a collection
- Opened the collection, on the url you gona see a number like this ./collections/`302501`/people-%26-portraits`
- Copy this to the console and the images going to be downloaded to `images/[collection_id] - [collection_title]`

## License

This project is released under [the MIT license](LICENSE).

