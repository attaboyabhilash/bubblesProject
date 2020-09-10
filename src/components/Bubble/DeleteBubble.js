import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles' 
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
//MUI Material
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
//Redux
import { connect } from 'react-redux'
import { deleteBubble } from '../../redux/actions/dataActions'

const styles = {
    deleteBtn: {
      position: 'absolute',
      right: 20
    },
    dbtn: {
        color: '#FF0000'
    },
    dialog: {
        width: 'fit-content',
        margin: 'auto'
    },
    actions: {
        margin: '0px auto 15px auto'
    }
}

class DeleteBubble extends Component {
    state ={
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    deleteBubble = () => {
        this.props.deleteBubble(this.props.bubbleId)
        this.setState({ open: false })
    }

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <MyButton tip="Delete Bubble" place="right" onClick={this.handleOpen} btnClassName={classes.deleteBtn}>
                    <DeleteOutlinedIcon className={classes.dbtn} />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} className={classes.dialog} fullWidth>
                    <DialogTitle>Are you sure you want to delete this bubble?</DialogTitle>
                    <DialogActions className={classes.actions}>
                        <Button variant="contained" onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button variant="contained" onClick={this.deleteBubble} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteBubble.propTypes = {
    classes: PropTypes.object.isRequired,
    bubbleId: PropTypes.string.isRequired,
    deleteBubble : PropTypes.func.isRequired
}

export default connect(null, { deleteBubble })(withStyles(styles)(DeleteBubble))
