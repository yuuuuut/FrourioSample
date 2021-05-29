import Header from './Header'

/**
 * Types
 */
type Props = {
  children?: React.ReactNode
}

/**
 * Main
 */
export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
