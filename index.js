const defaults = require('defaults');
const objectPrettify = require('object-prettify');

const TEMPLATE = {
    defindex: 0,
    quality: 0,
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

/**
 * Format items as strings or objects
 */
class SKU {
    /**
     * Convert SKU to item object
     * @param {String} sku SKU string
     * @return {Object} item Item object
     */
    static fromString (sku) {
        const attributes = {};

        const parts = sku.split(';');

        if (parts.length > 0) {
            if (isNum(parts[0])) {
                attributes.defindex = parseInt(parts[0]);
            }
            parts.shift();
        }

        if (parts.length > 0) {
            if (isNum(parts[0])) {
                attributes.quality = parseInt(parts[0]);
            }
            parts.shift();
        }

        for (let i = 0; i < parts.length; i++) {
            const attribute = parts[i].replace('-', '');

            if (attribute === 'uncraftable') {
                attributes.craftable = false;
            } else if (attribute === 'australium') {
                attributes.australium = true;
            } else if (attribute === 'festive') {
                attributes.festive = true;
            } else if (attribute === 'strange') {
                attributes.quality2 = 11;
            } else if (attribute.startsWith('kt') && isNum(attribute.substring(2))) {
                attributes.killstreak = parseInt(attribute.substring(2));
            } else if (attribute.startsWith('u') && isNum(attribute.substring(1))) {
                attributes.effect = parseInt(attribute.substring(1));
            } else if (attribute.startsWith('pk') && isNum(attribute.substring(2))) {
                attributes.paintkit = parseInt(attribute.substring(2));
            } else if (attribute.startsWith('w') && isNum(attribute.substring(1))) {
                attributes.wear = parseInt(attribute.substring(1));
            } else if (attribute.startsWith('td') && isNum(attribute.substring(2))) {
                attributes.target = parseInt(attribute.substring(2));
            } else if (attribute.startsWith('n') && isNum(attribute.substring(1))) {
                attributes.craftnumber = parseInt(attribute.substring(1));
            }
        }

        const item = objectPrettify(defaults(attributes, TEMPLATE), TEMPLATE);

        return item;
    }

    /**
     * Convert item object to SKU
     * @param {Object} item Item object
     * @return {String} sku SKU string
     */
    static fromObject (item) {
        item = objectPrettify(defaults(item, TEMPLATE), TEMPLATE);

        let sku = `${item.defindex};${item.quality}`;

        if (item.effect !== null) {
            sku += `;u${item.effect}`;
        }
        if (item.australium === true) {
            sku += ';australium';
        }
        if (item.craftable === false) {
            sku += ';uncraftable';
        }
        if (item.wear !== null) {
            sku += `;w${item.wear}`;
        }
        if (item.paintkit !== null) {
            sku += `;pk${item.paintkit}`;
        }
        if (item.quality2 !== null) {
            if (item.quality2 == 11) {
                sku += ';strange';
            }
        }
        if (item.killstreak !== 0) {
            sku += `;kt-${item.killstreak}`;
        }
        if (item.target !== null) {
            sku += `;td-${item.target}`;
        }
        if (item.festive === true) {
            sku += ';festive';
        }
        if (item.craftnumber !== null) {
            sku += `;n${item.craftnumber}`;
        }

        return sku;
    }
}

function isNum (test) {
    return /^-{0,1}\d+$/.test(test);
}

module.exports = SKU;
