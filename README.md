# vue-img-watermark :maple_leaf:


## Installation
```sh
npm install --save @serializedowen/vue-img-watermark
```

```
yarn add @serializedowen/vue-img-watermark
```



## Usage
```js
import plugin from '@serializedowen/vue-img-watermark'

Vue.use(plugin)
```



* put `v-watermark` on your `<img>` tag to generate watermark for your image
* fully customizable with configuration object. 
  * use `setScopedConfig()` in `beforeCreate` hook in your vue component to scope configuration to that particular vue component
  * use `v-watermark={{config: OptionConfig}}` to customize watermark behavior
  * The order of precedance will be directive value > component scoped options > global options
* register your custom rendering strategy with `registerCustomStrategy()` which you can later on use with `{mode: name of your strategy}` :grinning:


## Known Issues:
- [ ] currently `canvas.drawImage()` has to be wrapped in a `setTimeout()` call to work, reason to be identified.
