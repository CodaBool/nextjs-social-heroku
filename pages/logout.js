import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { signOut , useSession } from 'next-auth/client'
import { Load, isLoad } from '../components/Load'

export default function Logout() {
  const [session, loading] = useSession()

  if (isLoad(session, loading, true)) return <Load />

  return (
    <>
      <h4 className="display-5 text-center m-1 mb-5">
        Are you sure you would like to Logout?
      </h4>
      <Row>
        <Button 
          className="mx-auto"
          style={{width: "20%"}}
          variant="warning"
          type="submit"
          onClick={() => {
            signOut({ callbackUrl: '/' })
          }}
        >
          Logout
        </Button>
      </Row>
    </>
  )
}
