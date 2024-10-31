document.addEventListener( 'DOMContentLoaded', function() {
  let isiPad = isIPADDevice();
  if ( 'Not iPad' !== isiPad ) { return; }
  function isIPADDevice() {
    const canvas = document.createElement("canvas");

    if ( canvas ) {
      const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if ( context ) {
        const info = context.getExtension("WEBGL_debug_renderer_info");

        if ( info ) {
          let renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
        }
      }
    }

    if ( window.screen.height / window.screen.width === 1024 / 768 ) {
      if ( window.devicePixelRatio === 1 ) {
        switch(renderer) {
          default:
            return "iPad, iPad 2, iPad Mini";
          case "PowerVR SGX 535":
            return "iPad"
          case "PowerVR SGX 543":
            return "iPad 2 or Mini";
        }
      } else {
        switch(renderer) {
          default:
            return "iPad 3, 4, 5, Mini 2, Mini 3, Mini 4, Air, Air 2";
          case "PowerVR SGX 543":
            return "iPad 3";
          case "PowerVR SGX 554":
            return "iPad 4";
          case "Apple A7 GPU":
            return "iPad Air, Mini 2, Mini 3";
          case "Apple A8X GPU":
            return "iPad Air 2";
          case "Apple A8 GPU":
            return "iPad Mini 4";
          case "Apple A9 GPU":
            return "iPad 5, Pro 9.7";
        }
      }
    } else if (window.screen.height / window.screen.width === 1112 / 834) {
      return "iPad Pro 10.5";
    } else if (window.screen.height / window.screen.width === 1366 / 1024) {
      switch(renderer) {
        default:
          return "iPad Pro 12.9, Pro 12.9 (2nd Gen)";
        case "Apple A10X GPU":
          return "iPad Pro 12.9 (2nd Gen)";
        case "Apple A9 GPU":
          return "iPad Pro 12.9";
      }
    } else if (window.screen.height / window.screen.width === 2048 / 1536) {
      if ( renderer === 'Apple GPU' ) {
        return 'iPad pro';
      } else {
        return "Not iPad";
      }
    } else if (window.screen.height / window.screen.width === 2224 / 1668) {
      if ( renderer === 'Apple GPU' ) {
        return 'iPad pro';
      } else {
        return "Not iPad";
      }
    } else if (window.screen.height / window.screen.width === 2732 / 2048) {
      if ( renderer === 'Apple GPU' ) {
        return 'iPad pro';
      } else {
        return 'Not iPad';
      }
    } else if (window.screen.height / window.screen.width === 1194 / 834) {
      if ( renderer === 'Apple GPU' ) {
        return 'iPad pro';
      } else {
        return 'Not iPad';
      }
    } else {
      return 'Not iPad';
    }
  }

  if ( wpcsbData === null) { return; }

  if ( document.getElementsByClassName( 'wpcsb' ).length === 0 ) { return; }
  function mdpBooleanSwitch( switchValue ) {
    return switchValue === 'on';
  }
  const mdpWrappers = document.getElementsByClassName( 'wpcsb' );
  const wpcsbSettings = {
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel'],
    minScrollbarLength: wpcsbData.minBarLength,
    maxScrollbarLength: wpcsbData.maxBarLength,
    scrollingThreshold: 1000,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: false,
    suppressScrollY: false,
    swipeEasing: true,
    useBothWheelAxes: false,
    wheelPropagation: mdpBooleanSwitch( true ),
    wheelSpeed: wpcsbData.wheelSpeed,
    windowScrollBar: true
  };

  for ( let i = 0; i < mdpWrappers.length; i++ ) {
    if ( document.getElementById( 'wpcsbScrollbar' ) !== null ) {
      const smootherWheel = new CustomEvent( 'wheel', { detail: { deltaY: 0 } } );
      document.getElementById( 'wpcsbScrollbar' ).dispatchEvent( smootherWheel );
    }

    let singleScroller;
    singleScroller = new PerfectScrollbar( mdpWrappers[ i ], wpcsbSettings );

  }


  if ( document.getElementById( 'wpcsbScrollbar' ) !== null ) {
    let scrollerBody = document.getElementById( 'wpcsbScrollbar' );
    if ( sessionStorage.getItem( 'mdpScrollerScrollTop' ) ) {
      let prevUrl = sessionStorage.getItem( 'mdpScrollerURL' );
      if ( prevUrl === window.location.href ) {

        scrollerBody.scrollTop = parseInt( sessionStorage.getItem( 'mdpScrollerScrollTop' ) );

      } else {
        sessionStorage.setItem( 'mdpScrollerScrollTop', scrollerBody.scrollTop.toString() );
        sessionStorage.setItem( 'mdpScrollerURL', window.location.href );

      }

    } else { // First time loading
      sessionStorage.setItem( 'mdpScrollerScrollTop', scrollerBody.scrollTop.toString() );
      sessionStorage.setItem( 'mdpScrollerURL', window.location.href );

    }
    document.getElementById( 'wpcsbScrollbar' ).addEventListener('scroll', () => {

      sessionStorage.setItem( 'mdpScrollerScrollTop', scrollerBody.scrollTop.toString() );
      sessionStorage.setItem( 'mdpScrollerURL', window.location.href );

    }, { passive: true } );

  }

} );
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
          (global.PerfectScrollbar = factory());
}(this, (function () { 'use strict';

  function get(element) {
    return getComputedStyle(element);
  }

  function set(element, obj) {
    for (let key in obj) {
      let val = obj[key];
      if (typeof val === 'number') {
        val = val + "px";
      }
      element.style[key] = val;
    }
    return element;
  }

  function div(className) {
    const div = document.createElement('div');
    div.className = className;
    return div;
  }

  const elMatches =
      typeof Element !== 'undefined' &&
      (Element.prototype.matches ||
          Element.prototype.webkitMatchesSelector ||
          Element.prototype.mozMatchesSelector ||
          Element.prototype.msMatchesSelector);

  function matches(element, query) {
    if (!elMatches) {
      throw new Error('No element matching method supported');
    }

    return elMatches.call(element, query);
  }

  function remove(element) {
    if (element.remove) {
      element.remove();
    } else {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }

  function queryChildren(element, selector) {
    return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
    );
  }

  const cls = {
    main: 'ps',
    element: {
      thumb: function (x) {
        return ("ps__thumb-" + x);
      },
      rail: function (x) {
        return ("ps__rail-" + x);
      },
      consuming: 'ps__child--consume',
    },
    state: {
      focus: 'ps--focus',
      clicking: 'ps--clicking',
      active: function (x) {
        return ("ps--active-" + x);
      },
      scrolling: function (x) {
        return ("ps--scrolling-" + x);
      },
    },
  };
  const scrollingClassTimeout = {x: null, y: null};

  function addScrollingClass(i, x) {
    const classList = i.element.classList;
    const className = cls.state.scrolling(x);

    if (classList.contains(className)) {
      clearTimeout(scrollingClassTimeout[x]);
    } else {
      classList.add(className);
    }
  }

  function removeScrollingClass(i, x) {
    scrollingClassTimeout[x] = setTimeout(
        function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
        i.settings.scrollingThreshold
    );
  }

  function setScrollingClassInstantly(i, x) {
    addScrollingClass(i, x);
    removeScrollingClass(i, x);
  }

  const EventElement = function EventElement(element) {
    this.element = element;
    this.handlers = {};
  };

  const prototypeAccessors = {isEmpty: {configurable: true}};

  EventElement.prototype.bind = function bind (eventName, handler) {
    if (typeof this.handlers[eventName] === 'undefined') {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
    this.element.addEventListener( eventName, handler, { passive: true } );
  };

  EventElement.prototype.unbind = function unbind (eventName, target) {
    const this$1 = this;

    this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
      if (target && handler !== target) {
        return true;
      }
      this$1.element.removeEventListener(eventName, handler, false);
      return false;
    });
  };

  EventElement.prototype.unbindAll = function unbindAll () {
    const this$1 = this;

    for (let name in this$1.handlers) {
      this$1.unbind(name);
    }
  };

  prototypeAccessors.isEmpty.get = function () {
    const this$1 = this;

    return Object.keys(this.handlers).every(
        function (key) { return this$1.handlers[key].length === 0; }
    );
  };

  Object.defineProperties( EventElement.prototype, prototypeAccessors );

  const EventManager = function EventManager() {
    this.eventElements = [];
  };

  EventManager.prototype.eventElement = function eventElement (element) {
    let ee = this.eventElements.filter(function (ee) {
      return ee.element === element;
    })[0];
    if (!ee) {
      ee = new EventElement(element);
      this.eventElements.push(ee);
    }
    return ee;
  };

  EventManager.prototype.bind = function bind (element, eventName, handler) {
    this.eventElement(element).bind(eventName, handler);
  };

  EventManager.prototype.unbind = function unbind (element, eventName, handler) {
    const ee = this.eventElement(element);
    ee.unbind(eventName, handler);

    if (ee.isEmpty) {
      this.eventElements.splice(this.eventElements.indexOf(ee), 1);
    }
  };

  EventManager.prototype.unbindAll = function unbindAll () {
    this.eventElements.forEach(function (e) { return e.unbindAll(); });
    this.eventElements = [];
  };

  EventManager.prototype.once = function once (element, eventName, handler) {
    const ee = this.eventElement(element);
    const onceHandler = function (evt) {
      ee.unbind(eventName, onceHandler);
      handler(evt);
    };
    ee.bind(eventName, onceHandler);
  };

  function createEvent(name) {
    if (typeof window.CustomEvent === 'function') {
      return new CustomEvent(name);
    } else {
      const evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(name, false, false, undefined);
      return evt;
    }
  }

  const processScrollDiff = function (
      i,
      axis,
      diff,
      useScrollingClass,
      forceFireReachEvent
  ) {
    if (useScrollingClass === void 0) useScrollingClass = true;
    if (forceFireReachEvent === void 0) forceFireReachEvent = false;

    let fields;
    if (axis === 'top') {
      fields = [
        'contentHeight',
        'containerHeight',
        'scrollTop',
        'y',
        'up',
        'down'];
    } else if (axis === 'left') {
      fields = [
        'contentWidth',
        'containerWidth',
        'scrollLeft',
        'x',
        'left',
        'right'];
    } else {
      throw new Error('A proper axis should be provided');
    }

    processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
  };

  function processScrollDiff$1(
      i,
      diff,
      ref,
      useScrollingClass,
      forceFireReachEvent
  ) {
    const contentHeight = ref[0];
    const containerHeight = ref[1];
    const scrollTop = ref[2];
    const y = ref[3];
    const up = ref[4];
    const down = ref[5];
    if ( useScrollingClass === void 0 ) useScrollingClass = true;
    if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

    const element = i.element;
    i.reach[y] = null;
    if (element[scrollTop] < 1) {
      i.reach[y] = 'start';
    }
    if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
      i.reach[y] = 'end';
    }

    if (diff) {
      element.dispatchEvent(createEvent(("ps-scroll-" + y)));

      if (diff < 0) {
        element.dispatchEvent(createEvent(("ps-scroll-" + up)));
      } else if (diff > 0) {
        element.dispatchEvent(createEvent(("ps-scroll-" + down)));
      }

      if (useScrollingClass) {
        setScrollingClassInstantly(i, y);
      }
    }

    if (i.reach[y] && (diff || forceFireReachEvent)) {
      element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
    }
  }

  function toInt(x) {
    return parseInt(x, 10) || 0;
  }

  function isEditable(el) {
    return (
        matches(el, 'input,[contenteditable]') ||
        matches(el, 'select,[contenteditable]') ||
        matches(el, 'textarea,[contenteditable]') ||
        matches(el, 'button,[contenteditable]')
    );
  }

  function outerWidth(element) {
    const styles = get(element);
    return (
        toInt(styles.width) +
        toInt(styles.paddingLeft) +
        toInt(styles.paddingRight) +
        toInt(styles.borderLeftWidth) +
        toInt(styles.borderRightWidth)
    );
  }

  const env = {
    isWebKit:
        typeof document !== 'undefined' &&
        'WebkitAppearance' in document.documentElement.style,
    supportsTouch:
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)),
    supportsIePointer:
        typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
    isChrome:
        typeof navigator !== 'undefined' &&
        /Chrome/i.test(navigator && navigator.userAgent),
  };

  const updateGeometry = function (i) {
    const element = i.element;
    const roundedScrollTop = Math.floor(element.scrollTop);
    const rect = element.getBoundingClientRect();

    i.containerWidth = Math.ceil(rect.width);
    i.containerHeight = Math.ceil(rect.height);
    i.contentWidth = element.scrollWidth;
    i.contentHeight = element.scrollHeight;

    if (!element.contains(i.scrollbarXRail)) {
      queryChildren(element, cls.element.rail('x')).forEach(function (el) {
            return remove(el);
          }
      );
      element.appendChild(i.scrollbarXRail);
    }
    if (!element.contains(i.scrollbarYRail)) {
      queryChildren(element, cls.element.rail('y')).forEach(function (el) {
            return remove(el);
          }
      );
      element.appendChild(i.scrollbarYRail);
    }

    if (
        !i.settings.suppressScrollX &&
        i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
    ) {
      i.scrollbarXActive = true;
      i.railXWidth = i.containerWidth - i.railXMarginWidth;
      i.railXRatio = i.containerWidth / i.railXWidth;
      i.scrollbarXWidth = getThumbSize(
          i,
          toInt(i.railXWidth * i.containerWidth / i.contentWidth)
      );
      i.scrollbarXLeft = toInt(
          (i.negativeScrollAdjustment + element.scrollLeft) *
          (i.railXWidth - i.scrollbarXWidth) /
          (i.contentWidth - i.containerWidth)
      );
    } else {
      i.scrollbarXActive = false;
    }

    if (
        !i.settings.suppressScrollY &&
        i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
    ) {
      i.scrollbarYActive = true;
      i.railYHeight = i.containerHeight - i.railYMarginHeight;
      i.railYRatio = i.containerHeight / i.railYHeight;
      i.scrollbarYHeight = getThumbSize(
          i,
          toInt(i.railYHeight * i.containerHeight / i.contentHeight)
      );
      i.scrollbarYTop = toInt(
          roundedScrollTop *
          (i.railYHeight - i.scrollbarYHeight) /
          (i.contentHeight - i.containerHeight)
      );
    } else {
      i.scrollbarYActive = false;
    }

    if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
      i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
    }
    if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
      i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
    }

    updateCss(element, i);

    if (i.scrollbarXActive) {
      element.classList.add(cls.state.active('x'));
    } else {
      element.classList.remove(cls.state.active('x'));
      i.scrollbarXWidth = 0;
      i.scrollbarXLeft = 0;
      element.scrollLeft = 0;
    }
    if (i.scrollbarYActive) {
      element.classList.add(cls.state.active('y'));
    } else {
      element.classList.remove(cls.state.active('y'));
      i.scrollbarYHeight = 0;
      i.scrollbarYTop = 0;
      element.scrollTop = 0;
    }
  };

  function getThumbSize(i, thumbSize) {
    if (i.settings.minScrollbarLength) {
      thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
    }
    if (i.settings.maxScrollbarLength) {
      thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
    }
    return thumbSize;
  }

  function updateCss(element, i) {
    const xRailOffset = {width: i.railXWidth};
    const roundedScrollTop = Math.floor(element.scrollTop);

    if (i.isRtl) {
      xRailOffset.left =
          i.negativeScrollAdjustment +
          element.scrollLeft +
          i.containerWidth -
          i.contentWidth;
    } else {
      xRailOffset.left = element.scrollLeft;
    }
    if (i.isScrollbarXUsingBottom) {
      xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
    } else {
      xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
    }
    set(i.scrollbarXRail, xRailOffset);

    const yRailOffset = {top: roundedScrollTop, height: i.railYHeight};
    if (i.isScrollbarYUsingRight) {
      if (i.isRtl) {
        yRailOffset.right =
            i.contentWidth -
            (i.negativeScrollAdjustment + element.scrollLeft) -
            i.scrollbarYRight -
            i.scrollbarYOuterWidth;
      } else {
        yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
      }
    } else {
      if (i.isRtl) {
        yRailOffset.left =
            i.negativeScrollAdjustment +
            element.scrollLeft +
            i.containerWidth * 2 -
            i.contentWidth -
            i.scrollbarYLeft -
            i.scrollbarYOuterWidth;
      } else {
        yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
      }
    }
    set(i.scrollbarYRail, yRailOffset);

    set(i.scrollbarX, {
      left: i.scrollbarXLeft,
      width: i.scrollbarXWidth - i.railBorderXWidth,
    });
    set(i.scrollbarY, {
      top: i.scrollbarYTop,
      height: i.scrollbarYHeight - i.railBorderYWidth,
    });
  }

  const clickRail = function (i) {
    i.event.bind(i.scrollbarY, 'mousedown', function (e) {
      return e.stopPropagation();
    });
    i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
      const positionTop =
          e.pageY -
          window.pageYOffset -
          i.scrollbarYRail.getBoundingClientRect().top;
      const direction = positionTop > i.scrollbarYTop ? 1 : -1;

      i.element.scrollTop += direction * i.containerHeight;
      updateGeometry(i);

      e.stopPropagation();
    });

    i.event.bind(i.scrollbarX, 'mousedown', function (e) {
      return e.stopPropagation();
    });
    i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
      const positionLeft =
          e.pageX -
          window.pageXOffset -
          i.scrollbarXRail.getBoundingClientRect().left;
      const direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

      i.element.scrollLeft += direction * i.containerWidth;
      updateGeometry(i);

      e.stopPropagation();
    });
  };

  const dragThumb = function (i) {
    bindMouseScrollHandler(i, [
      'containerWidth',
      'contentWidth',
      'pageX',
      'railXWidth',
      'scrollbarX',
      'scrollbarXWidth',
      'scrollLeft',
      'x',
      'scrollbarXRail']);
    bindMouseScrollHandler(i, [
      'containerHeight',
      'contentHeight',
      'pageY',
      'railYHeight',
      'scrollbarY',
      'scrollbarYHeight',
      'scrollTop',
      'y',
      'scrollbarYRail']);
  };

  function bindMouseScrollHandler(
      i,
      ref
  ) {
    const containerHeight = ref[0];
    const contentHeight = ref[1];
    const pageY = ref[2];
    const railYHeight = ref[3];
    const scrollbarY = ref[4];
    const scrollbarYHeight = ref[5];
    const scrollTop = ref[6];
    const y = ref[7];
    const scrollbarYRail = ref[8];

    const element = i.element;

    let startingScrollTop = null;
    let startingMousePageY = null;
    let scrollBy = null;

    function mouseMoveHandler(e) {
      element[scrollTop] =
          startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
      addScrollingClass(i, y);
      updateGeometry(i);

      e.stopPropagation();
    }

    function mouseUpHandler() {
      removeScrollingClass(i, y);
      i[scrollbarYRail].classList.remove(cls.state.clicking);
      i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    }

    i.event.bind(i[scrollbarY], 'mousedown', function (e) {
      startingScrollTop = element[scrollTop];
      startingMousePageY = e[pageY];
      scrollBy =
          (i[contentHeight] - i[containerHeight]) /
          (i[railYHeight] - i[scrollbarYHeight]);

      i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
      i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

      i[scrollbarYRail].classList.add(cls.state.clicking);

      e.stopPropagation();
    });
  }

  const keyboard = function (i) {
    const element = i.element;

    const elementHovered = function () {
      return matches(element, ':hover');
    };
    const scrollbarFocused = function () {
      return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus');
    };

    function shouldPreventDefault(deltaX, deltaY) {
      const scrollTop = Math.floor(element.scrollTop);
      if (deltaX === 0) {
        if (!i.scrollbarYActive) {
          return false;
        }
        if (
            (scrollTop === 0 && deltaY > 0) ||
            (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
        ) {
          return !i.settings.wheelPropagation;
        }
      }

      const scrollLeft = element.scrollLeft;
      if (deltaY === 0) {
        if (!i.scrollbarXActive) {
          return false;
        }
        if (
            (scrollLeft === 0 && deltaX < 0) ||
            (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
        ) {
          return !i.settings.wheelPropagation;
        }
      }
      return true;
    }

    i.event.bind(i.ownerDocument, 'keydown', function (e) {
      if (
          (e.isDefaultPrevented && e.isDefaultPrevented()) ||
          e.defaultPrevented
      ) {
        return;
      }

      if (!elementHovered() && !scrollbarFocused()) {
        return;
      }

      let activeElement = document.activeElement
          ? document.activeElement
          : i.ownerDocument.activeElement;
      if (activeElement) {
        if (activeElement.tagName === 'IFRAME') {
          activeElement = activeElement.contentDocument.activeElement;
        } else {
          while (activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
          }
        }
        if (isEditable(activeElement)) {
          return;
        }
      }

      let deltaX = 0;
      let deltaY = 0;

      switch (e.which) {
        case 37: // left
          if (e.metaKey) {
            deltaX = -i.contentWidth;
          } else if (e.altKey) {
            deltaX = -i.containerWidth;
          } else {
            deltaX = -30;
          }
          break;
        case 38: // up
          if (e.metaKey) {
            deltaY = i.contentHeight;
          } else if (e.altKey) {
            deltaY = i.containerHeight;
          } else {
            deltaY = 30;
          }
          break;
        case 39: // right
          if (e.metaKey) {
            deltaX = i.contentWidth;
          } else if (e.altKey) {
            deltaX = i.containerWidth;
          } else {
            deltaX = 30;
          }
          break;
        case 40: // down
          if (e.metaKey) {
            deltaY = -i.contentHeight;
          } else if (e.altKey) {
            deltaY = -i.containerHeight;
          } else {
            deltaY = -30;
          }
          break;
        case 32: // space bar
          if (e.shiftKey) {
            deltaY = i.containerHeight;
          } else {
            deltaY = -i.containerHeight;
          }
          break;
        case 33: // page up
          deltaY = i.containerHeight;
          break;
        case 34: // page down
          deltaY = -i.containerHeight;
          break;
        case 36: // home
          deltaY = i.contentHeight;
          break;
        case 35: // end
          deltaY = -i.contentHeight;
          break;
        default:
          return;
      }

      if (i.settings.suppressScrollX && deltaX !== 0) {
        return;
      }
      if (i.settings.suppressScrollY && deltaY !== 0) {
        return;
      }

      element.scrollTop -= deltaY;
      element.scrollLeft += deltaX;
      updateGeometry(i);

      if (shouldPreventDefault(deltaX, deltaY)) {
        e.preventDefault();
      }
    });
  };

  const wheel = function (i) {
    const element = i.element;

    function shouldPreventDefault(deltaX, deltaY) {
      const roundedScrollTop = Math.floor(element.scrollTop);
      const isTop = element.scrollTop === 0;
      const isBottom =
          roundedScrollTop + element.offsetHeight === element.scrollHeight;
      const isLeft = element.scrollLeft === 0;
      const isRight =
          element.scrollLeft + element.offsetWidth === element.scrollWidth;

      let hitsBound;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        hitsBound = isTop || isBottom;
      } else {
        hitsBound = isLeft || isRight;
      }

      return hitsBound ? !i.settings.wheelPropagation : true;
    }

    function getDeltaFromEvent(e) {
      let deltaX = e.deltaX;
      let deltaY = -1 * e.deltaY;

      if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
        deltaX = -1 * e.wheelDeltaX / 6;
        deltaY = e.wheelDeltaY / 6;
      }

      if (e.deltaMode && e.deltaMode === 1) {
        deltaX *= 10;
        deltaY *= 10;
      }

      if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
        deltaX = 0;
        deltaY = e.wheelDelta;
      }

      if (e.shiftKey) {
        return [-deltaY, -deltaX];
      }
      return [deltaX, deltaY];
    }

    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      if (!env.isWebKit && element.querySelector('select:focus')) {
        return true;
      }

      if (!element.contains(target)) {
        return false;
      }

      let cursor = target;

      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }

        const style = get(cursor);
        const overflow = [style.overflow, style.overflowX, style.overflowY].join(
            ''
        );
        if (overflow.match(/(scroll|auto)/)) {
          const maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (
                !(cursor.scrollTop === 0 && deltaY > 0) &&
                !(cursor.scrollTop === maxScrollTop && deltaY < 0)
            ) {
              return true;
            }
          }
          const maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (
                !(cursor.scrollLeft === 0 && deltaX < 0) &&
                !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
            ) {
              return true;
            }
          }
        }

        cursor = cursor.parentNode;
      }

      return false;
    }

    function mousewheelHandler(e) {
      const ref = getDeltaFromEvent(e);
      const deltaX = ref[0];
      const deltaY = ref[1];

      if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
        return;
      }

      let shouldPrevent = false;
      if (!i.settings.useBothWheelAxes) {
        // only be used for vertical scrolling - this is the default
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else if (i.scrollbarYActive && !i.scrollbarXActive) {
        // active, so let's scroll vertical bar using both mouse wheel axes
        if (deltaY) {
          element.scrollTop -= deltaY * i.settings.wheelSpeed;
        } else {
          element.scrollTop += deltaX * i.settings.wheelSpeed;
        }
        shouldPrevent = true;
      } else if (i.scrollbarXActive && !i.scrollbarYActive) {
        // wheel axes for horizontal bar
        if (deltaX) {
          element.scrollLeft += deltaX * i.settings.wheelSpeed;
        } else {
          element.scrollLeft -= deltaY * i.settings.wheelSpeed;
        }
        shouldPrevent = true;
      }

      updateGeometry(i);

      shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
      if (shouldPrevent && !e.ctrlKey) {
        e.stopPropagation();
      }
    }

    if (typeof window.onwheel !== 'undefined') {
      i.event.bind(element, 'wheel', mousewheelHandler);
    } else if (typeof window.onmousewheel !== 'undefined') {
      i.event.bind(element, 'mousewheel', mousewheelHandler);
    }
  };

  const touch = function (i) {
    if (!env.supportsTouch && !env.supportsIePointer) {
      return;
    }

    const element = i.element;

    function shouldPrevent(deltaX, deltaY) {
      const scrollTop = Math.floor(element.scrollTop);
      const scrollLeft = element.scrollLeft;
      const magnitudeX = Math.abs(deltaX);
      const magnitudeY = Math.abs(deltaY);

      if (magnitudeY > magnitudeX) {

        if (
            (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
            (deltaY > 0 && scrollTop === 0)
        ) {
          return window.scrollY === 0 && deltaY > 0 && env.isChrome;
        }
      } else if (magnitudeX > magnitudeY) {

        if (
            (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
            (deltaX > 0 && scrollLeft === 0)
        ) {
          return true;
        }
      }

      return true;
    }

    function applyTouchMove(differenceX, differenceY) {
      element.scrollTop -= differenceY;
      element.scrollLeft -= differenceX;

      updateGeometry(i);
    }

    let startOffset = {};
    let startTime = 0;
    const speed = {};
    let easingLoop = null;

    function getTouch(e) {
      if (e.targetTouches) {
        return e.targetTouches[0];
      } else {
        return e;
      }
    }

    function shouldHandle(e) {
      if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
        return false;
      }
      if (e.targetTouches && e.targetTouches.length === 1) {
        return true;
      }
      return !!(e.pointerType &&
          e.pointerType !== 'mouse' &&
          e.pointerType !== e.MSPOINTER_TYPE_MOUSE);

    }

    function touchStart(e) {
      if (!shouldHandle(e)) {
        return;
      }

      const touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = new Date().getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }
    }

    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      if (!element.contains(target)) {
        return false;
      }

      let cursor = target;

      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }

        const style = get(cursor);
        const overflow = [style.overflow, style.overflowX, style.overflowY].join(
            ''
        );
        if (overflow.match(/(scroll|auto)/)) {
          const maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (
                !(cursor.scrollTop === 0 && deltaY > 0) &&
                !(cursor.scrollTop === maxScrollTop && deltaY < 0)
            ) {
              return true;
            }
          }
          const maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (
                !(cursor.scrollLeft === 0 && deltaX < 0) &&
                !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
            ) {
              return true;
            }
          }
        }

        cursor = cursor.parentNode;
      }

      return false;
    }

    function touchMove(e) {
      if (shouldHandle(e)) {
        const touch = getTouch(e);

        const currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

        const differenceX = currentOffset.pageX - startOffset.pageX;
        const differenceY = currentOffset.pageY - startOffset.pageY;

        if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
          return;
        }

        applyTouchMove(differenceX, differenceY);
        startOffset = currentOffset;

        const currentTime = new Date().getTime();

        const timeGap = currentTime - startTime;
        if (timeGap > 0) {
          speed.x = differenceX / timeGap;
          speed.y = differenceY / timeGap;
          startTime = currentTime;
        }

        if (shouldPrevent(differenceX, differenceY)) {
          e.preventDefault();
        }
      }
    }

    function touchEnd() {
      if (i.settings.swipeEasing) {
        clearInterval(easingLoop);
        easingLoop = setInterval(function () {
          if (i.isInitialized) {
            clearInterval(easingLoop);
            return;
          }

          if (!speed.x && !speed.y) {
            clearInterval(easingLoop);
            return;
          }

          if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
            clearInterval(easingLoop);
            return;
          }

          applyTouchMove(speed.x * 30, speed.y * 30);

          speed.x *= 0.8;
          speed.y *= 0.8;
        }, 10);
      }
    }

    if (env.supportsTouch) {
      i.event.bind(element, 'touchstart', touchStart);
      i.event.bind(element, 'touchmove', touchMove);
      i.event.bind(element, 'touchend', touchEnd);
    } else if (env.supportsIePointer) {
      if (window.PointerEvent) {
        i.event.bind(element, 'pointerdown', touchStart);
        i.event.bind(element, 'pointermove', touchMove);
        i.event.bind(element, 'pointerup', touchEnd);
      } else if (window.MSPointerEvent) {
        i.event.bind(element, 'MSPointerDown', touchStart);
        i.event.bind(element, 'MSPointerMove', touchMove);
        i.event.bind(element, 'MSPointerUp', touchEnd);
      }
    }
  };

  const defaultSettings = function () {
    return ({
      handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
      maxScrollbarLength: null,
      minScrollbarLength: null,
      scrollingThreshold: 1000,
      scrollXMarginOffset: 0,
      scrollYMarginOffset: 0,
      suppressScrollX: false,
      suppressScrollY: false,
      swipeEasing: true,
      useBothWheelAxes: false,
      wheelPropagation: true,
      wheelSpeed: 1,
    });
  };

  const handlers = {
    'click-rail': clickRail,
    'drag-thumb': dragThumb,
    keyboard: keyboard,
    wheel: wheel,
    touch: touch,
  };

  const PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
    const this$1 = this;
    if (userSettings === void 0) userSettings = {};

    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || !element.nodeName) {
      throw new Error('no element is specified to initialize PerfectScrollbar');
    }

    this.element = element;

    element.classList.add(cls.main);

    this.settings = defaultSettings();
    for (let key in userSettings) {
      this$1.settings[key] = userSettings[key];
    }

    this.containerWidth = null;
    this.containerHeight = null;
    this.contentWidth = null;
    this.contentHeight = null;

    const focus = function () {
      return element.classList.add(cls.state.focus);
    };
    const blur = function () {
      return element.classList.remove(cls.state.focus);
    };

    this.isRtl = get(element).direction === 'rtl';
    this.isNegativeScroll = (function () {
      const originalScrollLeft = element.scrollLeft;
      let result = null;
      element.scrollLeft = -1;
      result = element.scrollLeft < 0;
      element.scrollLeft = originalScrollLeft;
      return result;
    })();
    this.negativeScrollAdjustment = this.isNegativeScroll
        ? element.scrollWidth - element.clientWidth
        : 0;
    this.event = new EventManager();
    this.ownerDocument = element.ownerDocument || document;

    this.scrollbarXRail = div(cls.element.rail('x'));
    element.appendChild(this.scrollbarXRail);
    this.scrollbarX = div(cls.element.thumb('x'));
    this.scrollbarXRail.appendChild(this.scrollbarX);
    this.scrollbarX.setAttribute('tabindex', '0');
    this.event.bind(this.scrollbarX, 'focus', focus);
    this.event.bind(this.scrollbarX, 'blur', blur);
    this.scrollbarXActive = null;
    this.scrollbarXWidth = null;
    this.scrollbarXLeft = null;
    const railXStyle = get(this.scrollbarXRail);
    this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
    if (isNaN(this.scrollbarXBottom)) {
      this.isScrollbarXUsingBottom = false;
      this.scrollbarXTop = toInt(railXStyle.top);
    } else {
      this.isScrollbarXUsingBottom = true;
    }
    this.railBorderXWidth =
        toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
    set(this.scrollbarXRail, {display: 'block'});
    this.railXMarginWidth =
        toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
    set(this.scrollbarXRail, {display: ''});
    this.railXWidth = null;
    this.railXRatio = null;

    this.scrollbarYRail = div(cls.element.rail('y'));
    element.appendChild(this.scrollbarYRail);
    this.scrollbarY = div(cls.element.thumb('y'));
    this.scrollbarYRail.appendChild(this.scrollbarY);
    this.scrollbarY.setAttribute('tabindex', '0');
    this.event.bind(this.scrollbarY, 'focus', focus);
    this.event.bind(this.scrollbarY, 'blur', blur);
    this.scrollbarYActive = null;
    this.scrollbarYHeight = null;
    this.scrollbarYTop = null;
    const railYStyle = get(this.scrollbarYRail);
    this.scrollbarYRight = parseInt(railYStyle.right, 10);
    if (isNaN(this.scrollbarYRight)) {
      this.isScrollbarYUsingRight = false;
      this.scrollbarYLeft = toInt(railYStyle.left);
    } else {
      this.isScrollbarYUsingRight = true;
    }
    this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
    this.railBorderYWidth =
        toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
    set(this.scrollbarYRail, {display: 'block'});
    this.railYMarginHeight =
        toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
    set(this.scrollbarYRail, {display: ''});
    this.railYHeight = null;
    this.railYRatio = null;

    this.reach = {
      x:
          element.scrollLeft <= 0
              ? 'start'
              : element.scrollLeft >= this.contentWidth - this.containerWidth
                  ? 'end'
                  : null,
      y:
          element.scrollTop <= 0
              ? 'start'
              : element.scrollTop >= this.contentHeight - this.containerHeight
                  ? 'end'
                  : null,
    };

    this.isAlive = true;

    this.settings.handlers.forEach(function (handlerName) {
      return handlers[handlerName](this$1);
    });

    this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
    this.lastScrollLeft = element.scrollLeft; // for onScroll only
    this.event.bind(this.element, 'scroll', function (e) {
      return this$1.onScroll(e);
    });
    updateGeometry(this);
  };

  PerfectScrollbar.prototype.update = function update () {
    if (!this.isAlive) {
      return;
    }
    this.negativeScrollAdjustment = this.isNegativeScroll
        ? this.element.scrollWidth - this.element.clientWidth
        : 0;
    set(this.scrollbarXRail, { display: 'block' });
    set(this.scrollbarYRail, { display: 'block' });
    this.railXMarginWidth =
        toInt(get(this.scrollbarXRail).marginLeft) +
        toInt(get(this.scrollbarXRail).marginRight);
    this.railYMarginHeight =
        toInt(get(this.scrollbarYRail).marginTop) +
        toInt(get(this.scrollbarYRail).marginBottom);
    set(this.scrollbarXRail, { display: 'none' });
    set(this.scrollbarYRail, { display: 'none' });

    updateGeometry(this);

    processScrollDiff(this, 'top', 0, false, true);
    processScrollDiff(this, 'left', 0, false, true);

    set(this.scrollbarXRail, { display: '' });
    set(this.scrollbarYRail, { display: '' });
  };

  PerfectScrollbar.prototype.onScroll = function onScroll (e) {
    if (!this.isAlive) {
      return;
    }

    updateGeometry(this);
    processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
    processScrollDiff(
        this,
        'left',
        this.element.scrollLeft - this.lastScrollLeft
    );

    this.lastScrollTop = Math.floor(this.element.scrollTop);
    this.lastScrollLeft = this.element.scrollLeft;
  };

  PerfectScrollbar.prototype.destroy = function destroy () {
    if (!this.isAlive) {
      return;
    }

    this.event.unbindAll();
    remove(this.scrollbarX);
    remove(this.scrollbarY);
    remove(this.scrollbarXRail);
    remove(this.scrollbarYRail);
    this.removePsClasses();
    this.element = null;
    this.scrollbarX = null;
    this.scrollbarY = null;
    this.scrollbarXRail = null;
    this.scrollbarYRail = null;

    this.isAlive = false;
  };

  PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
    this.element.className = this.element.className
        .split(' ')
        .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
        .join(' ');
  };

  return PerfectScrollbar;

})));
