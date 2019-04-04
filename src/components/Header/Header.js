import React from "react";
import * as Icons from '../BaseComponents/Icons/IconsHeader'

export const HeaderTemplate = ({title, details, component, ...rest}) => (
    <>
        <div className = "header__icon-box">
            <Icons.BurgerMenu className='icon burger-menu-icon' />
        </div>
        <div className = "header__title-box" >
            { title && <h2 className = "header__name" >
                {title}
            </h2>}
            { details && <p className = "header__details" >
                {details}
            </p>}
            
        </div>
        {component && 
            <div className = "header__component-box" >
                {component}
            </div>   } 

        
    </>
)