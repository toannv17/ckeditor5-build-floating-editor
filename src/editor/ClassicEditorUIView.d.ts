import { BoxedEditorUIView, InlineEditableUIView, StickyPanelView, ToolbarView } from '@ckeditor/ckeditor5-ui';
import type { Locale } from '@ckeditor/ckeditor5-utils';
import type { View } from '@ckeditor/ckeditor5-engine';
import '@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css';

/**
 * Classic editor UI view. Uses an inline editable and a sticky toolbar, all
 * enclosed in a boxed UI view.
 */
export default class ClassicEditorUIView extends BoxedEditorUIView {
    /**
     * Sticky panel view instance. This is a parent view of a {@link #toolbar}
     * that makes toolbar sticky.
     */
    readonly stickyPanel: StickyPanelView;
    /**
     * Toolbar view instance.
     */
    readonly toolbar: ToolbarView;
    /**
     * Editable UI view.
     */
    readonly editable: InlineEditableUIView;
    /**
     * Creates an instance of the classic editor UI view.
     *
     * @param locale The {@link module:core/editor/editor~Editor#locale} instance.
     * @param editingView The editing view instance this view is related to.
     * @param options Configuration options for the view instance.
     * @param options.shouldToolbarGroupWhenFull When set `true` enables automatic items grouping
     * in the main {@link module:editor-classic/classiceditoruiview~ClassicEditorUIView#toolbar toolbar}.
     * See {@link module:ui/toolbar/toolbarview~ToolbarOptions#shouldGroupWhenFull} to learn more.
     */
    constructor(locale: Locale, editingView: View, options?: {
        shouldToolbarGroupWhenFull?: boolean;
    });
    /**
     * @inheritDoc
     */
    render(): void;
}
