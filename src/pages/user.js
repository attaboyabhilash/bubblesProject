import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Bubble from '../components/Bubble/Bubble'
import BubbleSkeleton from '../util/BubbleSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'
import StaticProfile from '../components/Profile/StaticProfile'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'

class user extends Component {
    state = {
        profile: null,
        bubbleIdParam: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle
        const bubbleId = this.props.match.params.bubbleId

        if(bubbleId) this.setState({ bubbleIdParam: bubbleId })

        this.props.getUserData(handle)
        axios(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        const { bubbles, loading } = this.props.data
        const { bubbleIdParam } = this.state

        const BubblesMarkup = loading ? (
            <BubbleSkeleton />
        ) : bubbles === null ? (
            <h3> No Bubbles from this User </h3>
        ) : !bubbleIdParam ? (
            bubbles.map(bubble => <Bubble key={bubble.bubbleId} bubble={bubble} /> )
        ) : (
            bubbles.map(bubble => {
                if(bubble.bubbleId !== bubbleIdParam){
                    return <Bubble key={bubble.bubbleId} bubble={bubble} />
                }else return <Bubble key={bubble.bubbleId} bubble={bubble} openDialog />
            })
        )
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {BubblesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton />
                    ) : (<StaticProfile profile={this.state.profile} />)
                    }
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    data: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getUserData })(user)
