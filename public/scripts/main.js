window.onload = function() {
    const cards = document.querySelectorAll('.footer-flip');
    cards.forEach(cards => cards.addEventListener('click', cardflip));



}

function cardflip() {
    var front = this.parentNode.parentNode.parentNode.parentNode.children[0];
    var back = this.parentNode.parentNode.parentNode.parentNode.children[1]
    front.classList.toggle('card-hidden');
    back.classList.toggle('card-hidden');
}
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory())
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory()
    } else {
        (function install() {
            if (document && document.body) {
                root.zenscroll = factory()
            } else {
                setTimeout(install, 9)
            }
        })()
    }
}(this, function() {
    "use strict"
    var isNativeSmoothScrollEnabledOn = function(elem) {
        return ("getComputedStyle" in window) && window.getComputedStyle(elem)["scroll-behavior"] === "smooth"
    }
    if (typeof window === "undefined" || !("document" in window)) {
        return {}
    }
    var makeScroller = function(container, defaultDuration, edgeOffset) {
        defaultDuration = defaultDuration || 664
        if (!edgeOffset && edgeOffset !== 0) {
            edgeOffset = 45.5
        }
        var scrollTimeoutId
        var setScrollTimeoutId = function(newValue) {
            scrollTimeoutId = newValue
        }
        var stopScroll = function() {
            clearTimeout(scrollTimeoutId)
            setScrollTimeoutId(0)
        }
        var getTopWithEdgeOffset = function(elem) {
            return Math.max(0, container.getTopOf(elem) - edgeOffset)
        }
        var scrollToY = function(targetY, duration, onDone) {
            stopScroll()
            if (duration === 0 || (duration && duration < 0) || isNativeSmoothScrollEnabledOn(container.body)) {
                container.toY(targetY)
                if (onDone) {
                    onDone()
                }
            } else {
                var startY = container.getY()
                var distance = Math.max(0, targetY) - startY
                var startTime = new Date().getTime()
                duration = duration || Math.min(Math.abs(distance), defaultDuration);
                (function loopScroll() {
                    setScrollTimeoutId(setTimeout(function() {
                        var p = Math.min(1, (new Date().getTime() - startTime) / duration)
                        var y = Math.max(0, Math.floor(startY + distance * (p < 0.5 ? 2 * p * p : p * (4 - p * 2) - 1)))
                        container.toY(y)
                        if (p < 1 && (container.getHeight() + y) < container.body.scrollHeight) {
                            loopScroll()
                        } else {
                            setTimeout(stopScroll, 99)
                            if (onDone) {
                                onDone()
                            }
                        }
                    }, 9))
                })()
            }
        }
        var scrollToElem = function(elem, duration, onDone) {
            scrollToY(getTopWithEdgeOffset(elem), duration, onDone)
        }
        var scrollIntoView = function(elem, duration, onDone) {
            var elemHeight = elem.getBoundingClientRect().height
            var elemBottom = container.getTopOf(elem) + elemHeight
            var containerHeight = container.getHeight()
            var y = container.getY()
            var containerBottom = y + containerHeight
            if (getTopWithEdgeOffset(elem) < y || (elemHeight + edgeOffset) > containerHeight) {
                scrollToElem(elem, duration, onDone)
            } else if ((elemBottom + edgeOffset) > containerBottom) {
                scrollToY(elemBottom - containerHeight + edgeOffset, duration, onDone)
            } else if (onDone) {
                onDone()
            }
        }
        var scrollToCenterOf = function(elem, duration, offset, onDone) {
            scrollToY(Math.max(0, container.getTopOf(elem) - container.getHeight() / 2 + (offset || elem.getBoundingClientRect().height / 2)), duration, onDone)
        }
        var setup = function(newDefaultDuration, newEdgeOffset) {
            if (newDefaultDuration === 0 || newDefaultDuration) {
                defaultDuration = newDefaultDuration
            }
            if (newEdgeOffset === 0 || newEdgeOffset) {
                edgeOffset = newEdgeOffset
            }
            return {
                defaultDuration: defaultDuration,
                edgeOffset: edgeOffset
            }
        }
        return {
            setup: setup,
            to: scrollToElem,
            toY: scrollToY,
            intoView: scrollIntoView,
            center: scrollToCenterOf,
            stop: stopScroll,
            moving: function() {
                return !!scrollTimeoutId
            },
            getY: container.getY,
            getTopOf: container.getTopOf
        }
    }
    var docElem = document.documentElement
    var getDocY = function() {
        return window.scrollY || docElem.scrollTop
    }
    var zenscroll = makeScroller({
        body: document.scrollingElement || document.body,
        toY: function(y) {
            window.scrollTo(0, y)
        },
        getY: getDocY,
        getHeight: function() {
            return window.innerHeight || docElem.clientHeight
        },
        getTopOf: function(elem) {
            return elem.getBoundingClientRect().top + getDocY() - docElem.offsetTop
        }
    })
    zenscroll.createScroller = function(scrollContainer, defaultDuration, edgeOffset) {
        return makeScroller({
            body: scrollContainer,
            toY: function(y) {
                scrollContainer.scrollTop = y
            },
            getY: function() {
                return scrollContainer.scrollTop
            },
            getHeight: function() {
                return Math.min(scrollContainer.clientHeight, window.innerHeight || docElem.clientHeight)
            },
            getTopOf: function(elem) {
                return elem.offsetTop
            }
        }, defaultDuration, edgeOffset)
    }
    if ("addEventListener" in window && !window.noZensmooth && !isNativeSmoothScrollEnabledOn(document.body)) {
        var isScrollRestorationSupported = "scrollRestoration" in history
        if (isScrollRestorationSupported) {
            history.scrollRestoration = "auto"
        }
        window.addEventListener("load", function() {
            if (isScrollRestorationSupported) {
                setTimeout(function() {
                    history.scrollRestoration = "manual"
                }, 9)
                window.addEventListener("popstate", function(event) {
                    if (event.state && "zenscrollY" in event.state) {
                        zenscroll.toY(event.state.zenscrollY)
                    }
                }, false)
            }
            if (window.location.hash) {
                setTimeout(function() {
                    var edgeOffset = zenscroll.setup().edgeOffset
                    if (edgeOffset) {
                        var targetElem = document.getElementById(window.location.href.split("#")[1])
                        if (targetElem) {
                            var targetY = Math.max(0, zenscroll.getTopOf(targetElem) - edgeOffset)
                            var diff = zenscroll.getY() - targetY
                            if (0 <= diff && diff < 9) {
                                window.scrollTo(0, targetY)
                            }
                        }
                    }
                }, 9)
            }
        }, false)
        var RE_noZensmooth = new RegExp("(^|\\s)noZensmooth(\\s|$)")
        window.addEventListener("click", function(event) {
            var anchor = event.target
            while (anchor && anchor.tagName !== "A") {
                anchor = anchor.parentNode
            }
            if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
                return
            }
            if (isScrollRestorationSupported) {
                try {
                    history.replaceState({
                        zenscrollY: zenscroll.getY()
                    }, "")
                } catch (e) {}
            }
            var href = anchor.getAttribute("href") || ""
            if (href.indexOf("#") === 0 && !RE_noZensmooth.test(anchor.className)) {
                var targetY = 0
                var targetElem = document.getElementById(href.substring(1))
                if (href !== "#") {
                    if (!targetElem) {
                        return
                    }
                    targetY = zenscroll.getTopOf(targetElem)
                }
                event.preventDefault()
                var onDone = function() {
                    window.location = href
                }
                var edgeOffset = zenscroll.setup().edgeOffset
                if (edgeOffset) {
                    targetY = Math.max(0, targetY - edgeOffset)
                    onDone = function() {
                        history.pushState(null, "", href)
                    }
                }
                zenscroll.toY(targetY, null, onDone)
            }
        }, false)
    }
    return zenscroll
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.lightbox = factory(root.jQuery);
    }
}(this, function($) {
    function Lightbox(options) {
        this.album = [];
        this.currentImageIndex = void 0;
        this.init();
        this.options = $.extend({}, this.constructor.defaults);
        this.option(options);
    }
    Lightbox.defaults = {
        albumLabel: 'Image %1 of %2',
        alwaysShowNavOnTouchDevices: false,
        fadeDuration: 600,
        fitImagesInViewport: true,
        imageFadeDuration: 600,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: true,
        wrapAround: false,
        disableScrolling: false,
        sanitizeTitle: false
    };
    Lightbox.prototype.option = function(options) {
        $.extend(this.options, options);
    };
    Lightbox.prototype.imageCountLabel = function(currentImageNum, totalImages) {
        return this.options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
    };
    Lightbox.prototype.init = function() {
        var self = this;
        $(document).ready(function() {
            self.enable();
            self.build();
        });
    };
    Lightbox.prototype.enable = function() {
        var self = this;
        $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(event) {
            self.start($(event.currentTarget));
            return false;
        });
    };
    Lightbox.prototype.build = function() {
        var self = this;
        $('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo($('body'));
        this.$lightbox = $('#lightbox');
        this.$overlay = $('#lightboxOverlay');
        this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
        this.$container = this.$lightbox.find('.lb-container');
        this.$image = this.$lightbox.find('.lb-image');
        this.$nav = this.$lightbox.find('.lb-nav');
        this.containerPadding = {
            top: parseInt(this.$container.css('padding-top'), 10),
            right: parseInt(this.$container.css('padding-right'), 10),
            bottom: parseInt(this.$container.css('padding-bottom'), 10),
            left: parseInt(this.$container.css('padding-left'), 10)
        };
        this.imageBorderWidth = {
            top: parseInt(this.$image.css('border-top-width'), 10),
            right: parseInt(this.$image.css('border-right-width'), 10),
            bottom: parseInt(this.$image.css('border-bottom-width'), 10),
            left: parseInt(this.$image.css('border-left-width'), 10)
        };
        this.$overlay.hide().on('click', function() {
            self.end();
            return false;
        });
        this.$lightbox.hide().on('click', function(event) {
            if ($(event.target).attr('id') === 'lightbox') {
                self.end();
            }
            return false;
        });
        this.$outerContainer.on('click', function(event) {
            if ($(event.target).attr('id') === 'lightbox') {
                self.end();
            }
            return false;
        });
        this.$lightbox.find('.lb-prev').on('click', function() {
            if (self.currentImageIndex === 0) {
                self.changeImage(self.album.length - 1);
            } else {
                self.changeImage(self.currentImageIndex - 1);
            }
            return false;
        });
        this.$lightbox.find('.lb-next').on('click', function() {
            if (self.currentImageIndex === self.album.length - 1) {
                self.changeImage(0);
            } else {
                self.changeImage(self.currentImageIndex + 1);
            }
            return false;
        });
        this.$nav.on('mousedown', function(event) {
            if (event.which === 3) {
                self.$nav.css('pointer-events', 'none');
                self.$lightbox.one('contextmenu', function() {
                    setTimeout(function() {
                        this.$nav.css('pointer-events', 'auto');
                    }.bind(self), 0);
                });
            }
        });
        this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
            self.end();
            return false;
        });
    };
    Lightbox.prototype.start = function($link) {
        var self = this;
        var $window = $(window);
        $window.on('resize', $.proxy(this.sizeOverlay, this));
        $('select, object, embed').css({
            visibility: 'hidden'
        });
        this.sizeOverlay();
        this.album = [];
        var imageNumber = 0;

        function addToAlbum($link) {
            self.album.push({
                link: $link.attr('href'),
                title: $link.attr('data-title') || $link.attr('title')
            });
        }
        var dataLightboxValue = $link.attr('data-lightbox');
        var $links;
        if (dataLightboxValue) {
            $links = $($link.prop('tagName') + '[data-lightbox="' + dataLightboxValue + '"]');
            for (var i = 0; i < $links.length; i = ++i) {
                addToAlbum($($links[i]));
                if ($links[i] === $link[0]) {
                    imageNumber = i;
                }
            }
        } else {
            if ($link.attr('rel') === 'lightbox') {
                addToAlbum($link);
            } else {
                $links = $($link.prop('tagName') + '[rel="' + $link.attr('rel') + '"]');
                for (var j = 0; j < $links.length; j = ++j) {
                    addToAlbum($($links[j]));
                    if ($links[j] === $link[0]) {
                        imageNumber = j;
                    }
                }
            }
        }
        var top = $window.scrollTop() + this.options.positionFromTop;
        var left = $window.scrollLeft();
        this.$lightbox.css({
            top: top + 'px',
            left: left + 'px'
        }).fadeIn(this.options.fadeDuration);
        if (this.options.disableScrolling) {
            $('body').addClass('lb-disable-scrolling');
        }
        this.changeImage(imageNumber);
    };
    Lightbox.prototype.changeImage = function(imageNumber) {
        var self = this;
        this.disableKeyboardNav();
        var $image = this.$lightbox.find('.lb-image');
        this.$overlay.fadeIn(this.options.fadeDuration);
        $('.lb-loader').fadeIn('slow');
        this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();
        this.$outerContainer.addClass('animating');
        var preloader = new Image();
        preloader.onload = function() {
            var $preloader;
            var imageHeight;
            var imageWidth;
            var maxImageHeight;
            var maxImageWidth;
            var windowHeight;
            var windowWidth;
            $image.attr('src', self.album[imageNumber].link);
            $preloader = $(preloader);
            $image.width(preloader.width);
            $image.height(preloader.height);
            if (self.options.fitImagesInViewport) {
                windowWidth = $(window).width();
                windowHeight = $(window).height();
                maxImageWidth = windowWidth - self.containerPadding.left - self.containerPadding.right - self.imageBorderWidth.left - self.imageBorderWidth.right - 20;
                maxImageHeight = windowHeight - self.containerPadding.top - self.containerPadding.bottom - self.imageBorderWidth.top - self.imageBorderWidth.bottom - 120;
                if (self.options.maxWidth && self.options.maxWidth < maxImageWidth) {
                    maxImageWidth = self.options.maxWidth;
                }
                if (self.options.maxHeight && self.options.maxHeight < maxImageWidth) {
                    maxImageHeight = self.options.maxHeight;
                }
                if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
                    if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
                        imageWidth = maxImageWidth;
                        imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
                        $image.width(imageWidth);
                        $image.height(imageHeight);
                    } else {
                        imageHeight = maxImageHeight;
                        imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
                        $image.width(imageWidth);
                        $image.height(imageHeight);
                    }
                }
            }
            self.sizeContainer($image.width(), $image.height());
        };
        preloader.src = this.album[imageNumber].link;
        this.currentImageIndex = imageNumber;
    };
    Lightbox.prototype.sizeOverlay = function() {
        this.$overlay.width($(document).width()).height($(document).height());
    };
    Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
        var self = this;
        var oldWidth = this.$outerContainer.outerWidth();
        var oldHeight = this.$outerContainer.outerHeight();
        var newWidth = imageWidth + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right;
        var newHeight = imageHeight + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;

        function postResize() {
            self.$lightbox.find('.lb-dataContainer').width(newWidth);
            self.$lightbox.find('.lb-prevLink').height(newHeight);
            self.$lightbox.find('.lb-nextLink').height(newHeight);
            self.showImage();
        }
        if (oldWidth !== newWidth || oldHeight !== newHeight) {
            this.$outerContainer.animate({
                width: newWidth,
                height: newHeight
            }, this.options.resizeDuration, 'swing', function() {
                postResize();
            });
        } else {
            postResize();
        }
    };
    Lightbox.prototype.showImage = function() {
        this.$lightbox.find('.lb-loader').stop(true).hide();
        this.$lightbox.find('.lb-image').fadeIn(this.options.imageFadeDuration);
        this.updateNav();
        this.updateDetails();
        this.preloadNeighboringImages();
        this.enableKeyboardNav();
    };
    Lightbox.prototype.updateNav = function() {
        var alwaysShowNav = false;
        try {
            document.createEvent('TouchEvent');
            alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices) ? true : false;
        } catch (e) {}
        this.$lightbox.find('.lb-nav').show();
        if (this.album.length > 1) {
            if (this.options.wrapAround) {
                if (alwaysShowNav) {
                    this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
                }
                this.$lightbox.find('.lb-prev, .lb-next').show();
            } else {
                if (this.currentImageIndex > 0) {
                    this.$lightbox.find('.lb-prev').show();
                    if (alwaysShowNav) {
                        this.$lightbox.find('.lb-prev').css('opacity', '1');
                    }
                }
                if (this.currentImageIndex < this.album.length - 1) {
                    this.$lightbox.find('.lb-next').show();
                    if (alwaysShowNav) {
                        this.$lightbox.find('.lb-next').css('opacity', '1');
                    }
                }
            }
        }
    };
    Lightbox.prototype.updateDetails = function() {
        var self = this;
        if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== '') {
            var $caption = this.$lightbox.find('.lb-caption');
            if (this.options.sanitizeTitle) {
                $caption.text(this.album[this.currentImageIndex].title);
            } else {
                $caption.html(this.album[this.currentImageIndex].title);
            }
            $caption.fadeIn('fast').find('a').on('click', function(event) {
                if ($(this).attr('target') !== undefined) {
                    window.open($(this).attr('href'), $(this).attr('target'));
                } else {
                    location.href = $(this).attr('href');
                }
            });
        }
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
            var labelText = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
            this.$lightbox.find('.lb-number').text(labelText).fadeIn('fast');
        } else {
            this.$lightbox.find('.lb-number').hide();
        }
        this.$outerContainer.removeClass('animating');
        this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
            return self.sizeOverlay();
        });
    };
    Lightbox.prototype.preloadNeighboringImages = function() {
        if (this.album.length > this.currentImageIndex + 1) {
            var preloadNext = new Image();
            preloadNext.src = this.album[this.currentImageIndex + 1].link;
        }
        if (this.currentImageIndex > 0) {
            var preloadPrev = new Image();
            preloadPrev.src = this.album[this.currentImageIndex - 1].link;
        }
    };
    Lightbox.prototype.enableKeyboardNav = function() {
        $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
    };
    Lightbox.prototype.disableKeyboardNav = function() {
        $(document).off('.keyboard');
    };
    Lightbox.prototype.keyboardAction = function(event) {
        var KEYCODE_ESC = 27;
        var KEYCODE_LEFTARROW = 37;
        var KEYCODE_RIGHTARROW = 39;
        var keycode = event.keyCode;
        var key = String.fromCharCode(keycode).toLowerCase();
        if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
            this.end();
        } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
            if (this.currentImageIndex !== 0) {
                this.changeImage(this.currentImageIndex - 1);
            } else if (this.options.wrapAround && this.album.length > 1) {
                this.changeImage(this.album.length - 1);
            }
        } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
            if (this.currentImageIndex !== this.album.length - 1) {
                this.changeImage(this.currentImageIndex + 1);
            } else if (this.options.wrapAround && this.album.length > 1) {
                this.changeImage(0);
            }
        }
    };
    Lightbox.prototype.end = function() {
        this.disableKeyboardNav();
        $(window).off('resize', this.sizeOverlay);
        this.$lightbox.fadeOut(this.options.fadeDuration);
        this.$overlay.fadeOut(this.options.fadeDuration);
        $('select, object, embed').css({
            visibility: 'visible'
        });
        if (this.options.disableScrolling) {
            $('body').removeClass('lb-disable-scrolling');
        }
    };
    return new Lightbox();
}));