import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ToastSnackbar({ open, showToast, hideToast, toastMessage}) {
    

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={hideToast}>
        <Alert
          onClose={hideToast}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {/* Operation successed! */}
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}