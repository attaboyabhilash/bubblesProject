import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

export default ({ children, onClick, tip, btnClassName, tipClassName, place }) => (
    <Tooltip title={tip} className={tipClassName} placement={place}> 
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)
