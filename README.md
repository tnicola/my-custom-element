# MyCustomElement
## How to create re-exportable, re-usable HTML elements with @angular/elements 

This project is a Proof of Concept for exportable @angular/elements. It generates a unique bundle (using ngx-build-plus) that contains the definition of two simple Angular components:

* `<my-custom-element-a>`
* `<my-custom-element-b>`

## Install
First of all install the dependencies
```
    npm install
```

## Build
Then, build the app to obtain the `main.js` bundle in `dist/my-custom-element` folder.
```
    npm run build
```
