"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = require("@storybook/core-events");

var _reactSyntaxHighlighter = _interopRequireDefault(require("react-syntax-highlighter"));

var _hljs = require("react-syntax-highlighter/dist/esm/styles/hljs");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var pretty = require('pretty');

var styles = {
  markupPanel: {
    margin: 10,
    fontFamily: 'monospace',
    whiteSpace: 'pre',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto'
  }
};

var StaticMarkup = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(StaticMarkup, _React$Component);

  var _super = _createSuper(StaticMarkup);

  function StaticMarkup() {
    var _this;

    (0, _classCallCheck2["default"])(this, StaticMarkup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      markup: ''
    };
    _this.onShowStaticMarkup = _this.onShowStaticMarkup.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(StaticMarkup, [{
    key: "onShowStaticMarkup",
    value: function onShowStaticMarkup(markup) {
      this.setState({
        markup: markup
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          channel = _this$props.channel,
          api = _this$props.api;
      channel.on('evgenykochetkov/static-markup/show-markup', this.onShowStaticMarkup); // Clear the current state on every story change.

      this.stopListeningOnStory = api.on(_coreEvents.STORY_CHANGED, function () {
        _this2.onShowStaticMarkup('');
      });
    }
  }, {
    key: "render",
    value: function render() {
      var markup = this.state.markup; // setting it to true to support past
      // versions of storybook, which might not
      // have active property.

      var _this$props$active = this.props.active,
          active = _this$props$active === void 0 ? true : _this$props$active;
      return active ? /*#__PURE__*/_react["default"].createElement(_reactSyntaxHighlighter["default"], {
        language: "html",
        style: _hljs.docco
      }, pretty(markup)) : null;
    } // This is some cleanup tasks when the StaticMarkup panel is unmounting.

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.stopListeningOnStory) {
        this.stopListeningOnStory();
      }

      this.unmounted = true;
      var _this$props2 = this.props,
          channel = _this$props2.channel,
          api = _this$props2.api;
      channel.removeListener('evgenykochetkov/static-markup/show-markup', this.onShowStaticMarkup);
    }
  }]);
  return StaticMarkup;
}(_react["default"].Component); // Register the addon with a unique name.


_addons["default"].register('evgenykochetkov/static-markup', function (api) {
  // Also need to set a unique name to the panel.
  _addons["default"].addPanel('evgenykochetkov/static-markup/panel', {
    title: 'Static Markup',
    render: function render(_ref) {
      var active = _ref.active;
      return /*#__PURE__*/_react["default"].createElement(StaticMarkup, {
        channel: _addons["default"].getChannel(),
        api: api,
        active: active
      });
    }
  });
});