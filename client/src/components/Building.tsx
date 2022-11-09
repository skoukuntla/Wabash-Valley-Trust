const Building = (props: any) => {
  let { clickHandler } = props

  if (!clickHandler) {
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
      <img alt="pin" />
    </div>
  )
}

export default Building
