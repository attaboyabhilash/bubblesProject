import React, { Component } from 'react'
import Bubble from '../components/Bubble/Bubble'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Profile from '../components/Profile/Profile'
import BubbleSkeleton from '../util/BubbleSkeleton'
import { connect } from 'react-redux'
import { getBubbles } from '../redux/actions/dataActions'

class home extends Component {

    componentDidMount() {
        this.props.getBubbles()
    }

    render() {
        const { bubbles, loading } = this.props.data
        let recentBubbleMarkup = !loading ? 
            bubbles.map(bubble => <Bubble key={bubble.bubbleId} bubble={bubble}/> )
            :
            <BubbleSkeleton />
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentBubbleMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes ={
    getBubbles: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
    data: state.data,
})

export default connect(mapStatetoProps, { getBubbles })(home)
