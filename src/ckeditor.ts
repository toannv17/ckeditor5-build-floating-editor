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

export default class FloatingEditor extends ClassicEditor {
	public static override builtinPlugins = [
		Essentials,
		// UploadAdapter,
		Autoformat,
		Bold,
		Italic,
		BlockQuote,
		// CKBox,
		// CKFinder,
		// CloudServices,
		// EasyImage,
		Heading,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
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

	public static override defaultConfig = {
		toolbar: {
			items: [
				'undo', 'redo',
				'|', 'heading',
				'|', 'bold', 'italic',
				'|', 'link', 'uploadImage', 'insertTable', 'blockQuote', 'mediaEmbed',
				'|', 'bulletedList', 'numberedList', 'outdent', 'indent'
			]
		},
		image: {
			toolbar: [
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'|',
				'toggleImageCaption',
				'imageTextAlternative'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		// This value must be kept in sync with the language defined in webpack.config.js.
		language: 'vi'
	};
}
