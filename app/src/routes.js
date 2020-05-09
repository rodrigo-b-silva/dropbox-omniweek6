import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Main from './pages/Main'
import Box from './pages/Box'

const routes = createAppContainer(
    createSwitchNavigator({
        Main,
        Box
    })
)

export default routes