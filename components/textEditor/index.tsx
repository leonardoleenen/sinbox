import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
interface Props {
    onChange: (e: any) => void
    value: string
}

const textEditor = (props: Props) => {
    return (
        <div className="flex">
            <div className="w-2/3 react-ace">
                <AceEditor
                    value={props.value}
                    mode="html"
                    theme="monokai"
                    onChange={e => props.onChange(e)}
                    name="html_editor"
                    showPrintMargin={false}
                    setOptions={{
                        fontFamily: 'monospace',
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2
                    }}
                />
            </div>
        </div>
    )
}
export default textEditor
