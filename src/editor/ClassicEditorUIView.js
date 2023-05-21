import {BoxedEditorUIView, InlineEditableUIView, ToolbarView} from '@ckeditor/ckeditor5-ui';
import StickyPanelView from "../ui/panel/sticky/StickyPanelView";
import '@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css';

export default class ClassicEditorUIView extends BoxedEditorUIView {
    constructor(locale, editingView, options = {}) {
        super(locale);
        this.stickyPanel = new StickyPanelView(locale, options.container, options.panelAbsolute);
        this.toolbar = new ToolbarView(locale, {
            shouldGroupWhenFull: options.shouldToolbarGroupWhenFull
        });
        this.editable = new InlineEditableUIView(locale, editingView);
    }

    /**
     * @inheritDoc
     */
    render() {
        super.render();
        // Set toolbar as a child of a stickyPanel and makes toolbar sticky.
        this.stickyPanel.content.add(this.toolbar);
        this.top.add(this.stickyPanel);
        this.main.add(this.editable);
    }
}
