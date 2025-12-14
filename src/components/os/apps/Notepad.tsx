import { useState, useEffect } from 'react';
import { useFileSystem } from '../../../os/FileSystem';

interface NotepadProps {
    fileId?: string;
}

export const Notepad = ({ fileId }: NotepadProps) => {
    const [content, setContent] = useState('');
    const [fileName, setFileName] = useState('未命名');
    const [isModified, setIsModified] = useState(false);
    const { readFile } = useFileSystem();

    // 加载文件内容
    useEffect(() => {
        if (fileId) {
            const file = readFile(fileId);
            if (file && file.type === 'file') {
                setFileName(file.name);
                setContent(typeof file.content === 'string' ? file.content : '');
                setIsModified(false);
            }
        }
    }, [fileId, readFile]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setIsModified(true);
    };

    return (
        <div className="flex flex-col h-full bg-white text-black">
            {/* 菜单栏 */}
            <div className="h-8 bg-white border-b flex items-center px-2 text-xs">
                <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">文件(F)</div>
                <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">编辑(E)</div>
                <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">格式(O)</div>
                <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">查看(V)</div>
                <div className="hover:bg-gray-100 px-2 py-1 cursor-pointer">帮助(H)</div>
            </div>

            {/* 文本编辑区 */}
            <textarea
                value={content}
                onChange={handleContentChange}
                className="flex-1 p-4 resize-none outline-none font-mono text-sm leading-relaxed"
                placeholder="在此处输入文本..."
                spellCheck={false}
            />

            {/* 状态栏 */}
            <div className="h-6 bg-white border-t flex items-center px-2 text-xs text-gray-600">
                <span>
                    行 1, 列 1 {isModified && '(已修改)'}
                </span>
                <span className="ml-auto">UTF-8</span>
            </div>
        </div>
    );
};
