import { Suspense } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { AuthRoutes, UserRoutes } from "./router"
import RoutesHandler from "./components/RoutesHandler"
import { DashboardLayout } from "./components/layout/DashboardLayout"


const App = () => {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes >
                    <Route path="/auth/*" element={<RoutesHandler requiredRole="auth" />}>
                        {AuthRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                    </Route>
                    <Route path="/dashboard" element={<RoutesHandler requiredRole="user" />}>
                        <Route element={<DashboardLayout />}>
                            {UserRoutes.map(({ path, Component }) => (
                                <Route key={path} path={path} element={<Component />} />
                            ))}
                        </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>

            </Suspense>
        </main>
    )
}

export default App