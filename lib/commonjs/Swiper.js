"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNative = require("react-native");
var _useSwipeControls = _interopRequireDefault(require("./hooks/useSwipeControls"));
var _SwiperCard = _interopRequireDefault(require("./SwiperCard"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  width: windowWidth,
  height: windowHeight
} = _reactNative.Dimensions.get('screen');
const Swiper = ({
  data,
  renderCard,
  onSwipeRight,
  onSwipeLeft,
  onSwipedAll,
  onSwipeTop,
  cardStyle,
  disableRightSwipe,
  disableLeftSwipe,
  disableTopSwipe,
  translateXRange = [-windowWidth / 3, 0, windowWidth / 3],
  translateYRange = [-windowHeight / 3, 0, windowHeight / 3],
  rotateInputRange = [-windowWidth / 3, 0, windowWidth / 3],
  rotateOutputRange = [-Math.PI / 20, 0, Math.PI / 20],
  inputOverlayLabelRightOpacityRange = [0, windowWidth / 3],
  outputOverlayLabelRightOpacityRange = [0, 1],
  inputOverlayLabelLeftOpacityRange = [0, -(windowWidth / 3)],
  outputOverlayLabelLeftOpacityRange = [0, 1],
  inputOverlayLabelTopOpacityRange = [0, -(windowHeight / 3)],
  outputOverlayLabelTopOpacityRange = [0, 1],
  OverlayLabelRight,
  OverlayLabelLeft,
  OverlayLabelTop,
  onSwipeStart,
  onSwipeActive,
  onSwipeEnd
}, ref) => {
  const {
    activeIndex,
    refs,
    swipeRight,
    swipeLeft,
    swipeBack,
    swipeTop
  } = (0, _useSwipeControls.default)(data);
  (0, _react.useImperativeHandle)(ref, () => {
    return {
      swipeLeft,
      swipeRight,
      swipeBack,
      swipeTop
    };
  }, [swipeLeft, swipeRight, swipeBack, swipeTop]);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return activeIndex.value >= data.length;
  }, isSwipingFinished => {
    if (isSwipingFinished && onSwipedAll) {
      (0, _reactNativeReanimated.runOnJS)(onSwipedAll)();
    }
  }, [data]);
  return data.map((item, index) => {
    return /*#__PURE__*/_react.default.createElement(_SwiperCard.default, {
      key: index,
      cardStyle: cardStyle,
      index: index,
      disableRightSwipe: disableRightSwipe,
      disableLeftSwipe: disableLeftSwipe,
      disableTopSwipe: disableTopSwipe,
      translateXRange: translateXRange,
      translateYRange: translateYRange,
      rotateOutputRange: rotateOutputRange,
      rotateInputRange: rotateInputRange,
      inputOverlayLabelRightOpacityRange: inputOverlayLabelRightOpacityRange,
      outputOverlayLabelRightOpacityRange: outputOverlayLabelRightOpacityRange,
      inputOverlayLabelLeftOpacityRange: inputOverlayLabelLeftOpacityRange,
      outputOverlayLabelLeftOpacityRange: outputOverlayLabelLeftOpacityRange,
      inputOverlayLabelTopOpacityRange: inputOverlayLabelTopOpacityRange,
      outputOverlayLabelTopOpacityRange: outputOverlayLabelTopOpacityRange,
      activeIndex: activeIndex,
      OverlayLabelRight: OverlayLabelRight,
      OverlayLabelLeft: OverlayLabelLeft,
      OverlayLabelTop: OverlayLabelTop,
      ref: refs[index],
      onSwipeRight: cardIndex => {
        onSwipeRight === null || onSwipeRight === void 0 || onSwipeRight(cardIndex);
      },
      onSwipeLeft: cardIndex => {
        onSwipeLeft === null || onSwipeLeft === void 0 || onSwipeLeft(cardIndex);
      },
      onSwipeTop: cardIndex => {
        onSwipeTop === null || onSwipeTop === void 0 || onSwipeTop(cardIndex);
      },
      onSwipeStart: onSwipeStart,
      onSwipeActive: onSwipeActive,
      onSwipeEnd: onSwipeEnd
    }, renderCard(item, index));
  });
};
function fixedForwardRef(render) {
  return /*#__PURE__*/_react.default.forwardRef(render);
}
var _default = exports.default = fixedForwardRef(Swiper);
//# sourceMappingURL=Swiper.js.map