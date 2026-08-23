
const Container = ({children, className}) => {
  return (
    <>
    <div className={`max-w-[1480px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 ${className}`}>{children}</div>
    </>
  )
}

export default Container