import React, { ComponentType, createElement } from 'react'
import { ResponsiveEmbededProps } from '@/types'

const div = createElement.bind(React, 'div')
const iframe = createElement.bind(React, 'iframe')

const divStyle = {
  position: 'relative',
  height: 0,
  overflow: 'hidden',
  maxWidth: '100%'
}

const iframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}

/*
 *  Turn `16:9` into `9 / 16` into `56.25%`
 *  Turn `4:3` into `3 / 4` into `75%`
 */
const ratioToPercent = (ratio: string = '16:9') => {
  const [w, h] = ratio.split(':').map((num) => Number(num))
  return `${(h / w) * 100}%`
}

/*
 *  Usage: <ResponsiveEmbed src='ace youtube video' ratio='4:3' />
 */
const EmbeddedVideo: ComponentType<ResponsiveEmbededProps> = (props) => {
  const paddingBottom = ratioToPercent(props?.ratio)
  const style = { ...divStyle, paddingBottom }
  const iframeProps = { frameBorder: 0, ...props, style: iframeStyle }
  delete iframeProps.ratio
  return div(
    { style } as React.Attributes,
    iframe(iframeProps as React.Attributes)
  )
}

export default EmbeddedVideo
