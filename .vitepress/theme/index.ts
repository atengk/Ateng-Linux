import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, watch } from 'vue'
import mediumZoom from 'medium-zoom'
import './index.css'

let zoom: ReturnType<typeof mediumZoom> | null = null

export default {
    ...DefaultTheme,

    setup() {
        const route = useRoute()

        const init = () => {
            if (!zoom) {
                // @ts-ignore
                zoom = mediumZoom({
                    background: 'rgba(0,0,0,0.85)',
                    margin: window.innerWidth < 768 ? 0 : 24,
                    scrollOffset: 0,
                    animationDuration: window.innerWidth < 768 ? 200 : 260
                })
            }

            zoom.detach()
            zoom.attach('.vp-doc img:not(.no-zoom)')
        }

        const run = () => requestAnimationFrame(() => nextTick(init))

        onMounted(run)
        watch(() => route.path, run)
    }
}