import React, { useImperativeHandle } from 'react';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import useSwipeControls from './hooks/useSwipeControls';
import SwiperCard from './SwiperCard';
const {
  width: windowWidth,
  height: windowHeight
} = Dimensions.get('screen');
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
  } = useSwipeControls(data);
  useImperativeHandle(ref, () => {
    return {
      swipeLeft,
      swipeRight,
      swipeBack,
      swipeTop
    };
  }, [swipeLeft, swipeRight, swipeBack, swipeTop]);
  useAnimatedReaction(() => {
    return activeIndex.value >= data.length;
  }, isSwipingFinished => {
    if (isSwipingFinished && onSwipedAll) {
      runOnJS(onSwipedAll)();
    }
  }, [data]);
  return data.map((item, index) => {
    return /*#__PURE__*/React.createElement(SwiperCard, {
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
  return /*#__PURE__*/React.forwardRef(render);
}
export default fixedForwardRef(Swiper);
//# sourceMappingURL=Swiper.js.map