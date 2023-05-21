import ClassicEditor from "./editor/ClassicEditor";
import {Autoformat} from "@ckeditor/ckeditor5-autoformat";
import {BlockQuote} from "@ckeditor/ckeditor5-block-quote";
import {Bold, Italic} from "@ckeditor/ckeditor5-basic-styles";
import {Essentials} from "@ckeditor/ckeditor5-essentials";
import {Heading} from "@ckeditor/ckeditor5-heading";
import {Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, PictureEditing} from "@ckeditor/ckeditor5-image";
import {Indent} from "@ckeditor/ckeditor5-indent";
import {Link} from "@ckeditor/ckeditor5-link";
import {List} from "@ckeditor/ckeditor5-list";
import {MediaEmbed} from "@ckeditor/ckeditor5-media-embed";
import {Paragraph} from "@ckeditor/ckeditor5-paragraph";
import {PasteFromOffice} from "@ckeditor/ckeditor5-paste-from-office";
import {Table, TableToolbar} from "@ckeditor/ckeditor5-table";
import {TextTransformation} from "@ckeditor/ckeditor5-typing";

class FloatingEditor extends ClassicEditor {}

// Plugins to include in the build.
FloatingEditor.builtinPlugins = [
	Autoformat ,
	BlockQuote,
	Bold,
	Essentials,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Italic,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	PictureEditing,
	Table,
	TableToolbar,
	TextTransformation
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent',
			'|',
			'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		]
	},
	language: 'vi',
};

export default FloatingEditor;
