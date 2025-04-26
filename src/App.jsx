import { TasksProvider } from "./Contexts/tasksContext"
import { ToDoList } from "./Pages/ToDoList"
import { createTheme, ThemeProvider } from "@mui/material"
import { ToastProvider } from "./Contexts/ToastContext";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#00897b',
        contrastText: '#e0f2f1',
      },
      secondary: {
        main: '#004d40',
        contrastText: '#e0f7fa',
      },
      error: {
        main: '#c62828',
      },
      background: {
        default: '#b2dfdb',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: 'WinkyRough, "Helvetica", "Arial", sans-serif',
    },
    spacing: 8,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        // يمكنك إضافة نقاط تكسر مخصصة
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      },
    },
  })


  return (
    <>
      <ThemeProvider theme={theme}>
        <TasksProvider>
          <ToastProvider>
            <ToDoList/>
          </ToastProvider>
        </TasksProvider>
      </ThemeProvider>
    </>
  )
}

export default App
