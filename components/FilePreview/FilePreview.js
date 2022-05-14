import React from "react";

const FilePreview = ({ fileData }) => {
  if (!fileData) return <></>;
  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      {fileData.fileList.map((file) => {
        return (
          <React.Fragment key={file.name}>
            <div
              id={file.name}
              className="rounded-lg border-4 border-solid h-20 w-20 bg-gray-50 cursor-pointer"
              key={file.name}>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FilePreview;
