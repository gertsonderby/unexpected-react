'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactRenderHook = require('react-render-hook');

var _reactRenderHook2 = _interopRequireDefault(_reactRenderHook);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _unexpectedHtmllike = require('unexpected-htmllike');

var _unexpectedHtmllike2 = _interopRequireDefault(_unexpectedHtmllike);

var _unexpectedHtmllikeReactrenderedAdapter = require('unexpected-htmllike-reactrendered-adapter');

var _unexpectedHtmllikeReactrenderedAdapter2 = _interopRequireDefault(_unexpectedHtmllikeReactrenderedAdapter);

var _unexpectedHtmllikeJsxAdapter = require('unexpected-htmllike-jsx-adapter');

var _unexpectedHtmllikeJsxAdapter2 = _interopRequireDefault(_unexpectedHtmllikeJsxAdapter);

function installInto(expect) {

    var renderedReactElementAdapter = new _unexpectedHtmllikeReactrenderedAdapter2['default']({ convertToString: true, concatTextContent: true });
    var htmlLikeRenderedReactElement = (0, _unexpectedHtmllike2['default'])(renderedReactElementAdapter);
    var reactElementAdapter = new _unexpectedHtmllikeJsxAdapter2['default']({ convertToString: true, concatTextContent: true });
    var htmlLikeReactElement = (0, _unexpectedHtmllike2['default'])(reactElementAdapter);

    expect.addType({

        name: 'RenderedReactElement',

        identify: function identify(value) {
            return typeof value === 'object' && value !== null && (value._reactInternalInstance || value._reactInternalComponent) && typeof value.setState === 'function';
        },

        inspect: function inspect(value, depth, output, _inspect) {
            var data = _reactRenderHook2['default'].findComponent(value);
            return htmlLikeRenderedReactElement.inspect(data, depth, output, _inspect);
        }
    });

    expect.addType({
        name: 'RenderedReactElementData',

        identify: function identify(value) {

            return typeof value === 'object' && value !== null && value.element && value.data && value.data.type && value.data.nodeType;
        },

        inspect: function inspect(value, depth, output, _inspect2) {
            return htmlLikeRenderedReactElement.inspect(value, depth, output, _inspect2);
        }
    });

    expect.addType({
        name: 'ReactElement',

        identify: function identify(value) {
            return _react2['default'].isValidElement(value) || typeof value === 'object' && value !== null && (typeof value.type === 'function' || typeof value.type === 'string') && typeof value.hasOwnProperty === 'function' && value.hasOwnProperty('props') && value.hasOwnProperty('ref') && value.hasOwnProperty('key');
        },

        inspect: function inspect(value, depth, output, _inspect3) {

            return htmlLikeReactElement.inspect(value, depth, output, _inspect3);
        }
    });

    expect.addType({

        name: 'ReactModule',

        identify: function identify(value) {

            return typeof value === 'object' && value !== null && typeof value.hasOwnProperty === 'function' && value.hasOwnProperty('createClass') && value.hasOwnProperty('createElement') && value.hasOwnProperty('cloneElement') && value.hasOwnProperty('createFactory') && value.hasOwnProperty('isValidElement') && value.hasOwnProperty('PropTypes');
        },

        inspect: function inspect(value, depth, output) {
            output.text('<<ReactModule>>');
        }

    });

    expect.addType({
        name: 'ReactShallowRenderer',
        base: 'object',
        identify: function identify(value) {
            return typeof value === 'object' && value !== null && typeof value.getRenderOutput === 'function';
        },

        inspect: function inspect(value, depth, output, _inspect4) {
            output.append(_inspect4(value.getRenderOutput()));
        }
    });
}

exports['default'] = { installInto: installInto };
module.exports = exports['default'];
//# sourceMappingURL=types.js.map