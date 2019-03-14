# node-tf2-sku

Format items as strings or objects

## What is an SKU

SKU is the abbreviation of stock keeping unit. These SKUs makes it possible to represent items as readable strings, and convert them to and from objects.

The SKU can safely be used to identify items, since they contain all information about them.

## Examples

```js
const SKU = require('tf2-sku');

// SKU of a Mann Co. Supply Crate Key - 5021 is the defindex, 6 is the quality
const sku = '5021;6';

// Converts the sku string into an item object
const item = SKU.fromString(sku);
/* ->
{
    defindex: 5021,
    quality: 6,
    craftable: true,
    killstreak: 0,
    australium: false,
    festive: false,
    effect: null,
    paintkit: null,
    wear: null,
    quality2: null,
    target: null,
    craftnumber: null
}
*/
```

```js
const SKU = require('tf2-sku');

// Mann Co. Supply Crate Key
const item = {
    defindex: 5021,
    quality: 6,
    craftable: true,
    killstreak: 0,
    australium: false,
    festive: false,
    effect: null,
    paintkit: null,
    wear: null,
    quality2: null,
    target: null,
    craftnumber: null
};

// Converts the item object into an sku string
const sku = SKU.fromObject(item);
// -> '5021;6'
```
