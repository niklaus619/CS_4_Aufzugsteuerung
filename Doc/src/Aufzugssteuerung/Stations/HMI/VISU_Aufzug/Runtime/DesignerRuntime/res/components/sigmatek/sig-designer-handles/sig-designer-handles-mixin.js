export const Handles = (superClass) => {
    return class extends superClass {

        setBox(element, bounds = {}, applyRotation = false) {
            if (element instanceof HTMLElement) {
                const style = {};
                style.top = bounds.top;
                style.left = bounds.left;
                style.height = bounds.height;
                style.width = bounds.width;

                if ((Math.abs(bounds.rotation) !== 0 || Math.abs(bounds.rotation) !== 360) && applyRotation) {
                    style.rotate = `rotate(${bounds.rotation}deg)`;
                } else {
                    style.rotate = '';
                }

                if (bounds.translateX !== 0 || bounds.translateY !== 0) {
                    style.translateX = (bounds.translateX === 0) ? '0' : bounds.translateX;
                    style.translateY = (bounds.translateY === 0) ? '0' : bounds.translateY;
                    style.translate = `translate(${style.translateX}px,${style.translateY}px)`;
                } else {
                    style.translate = '';
                }

                if (style.rotate !== '' || style.translate !== '') {
                    style.transform = `transform: ${style.translate} ${style.rotate};`;
                } else {
                    style.transform = '';
                }
                if (style.transform !== '') {
                    style.transformOrigin = 'transform-origin: center, center';
                } else {
                    style.transformOrigin = '';
                }
                element.style.cssText = `left:${style.left}px; top:${style.top}px; width:${style.width}px; height:${style.height}px; ${style.transform} ${style.transformOrigin};`;
                return element;
            } else {
                log.error('[Handles.setBox} Element is not a valid HTML Element');
            }
        }

        degToRad(deg) {
            return deg * (Math.PI / 180);
        };
        radToDeg(rad) {
            return rad * (180 / Math.PI);
        }

        getRealRotation(rotation = 0) {
            return (rotation % 360 + 360) % 360;
        }
    };
};
