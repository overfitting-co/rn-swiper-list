"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _OverlayLabel = _interopRequireDefault(require("./OverlayLabel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SwipeableCard = /*#__PURE__*/(0, _react.forwardRef)(({
  index,
  activeIndex,
  onSwipeLeft,
  onSwipeRight,
  onSwipeTop,
  cardStyle,
  children,
  disableRightSwipe,
  disableLeftSwipe,
  disableTopSwipe,
  translateXRange,
  translateYRange,
  rotateInputRange,
  rotateOutputRange,
  inputOverlayLabelRightOpacityRange,
  outputOverlayLabelRightOpacityRange,
  inputOverlayLabelLeftOpacityRange,
  outputOverlayLabelLeftOpacityRange,
  inputOverlayLabelTopOpacityRange,
  outputOverlayLabelTopOpacityRange,
  OverlayLabelRight,
  OverlayLabelLeft,
  OverlayLabelTop,
  onSwipeStart,
  onSwipeActive,
  onSwipeEnd
}, ref) => {
  const translateX = (0, _reactNativeReanimated.useSharedValue)(0);
  const translateY = (0, _reactNativeReanimated.useSharedValue)(0);
  const currentActiveIndex = (0, _reactNativeReanimated.useSharedValue)(Math.floor(activeIndex.value));
  const nextActiveIndex = (0, _reactNativeReanimated.useSharedValue)(Math.floor(activeIndex.value));
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  const maxCardTranslation = width * 1.5;
  const maxCardTranslationY = height * 1.5;
  const swipeRight = (0, _react.useCallback)(() => {
    onSwipeRight === null || onSwipeRight === void 0 || onSwipeRight(index);
    translateX.value = (0, _reactNativeReanimated.withSpring)(maxCardTranslation);
    activeIndex.value++;
  }, [index, activeIndex, maxCardTranslation, onSwipeRight, translateX]);
  const swipeLeft = (0, _react.useCallback)(() => {
    onSwipeLeft === null || onSwipeLeft === void 0 || onSwipeLeft(index);
    translateX.value = (0, _reactNativeReanimated.withSpring)(-maxCardTranslation);
    activeIndex.value++;
  }, [index, activeIndex, maxCardTranslation, onSwipeLeft, translateX]);
  const swipeTop = (0, _react.useCallback)(() => {
    onSwipeTop === null || onSwipeTop === void 0 || onSwipeTop(index);
    translateY.value = (0, _reactNativeReanimated.withSpring)(-maxCardTranslationY);
    activeIndex.value++;
  }, [index, activeIndex, maxCardTranslationY, onSwipeTop, translateY]);
  const swipeBack = (0, _react.useCallback)(() => {
    (0, _reactNativeReanimated.cancelAnimation)(translateX);
    (0, _reactNativeReanimated.cancelAnimation)(translateY);
    translateX.value = (0, _reactNativeReanimated.withSpring)(0);
    translateY.value = (0, _reactNativeReanimated.withSpring)(0);
  }, [translateX, translateY]);
  (0, _react.useImperativeHandle)(ref, () => {
    return {
      swipeLeft,
      swipeRight,
      swipeBack,
      swipeTop
    };
  }, [swipeLeft, swipeRight, swipeBack, swipeTop]);
  const inputRangeX = _react.default.useMemo(() => {
    return translateXRange ?? [];
  }, [translateXRange]);
  const inputRangeY = _react.default.useMemo(() => {
    return translateYRange ?? [];
  }, [translateYRange]);
  const rotateX = (0, _reactNativeReanimated.useDerivedValue)(() => {
    return (0, _reactNativeReanimated.interpolate)(translateX.value, rotateInputRange ?? [], rotateOutputRange ?? [], 'clamp');
  }, [inputRangeX]);
  const gesture = _reactNativeGestureHandler.Gesture.Pan().onBegin(() => {
    currentActiveIndex.value = Math.floor(activeIndex.value);
    if (onSwipeStart) (0, _reactNativeReanimated.runOnJS)(onSwipeStart)();
  }).onUpdate(event => {
    if (currentActiveIndex.value !== index) return;
    if (onSwipeActive) (0, _reactNativeReanimated.runOnJS)(onSwipeActive)();
    translateX.value = event.translationX;
    if (!disableTopSwipe) {
      translateY.value = event.translationY;
    }
    if (height / 3 < Math.abs(event.translationY)) {
      nextActiveIndex.value = (0, _reactNativeReanimated.interpolate)(translateY.value, inputRangeY, [currentActiveIndex.value + 1, currentActiveIndex.value, currentActiveIndex.value + 1], 'clamp');
      return;
    }
    nextActiveIndex.value = (0, _reactNativeReanimated.interpolate)(translateX.value, inputRangeX, [currentActiveIndex.value + 1, currentActiveIndex.value, currentActiveIndex.value + 1], 'clamp');
  }).onFinalize(event => {
    if (currentActiveIndex.value !== index) return;
    if (onSwipeEnd) (0, _reactNativeReanimated.runOnJS)(onSwipeEnd)();
    if (nextActiveIndex.value === activeIndex.value + 1) {
      const sign = Math.sign(event.translationX);
      const signPositionY = Number.isInteger((0, _reactNativeReanimated.interpolate)(translateY.value, inputRangeY, [currentActiveIndex.value + 1, currentActiveIndex.value, currentActiveIndex.value + 1], 'clamp'));
      if (signPositionY && !disableTopSwipe) {
        (0, _reactNativeReanimated.runOnJS)(swipeTop)();
        return;
      }
      if (!signPositionY || disableTopSwipe) {
        if (sign === 1 && !disableRightSwipe) {
          (0, _reactNativeReanimated.runOnJS)(swipeRight)();
          return;
        }
        if (sign === -1 && !disableLeftSwipe) {
          (0, _reactNativeReanimated.runOnJS)(swipeLeft)();
          return;
        }
      }
    }
    translateX.value = (0, _reactNativeReanimated.withSpring)(0);
    translateY.value = (0, _reactNativeReanimated.withSpring)(0);
  });
  const rCardStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const opacity = (0, _reactNativeReanimated.withTiming)(index - activeIndex.value < 5 ? 1 : 0);
    const scale = (0, _reactNativeReanimated.withTiming)(1 - 0.07 * (index - activeIndex.value));
    return {
      opacity,
      position: 'absolute',
      zIndex: -index,
      transform: [{
        rotate: `${rotateX.value}rad`
      }, {
        scale: scale
      }, {
        translateX: translateX.value
      }, {
        translateY: translateY.value
      }]
    };
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
    gesture: gesture
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [cardStyle, rCardStyle]
  }, OverlayLabelLeft && /*#__PURE__*/_react.default.createElement(_OverlayLabel.default, {
    inputRange: inputOverlayLabelLeftOpacityRange,
    outputRange: outputOverlayLabelLeftOpacityRange,
    Component: OverlayLabelLeft,
    opacityValue: translateX
  }), OverlayLabelRight && /*#__PURE__*/_react.default.createElement(_OverlayLabel.default, {
    inputRange: inputOverlayLabelRightOpacityRange,
    outputRange: outputOverlayLabelRightOpacityRange,
    Component: OverlayLabelRight,
    opacityValue: translateX
  }), OverlayLabelTop && /*#__PURE__*/_react.default.createElement(_OverlayLabel.default, {
    inputRange: inputOverlayLabelTopOpacityRange,
    outputRange: outputOverlayLabelTopOpacityRange,
    Component: OverlayLabelTop,
    opacityValue: translateY
  }), children));
});
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(SwipeableCard);
//# sourceMappingURL=index.js.map