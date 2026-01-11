import { DashboardLayout } from '@/components/common/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card'

export function Profile() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">User profile settings coming soon...</p>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
