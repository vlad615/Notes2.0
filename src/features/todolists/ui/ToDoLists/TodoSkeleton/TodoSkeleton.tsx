import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import MuiSkeleton from "@mui/material/Skeleton"
import styles from "./TodoSkeleton.module.css"
 
export const TodoSkeleton = () => (
  <Paper className={styles.container} >
    <div className={styles.title}>
      <MuiSkeleton width={150} height={50} />
      <MuiSkeleton width={20} height={40} />
    </div>
    <div className={styles.createItemForm}>
      <MuiSkeleton width={230} height={60} />
      <MuiSkeleton width={20} height={40} />
    </div>
    {Array(4)
      .fill(null)
      .map((_, id) => (
        <Box key={id} className={styles.common}>
          <div className={styles.tasks}>
            <MuiSkeleton width={20} height={40} />
            <MuiSkeleton width={150} height={40} />
          </div>
          <MuiSkeleton width={20} height={40} />
        </Box>
      ))}
    <Box className={styles.common}>
      {Array(3)
        .fill(null)
        .map((_, id) => (
          <MuiSkeleton key={id} width={80} height={60} />
        ))}
    </Box>
  </Paper>
)