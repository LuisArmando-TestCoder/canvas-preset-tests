<template>
    <canvas id="birds"></canvas>
</template>

<script>
import preset from 'canvas-preset'
import {getRandomBirds} from './getBirds'
import updateBirds from './updateBirds'
export default {
    name: 'Birds',
    mounted() {
        preset(({
            size,
            draw,
            renderGroup,
            clear,
            c,
            ctx,
            random,
            get2DVerticesDistance,
        }) => {

            size();
            const getAcceleration = () => random(3) + 2;
            const cohesionForce = 5
            const birdsVision = 100
            const birdsAmount = 73
            const getRandomBirdsBind = {c, random, getAcceleration};
            const birds = getRandomBirds.call(getRandomBirdsBind, birdsAmount);
            const updateBirdsBind = {
                c,
                birds,
                birdsVision,
                get2DVerticesDistance,
                random,
                ctx,
                cohesionForce
            };

            window.addEventListener('click', e => {
                birds.push(
                    getRandomBirds.call(
                        getRandomBirdsBind,
                        1,
                        e.clientX,
                        e.clientY
                    )[0]
                )
            })

            draw(() => {
                clear('#ffe');
                renderGroup('lines', birds, bird => {
                    ctx.fillStyle = bird.c
                }, updateBirds.bind(updateBirdsBind));
            });
        });
    }
}
</script>