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
            const birdsVision = 75
            const birdsAmount = 70
            const birds = getRandomBirds.call({c, random}, birdsAmount);

            window.addEventListener('click', e => {
                birds.push(
                    getRandomBirds.call(
                        {c, random},
                        1,
                        e.clientX,
                        e.clientY
                    )[0]
                )
            })

            draw(() => {
                clear();
                renderGroup('lines', birds, bird => {
                    // console.log(bird);
                    ctx.fillStyle = bird.c
                    ctx.fill()
                }, updateBirds.bind({
                    c,
                    birds,
                    birdsVision,
                    get2DVerticesDistance,
                    random
                }));
            });
        });
    }
}
</script>