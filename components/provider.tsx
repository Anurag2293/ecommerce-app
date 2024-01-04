import React from 'react'

import { ThemeProvider } from './theme-provider'
import ReduxProvider from '@/redux/provider'

type Props = {}

const Provider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </ThemeProvider>
    )
}

export default Provider