import React, { useCallback } from 'react';
import { Container, Engine } from 'tsparticles-engine';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { useTheme } from 'next-themes';

const CustomParticles = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {}, []);
  const { theme, setTheme } = useTheme();

  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme === 'dark' ? '#FFFFFF' : '#ffffff',
          },
          links: {
            color: theme === 'dark' ? '#FFFFFF' : '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.8,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 0, max: 1 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default CustomParticles;
