import React, { Component } from 'react'
import MyButton from '../../util/MyButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
//Redux
import { connect } from 'react-redux'
import { likeBubble, unlikeBubble } from '../../redux/actions/dataActions'

class LikeButton extends Component {
    likedBubble = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.bubbleId === this.props.bubbleId)) return true
        else return false
    }
    likeBubble = () => {
        this.props.likeBubble(this.props.bubbleId)
    }
    unlikeBubble = () => {
        this.props.unlikeBubble(this.props.bubbleId)
    }

    render() {
        const { authenticated } = this.props.user
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorderIcon color="secondary" />
                </MyButton>
            </Link>
        ) : (
            this.likedBubble() ? (
                <MyButton tip="Unlike" onClick={this.unlikeBubble}>
                    <FavoriteIcon color="secondary" />
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeBubble}>
                    <FavoriteBorderIcon color="secondary" />
                </MyButton>
            )
        )
        return likeButton
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    bubbleId: PropTypes.string.isRequired,
    likeBubble: PropTypes.func.isRequired,
    unlikeBubble: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeBubble,
    unlikeBubble
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
