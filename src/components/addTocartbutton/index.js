import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const cartAnimation = keyframes`
  12.5% { transform: translateX(-60px) rotate(-18deg); }
  25%, 45%, 55%, 75% { transform: none; }
  50% { transform: scale(.9); }
  44%, 56% { transform-origin: 12px 23px; }
  45%, 55% { transform-origin: 50% 50%; }
  87.5% { transform: translateX(70px) rotate(-18deg); }
  100% { transform: translateX(140px) rotate(-18deg); }
`;

const Button = styled.button`
  --background: #362A89;
  --text: #fff;
  --cart: #fff;
  --tick: var(--background);
  position: relative;
  border: none;
  background: var(--background);
  padding: 8px 28px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  min-width: 144px;
  color: var(--text);
  transform: scale(${props => (props.loading ? '.95' : '1')});
  transition: transform .4s cubic-bezier(.36, 1.01, .32, 1.27);

  &:active {
    --scale: .95;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    display: block;
    position: relative;
    padding-left: 24px;
    margin-left: -8px;
    line-height: 26px;
    transform: translateY(${props => (props.loading ? '-32px' : '0')});
    transition: transform .7s ease;

    &::before,
    &::after {
      content: '';
      position: absolute;
      background: currentColor;
      border-radius: 1px;
      transform: scale(.75) rotate(${props => (props.loading ? '180deg' : '0deg')});
      transition: transform .65s ease .05s;
    }

    &::before {
      width: 2px;
      height: 14px;
      left: 8px;
      top: 6px;
    }

    &::after {
      width: 14px;
      height: 2px;
      left: 2px;
      top: 12px;
    }
  }

  .cart {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -13px 0 0 -18px;
    transform-origin: 12px 23px;
    transform: ${props => (props.loading ? 'translateX(-120px) rotate(-18deg)' : 'translateX(-120px) rotate(-18deg)')};
    animation: ${props => (props.loading ? cartAnimation : 'none')} 3.4s linear forwards .2s;

    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 2px var(--cart), 11px 0 0 0 var(--cart);
      position: absolute;
      bottom: 0;
      left: 9px;
    }

    &::after {
      content: '';
      width: 16px;
      height: 9px;
      background: var(--cart);
      position: absolute;
      left: 9px;
      bottom: 7px;
      transform-origin: 50% 100%;
      transform: perspective(4px) rotateX(-6deg) scaleY(${props => (props.loading ? 1 : 0)});
      transition: transform 1.2s ease ${props => (props.loading ? '.8s' : '0s')};
    }

    svg {
      z-index: 1;
      width: 36px;
      height: 26px;
      display: block;
      position: relative;
      fill: none;
      stroke: var(--cart);
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;

      polyline:last-child {
        stroke: var(--tick);
        stroke-dasharray: 10px;
        stroke-dashoffset: ${props => (props.loading ? '0' : '10px')};
        transition: stroke-dashoffset .4s ease ${props => (props.loading ? '1.73s' : '0s')};
      }
    }
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ECEFFC;
  font-family: 'Inter', Arial, sans-serif;

  .dribbble, .twitter {
    position: fixed;
    display: block;
    bottom: 20px;
    right: 20px;

    img, svg {
      height: 28px;
      width: auto;
    }

    &.twitter {
      right: 64px;

      svg {
        fill: #1da1f2;
        width: 32px;
        height: 32px;
      }
    }
  }
`;

export default function AddToCartButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      setTimeout(() => setLoading(false), 3700);
    }
  };

  return (
    <Container>
      <Button className="button" loading={loading} onClick={handleClick}>
        <span>Add to cart</span>
        <div className="cart">
          <svg viewBox="0 0 36 26">
            <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
            <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
          </svg>
        </div>
      </Button>
      <a className="dribbble" href="https://dribbble.com/shots/9713067-Add-to-cart" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg" alt="Dribbble" />
      </a>
    </Container>
  );
}