# CKEditor 5 editor custom builder

CKEditor 5 - v37.1.0

Fixed toolbar not working correctly on Modal/Popup.
<p>
    <img src="https://raw.githubusercontent.com/toannv17/ckeditor5-build-floating-editor/main/images/toolbar.png" width="500" alt="Toolbar" />
</p>

## Fixed

<p>
    <img src="https://raw.githubusercontent.com/toannv17/ckeditor5-build-floating-editor/main/images/toolbar-fixed.gif" width="500" alt="Toolbar fixed" />
</p>

## Installation

1. Install this library in your project.

```shell
npm i ckeditor5-build-floating-editor
```

## Configuration

| **Field**         |  **Type**   | **Description**                                                                              |
|-------------------|:-----------:|----------------------------------------------------------------------------------------------|
| **container**     | HTMLElement | Default: **Window**, Listen for the scroll event from this object.                           |
| **panelAbsolute** |   Boolean   | Default: **false**, Set position is absolute. false(position=fixed), true(position=absolute) | 

React:

```typescript jsx
import {CKEditor} from "@ckeditor/ckeditor5-react";
import FloatingEditor from "ckeditor5-build-floating-editor";

export interface Props {
    onChange?: (html: string, content?: string) => void
    data?: string
    container?: HTMLElement
    config: any
}

export default function TextEditor(props: Props) {
    const config = {
        ...props.config,
        container: props.container,
        panelAbsolute: true,
    }

    return (
        <CKEditor
            config={config}
            editor={FloatingEditor}
            data={props.data ?? ''}
            onChange={(event: any, editor: any) => {
                // ...
            }}
        />
    );
}

```
