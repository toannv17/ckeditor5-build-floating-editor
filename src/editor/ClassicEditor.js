import ClassicEditorUI from "@ckeditor/ckeditor5-editor-classic/src/classiceditorui";
import {getDataFromElement, CKEditorError} from "@ckeditor/ckeditor5-utils";
import {Editor, DataApiMixin, ElementApiMixin, attachToForm, Context} from "@ckeditor/ckeditor5-core";
import { ContextWatchdog, EditorWatchdog } from '@ckeditor/ckeditor5-watchdog';
import ClassicEditorUIView from "./ClassicEditorUIView";
import { isElement as _isElement } from 'lodash-es';

export default class ClassicEditor extends DataApiMixin(ElementApiMixin(Editor)) {
    constructor(sourceElementOrData, config = {}) {
        // If both `config.initialData` is set and initial data is passed as the constructor parameter, then throw.
        if (!isElement(sourceElementOrData) && config.initialData !== undefined) {
            // Documented in core/editor/editorconfig.jsdoc.
            // eslint-disable-next-line ckeditor5-rules/ckeditor-error-message
            throw new CKEditorError('editor-create-initial-data', null);
        }
        super(config);
        if (this.config.get('initialData') === undefined) {
            this.config.set('initialData', getInitialData(sourceElementOrData));
        }
        if (isElement(sourceElementOrData)) {
            this.sourceElement = sourceElementOrData;
        }
        this.model.document.createRoot();
        const shouldToolbarGroupWhenFull = !this.config.get('toolbar.shouldNotGroupWhenFull');
        const view = new ClassicEditorUIView(this.locale, this.editing.view, {
            shouldToolbarGroupWhenFull,
            container: config.container,
            panelAbsolute: config.panelAbsolute
        });
        this.ui = new ClassicEditorUI(this, view);
        attachToForm(this);
    }

    destroy() {
        if (this.sourceElement) {
            this.updateSourceElement();
        }
        this.ui.destroy();
        return super.destroy();
    }

    static create(sourceElementOrData, config = {}) {
        return new Promise(resolve => {
            const editor = new this(sourceElementOrData, config);
            resolve(editor.initPlugins()
                .then(() => editor.ui.init(isElement(sourceElementOrData) ? sourceElementOrData : null))
                .then(() => editor.data.init(editor.config.get('initialData')))
                .then(() => editor.fire('ready'))
                .then(() => editor));
        });
    }
}
/**
 * The {@link module:core/context~Context} class.
 *
 * Exposed as static editor field for easier access in editor builds.
 */
ClassicEditor.Context = Context;
/**
 * The {@link module:watchdog/editorwatchdog~EditorWatchdog} class.
 *
 * Exposed as static editor field for easier access in editor builds.
 */
ClassicEditor.EditorWatchdog = EditorWatchdog;
/**
 * The {@link module:watchdog/contextwatchdog~ContextWatchdog} class.
 *
 * Exposed as static editor field for easier access in editor builds.
 */
ClassicEditor.ContextWatchdog = ContextWatchdog;
function getInitialData(sourceElementOrData) {
    return isElement(sourceElementOrData) ? getDataFromElement(sourceElementOrData) : sourceElementOrData;
}
function isElement(value) {
    return _isElement(value);
}

