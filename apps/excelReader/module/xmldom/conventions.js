function freeze(object, oc) {
	if (oc === undefined) {
		oc = Object
	}
	return oc && typeof oc.freeze === 'function' ? oc.freeze(object) : object
}

var MIME_TYPE = freeze({
	HTML: 'text/html',
	isHTML: function (value) {
		return value === MIME_TYPE.HTML
	},
	XML_APPLICATION: 'application/xml',
	XML_TEXT: 'text/xml',
	XML_XHTML_APPLICATION: 'application/xhtml+xml',
	XML_SVG_IMAGE: 'image/svg+xml',
})
var NAMESPACE = freeze({
	HTML: 'http://www.w3.org/1999/xhtml',
	isHTML: function (uri) {
		return uri === NAMESPACE.HTML
	},
	SVG: 'http://www.w3.org/2000/svg',
	XML: 'http://www.w3.org/XML/1998/namespace',
	XMLNS: 'http://www.w3.org/2000/xmlns/',
})

exports.freeze = freeze;
exports.MIME_TYPE = MIME_TYPE;
exports.NAMESPACE = NAMESPACE;
