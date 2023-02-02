import styled from 'styled-components'
import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom/client'
import { mountNode } from './mountNode'

type WrapperProps = {
  marks?: boolean
}

const Wrapper = styled.div<WrapperProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
`

interface DotStyledProps {
  readonly position?: number
  readonly backgroundColor?: string
}

const DotStyled = styled.button.attrs((props: DotStyledProps) => ({
  style: {
    left: `${props.position}%`,
  },
}))<DotStyledProps>`
  all: unset;
  z-index: 100;
  position: absolute;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`

type LineFillProps = {
  position?: number
  backgroundColor?: string
}

const LineFill = styled.div.attrs((props: LineFillProps) => ({
  style: {
    width: `${props.position}%`,
  },
}))<LineFillProps>`
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
`

type LineStyledProps = {
  backgroundColor?: string
}

const LineStyled = styled.div<LineStyledProps>`
  height: 3px;
  background-color: ${(props) => props.backgroundColor};
`

type MarksStyledProps = {
  position?: number
  backgroundColor?: string
}

const MarksStyled = styled.div<MarksStyledProps>`
  z-index: 10;
  position: absolute;
  height: 8px;
  width: 2px;
  background-color: ${(props) => props.backgroundColor};
  left: ${(props) => `${props.position}%`};
  top: 50%;
  transform: translate(-50%, -50%);
`

const MarksText = styled.div`
  position: absolute;
  bottom: 15px;
  transform: translate(-50%, 0);
`

interface Marks {
  min: number
  max: number
}

interface SliderProps {
  unFocusColor?: string
  focusColor?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  theme?: any
  onChange?: (value: number) => void
  value?: number
  defaultValue?: number
  marks?: Marks
  tooltipVisible?: boolean
  step?: number
  vertical?: boolean
  min?: number
  max?: number
  unit?: string
}

const Slider = (props: SliderProps) => {
  const {
    style,
    className,
    theme,
    onChange,
    value,
    marks,
    tooltipVisible,
    step = 1,
    vertical,
    min = 1,
    max = 20,
    unit,
    unFocusColor,
    focusColor,
  } = props

  const [enable, setEnable] = React.useState(false)
  const [positionCursorPercentage, setPositionCursorPercentage] =
    React.useState(value ? ((value - min) / (max - min)) * 100 : 0)
  const [positionCursor, setPositionCursor] = React.useState(
    value ? value : min
  )
  const slide = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (slide.current) {
      const rect = slide.current.getBoundingClientRect()
      const minPosition = 0
      const maxPosition = rect.width
      let positionAbsolute = positionCursorPercentage
      window.onmousemove = (ev: MouseEvent): any => {
        const position = vertical
          ? rect.y + rect.height - ev.clientY
          : ev.clientX - rect.x
        if (enable) {
          window.onmouseup = (evMouseUp: MouseEvent): any => {
            setEnable(false)
          }
          if (position < minPosition) {
            positionAbsolute = min
          } else if (position > maxPosition) {
            positionAbsolute = max
          } else {
            positionAbsolute = (position / maxPosition) * (max - min) + min
          }

          if (
            positionAbsolute <= positionCursorPercentage + step &&
            positionAbsolute >= positionCursorPercentage - step
          ) {
            positionAbsolute = positionCursorPercentage
          }
          positionAbsolute =
            Math.round(positionAbsolute * (1 / step)) / (1 / step)
          if (onChange) {
            onChange(positionAbsolute)
          } else {
            setPositionCursor(positionAbsolute)
          }
        }
      }
    }
  }, [slide])

  React.useEffect(() => {
    if (value) {
      onChangePositionOfCursor(value)
    } else {
      onChangePositionOfCursor(positionCursor)
    }
  }, [value, positionCursor])

  const onChangePositionOfCursor = (positionAbsolute: number) => {
    setPositionCursorPercentage(((positionAbsolute - min) / (max - min)) * 100)
  }

  const valueOfCursor =
    Math.round(((positionCursorPercentage / 100) * (max - min) + min) * step) /
    step

  return (
    <Wrapper
      marks={marks ? true : false}
      ref={slide}
      className={className}
      style={style}
    >
      <LineStyled backgroundColor={unFocusColor}>
        <LineFill
          backgroundColor={focusColor}
          position={positionCursorPercentage}
        ></LineFill>
      </LineStyled>
      <DotStyled
        backgroundColor={focusColor}
        position={positionCursorPercentage}
        onMouseDown={() => setEnable(true)}
      ></DotStyled>

      {marks ? (
        <>
          <MarksStyled
            backgroundColor={focusColor}
            position={((marks.min - min) / (max - min)) * 100}
          >
            <MarksText>
              {marks.min}
              {unit}
            </MarksText>
          </MarksStyled>
          <MarksStyled
            backgroundColor={focusColor}
            position={((marks.max - min) / (max - min)) * 100}
          >
            <MarksText>
              {marks.max}
              {unit}
            </MarksText>
          </MarksStyled>
        </>
      ) : null}
    </Wrapper>
  )
}

Slider.defaultProps = {
  step: 0.1,
  min: 0,
  max: 100,
  unit: '%',
  focusColor: '#f8b500',
  unFocusColor: '#BBBBBB',
}

// const SliderExemple = () => {
//   const [value, setValue] = React.useState(15)

//   const onChangeValue = (e: React.SetStateAction<number>) => {
//     setValue(e)
//   }
//   return (
//     <>
//       <div style={{ width: '50%', marginTop: '50px' }}>
//         <Slider
//           min={1}
//           max={20}
//           marks={{ min: 1, max: 20 }}
//           value={value}
//           onChange={(e) => onChangeValue(e)}
//           step={1}
//           tooltipVisible
//           unit="€"
//         ></Slider>
//       </div>
//     </>
//   )
// }

// render(
//   <div>
//     <SliderExemple />
//   </div>,
//   mountNode
// )

export default Slider
