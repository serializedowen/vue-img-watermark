import { VueConstructor } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import { VNode } from 'vue/types/umd'
import selectStrategy, { registerCustomStrategy } from './selectStrategy'

let canvas: HTMLCanvasElement

export { registerCustomStrategy }

export type displayMode = 'bottomleft' | 'bottomright' | 'topleft' | 'topright' | 'center' | 'fill'

registerCustomStrategy('fill', (ctx, options) => {
	ctx.textAlign = 'center'
	const width = ctx.canvas.width
	const height = ctx.canvas.height
	ctx.translate(width / 2, -height / 2)
	ctx.rotate((options.rotate * Math.PI) / 180)
	let x = 20
	let y = 20
	let addingX = true
	while (y < height * 2) {
		ctx.fillText(options.content, x, y)

		if (x > width * 2) {
			x = 20
			addingX = false
		}

		if (addingX) x += 80
		else {
			y += 80
			addingX = true
		}
	}
})

export type OptionConfig = {
	mode: displayMode
	textBaseline: CanvasTextBaseline
	fillStyle: string | CanvasGradient | CanvasPattern
	content: string
	font: string
	rotate: number
}

const defaultOptions: OptionConfig = Object.freeze({
	mode: 'fill',
	textBaseline: 'middle',
	font: '15px Arial',
	fillStyle: 'rgba(184, 184, 184, 0.8)',
	content: '请勿外传',
	rotate: 30,
})

let globalOptions: OptionConfig = { ...defaultOptions }
const scopedConfigMap: WeakMap<Vue, OptionConfig> = new WeakMap()

export const setScopedConfig = (opts: Partial<OptionConfig>, vm: Vue) => {
	if (!scopedConfigMap.has(vm)) {
		scopedConfigMap.set(vm, { ...defaultOptions, ...opts })
	} else {
		scopedConfigMap.set(vm, { ...scopedConfigMap.get(vm), ...opts })
	}
}

export const setGlobalConfig = (opts: Partial<OptionConfig>) => {
	globalOptions = { ...globalOptions, ...opts }
}

const getCanvas = () => {
	if (!canvas) {
		canvas = document.createElement('canvas')
		// canvas.style.display = "none";
		// canvas.style.position = "absolute";
		// canvas.style.zIndex = "-9999";
		// document.body.append(canvas);
	}
	return canvas
}

const vueImgWatermark = {
	install: (Vue: VueConstructor) => {
		Vue.directive('watermark', {
			bind(
				element: HTMLImageElement,
				binding: DirectiveBinding,
				VNode: VNode
				// oldVNode: VNode
			) {
				let options: OptionConfig

				const bindingOptions: Partial<OptionConfig> = binding.value

				if (scopedConfigMap.has(VNode.context)) {
					options = {
						...scopedConfigMap.get(VNode.context),
						...bindingOptions,
					}
				} else {
					options = { ...globalOptions, ...bindingOptions }
				}

				function loader() {
					element.removeEventListener('load', loader)

					const { width, height } = element
					const ctx = getCanvas().getContext('2d')

					const { textBaseline, fillStyle, font, mode } = options

					getCanvas().width = width
					getCanvas().height = height
					ctx.clearRect(0, 0, width, height)
					ctx.drawImage(element, 0, 0)

					ctx.textBaseline = textBaseline
					ctx.font = font
					ctx.fillStyle = fillStyle

					selectStrategy(mode)(ctx, options)

					const url = ctx.canvas.toDataURL()

					//@ts-ignore
					VNode.__url ? VNode.__url.push(url) : (VNode.__url = [url])

					element.src = url
				}
				element.setAttribute('crossorigin', 'anonymous')
				element.addEventListener('load', loader)
			},

			unbind(el, binding, VNode) {
				//@ts-ignore
				VNode.__url && VNode.__url.map((url) => URL.revokeObjectURL(url))
			},
		})
	},
}

export default vueImgWatermark
