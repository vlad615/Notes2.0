import type { ReactNode } from "react"
import { Navigate, Outlet } from "react-router"
import { Path } from "@/commun/instance"

type Props = {
    isAllowed: boolean
    children?: ReactNode
    redirectPath?: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath = Path.Login }: Props) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} />
    }
    return children ? children : <Outlet />
}