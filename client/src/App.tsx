import axios from "axios"
import { useEffect } from "react"
import { envConfig } from "./config/env"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./components/ui/card"

const App = () => {
    useEffect(() => {
        axios.get(envConfig.API_BASE_URL).then(res => console.log(res)).catch(err => console.log(err))
    }, [])
    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                    Track progress and recent activity for your Vite app.
                </CardDescription>
            </CardHeader>
            <CardContent>
                Your design system is ready. Start building your next component.
            </CardContent>
        </Card>
    )
}

export default App