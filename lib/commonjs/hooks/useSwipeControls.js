"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
const useSwipeControls = data => {
  const activeIndex = (0, _reactNativeReanimated.useSharedValue)(0);
  const refs = (0, _react.useMemo)(() => {
    let cardRefs = [];
    for (let i = 0; i < data.length; i++) {
      cardRefs.push( /*#__PURE__*/(0, _react.createRef)());
    }
    return cardRefs;
  }, [data]);
  const swipeRight = (0, _react.useCallback)(() => {
    var _refs$activeIndex$val;
    if (!refs[activeIndex.value]) {
      return;
    }
    (_refs$activeIndex$val = refs[activeIndex.value]) === null || _refs$activeIndex$val === void 0 || (_refs$activeIndex$val = _refs$activeIndex$val.current) === null || _refs$activeIndex$val === void 0 || _refs$activeIndex$val.swipeRight();
  }, [activeIndex.value, refs]);
  const swipeTop = (0, _react.useCallback)(() => {
    var _refs$activeIndex$val2;
    if (!refs[activeIndex.value]) {
      return;
    }
    (_refs$activeIndex$val2 = refs[activeIndex.value]) === null || _refs$activeIndex$val2 === void 0 || (_refs$activeIndex$val2 = _refs$activeIndex$val2.current) === null || _refs$activeIndex$val2 === void 0 || _refs$activeIndex$val2.swipeTop();
  }, [activeIndex.value, refs]);
  const swipeLeft = (0, _react.useCallback)(() => {
    var _refs$activeIndex$val3;
    if (!refs[activeIndex.value]) {
      return;
    }
    (_refs$activeIndex$val3 = refs[activeIndex.value]) === null || _refs$activeIndex$val3 === void 0 || (_refs$activeIndex$val3 = _refs$activeIndex$val3.current) === null || _refs$activeIndex$val3 === void 0 || _refs$activeIndex$val3.swipeLeft();
  }, [activeIndex.value, refs]);
  const swipeBack = (0, _react.useCallback)(() => {
    var _refs;
    if (!refs[activeIndex.value - 1]) {
      return;
    }
    (_refs = refs[activeIndex.value - 1]) === null || _refs === void 0 || (_refs = _refs.current) === null || _refs === void 0 || _refs.swipeBack();
    activeIndex.value--;
  }, [activeIndex.value, refs]);
  return {
    activeIndex,
    refs,
    swipeRight,
    swipeLeft,
    swipeBack,
    swipeTop
  };
};
var _default = exports.default = useSwipeControls;
//# sourceMappingURL=useSwipeControls.js.map