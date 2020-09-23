let defaultStyles = {
    'clip': 'auto',
    'clip-path': 'none',
    'clip-rule': 'nonzero',
    'cursor': 'auto',
    'display': 'inline',
    'visibility': 'visible',
    'opacity': '1',
    'enable-background': 'accumulate',
    'fill': '#000',
    'fill-opacity': 1,
    'fill-rule': 'nonzero',
    'marker': 'none',
    'marker-start': 'none',
    'marker-mid': 'none',
    'marker-end': 'none',
    'stroke': 'none',
    'stroke-width': 1,
    'stroke-opacity': 1,
    'stroke-miterlimit': 4,
    'stroke-linecap': 'butt',
    'stroke-linejoin': 'miter',
    'stroke-dasharray': 'none',
    'stroke-dashoffset': 0,
    'stop-opacity': 1,
    'font-anchor': 'start',
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-stretch': 'normal',
    'font-variant': 'normal',
    'text-anchor': 'start',
    'text-anchor': 'start',
    'writing-mode': 'lr-tb',
    'pointer-events': 'visiblePainted'
};

let nonEssentialStyles = {
    'color' : true,
    'display' : true,
    'overflow' : true,
    'fill-rule' : true,
    'clip-rule' : true,
    'nodetypes' : true,
    'stroke-miterlimit' : true,
    'stroke-linecap': true,
    'enable-background': true,
    'baseProfile': true,
    'version': true
};

let essentialAttributes = {
    'path': ['d'],
    'polygon': ['points'],
    'polyline': ['points'],
    'rect': ['width', 'height'],
    'circle': ['r'],
    'ellipse': ['r'],
};

let positionAttributes = [
    'x', 'y', 'width', 'height', 'rx', 'ry',
    'cx', 'cy', 'r',
    'x1', 'x2', 'y1', 'y2'
];

let optimisationOptions = [
    {
        name: 'Whitespace',
        id: 'whitespace',
        type: 'dropdown',
        options: ['remove', 'pretty'],
        defaultValue: 'remove'
    },
    {
        name: 'Style type',
        id: 'styles',
        type: 'dropdown',
        options: ['optimal', 'CSS', 'styleString'],
        defaultValue: 'optimal'
    },
    {
        name: 'Truncate attribute numbers',
        id: 'attributeNumTruncate',
        type: 'dropdown',
        optimiseType: 'decimal places',
        options: ['unchanged', '0', '1', '2', '3'],
        defaultValue: '1'
    },
    {
        name: 'Truncate SVG size numbers',
        id: 'svgSizeTruncate',
        type: 'dropdown',
        optimiseType: 'decimal places',
        options: ['unchanged', '0', '1', '2', '3'],
        defaultValue: '0'
    },
    {
        name: 'Truncate style numbers',
        id: 'styleNumTruncate',
        type: 'dropdown',
        optimiseType: 'significant figures',
        options: ['unchanged', '0', '1', '2', '3'],
        defaultValue: '2'
    },
    {
        name: 'Remove ids',
        id: 'removeIDs',
        type: 'checkbox'
    },
    {
        name: 'Remove default attributes',
        id: 'removeDefaultAttributes',
        type: 'checkbox',
        defaultValue: true
    },
    {
        name: 'Remove default styles',
        id: 'removeDefaultStyles',
        type: 'checkbox',
        defaultValue: true
    },
    {
        name: 'Remove non-essential styles',
        id: 'removeNonEssentialStyles',
        type: 'checkbox',
        defaultValue: true
    },
    {
        name: 'Remove empty elements',
        id: 'removeEmptyElements',
        type: 'checkbox',
        defaultValue: true
    },
    {
        name: 'Remove redundant shapes',
        id: 'removeRedundantShapes',
        type: 'checkbox',
        defaultValue: true
    },
    {
        name: 'Remove clean group',
        id: 'removeCleanGroups',
        type: 'checkbox',
        defaultValue: true
    },
    {
        name: 'Apply transforms',
        id: 'applyTransforms',
        type: 'checkbox',
        defaultValue: true
    }
];

const SVG_Element = function (element, parents) {
    this.tag = element.nodeName;
    this.attributes = {};
    this.styles = {};
    this.parents = parents;
    this.children = [];
    this.text = "";

    if (element.attributes) {
        for (let i = 0; i < element.attributes.length; i++){
            let attr = element.attributes.item(i);
            let attrName = attr.nodeName;

            var deepExtend = function(out) {
              out = out || {};

              for (var i = 1; i < arguments.length; i++) {
                var obj = arguments[i];

                if (!obj)
                  continue;

                for (var key in obj) {
                  if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object'){
                      if(obj[key] instanceof Array == true)
                        out[key] = obj[key].slice(0);
                      else
                        out[key] = deepExtend(out[key], obj[key]);
                    }
                    else
                      out[key] = obj[key];
                  }
                }
              }

              return out;
            };

            if (attrName === 'style') {
                deepExtend(this.styles, this.parseStyle(attr.value));
            } else if (defaultStyles[attrName] !== undefined || nonEssentialStyles[attrName] !== undefined) {
                this.styles[attrName] = this.parseNumber(attr.value);
            } else {
                this.attributes[attrName] = attr.value;
            }
        }
    }

    for (let i = 0; i < element.childNodes.length; i++) {
        let child = element.childNodes[i];
        this.children.push(new SVG_Element(child, this));
    }
}

SVG_Element.prototype.parseNumber = function(str) {
    let reDigit = /^\s*([-+]?[\d\.]+)([eE][-+]?[\d\.]+)?\s*(%|em|ex|px|pt|pc|cm|mm|in)\s*$/;
    let digit = reDigit.exec(str);
    let n = parseFloat(digit ? digit[1] + (digit[2] || "") : str);

    if (isNaN(n)) {
        return [str];
    } else {
        return [n, digit ? digit[3] : ""];
    }
}

SVG_Element.prototype.parsePath = function(dAttr) {
    let reCommands = /([ACHLMQSTVZ])([-\+\d\.\s,e]*)/gi;
    let reDigits = /([-+]?[\d\.]+)([eE][-+]?[\d\.]+)?/g;
    let letters = [];
    let values = [];

    let getDigits = function(digitString) {
        let digit, digits = [];

        if (digitString) {
            while (digit = reDigits.exec(digitString)) {
                digits.push(parseFloat(digit));
            }
        }
        return digits;
    };

    while (commands = reCommands.exec(dAttr)) {
        letters.push(commands[1]);
        values.push(getDigits(commands[2]));
    }

    return { letters: letters, values: values };
}

SVG_Element.prototype.parseStyle = function(styleString) {
    let styles = {};
    let styleArray = styleString.split(/\s*;\s*/);

    for (let i = 0; i < styleArray.length; i++) {
        let value = styleArray[i].split(/\s*:\s*/);

        if (value.length === 2) {
            styles[value[0]] = this.parseNumber(value[1]);
        }
    }

    return styles;
}

SVG_Element.prototype.parseTransforms = function() {
    let reTransform = /([a-z]+)\s*\(([-\+\d\.\s,e]+)\)/gi;
    let transform;
    this.transforms = [];

    if (this.attributes.transform) {
        while (transform = reTransform.exec(this.attributes.transform)) {
            digits = transform[2].split(/\s*[,\s]+\s*/);
            this.transforms.push({
                type: transform[1],
                digits: digits.map(parseFloat)
            });
        }
    }

    for (let i = 0; i < this.children.length; i++) {
        this.children[i].parseTransforms();
    }
}

SVG_Element.prototype.getUsedAttributes = function(options) {
    let transformedAttributes = {};
    for (let attr in this.attributes) {
        if (positionAttributes.indexOf(attr) !== -1) {
            transformedAttributes[attr] = parseFloat(this.attributes[attr]);
        } else if (attr === 'd') {
            this.pathCommands = this.parsePath(this.attributes[attr], options);
        }
    }
    while (this.transforms.length > 0) {
        let transformation = this.transforms.pop();
        if (this.tag === 'g') {
            let applyTransform = true;
            if (this.children.length > 1) {
                for (let i = 0; i < this.children.length; i++) {
                    if (!this.children[i].canTransform(transformation)) {
                        applyTransform = false;
                        break;
                    }
                }
            }

            if (applyTransform) {
                for (let i = 0; i < this.children.length; i++) {
                    this.children[i].transforms.unshift(transformation);
                }
            } else {
                this.transforms.push(transformation);
                break;
            }
        } else {
            let newAttributes = this.applyTransformation(transformation, transformedAttributes);
            if (newAttributes) {
                transformedAttributes = newAttributes;
            } else {
                this.transforms.push(transformation);
                break;
            }
        }
    }

    transformedAttributes.transform = "";
    for (let i = 0; i < this.transforms.length; i++) {
        let transform = this.transforms[i];
        transformedAttributes.transform += transform.type + "(" + transform.digits.join(" ") + ")";
    }

    let usedAttributes = {};
    for (let attr in this.attributes) {
        if (attr.indexOf(':') !== -1) {
            let ns = attr.split(':');
            if (!options.namespaces[ns[0]] || (ns[0] === 'xmlns' && !options.namespaces[ns[1]])) {
                continue;
            }
        }

        let value = transformedAttributes[attr] === undefined ? this.attributes[attr] : transformedAttributes[attr];
        if (value === "") { continue; }
        if (options.removeDefaultAttributes &&
            positionAttributes.indexOf(attr) !== -1 &&
            options.positionDecimals(value) == 0) {
            continue;
        }
        if (options.removeIDs && attr === 'id') {
            continue;
        }
        if (attr === 'viewBox' || attr === 'points') {
            let values = value.split(/[\s,]+/);
            value = values.map(options.positionDecimals).join(" ");
        } else if (this.tag === 'svg' && (attr === 'width' || attr === 'height')) {
            value = options.svgSizeDecimals(value);
        } else if (this.tag === 'path' && attr === 'd') {
            value = this.getPathString(options);
        } else if (positionAttributes.indexOf(attr) !== -1 ) {
            value = options.positionDecimals(value);
        }

        usedAttributes[attr] = value;
    }

    return usedAttributes;
}

SVG_Element.prototype.getUsedStyles = function(options) {
    if (!this.styles) { return []; }

    let usedStyles = [];

    let ignoreFill = (this.styles['fill'] === 'none' || options.styleDecimals(this.styles['fill-opacity']) == 0);
    let ignoreStroke = (this.styles['stroke'] === 'none' || options.styleDecimals(this.styles['stroke-opacity']) == 0 || options.styleDecimals(this.styles['stroke-width']) == 0);

    if ((ignoreFill && ignoreStroke) || this.styles['visibility'] === 'hidden'|| options.styleDecimals(this.styles['opacity']) == 0) {}

    for (let style in this.styles) {
        let value = this.styles[style];

        if (value.length > 1) {
            if (options.attributeNumTruncate[1] === 'order of magnitude' && style === 'stroke-width') {
                value = options.positionDecimals(value[0]) + value[1];
            } else {
                value = options.styleDecimals(value[0]) + value[1];
            }
        } else {
            value = value[0];
        }

        let repeated = value.match(/^#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3$/i);
        if (repeated) {
            value = '#' + repeated[1]  + repeated[2] + repeated[3];
        }

        if (ignoreFill && style.substr(0, 4) === 'fill') { continue; }
        if (ignoreStroke && style.substr(0, 6) === 'stroke') { continue; }
        if (options.removeDefaultStyles && value == defaultStyles[style]) { continue; }
        if (options.removeNonEssentialStyles && options.nonEssentialStyles[style]) { continue; }

        usedStyles.push(style + ":" + value);
    }

    if (ignoreFill) { usedStyles.push('fill:none'); }

    return usedStyles.sort();
}

SVG_Element.prototype.createCSS = function(options, stylesOfElements) {
    let styles = this.getUsedStyles(options);

    if (styles.length > 0) {
        let styleString = styles.join(";");

        if (stylesOfElements[styleString]) {
            stylesOfElements[styleString].push(this);
        } else {
            stylesOfElements[styleString] = [this];
        }
    }

    for (let i = 0; i < this.children.length; i++) {
        this.children[i].createCSS(options, stylesOfElements);
    }
}

SVG_Element.prototype.removeClass = function() {
    this.class = undefined;

    for (let i = 0; i < this.children.length; i++) {
        let f = this.children[i].removeClass;
        if (f) this.children[i].removeClass();
    }
}

SVG_Element.prototype.toString = function(options, depth) {
    if (this.tag.indexOf(':') !== -1) {
        let ns = this.tag.split(':')[0];
        if (!options.namespaces[ns]) {
            return "";
        }
    }

    depth = depth || 0;
    let indent = (options.whitespace === 'remove') ? '' : new Array(depth + 1).join('  ');
    let str = indent + '<' + this.tag;

    let usedAttributes = this.getUsedAttributes(options);

    if (options.removeRedundantShapes && essentialAttributes[this.tag]) {
        let attributes = essentialAttributes[this.tag];
        for (let i = 0; i < attributes.length; i++) {
            if (!usedAttributes[attributes[i]]) {
                return "";
            }
        }
    }

    let numUsedAttributes = 0;
    for (let attr in usedAttributes) {
        str += ' ' + attr + '="' + usedAttributes[attr] + '"';
        numUsedAttributes++;
    }

    let usedStyles = this.getUsedStyles(options);
    if (options.styles === 'CSS' || (options.styles === 'optimal' && this.class)) {
        str += ' class="' + this.class + '"';
    } else if (usedStyles.length > 1) {
        str += ' style="' + usedStyles.join(';') + '"';
    } else if (usedStyles.length === 1) {
        let style = usedStyles[0].split(':');
        str += ' ' + style[0] + '="' + style[1] + '"';
    }

    let childString = "";
    if (this.tag === 'g' && options.removeCleanGroups && !numUsedAttributes && !usedStyles.length) {
        for (let i = 0; i < this.children.length; i++) {
            childString += this.children[i].toString(options, depth + 1);
        }
        return childString;
    }

    for (let i = 0; i < this.children.length; i++) {
        childString += this.children[i].toString(options, depth + 1);
    }

    if (this.text.length + childString.length > 0) {
        str += ">" + options.newLine;
        if (this.text) {
            str += indent + "  " + this.text + options.newLine;
        }
        str += childString + indent + "</" + this.tag + ">" + options.newLine;
    } else {
        if ((options.removeEmptyElements && numUsedAttributes === 0) || this.tag === 'g') {
            return "";
        }
        str += "/>" + options.newLine;
    }

    options.numElements++;
    return str;
}

SVG_Element.prototype.getPathString = function(options) {
    let coordString = "";

    if (this.pathCommands) {
        let letters = this.pathCommands.letters;
        let values = this.pathCommands.values;

        if (letters.length < 2 || (letters.length === 2 && letters[1] === 'z')) {
            return "";
        }

        let currentLetter;
        for (let i = 0; i < letters.length; i++) {
            coordString += (letters[i] === currentLetter) ? " " : letters[i];
            currentLetter = letters[i];

            if (values[i]) {
                for (let j = 0; j < values[i].length; j++) {
                    let n = values[i][j];
                    let d = options.positionDecimals(n);
                    coordString += (j > 0 && (n > 0 || d == '0')) ? " " + d : d;
                }
            }
        }
    }

    return coordString;
}

SVG_Element.prototype.canTransform = function(transformation) {
    if (this.tag !== 'g') {
        let implementedTransformations = {
            'translate': ['rect', 'circle', 'ellipse', 'path'],
            'scale': ['rect', 'circle', 'ellipse', 'path']
        };

        let transform = implementedTransformations[transformation.type];
        if (!transform || transform.indexOf(this.tag) === -1) { return false; }
    }
    for (let i = 0; i < this.children.length; i++) {
        if (!this.children[0].canTransform(transformation)) {
            return false;
        }
    }

    return true;
}

SVG_Element.prototype.applyTransformation = function(transformation, attributes) {
    if (this.tag === 'path' && this.pathCommands) {
        return this.transformPath(transformation, attributes);
    }

    let x, y, width, height;
    if (this.tag === 'rect') {
        x = 'x';
        y = 'y';
        width = 'width';
        height = 'height';
    } else if (this.tag === 'ellipse') {
        x = 'cx';
        y = 'cy';
        width = 'rx';
        height = 'ry';
    }

    if (x) {
        attributes[x] = attributes[x] || 0;
        attributes[y] = attributes[y] || 0;
        attributes[width] = attributes[width] || 0;
        attributes[height] = attributes[height] || 0;

        if (transformation.type === 'translate') {
            attributes[x] += transformation.digits[0] || 0;
            attributes[y] += transformation.digits[1] || 0;
            return attributes;
        }

        if (transformation.type === 'scale') {
            let scaleX = transformation.digits[0];
            let scaleY = transformation.digits.length === 2 ? transformation.digits[1] : transformation.digits[0];
            attributes[x] *= scaleX;
            attributes[y] *= scaleY;
            attributes[width] *= scaleX;
            attributes[height] *= scaleY;
            return attributes;
        }
    }
    return false;
}

SVG_Element.prototype.transformPath = function(transformation, attributes) {
    let letters = this.pathCommands.letters;
    let values = this.pathCommands.values;

    let simpleTranslations = 'MLQTCS';
    let nullTranslations = 'mlhvqtcsZz';
    let implementedScales = 'MmLlqQtTcCsS';

    let dx = transformation.digits[0] || 0;
    let dy = transformation.digits[1] || 0;

    if (transformation.type === 'translate') {
        for (let i = 0; i < letters.length; i++) {
            let letter = letters[i];
            let value = values[i];

            if (simpleTranslations.indexOf(letter) > -1) {
                for (let j = 0; j < value.length; j += 2) {
                    value[j] += dx;
                    value[j + 1] += dy;
                }
            } else if (letter === 'H') {
                for (let j = 0; j < value.length; j++) {
                    value[j] += dx;
                }
            } else if (letter === 'V') {
                for (let j = 0; j < value.length; j++) {
                    value[j] += dy;
                }
            } else if (letter === 'A') {
                for (let j = 0; j < values.length; j += 7) {
                    values[j + 5] += dx;
                    values[j + 6] += dy;
                }
            } else if (nullTranslations.indexOf(letter) === -1) {
                return false;
            }
        }
    } else if (transformation.type === 'scale') {
        for (let i = 0; i < letters.length; i++) {

            let letter = letters[i];
            let value = values[i];

            if (implementedScales.indexOf(letter) > -1) {
                for (let j = 0; j < value.length; j += 2) {
                    value[j] *= dx;
                    value[j + 1] *= dy;
                }
            } else if (letter === 'H') {
                for (let j = 0; j < value.length; j++) {
                    value[j] *= dx;
                }
            } else if (letter === 'V') {
                for (let j = 0; j < value.length; j++) {
                    value[j] *= dy;
                }
            } else if (letter === 'A' || letter === 'a') {
                for (let j = 0; j < value.length; j += 7) {
                    if (dx > 0) {
                        value[j] *= dx;
                    } else {
                        value[j] *= -dx;
                        value[j + 4] = 1 - value[j + 4];
                    }
                    if (dy > 0) {
                        value[j + 1] *= dy;
                    } else {
                        value[j + 1] *= -dy;
                        value[j + 4] = 1 - value[j + 4];
                    }
                    value[j + 5] *= dx;
                    value[j + 6] *= dy;
                }
            } else {
                return false;
            }
        }
    }

    this.pathCommands.values = values;
    return attributes;
}

const SVG_Style_Element = function() {
    this.data = '';

    this.toString = function (options) {
        if ((options.styles === 'CSS' || options.styles === 'optimal') &&  this.data) {
            options.numElements++;
            return '<style>' + options.newLine + this.data + '</style>' + options.newLine;
        } else {
            return '';
        }
    };

    this.createCSS = function() {};
    this.parseTransforms = function() {};
    this.canTransform = function() {};
}

const SVG_Object = function(jQuerySVG, decimal) {
    this.elements = new SVG_Element(jQuerySVG, null);
    this.elements.children.unshift(new SVG_Style_Element());
    this.options = {
        whitespace: 'remove',
        styles: 'styleString',
        removeIDs: true,
        removeDefaultAttributes: false,
        removeDefaultStyles: false,
        removeNonEssentialStyles: true,
        removeEmptyElements: true,
        removeRedundantShapes: false,
        removeCleanGroups: true,
        applyTransforms: true,
        attributeNumTruncate: decimal,
        styleNumTruncate: 3,
        svgSizeTruncate: 3,
    };

    this.options.nonEssentialStyles = nonEssentialStyles;
    this.options.namespaces = this.findNamespaces();
}

SVG_Object.prototype.findNamespaces = function() {
    let namespaces = {};
    let allowed_namespaces = ['svg', 'xlink'];

    for (let attr in this.elements.attributes) {
        if (attr.slice(0,6) === 'xmlns:') {
            let ns = attr.split(':')[1];
            namespaces[ns] = (allowed_namespaces.indexOf(ns) !== -1);
        }
    }
    return namespaces;
}

SVG_Object.prototype.toString = function() {
    this.options.numElements = 0;
    this.options.newLine = (this.options.whitespace === 'remove') ? "": "\n";
    this.options.positionDecimals = this.getDecimalOptimiserFunction([this.options.attributeNumTruncate, 'decimal places']);
    this.options.styleDecimals = this.getDecimalOptimiserFunction([this.options.styleNumTruncate, 'significant figures']);
    this.options.svgSizeDecimals = this.getDecimalOptimiserFunction([this.options.svgSizeTruncate, 'decimal places']);
    this.elements.removeClass();
    if (this.options.styles === 'CSS' || this.options.styles === 'optimal') {
        this.createCSS();
    }
    this.elements.parseTransforms();

    this.string = this.elements.toString(this.options);
    return this.string;
}

SVG_Object.prototype.getDecimalOptimiserFunction = function(parameters) {
    let level = parameters[0];
    let type = parameters[1];

    if (!isNaN(parseInt(level))) {
        let scale = Math.pow(10, level);
        let reDigit = /^\s*([-+]?[\d\.]+)([eE][-+]?[\d\.]+)?\s*(%|em|ex|px|pt|pc|cm|mm|in)\s*$/;

        let roundFunction;
        if (type === 'decimal places') {
            roundFunction = function(n) { return Math.round(n * scale) / scale; };
        } else if (type === 'significant figures') {
            roundFunction = function(n) {
                if (n == 0) { return 0; }
                let mag = Math.pow(10, level - Math.ceil(Math.log(n < 0 ? -n: n) / Math.LN10));
                return Math.round(n * mag) / mag;
            };
        } else if (type === 'order of magnitude') {
            roundFunction = function(n) { return Math.round(n * scale); };
        } else {
            roundFunction = function(n) { return n; };
        }

        return function(str) {
            let digit = reDigit.exec(str);
            let n = parseFloat(digit ? digit[1] + (digit[2] || "") : str);

            if (isNaN(n)) {
                return str;
            } else {
                return roundFunction(n) + (digit ? digit[3] : "");
            }
        };
    } else {
        return function(str) { return str; };
    }
}

SVG_Object.prototype.createCSS = function() {
    this.stylesOfElements = {};
    this.elements.createCSS(this.options, this.stylesOfElements);
    let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let counter = 0;
    let getClassName = function(n) {
        let name = '';
        let len = letters.length;
        while (n >= 0) {
            name += letters.charAt(n % len);
            n -= len;
        }
        return name;
    };
    let indent1 = (this.options.whitespace === 'remove') ? '' : '  ';
    let indent2 = (this.options.whitespace === 'remove') ? '' : '    ';
    let styleString = '';
    for (let styles in this.stylesOfElements) {
        let elements = this.stylesOfElements[styles];
        if (this.options.styles === 'optimal' && elements.length === 1) { continue; }

        let styleName = getClassName(counter);
        styleString += indent1 + '.' + styleName + '{' + this.options.newLine;

        let styleList = styles.split(';');
        for (let i = 0; i < styleList.length; i++) {
            styleString += indent2 + styleList[i] + ';' + this.options.newLine;
        }

        styleString += indent1 + '}' + this.options.newLine;

        for (let i = 0; i < elements.length; i++) {
            elements[i].class = styleName;
        }

        counter++;
    }
    this.elements.children[0].data = styleString;
}

const SvgOptimizer = function (fileLinkArr) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.files = fileLinkArr;
  this.result = {};
  this.decimal = 3;
}

SvgOptimizer.prototype.setDcimal = function (number) {
  this.decimal = number;
}

SvgOptimizer.prototype.loadSVG = async function (file) {
  const { JSDOM } = require("jsdom");
  const { window } = new JSDOM(`<!DOCTYPE html><html></html>`);
  let svgDoc_raw, svgDoc, svgObj, svgStringNew;
  const parseXML = function(data) {
    let xml;
    if (!data || typeof data !== "string") { return null; }
    try { xml = (new window.DOMParser()).parseFromString(data, "text/xml"); }
    catch (e) { xml = undefined; }
    return xml;
  };
  try {
    let svgString = await this.mother.fileSystem(`readString`, [ file ]);
    if (!svgString) { throw new Error("invalid svg"); }
    svgDoc = parseXML(svgString);
    svgObj = new SVG_Object(svgDoc.children[0], this.decimal);
    svgObj.originalString = svgString;
    svgObj.options.removeIDs = true;
    svgStringNew = svgObj.toString();
    if (/xlink/.test(svgStringNew)) {
      svgStringNew = '<svg xmlns:xlink="http://www.w3.org/1999/xlink"' + svgStringNew.slice(4);
    }
    return svgStringNew;
  } catch (e) {
    console.log(e);
    return;
  }
}

SvgOptimizer.prototype.fileToName = function (fileName) {
  let arr, string;
  arr = fileName.split('/');
  string = arr[arr.length - 1].replace(/\.svg$/, '');
  return string;
}

SvgOptimizer.prototype.launching = async function () {
  try {
    for (let f of this.files) {
      this.result[this.fileToName(f)] = await this.loadSVG(f);
      console.log(this.fileToName(f) + " optimize success");
    }
    return this.result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = SvgOptimizer;
