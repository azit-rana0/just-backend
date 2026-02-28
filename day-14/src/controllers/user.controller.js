const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followsUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followeeUsername == followerUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself."
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exists."
        })
    }

    const isAleadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (isAleadyFollowing) {
        {
            return res.status(200).json({
                message: `You are already following ${followeeUsername}`,
                follow: isAleadyFollowing
            })
        }
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}

async function unfollowsUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

async function updateFollowStatusController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username
    const { status } = req.body

    if (!["accepted", "rejected", "pending"].includes(status)) {
        return res.status(400).json({
            message: "Invalid status value.(pending/accepted/rejected)"
        })
    }

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (!followRequest) {
        return res.status(404).json({
            message: "Follow request not found",
        });
    }


    if (followRequest.status === status) {
        if (followRequest.status === "pending") {
            return res.status(400).json({
                message: "Your follow request is already pending",
            });
        }
        if (followRequest.status === "accepted") {
            return res.status(400).json({
                message: "Your follow request already accepted",
            });
        }
        if (followRequest.status === "rejected") {
            followRequest.status = "pending";
            await followRequest.save();

            return res.status(200).json({
                message: "Your previous request was rejected. Follow request sent again.",
                follow: followRequest,
            });
        }
    }

    followRequest.status = status;
    await followRequest.save();

    res.status(200).json({
        message: `Request ${status}`,
        follow: followRequest,
    });
}
module.exports = {
    followsUserController,
    unfollowsUserController,
    updateFollowStatusController
}

