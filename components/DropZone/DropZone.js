import React from "react";
import FilePreview from "../FilePreview/FilePreview";

const DropZone = ({ data, dispatch }) => {
    const setInDropZone = bool => dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: bool });

    const onDragEnter = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setInDropZone(true);
    }

    const onDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setInDropZone(false);
    }

    const onDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = 'copy';
        setInDropZone(true);
    };

    const filterDuplicatedFiles = (files) => {
        const existingFileNames = data.fileList.map(file => file.name);
        console.log({ existingFileNames, files })
        // check if file already exists, if so, don't add to fileList
        // this is to prevent duplicates
        files = files.filter(file => !existingFileNames.includes(file.name));
        return files;
    }

    const addFileToList = files => {
        console.log('Adding files: ', files);
        dispatch({ type: 'ADD_FILE_TO_LIST', files });
    }

    const onDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let files = [, , , event.dataTransfer.files];
        if (!files || !files.length) return;
        files = filterDuplicatedFiles(files);
        addFileToList(files);
        // reset inDropZone to false
        setInDropZone(false);
    }

    const onFileSelect = (event) => {
        let files = [...event.target.files];
        if (!files || !files.length) return;
        files = filterDuplicatedFiles(files);
        addFileToList(files);
    }

    const openFileSelectDialog = () => {
        const label = document.getElementById('BoxLabel');
        label.click();
    }

    const uploadFiles = async () => {
        let files = data.fileList;
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        // At this point, use any service of your choice to upload the files
        const responses = await fetch('/whatEverApiHere/', {
            method: 'POST',
            body: formData
        });

        if (responses.ok) {
            alert('File uploaded');
        }
        else {
            alert('Could not upload file');
        }
    }

    return (
        <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
            onDrop={e => onDrop(e)}
            onDragOver={e => onDragOver(e)}
            onDragEnter={e => onDragEnter(e)}
            onDragLeave={e => onDragLeave(e)}>
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">
                        Upload your files
                    </h2>
                </div>
                <form className="mt-8 space-y-3" action="#" method="POST">
                    <div className="grid grid-cols-1 space-y-2">
                        <div className="flex items-center justify-center w-full">
                            <label id="BoxLabel" className="flex flex-col rounded-lg border-4 border-dashed w-full h-40 p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col justify-center items-center">
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    </div>
                                    <p className="pointer-none text-gray-500 "><span className="text-sm">
                                        Drag and drop</span> files here <br /> or &nbsp;
                                        <a href="#" onClick={() => openFileSelectDialog()} className="text-blue-600 hover:underline">select files</a> from your computer
                                    </p>
                                </div>
                                <input type="file" className="hidden" multiple onChange={e => onFileSelect(e)} />
                            </label>
                        </div>
                    </div>
                    <div className="max-h-[300px] overflow-y-scroll">
                        <FilePreview fileData={data} />
                    </div>
                    <div>
                        <button type="submit"
                            onClick={() => uploadFiles}
                            className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DropZone;