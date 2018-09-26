// @flow strict
import React from "react";

type Props = {
  className?: ?string,
  disabled?: ?boolean
};

const SvgArrowBack = ({ className, disabled }: Props) => (
  <div className={className}>
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 40 40"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Arrow back</title>
      <defs />
      <g
        id="arrowBack"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          transform="translate(4.000000, 5.000000)"
          fill={disabled ? "#c9c7c8" : "#c51162"}
          fillRule="nonzero"
          id="arrowBack-Page-1"
        >
          <path d="M29.0872725,13.5884724 L7.72210622,13.5884724 L17.0514347,4.26499641 C17.7988166,3.51808331 17.7988166,2.30709792 17.0514347,1.56018482 C16.3040527,0.813271726 15.0923071,0.813271726 14.3449252,1.56018482 L1.42683803,14.4701683 C0.857720656,15.0389286 0.857720656,15.9610714 1.42683803,16.5298318 L14.3449252,29.4398151 C15.0923071,30.1867283 16.3040527,30.1867283 17.0514346,29.4398153 L17.0514347,29.4398153 C17.7988166,28.6929021 17.7988166,27.4819167 17.0514347,26.7350035 L7.72210622,17.4115276 L29.0872725,17.4115276 C30.1436427,17.4115276 31,16.5557075 31,15.5 C31,14.4442925 30.1436427,13.5884724 29.0872725,13.5884724 Z" />
        </g>
      </g>
    </svg>
  </div>
);

SvgArrowBack.defaultProps = {
  className: null,
  disabled: false
};

export default SvgArrowBack;
