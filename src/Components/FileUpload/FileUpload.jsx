import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import {
  FileUpload as FileUploadIcon,
  Assignment,
  Delete,
} from "@mui/icons-material";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1000000;
const KILO_BYTES_PER_BYTE = 1000;
const MAX_FILES_ALLOWED = 2;

const FileUpload = ({
  files,
  setFiles,
  label,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  maxFiles = MAX_FILES_ALLOWED,
  ...otherProps
}) => {
  const validateFiles = (filesObject) => {
    const localFiles = {};

    if (filesObject > maxFiles) {
      alert(`Only ${maxFiles} are allowed to select`);
      return {};
    }

    for (let file of filesObject) {
      if (file.size >= maxFileSizeInBytes) {
        alert(
          `File - ${file.name} is too large. Maximum allowed file size is ${maxFileSizeInBytes}`
        );

        continue;
      }

      if (otherProps.multiple) {
        localFiles[file.name] = file;
      } else {
        return file;
      }
    }

    console.log(localFiles);
    return localFiles;
  };
  const handleSelectedFile = (e) => {
    e.preventDefault();

    const { files: selectedFiles } = e.target;

    if (selectedFiles.length) {
      const validatedFiles = validateFiles(selectedFiles);
      setFiles(validatedFiles);
    }
  };

  const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

  return (
    <>
      <Box>
        <List dense>
          {Object.keys(files).map((fileName, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              }
            >
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText
                primary={fileName}
                secondary={`${convertBytesToKB(files[fileName].size)} kb`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Button
        variant="contained"
        endIcon={<FileUploadIcon />}
        component="label"
      >
        <input hidden multiple type="file" onChange={handleSelectedFile} />
        {label}
      </Button>
    </>
  );
};

export default FileUpload;
