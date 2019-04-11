import React, {PureComponent} from 'react'
import Button from './Button'
import Icon from "./icon"

class BurgerButton extends PureComponent{
    state = {
            sbIsOpen:false    
        }
    
    changeBurger(){
        this.setState( {sbIsOpen: !this.state.sbIsOpen})
    }

    render(){
        
        if(this.state.sbIsOpen === true){
            return(
                <Button onClick={() => this.changeBurger()}className="btn-close" children="X"/>
            )
        }
        else{
            return(
                <Button onClick={() => this.changeBurger()} className="btn-burger">
                <Icon className="burger-menu-btn" type="burgerMenuIcon" width={15} height={16} viewBox="0 0 14 16"/>
                </Button>
            )
        }
    }
}

export default BurgerButton