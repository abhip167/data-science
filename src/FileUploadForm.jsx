import { useState, Fragment } from "react";
import { Box, Button } from "@mui/material";

import FileUpload from "./Components/FileUpload/FileUpload";
import { Typography } from "@mui/material";

export default ({ handleBack, onSubmit }) => {
  const [files, setFiles] = useState({});
  const [error, setError] = useState(false);

  const isFilesEmpty = () => {
    if (!!Object.keys(files).length) {
      onSubmit({ files });
    } else {
      setError(true);
    }
  };
  return (
    <Fragment>
      <FileUpload
        label="upload files"
        multiple
        files={files}
        setFiles={setFiles}
      />

      {error && (
        <Typography variant="subtitle1" color="error" mt={2}>
          Please upload alteast one data file.
        </Typography>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={isFilesEmpty}>Next</Button>
      </Box>
    </Fragment>
  );
};
