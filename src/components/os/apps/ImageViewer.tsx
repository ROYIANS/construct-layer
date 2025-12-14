import { useFileSystem } from '../../../os/FileSystem';
import { Icons } from '../Icons';

interface ImageViewerProps {
    fileId?: string;
}

export const ImageViewer = ({ fileId }: ImageViewerProps) => {
    const { readFile } = useFileSystem();
    const file = fileId ? readFile(fileId) : null;

    if (!file || file.type !== 'file') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-black">
                <Icons.Image className="w-16 h-16 mb-4 opacity-50" />
                <p>Invalid Image</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#222] text-white overflow-hidden relative group">
            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                <img
                    src={file.content as string}
                    alt={file.name}
                    className="max-w-full max-h-full object-contain shadow-2xl"
                />
            </div>

            {/* Overlay Title (Visible on hover or consistent in mobile?) */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent transition-opacity opacity-0 group-hover:opacity-100 duration-200">
                <h1 className="text-sm font-medium drop-shadow-md truncate">{file.name}</h1>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#333]/80 backdrop-blur rounded-full px-4 py-2 flex items-center gap-4 transition-opacity opacity-0 group-hover:opacity-100 duration-200 shadow-lg">
                <button className="hover:text-blue-400 transition-colors"><Icons.Search className="w-4 h-4" /></button>
                <div className="w-px h-3 bg-white/20"></div>
                <button className="hover:text-red-400 transition-colors"><Icons.RecycleBin className="w-4 h-4" /></button>
            </div>
        </div>
    );
};
