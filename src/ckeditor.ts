import ClassicEditor from "./editor/ClassicEditor";
import {Autoformat} from "@ckeditor/ckeditor5-autoformat";
import {BlockQuote} from "@ckeditor/ckeditor5-block-quote";
import {Bold, Italic, Strikethrough, Subscript, Superscript, Underline} from "@ckeditor/ckeditor5-basic-styles";
import {Essentials} from "@ckeditor/ckeditor5-essentials";
import {Heading} from "@ckeditor/ckeditor5-heading";
import {
	AutoImage,
	Image,
	ImageCaption, ImageInsert, ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing,
} from "@ckeditor/ckeditor5-image";
import {Indent, IndentBlock} from "@ckeditor/ckeditor5-indent";
import {AutoLink, Link, LinkImage} from "@ckeditor/ckeditor5-link";
import {List, ListProperties, TodoList} from "@ckeditor/ckeditor5-list";
import {MediaEmbed, MediaEmbedToolbar} from "@ckeditor/ckeditor5-media-embed";
import {Paragraph} from "@ckeditor/ckeditor5-paragraph";
import {PasteFromOffice} from "@ckeditor/ckeditor5-paste-from-office";
import {
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar
} from "@ckeditor/ckeditor5-table";
import {TextTransformation} from "@ckeditor/ckeditor5-typing";
import {SourceEditing} from "@ckeditor/ckeditor5-source-editing";
import {SelectAll} from "@ckeditor/ckeditor5-select-all";
import {CKFinder} from "@ckeditor/ckeditor5-ckfinder";
import {Alignment} from "@ckeditor/ckeditor5-alignment";
import {DataFilter, DataSchema, GeneralHtmlSupport} from "@ckeditor/ckeditor5-html-support";
import {FindAndReplace} from "@ckeditor/ckeditor5-find-and-replace";
import {FontBackgroundColor, FontColor, FontFamily, FontSize} from "@ckeditor/ckeditor5-font";
import {HorizontalLine} from "@ckeditor/ckeditor5-horizontal-line";
import {HtmlEmbed} from "@ckeditor/ckeditor5-html-embed";
import ImageInlineEditing from "@ckeditor/ckeditor5-image/src/image/imageinlineediting";
import {RemoveFormat} from "@ckeditor/ckeditor5-remove-format";
import {
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText
} from "@ckeditor/ckeditor5-special-characters";
import {UploadAdapter} from "@ckeditor/ckeditor5-adapter-ckfinder";
import {EasyImage} from "@ckeditor/ckeditor5-easy-image";
import {CloudServices} from "@ckeditor/ckeditor5-cloud-services";
import {Clipboard} from "@ckeditor/ckeditor5-clipboard";

export default class FloatingEditor extends ClassicEditor {
	public static override builtinPlugins = [
		Essentials,
		UploadAdapter,
		Autoformat,
		Bold,
		Italic,
		BlockQuote,
		CKFinder,
		CloudServices,
		EasyImage,
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
		TextTransformation,
		SourceEditing,
		SelectAll,
		Clipboard,
		Alignment,
		AutoImage,
		AutoLink,
		DataFilter,
		DataSchema,
		FindAndReplace,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		GeneralHtmlSupport,
		HorizontalLine,
		HtmlEmbed,
		ImageInsert,
		ImageInlineEditing,
		ImageResize,
		IndentBlock,
		LinkImage,
		ListProperties,
		MediaEmbedToolbar,
		RemoveFormat,
		SpecialCharacters,
		SpecialCharactersArrows,
		SpecialCharactersCurrency,
		SpecialCharactersEssentials,
		SpecialCharactersLatin,
		SpecialCharactersMathematical,
		SpecialCharactersText,
		Strikethrough,
		Subscript,
		Superscript,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableProperties,
		TodoList,
		Underline,
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
