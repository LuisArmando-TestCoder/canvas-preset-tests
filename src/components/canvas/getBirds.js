const bird = [{
        "x": 14,
        "y": 20
    },
    {
        "x": 29,
        "y": 0
    },
    {
        "x": 14.5,
        "y": 42.5
    },
    {
        "x": 0,
        "y": 0
    },
    {
        "x": 15,
        "y": 20
    }
]

export function getBird({
    x,
    y,
    rot,
    acceleration,
    // c
}) {
    return {
        x: x || 0,
        y: y || 0,
        w: 1,
        rot: rot || 0,
        acceleration: acceleration || {
            x: 1,
            y: 1
        },
        c: '#001',
        group: bird,
        localGroup: []
    }
}

export function getRandomBirds(amount, x, y) {
    const {
        random,
        c
    } = this
    return [...new Array(amount)].map((_, i) => {
        const bird = getBird({
            x: x || random(c.width),
            y: y || random(c.height),
            rot: random(360),
            acceleration: random(3) + 2,
            c: `rgb(255, 68, ${random(255)})`
        })
        console.log(bird, _, i)
        return bird
    })
}