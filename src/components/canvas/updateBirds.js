function watchBirdForPositionReset(bird) {
    const {c} = this
    if (bird.x - bird.size.x * 2 > c.width) bird.x = -bird.size.x
    if (bird.y - bird.size.y * 2 > c.height) bird.y = -bird.size.y
    if (bird.x + bird.size.x * 2 < 0) bird.x = c.width
    if (bird.y + bird.size.y * 2 < 0) bird.y = c.height
}

function moveBird(bird) {
    bird.x += Math.sin(-bird.rot / 360 * Math.PI * 2) * bird.acceleration
    bird.y += Math.cos(bird.rot / 360 * Math.PI * 2) * bird.acceleration
}

function setLocalGroup(targetBird) {
    const {
        birds,
        get2DVerticesDistance,
        birdsVision
    } = this
    // watch for birds behavior
    // ... if they abandon group if entering their zone
    targetBird.localGroup.splice(0)
    birds.forEach(bird => {
        const distance = Math.abs(get2DVerticesDistance(bird, targetBird))
        if (distance <= birdsVision && targetBird !== bird) {
            targetBird.localGroup.push(bird)
        }
    })
}

// function addRandomRotation(targetBird) {
//     targetBird.rot += Math.sign(this.random(2) - 1) * (this.random(2) + 1)
// }

function addRandomAcceleration(targetBird) {
    if (targetBird.acceleration < 5) {
        targetBird.acceleration += this.random(1) * 0.5
    }
}

function getGroupSummations(targetBird) {
    if (targetBird.localGroup.length) {
        const groupSummations = {
            acceleration: 0,
            rot: 0,
            x: 0,
            y: 0
        }
        targetBird.localGroup.forEach(bird => {
            groupSummations.acceleration += bird.acceleration
            groupSummations.rot += bird.rot
            groupSummations.x += bird.x
            groupSummations.y += bird.y
        })
        return groupSummations
    }
}

function alignKeyToGroup(targetBird, groupSummations, key) {
    if (groupSummations[key]) {
        const averageKey = (groupSummations[key] + targetBird[key]) /
                           (targetBird.localGroup.length + 1)
        if (averageKey) targetBird[key] = (targetBird[key] + averageKey) / 2
    }
}

function avoidCollisionToGroup(targetBird, groupSummations, key) {
    if (groupSummations[key]) {
        const averageKey = groupSummations[key] / targetBird.localGroup.length
        if (averageKey) targetBird[key] += (targetBird[key] - averageKey) * 0.01
    }
}

function setAlignment(targetBird, groupSummations) {
    alignKeyToGroup(targetBird, groupSummations, 'acceleration')
    alignKeyToGroup(targetBird, groupSummations, 'rot')
}

function avoidCollission(targetBird, groupSummations) {
    avoidCollisionToGroup(targetBird, groupSummations, 'x')
    avoidCollisionToGroup(targetBird, groupSummations, 'y')
}

function coheseTowardsCenter(targetBird, groupSummations) {
    if (groupSummations.x) {
        const averageGroup = {
            x: groupSummations.x / targetBird.localGroup.length,
            y: groupSummations.y / targetBird.localGroup.length,
        }
        const directionVector = {
            x: averageGroup.x - targetBird.x,
            y: averageGroup.y - targetBird.y,
        }
        const middleRotatingDirection = 180 - (targetBird.rot % 360)

        targetBird.rot += 
                        -Math.sign(
                            directionVector.x
                            *
                            directionVector.y
                            * 
                            middleRotatingDirection
                        ) * this.cohesionForce
    }
}

function updateBirds(targetBird) {
    setLocalGroup.call(this, targetBird)
    moveBird(targetBird)
    watchBirdForPositionReset.call(this, targetBird)
    // addRandomRotation.call({random}, targetBird)
    addRandomAcceleration.call(this, targetBird)
    const groupSummations = getGroupSummations(targetBird)
    if (groupSummations) {
        setAlignment(targetBird, groupSummations)
        avoidCollission(targetBird, groupSummations)
        coheseTowardsCenter.call(this, targetBird, groupSummations)
    }
    this.ctx.fill()
}

export default updateBirds