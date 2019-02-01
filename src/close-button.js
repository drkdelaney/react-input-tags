import React from 'react';
import SVG from 'react-inlinesvg';
import svgIcon from './close.svg';

export default ({ className, onClick }) => (
    <span className={className} onClick={onClick}><SVG src={svgIcon} /></span>
);
