import {Template, View} from '@ckeditor/ckeditor5-ui';
import {global, toUnit} from '@ckeditor/ckeditor5-utils';
import '@ckeditor/ckeditor5-ui/theme/components/panel/stickypanel.css';

const toPx = toUnit('px');
/**
 * The sticky panel view class.
 */
export default class StickyPanelView extends View {
    constructor(locale, container, panelAbsolute = false) {
        super(locale);

        this.container = container ?? global.window;

        const bind = this.bindTemplate;

        this.set('panelAbsolute', !!panelAbsolute);
        this.set('containerScrollY', 0);
        this.set('isActive', false);
        this.set('isSticky', false);
        this.set('limiterElement', null);
        this.set('limiterBottomOffset', 50);
        this.set('viewportTopOffset', 0);
        this.set('_marginLeft', null);
        this.set('_isStickyToTheLimiter', false);
        this.set('_hasViewportTopOffset', false);
        this.content = this.createCollection();

        this._contentPanelPlaceholder = new Template({
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-sticky-panel__placeholder'
                ],
                style: {
                    display: bind.to('isSticky', isSticky => isSticky ? 'block' : 'none'),
                    height: bind.to('isSticky', isSticky => {
                        return isSticky ? toPx(this._panelRect.height) : null;
                    })
                }
            }
        }).render();

        this._contentPanel = new Template({
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-sticky-panel__content',
                    // Toggle class of the panel when "sticky" state changes in the view.
                    bind.if('isSticky', 'ck-sticky-panel__content_sticky'),
                    bind.if('_isStickyToTheLimiter', 'ck-sticky-panel__content_sticky_bottom-limit')
                ],
                style: {
                    position: bind.to('isSticky', isSticky => {
                        if (isSticky && this.panelAbsolute) {
                            return 'absolute';
                        }
                        return null;
                    }),
                    width: bind.to('isSticky', isSticky => {
                        return isSticky ? toPx(this._contentPanelPlaceholder.getBoundingClientRect().width) : null;
                    }),
                    top: bind.to('containerScrollY', () => {
                        if (this.isActive && this.panelAbsolute && this.limiterElement) {
                            let limiterRect = this.limiterElement.getBoundingClientRect().toJSON();
                            if (this.container.getBoundingClientRect) {
                                let containerRect = this.container.getBoundingClientRect();
                                limiterRect.top -= containerRect.top;
                                limiterRect.y -= containerRect.y;
                            }
                            return this._hasViewportTopOffset ? toPx(Math.abs(limiterRect.y) + this.viewportTopOffset) : toPx(Math.abs(limiterRect.y));
                        }
                        return this._hasViewportTopOffset ? toPx(this.viewportTopOffset) : null;
                    }),
                    bottom: bind.to('_isStickyToTheLimiter', _isStickyToTheLimiter => {
                        return _isStickyToTheLimiter ? toPx(this.limiterBottomOffset) : null;
                    }),
                    marginLeft: bind.to('_marginLeft')
                }
            },
            children: this.content
        }).render();
        this.setTemplate({
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-sticky-panel'
                ]
            },
            children: [
                this._contentPanelPlaceholder,
                this._contentPanel
            ]
        });
    }

    /**
     * @inheritDoc
     */
    render() {
        super.render();
        // Check if the panel should go into the sticky state immediately.
        this._checkIfShouldBeSticky();
        // Update sticky state of the panel as the window is being scrolled.
        this.listenTo(this.container, 'scroll', () => {
            if (this.isActive) {
                if (this.container.scrollY !== undefined) {
                    this.containerScrollY = this.container.scrollY
                } else {
                    this.containerScrollY = this.container.scrollTop
                }
                this._checkIfShouldBeSticky(true);
            }
        });
        // Synchronize with `model.isActive` because sticking an inactive panel is pointless.
        this.listenTo(this, 'change:isActive', () => {
            this._checkIfShouldBeSticky();
        });
    }

    /**
     * Analyzes the environment to decide whether the panel should
     * be sticky or not.
     */
    _checkIfShouldBeSticky(scroll = false) {
        if (!scroll) {
            if (this.container.scrollY !== undefined) {
                this.containerScrollY = this.container.scrollY
            } else {
                this.containerScrollY = this.container.scrollTop
            }
        }
        const panelRect = this._panelRect = this._contentPanel.getBoundingClientRect();
        let limiterRect;
        if (!this.limiterElement) {
            this.isSticky = false;
        } else {
            limiterRect = this.limiterElement.getBoundingClientRect().toJSON();
            if (this.container.getBoundingClientRect) {
                let containerRect = this.container.getBoundingClientRect();
                limiterRect.top -= containerRect.top;
                limiterRect.y -= containerRect.y;
            }
            this._limiterRect = limiterRect;

            // The panel must be active to become sticky.
            this.isSticky = this.isActive &&
                // The limiter's top edge must be beyond the upper edge of the visible viewport (+the viewportTopOffset).
                limiterRect.top < this.viewportTopOffset &&
                // The model#limiterElement's height mustn't be smaller than the panel's height and model#limiterBottomOffset.
                // There's no point in entering the sticky mode if the model#limiterElement is very, very small, because
                // it would immediately set model#_isStickyToTheLimiter true and, given model#limiterBottomOffset, the panel
                // would be positioned before the model#limiterElement.
                this._panelRect.height + this.limiterBottomOffset < limiterRect.height;
        }
        // Stick the panel to the top edge of the viewport simulating CSS position:sticky.
        // TODO: Possibly replaced by CSS in the future http://caniuse.com/#feat=css-sticky
        if (this.isSticky) {
            this._isStickyToTheLimiter =
                limiterRect.bottom < panelRect.height + this.limiterBottomOffset + this.viewportTopOffset;
            this._hasViewportTopOffset = !this._isStickyToTheLimiter && !!this.viewportTopOffset;
            this._marginLeft = this._isStickyToTheLimiter ? null : toPx(-global.window.scrollX);
        }
        // Detach the panel from the top edge of the viewport.
        else {
            this._isStickyToTheLimiter = false;
            this._hasViewportTopOffset = false;
            this._marginLeft = null;
        }
    }
}
