import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import style from './TasksSkeleton.module.css'

export const TasksSkeleton = () => (
  <>
    {Array(4)
      .fill(null)
      .map((_, id) => (
        <Box key={id} className={style.wrapper}>
            <Skeleton width={20} height={40} />
            <Skeleton width={150} height={40} />
            <Skeleton width={20} height={40} />
        </Box>
      ))}
  </>
)