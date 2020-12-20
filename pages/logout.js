/* This may be better suited to be a modal which the user can interact with on any page */
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

export default function Logout() {
  const context = useContext(Context)
  const [,, removeCookie] = useCookies(['simpleAuth']);
  const history = useHistory()


  function signout() {
    removeCookie('simpleAuth')
    context.setAuth(false)
    history.push(`/login`)
  }

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
          onClick={signout}
        >
          Logout
        </Button>
      </Row>
    </>
  )
}
