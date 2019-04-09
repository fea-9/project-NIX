import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import ICONS from './icons';

const COLORS = {
    default: '#9fbcba',
    active: '#4facfe',
    white: '#fff'
}

class Icon extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        viewBox: PropTypes.string.isRequired,
        color: PropTypes.oneOf([
            'default',
            'active',
            'white'
        ]),
        className: PropTypes.string
    }
    static defaultProps = {
        type: 'mostCited',
        width: 10,
        height: 10,
        viewBox: '0 0 20 20',
        color: 'default',
        className: ''
    }

    

    render() {
        
        const { type, width, height, color, className, viewBox} = this.props
        const icon = ICONS[type].format === 'data'
                ? <path d={ICONS[type].path} />
                : ICONS[type].markup;

        return (
            <svg className={className} width={width} height={height} viewBox={viewBox}  fill={COLORS[color]}>
              <defs>{ICONS[type].defs}</defs> {icon}
             </svg>
        );

    }
}

export default Icon;