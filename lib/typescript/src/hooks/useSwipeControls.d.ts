import { type RefObject } from 'react';
import type { SwiperCardRefType } from 'rn-swiper-list';
declare const useSwipeControls: <T>(data: T[]) => {
    activeIndex: import("react-native-reanimated").SharedValue<number>;
    refs: RefObject<SwiperCardRefType>[];
    swipeRight: () => void;
    swipeLeft: () => void;
    swipeBack: () => void;
    swipeTop: () => void;
};
export default useSwipeControls;
//# sourceMappingURL=useSwipeControls.d.ts.map