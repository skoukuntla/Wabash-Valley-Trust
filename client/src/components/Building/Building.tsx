import './Building.css'

const Building = (props: any) => {
  let { clickHandler } = props

  if (!clickHandler) {
    console.log('no click handler found')
    clickHandler = () => {
      console.log('clicked')
    }
  }

  const keyDownHandler = (e: any) => {
    if (e.key === 'Enter') {
      clickHandler()
    }
  }

  return (
    <div
      className="imgContainer"
      onClick={clickHandler}
      onKeyDown={keyDownHandler}
      role="button"
      tabIndex={0}
    >
      <img alt="pin" className="pin" src="/pin.jpg" />
    </div>
  )
}

export default Building
