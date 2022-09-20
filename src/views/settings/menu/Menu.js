import { CardHeader, CardText, Nav, NavItem, NavLink, Tooltip } from 'reactstrap'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardTitle from 'reactstrap/lib/CardTitle'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Menu = (props) => {
  const { currentActive } = props
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const toggle = () => setTooltipOpen(!tooltipOpen)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>

      <CardBody>
        <Nav pills>
          {/* <NavItem>
            <Link to='/settings-general'>
              <NavLink {...(currentActive === 'general' ? { active: true } : undefined)}>General</NavLink>
            </Link>
          </NavItem> */}
          <NavItem>
            <Link to='/settings-info'>
              <NavLink {...(currentActive === 'info' ? { active: true } : undefined)}>Info</NavLink>
            </Link>
          </NavItem>
          {/* <NavItem>
            <Link to='/settings-social'>
              <NavLink {...(currentActive === 'social' ? { active: true } : undefined)}>Social</NavLink>
            </Link>
          </NavItem> */}
        </Nav>
      </CardBody>
    </Card>
  )
}

export default Menu
